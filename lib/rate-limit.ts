import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

const WINDOW_SECONDS = 10 * 60;
const LIMIT_PER_CLIENT = 5;
// Shared bucket for requests whose client IP cannot be established from a trusted proxy.
const LIMIT_UNATTRIBUTED = 20;

export type RateLimitResult =
  | { status: 'allowed' }
  | { status: 'limited'; retryAfterSeconds: number }
  | { status: 'unavailable' };

// Forwarded headers are client-controlled unless a trusted platform overwrites them.
// Vercel sets x-vercel-forwarded-for itself; for other proxies only the rightmost
// x-forwarded-for entry (appended by our own proxy) can be trusted.
export function getTrustedClientIp(headers: Headers): string | null {
  const trusted = process.env.VERCEL === '1' || process.env.CONTACT_TRUST_PROXY === 'true';
  if (!trusted) return null;

  const forwardedFor = headers.get('x-forwarded-for')?.split(',').pop();
  const candidate = headers.get('x-vercel-forwarded-for') ?? headers.get('x-real-ip') ?? forwardedFor;
  const ip = candidate?.trim();
  return ip && isIP(ip) ? ip : null;
}

const isLoopback = (hostname: string) => hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

type PipelineEntry = { result?: unknown; error?: string };

type FailureCategory = 'http_error' | 'redis_command_error' | 'malformed_response' | 'invalid_incr_result' | 'timeout' | 'network_error' | 'unknown';

class StoreError extends Error {
  constructor(readonly category: FailureCategory, message: string, readonly httpStatus?: number) {
    super(message);
  }
}

const safeText = (text: string) => text.replace(/\s+/g, ' ').slice(0, 200);

function describeFailure(error: unknown) {
  if (error instanceof StoreError) return { category: error.category, httpStatus: error.httpStatus, message: error.message };
  if (error instanceof Error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return { category: 'timeout' as const, httpStatus: undefined, message: 'request to store timed out' };
    }
    if (error instanceof SyntaxError) {
      return { category: 'malformed_response' as const, httpStatus: undefined, message: 'store response was not valid JSON' };
    }
    if (error instanceof TypeError) {
      const cause = error.cause as { code?: unknown } | undefined;
      const code = typeof cause?.code === 'string' ? ` (${cause.code})` : '';
      return { category: 'network_error' as const, httpStatus: undefined, message: `fetch failed${code}` };
    }
  }
  return { category: 'unknown' as const, httpStatus: undefined, message: 'unexpected failure' };
}

export async function checkRateLimit(headers: Headers): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[contact] Rate limiting is disabled in development: Upstash variables are not set.');
      return { status: 'allowed' };
    }
    console.error('[contact] Rate-limit store is not configured; refusing requests.');
    return { status: 'unavailable' };
  }

  let endpoint: URL;
  try {
    endpoint = new URL(`${url.replace(/\/+$/, '')}/pipeline`);
  } catch {
    console.error('[contact] Rate-limit store URL is invalid; refusing requests.');
    return { status: 'unavailable' };
  }
  if (process.env.NODE_ENV === 'production' && endpoint.protocol !== 'https:' && !isLoopback(endpoint.hostname)) {
    console.error('[contact] Rate-limit store must use https in production; refusing requests.');
    return { status: 'unavailable' };
  }

  const ip = getTrustedClientIp(headers);
  const limit = ip ? LIMIT_PER_CLIENT : LIMIT_UNATTRIBUTED;
  const bucket = ip ? createHash('sha256').update(ip).digest('hex').slice(0, 32) : 'unattributed';
  const key = `jimtech:contact:rl:${bucket}`;

  const run = async (commands: unknown[][]) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new StoreError('http_error', `store responded ${response.status}`, response.status);
    const entries = (await response.json()) as PipelineEntry[];
    if (!Array.isArray(entries) || entries.length !== commands.length || entries.some((entry) => !entry || typeof entry !== 'object')) {
      throw new StoreError('malformed_response', 'pipeline response is not an array matching the commands sent', response.status);
    }
    const failed = entries.findIndex((entry) => typeof entry.error === 'string');
    if (failed >= 0) {
      const name = String(commands[failed]?.[0]);
      throw new StoreError('redis_command_error', `${name} failed: ${safeText(String(entries[failed].error))}`, response.status);
    }
    return entries;
  };

  try {
    const entries = await run([
      ['INCR', key],
      ['EXPIRE', key, WINDOW_SECONDS, 'NX'],
      ['TTL', key],
    ]);
    const count = entries[0]?.result;
    let ttl = entries[2]?.result;
    if (typeof count !== 'number' || !Number.isInteger(count) || count < 1) {
      throw new StoreError('invalid_incr_result', `INCR returned ${typeof count}, expected positive integer`);
    }

    // A counter without an expiry would block this visitor forever; repair it.
    if (typeof ttl === 'number' && ttl < 0) {
      await run([['EXPIRE', key, WINDOW_SECONDS]]);
      ttl = WINDOW_SECONDS;
    }

    if (count > limit) {
      const retryAfterSeconds = typeof ttl === 'number' && ttl > 0 ? ttl : WINDOW_SECONDS;
      return { status: 'limited', retryAfterSeconds };
    }
    return { status: 'allowed' };
  } catch (error) {
    const { category, httpStatus, message } = describeFailure(error);
    console.error('[contact] Rate-limit store unavailable; refusing request.', { category, httpStatus, message });
    return { status: 'unavailable' };
  }
}

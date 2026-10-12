import nodemailer from 'nodemailer';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
// Worst case is the SMTP timeouts below; verify this against the hosting plan's function limit.
export const maxDuration = 30;

// A text-only enquiry (5,000-character message plus short fields) fits well inside this.
const MAX_BODY_BYTES = 32 * 1024;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  website?: unknown;
};

// Only ever the server-side recipient; the default is the public contact address.
const DEFAULT_CONTACT_EMAIL_TO = 'jimtechai30@gmail.com';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const reply = (message: string, status: number, headers?: Record<string, string>) =>
  Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

const UNAVAILABLE_MESSAGE =
  'Our enquiry service is temporarily unavailable. Please contact us on WhatsApp or by email instead.';

// Header injection is stopped by removing control characters from every field.
const stripControl = (value: string, keepNewlines: boolean) =>
  Array.from(value)
    .filter((character) => {
      const code = character.codePointAt(0) ?? 0;
      if (keepNewlines && (code === 10 || code === 13 || code === 9)) return true;
      return code >= 32 && code !== 127;
    })
    .join('');

const readField = (value: unknown, maximumLength: number, multiline = false) =>
  typeof value === 'string' ? stripControl(value, multiline).trim().slice(0, maximumLength) : '';

function isValidEmail(value: string) {
  if (value.length > 254 || /[^\x21-\x7E]/.test(value)) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  if (!labels.every((label) => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label))) return false;
  return /^[A-Za-z]{2,}$/.test(labels[labels.length - 1]);
}

type BodyResult = { ok: true; text: string } | { ok: false };

// Enforces the size cap while streaming so an oversized body is never fully buffered.
async function readLimitedBody(request: Request): Promise<BodyResult> {
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return { ok: false };
  if (!request.body) return { ok: true, text: '' };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return { ok: false };
    }
    chunks.push(value);
  }
  return { ok: true, text: Buffer.concat(chunks).toString('utf8') };
}

function readSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = (process.env.SMTP_FROM ?? user)?.trim();
  const port = Number(process.env.SMTP_PORT ?? '587');
  if (!host || !user || !pass || !from || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  return { host, user, pass, from, port };
}

export async function POST(request: Request) {
  const limit = await checkRateLimit(request.headers);
  if (limit.status === 'unavailable') return reply(UNAVAILABLE_MESSAGE, 503);
  if (limit.status === 'limited') {
    return reply('Too many requests. Please wait a few minutes before trying again.', 429, {
      'Retry-After': String(limit.retryAfterSeconds),
    });
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return reply('Please submit a valid contact request.', 415);
  }

  const raw = await readLimitedBody(request).catch(() => null);
  if (!raw) return reply('Please submit a valid contact request.', 400);
  if (!raw.ok) return reply('Your message is too large. Please shorten it and try again.', 413, { Connection: 'close' });

  let payload: unknown;
  try {
    payload = JSON.parse(raw.text);
  } catch {
    return reply('Please submit a valid contact request.', 400);
  }
  const body = typeof payload === 'object' && payload !== null && !Array.isArray(payload) ? (payload as ContactPayload) : {};

  const name = readField(body.name, 120);
  const email = readField(body.email, 254);
  const phone = readField(body.phone, 40);
  const company = readField(body.company, 160);
  const service = readField(body.service, 120);
  const budget = readField(body.budget, 100);
  const timeline = readField(body.timeline, 100);
  const message = readField(body.message, 5000, true);
  const website = readField(body.website, 200);

  // Bots fill the hidden field; they get a fake success and nothing is sent.
  if (website) return reply('Your message has been sent.', 200);

  if (!name || !email || !message) return reply('Name, email and project description are required.', 400);
  if (!isValidEmail(email)) return reply('Please enter a valid email address.', 400);
  if (message.length < 10) return reply('Please tell us a little more about your project.', 400);

  const smtp = readSmtpConfig();
  const recipient = (process.env.CONTACT_EMAIL_TO ?? DEFAULT_CONTACT_EMAIL_TO).trim();
  if (!smtp || !isValidEmail(recipient)) {
    console.error('[contact] SMTP or recipient configuration is missing or invalid; enquiry was not sent.');
    return reply(UNAVAILABLE_MESSAGE, 503);
  }

  const details = [
    ['Phone', phone],
    ['Company', company],
    ['Service', service],
    ['Budget range', budget],
    ['Timeline', timeline],
  ].filter(([, value]) => value);
  const detailsText = details.map(([label, value]) => `${label}: ${value}`).join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 12_000,
    });

    await transporter.sendMail({
      from: smtp.from,
      to: recipient,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n${detailsText}\n\nProject description:\n${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${details.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value ?? '')}</p>`).join('')}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>
      `,
    });

    return reply('Your message has been sent.', 200);
  } catch (error) {
    const detail = error as { code?: string; responseCode?: number; command?: string };
    console.error('[contact] SMTP delivery failed.', { code: detail.code, responseCode: detail.responseCode, command: detail.command });
    return reply(UNAVAILABLE_MESSAGE, 503);
  }
}

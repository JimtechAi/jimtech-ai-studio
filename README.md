This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact Form Email Setup

The contact form posts to `app/api/contact/route.ts` and sends email using SMTP.

1. Copy `.env.example` to `.env.local`.
2. Set these variables in `.env.local`:
	- `CONTACT_EMAIL_TO` (destination inbox)
	- `SMTP_HOST`
	- `SMTP_PORT`
	- `SMTP_USER`
	- `SMTP_PASS`
	- `SMTP_FROM`
3. Restart the dev server after changing environment variables.

For Gmail, use an App Password for `SMTP_PASS`.

If any SMTP variable is missing or invalid, `/api/contact` returns HTTP 503 and sends nothing. There is no third-party fallback.

### Rate limiting (required in production)

The endpoint allows 5 requests per client IP per 10 minutes and returns HTTP 429 (with `Retry-After`) beyond that. Counters live in [Upstash Redis](https://upstash.com) (REST API, no extra npm package) so the limit is shared across serverless instances. Create a database and set:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

In production, if these are missing or the store is unreachable, the endpoint fails closed with HTTP 503 rather than disabling protection. In development (`next dev`) the limiter is skipped with a console warning.

Client IPs are read from `x-vercel-forwarded-for`, `x-real-ip` or the rightmost `x-forwarded-for` entry only when `VERCEL=1` (set automatically on Vercel) or `CONTACT_TRUST_PROXY=true` is present. Set `CONTACT_TRUST_PROXY=true` only behind a proxy that overwrites these headers. Otherwise all requests share one stricter bucket (20 per 10 minutes). In production the store URL must use `https`.

### Request limits

- Request bodies must be `application/json` (HTTP 415 otherwise) and at most 32 KB (HTTP 413 otherwise), enforced while streaming.
- The project description is limited to 5,000 characters.
- The recipient is always the server-side `CONTACT_EMAIL_TO`; client-supplied recipient fields are ignored.
- SMTP connection, greeting and socket timeouts are 8 s, 8 s and 12 s, and the route declares `maxDuration = 30`. Confirm this against your hosting plan's function limit; if the plan allows less, lower the timeouts in `route.ts`.

### Environment variables

| Variable | Production | Local development |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Required (503 if missing) | Required to send mail |
| `CONTACT_EMAIL_TO` | Set explicitly (falls back to the public contact address) | Optional |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Required (503 if missing or unreachable) | Optional (limiter skipped) |
| `CONTACT_TRUST_PROXY` | Not needed on Vercel | Not needed |

`VERCEL` and `NODE_ENV` are set automatically by the platform.

**Preview deployments:** Vercel previews run with `NODE_ENV=production`, so without the Upstash variables the form returns 503. If you give previews the SMTP variables they will send real email to `CONTACT_EMAIL_TO`. Either scope the SMTP variables to the Production environment only (previews then show the "temporarily unavailable" message), or use a separate test inbox and a separate Upstash database for Preview.

### Privacy

The form collects name, email, optional phone, company, service, budget and timeline, and the project description. The values are validated server-side and emailed once to `CONTACT_EMAIL_TO` through the configured SMTP account; they are not stored by the application. A hashed (SHA-256) client IP and a request counter are held in Upstash for 10 minutes for rate limiting. The enquiry email itself remains in the Gmail account that sends and receives it, so retention follows that mailbox's own settings. No privacy policy page exists yet. The business owner must supply the policy wording (retention period, legal basis and contact for data requests) before one is published.

### Security headers

`next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, a `frame-ancestors`/`base-uri`/`form-action`/`object-src` Content-Security-Policy, and (production only) `Strict-Transport-Security` without `includeSubDomains` or `preload`. A full `script-src` CSP is not set because Next.js emits inline scripts and would need per-request nonces; it is a documented follow-up.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# KasiAI Hub

Production Next.js application for KasiAI Hub, including website pages, AI-assisted workflows, and the new `/platform` modules.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Setup

Copy `.env.example` to `.env.local` and set real values:

```bash
cp .env.example .env.local
```

Key integrations:

- `NEXT_PUBLIC_COMMUNITY_WHATSAPP_URL`, `NEXT_PUBLIC_COMMUNITY_SLACK_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_YOUTUBE_URL`
- `PAYMENT_CHECKOUT_URL`
- `ADMIN_WEBHOOK_URL`, `ANALYTICS_WEBHOOK_URL`, `ERROR_WEBHOOK_URL`
- `GA_MEASUREMENT_ID`, `GA_API_SECRET` (optional server-side analytics)

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Smoke Tests

Run smoke tests against a local production server (auto-builds only if needed):

```bash
npm run smoke
```

Run smoke tests against production:

```bash
npm run smoke:prod
```

Optional flags:

- `--base=<url>`: test a specific deployment URL.
- `--skip-server`: do not start a local server.
- `--skip-build`: skip local build step.
- `--port=<port>`: custom local port (default `4010`).

## Deployment

Production deploy via Vercel:

```bash
npx vercel --prod --yes
```

## CI

GitHub Actions workflow runs on push and PR:

- `typecheck`
- `lint`
- `build`
- `smoke` (local route and API checks)

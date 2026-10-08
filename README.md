# Aurex Business Labs

A work-led studio website built with Next.js App Router, React, TypeScript and Motion. Real portfolio imagery, oversized Geist and Instrument Serif typography, responsive project galleries and a scroll-linked narrative carry the experience. The public website contains no packaged offer or pricing.

## Development

Use Node.js 22 or newer. Run `npm ci`, configure `.env.local` from `.env.example` without overwriting existing credentials, then `npm run dev`. Production delivery requires the server-only `GHL_WEBHOOK_URL`; missing or failed delivery returns an error. `LEAD_DEV_MODE=true` permits redacted local simulation only outside production.

## Source

- `src/content/work.ts`: four approved portfolio projects.
- `src/components/studio`: hero, portfolio interactions, sticky story and contact form.
- `src/components/authority`: shared navigation, footer and editorial sections.
- `src/content/articles.ts`: educational articles.
- `src/lib/site-config.ts`: verified company facts and integrations.
- `src/lib/lead-schema.ts` and `src/app/api/leads/route.ts`: validation and delivery. Legacy payload support remains for already-open forms.
- `src/lib/attribution.ts`: first/latest campaign attribution with expiry.
- `src/app/globals.css`: brand, responsive layouts and reduced-motion styles.

## Routes

The primary journey is `/`, `/work`, four `/work/[slug]` project pages, `/approach`, `/about`, `/insights` and `/contact`. Educational articles, the scorecard webinar, methodology and legal pages remain available. Search endpoints include sitemap, robots, RSS, llms.txt and social metadata. See `URL_MIGRATION_MAP.md` for retired URLs.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:api`, `npm run test:e2e`, `npm run test:a11y` and `npm run test:visual`. The supported `npm run build -- --webpack` is used when local Turbopack worker binding is unavailable.

Playwright starts an isolated production server with webhook and external provider settings cleared. Never run submission tests against a live webhook. Set `PLAYWRIGHT_BASE_URL` only for a similarly isolated test server. Tests intercept remote analytics. Screenshots stay in ignored `artifacts/`.

## Deployment

Use a Node-compatible Next.js host; the API requires a server. Rebuild with intended production environment values after isolated regression testing. Analytics remain disabled without IDs and conversion events require confirmed delivery. See `docs/DEPLOYMENT.md`, `docs/LAUNCH_CHECKLIST.md` and `CONTENT_TODO.md`.

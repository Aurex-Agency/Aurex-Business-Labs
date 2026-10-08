# Aurex Business Labs

Authority website for established residential contractors, built on Next.js 16 App Router, React, strict TypeScript, Tailwind and the existing Geist / Instrument Serif brand system. The current offer is the Aurex Revenue Capture System: $17,000 over 120 days.

## Run locally

Use Node.js 22 or newer and the committed npm lockfile.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Keep local credentials private. Existing `.env.local` files should be edited selectively, never overwritten. Set `LEAD_DEV_MODE=true` only for redacted development simulation with no webhook configured. Production never simulates success.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm run test:api
```

For browser regression, build with the approved GA4 test configuration, optional GTM/Ads/Meta IDs empty, and form/calendar/webinar embeds empty. Start an isolated production server with no webhook. See `docs/DEPLOYMENT.md` for exact commands. Never run submission tests against the live webhook. Browser tests intercept external requests. `npm run test:e2e`, `npm run test:a11y` and `npm run test:visual` accept `PLAYWRIGHT_BASE_URL`. Screenshots stay in ignored `artifacts/`.

## Content and configuration

- `src/lib/site-config.ts`: typed company configuration, canonical identity, integrations, payment schedule and capacity. Only populate verified business facts.
- `src/lib/proof.ts`: typed proof records. Both `verificationStatus: "verified"` and `permissionToPublish: true` are required to publish financial results and media. Defaults withhold the roofing number.
- `src/content/offer.ts`, `faq.ts`, `articles.ts`: reusable scope, FAQs and three complete cornerstone articles.
- `src/components/authority/`: shared server-rendered sections, navigation, forms and small interactive islands.
- `src/lib/lead-schema.ts` and `src/app/api/leads/route.ts`: validation and server-only CRM delivery. Legacy lead payloads remain supported for already open forms.
- `src/lib/attribution.ts`: first/latest campaign attribution, 90-day expiry and URL minimization.
- `src/app/globals.css`: shared palette and responsive authority-site styles.

Public URLs always canonicalize to `https://aurexbusinesslab.com`. `NEXT_PUBLIC_SITE_URL` supports origin validation for an explicitly configured deployment. Rebuild after changing public environment values. See `.env.example` for every configurable value.

## Routes

- `/`
- `/revenue-capture-system`
- `/results`
- `/results/roofing-revenue-system`
- `/results/methodology`
- `/insights`
- `/insights/how-contractors-track-marketing-from-lead-to-sold-job`
- `/insights/cost-per-lead-vs-cost-per-sold-job`
- `/insights/how-to-follow-up-on-unclosed-contractor-estimates`
- `/about`
- `/apply`
- `/contractor-revenue-scorecard`
- `/privacy`
- `/terms`
- `/results-disclaimer`
- `/robots.txt`, `/sitemap.xml`, `/rss.xml`, `/llms.txt`, `/manifest.webmanifest`
- `/indexnow-key.txt` (404 until configured), `/opengraph-image`, `/icon.svg`
- `POST /api/leads`
- Custom 404 for unknown pages

`/revenue-website` redirects with HTTP 301 to `/revenue-capture-system`; `/revenue-website/thank-you` redirects with HTTP 301 to `/apply`. Campaign queries survive. The old page source is preserved in `docs/archive/` and existing supporting source/assets are retained. No live standalone-build flag was present.

## Deployment and launch

Deploy to a Node-compatible Next.js host using `npm ci`, `npm run build`, `npm start`, or the host's Next.js integration. Do not use static export: webhook delivery requires a server. See `docs/DEPLOYMENT.md`, `docs/LAUNCH_CHECKLIST.md`, `CONTENT_TODO.md` and `URL_MIGRATION_MAP.md`. This implementation is ready for content completion; proof, legal review and live integration validation remain launch prerequisites.

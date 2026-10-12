# Aurex Business Labs

Aurex Business Labs is a customer acquisition and revenue systems company for established residential contractors. The public site is an educational field guide with original customer-journey graphics, practical tools, and downloadable resources. The Revenue Capture System provides the learning framework; the Revenue Leakage Audit remains a secondary path. Pricing, packages, payment terms, financial qualification questions, and monetary assurances are not public.

## Development

Use Node.js 22 or newer. Run `npm ci`, configure `.env.local` from `.env.example` without overwriting existing credentials, then `npm run dev`. Production delivery requires the server-only `GHL_WEBHOOK_URL`; missing or failed delivery returns an error. `LEAD_DEV_MODE=true` permits redacted local simulation only outside production.

## Source

- `src/content/work.ts`: four approved portfolio projects.
- `src/components/learn`: original motion graphics, resource cards, scorecard, checklist, and reading paths.
- `src/content/resources.ts`: shared resource and lesson content. `npm run resources:build` generates the CSV and text downloads, also run before production builds.
- `src/components/studio`: retained portfolio interactions and contact form.
- `src/components/authority`: shared navigation, footer and editorial sections.
- `src/content/articles.ts`: educational articles.
- `src/lib/site-config.ts`: verified company facts and integrations.
- `src/lib/lead-schema.ts` and `src/app/api/leads/route.ts`: validation and delivery. Legacy payload support remains for already-open forms.
- `src/components/funnel` and `src/lib/funnel.ts`: the `/call` ads funnel (video, multi-step application, routing and booked page). Setup is in `docs/ADS_FUNNEL.md`.
- `src/lib/attribution.ts`: first/latest campaign attribution with expiry.
- `src/app/globals.css`: the single design system, organized as tokens, base, motion, primitives, chrome, shared components, homepage, learning pages, forms, inner pages and print. The earlier layered stylesheet is archived in docs/archive/legacy-globals.css and unused website-offer styles in docs/archive/legacy-landing.css. Neither is shipped.
- Motion: an inline script sets `data-motion="on"` on the root before first paint only when the visitor allows motion. `src/components/landing/reveal-observer.tsx` marks `[data-reveal]`, `[data-stagger]` and `[data-play]` elements as they enter the viewport, and CSS plays the entrance. Interactive and scroll-linked motion uses motion/react with the shared LazyMotion provider. A fixed atmosphere layer (`ambient.tsx`) adds drifting glows, a blueprint grid, signal pulses, grain and the desktop cursor spotlight, and drives card tilt (`data-tilt`) and magnetic buttons. The homepage adds a WebGL light field that starts after the page is idle and a scroll-drawn journey line; inner pages can pass `scene` to `PageHero` for an animated illustration. Without scripts or with reduced motion, every page renders complete and still.

## Routes

The primary journey is `/`, `/start-here`, `/resources`, `/resources/[slug]`, `/insights`, and `/about`. The framework, results, audit, portfolio, contact, methodology, and legal routes remain available. `/contractor-revenue-scorecard` now points visitors to the evergreen free tool without promoting unconfirmed live sessions. Search endpoints include sitemap, robots, RSS, llms.txt and social metadata. `/call` and `/call/booked` are the paid ads funnel: no navigation, `noindex` and left out of the sitemap. See `URL_MIGRATION_MAP.md` for retired URLs.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:api`, `npm run test:e2e`, `npm run test:a11y` and `npm run test:visual`. The supported `npm run build -- --webpack` is used when local Turbopack worker binding is unavailable.

Playwright starts an isolated production server with webhook and external provider settings cleared. Never run submission tests against a live webhook. Set `PLAYWRIGHT_BASE_URL` only for a similarly isolated test server. Tests intercept remote analytics. Screenshots stay in ignored `artifacts/`. TypeScript excludes local duplicate filenames ending in ` 2.ts` or ` 2.tsx`; these pre-existing copies are not application sources and are not included in the PR.

Resource usage events record only the resource identifier. Scorecard values and checklist progress stay in page state and are never included in analytics or submitted to the lead endpoint. Downloads are ungated, and the resource pages include print styles.

## Deployment

Use a Node-compatible Next.js host; the API requires a server. Rebuild with intended production environment values after isolated regression testing. Analytics remain disabled without IDs and conversion events require confirmed delivery. See `docs/DEPLOYMENT.md`, `docs/LAUNCH_CHECKLIST.md` and `CONTENT_TODO.md`.

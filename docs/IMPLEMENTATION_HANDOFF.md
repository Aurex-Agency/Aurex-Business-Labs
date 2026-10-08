# Implementation handoff

## What was built

A complete contractor authority-site MVP using the existing Next.js stack and blue Aurex Business Labs brand. The root now explains the Revenue Capture System, supported by the full scope and pricing page, honest results pages, an attribution methodology, three substantive cornerstone articles, company page, qualified audit application, configurable weekly webinar, legal templates and search endpoints.

The engagement is $17,000 over 120 days, with $8,000 implementation and $3,000 on days 31, 61 and 91. The visible method is Capture, Convert, Recover, Compound. The 45-Day Core Launch and Tracking Assurance replaces the old website-offer guarantee. The numeric roofing claim is withheld by default and requires verification plus publication permission.

## Complete routes

| URL | Purpose |
| --- | --- |
| `/` | Authority homepage |
| `/revenue-capture-system` | Full offer, scope, responsibilities, assurance, pricing |
| `/results` | Evidence-focused results index |
| `/results/roofing-revenue-system` | Roofing case-study publication page with current limitations |
| `/results/methodology` | Result and attribution definitions |
| `/insights` | Educational index |
| `/insights/how-contractors-track-marketing-from-lead-to-sold-job` | Tracking cornerstone article |
| `/insights/cost-per-lead-vs-cost-per-sold-job` | Acquisition economics cornerstone article |
| `/insights/how-to-follow-up-on-unclosed-contractor-estimates` | Estimate follow-up cornerstone article |
| `/about` | Company facts and Revenue Integrity Standard |
| `/apply` | Native audit application or configured GHL fallback |
| `/contractor-revenue-scorecard` | Weekly webinar and configured registration |
| `/privacy` | Privacy template |
| `/terms` | Terms template |
| `/results-disclaimer` | Results disclaimer template |
| `/robots.txt` | Standard and AI crawler policy |
| `/sitemap.xml` | All 15 public content URLs |
| `/rss.xml` | Insights feed |
| `/llms.txt` | Supplementary company and content index |
| `/manifest.webmanifest` | Brand manifest |
| `/opengraph-image` | Generated social preview |
| `/icon.svg` | Existing brand favicon |
| `/indexnow-key.txt` | Public verification key when configured; otherwise 404 |
| `POST /api/leads` | Validated server-only CRM delivery |
| Any unknown path | Custom 404 |

## Redirects

- HTTP 301 `/revenue-website` to `/revenue-capture-system`.
- HTTP 301 `/revenue-website/thank-you` to `/apply`.
- Campaign queries are preserved. `/` now returns 200 without redirecting.
- Legacy page sources are archived and existing supporting assets retained.

## Verification

- `npm ci --ignore-scripts --no-audit --no-fund`: completed using the existing lockfile.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build -- --webpack`: passed, all public content pages prerendered.
- `npm run test:api`: passed; synthetic upstream delivery, normalization, both attribution snapshots, audit fields, consent, spam, rate limit, failures and proof permission combinations covered.
- Browser regression: 44 passed.
- WCAG-tagged axe checks: 16 passed across all public pages and mobile menu/form-error states.
- Responsive screenshot capture: homepage, offer, application and article at 375px, 768px and 1440px. Screenshots inspected and kept in ignored `artifacts/`.
- Mobile Lighthouse homepage baseline: performance 92, accessibility 100, best practices 96, SEO 100. Local simulated mobile run with analytics requests blocked; this is not a guarantee of production performance.

The environment blocked Turbopack's worker port, so the supported webpack builder was used. Google Fonts require build-time network access. Regression used a separate production server on port 3002 with `GHL_WEBHOOK_URL` empty. No test leads were sent to GHL. Live integration delivery and real registration require the configured provider accounts and a deliberate launch check.

## Environment configuration

Required for native production lead delivery: `GHL_WEBHOOK_URL`. Set `NEXT_PUBLIC_SITE_URL` to the public origin and keep `LEAD_DEV_MODE=false`.

Scheduling: `NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL` or `NEXT_PUBLIC_GHL_AUDIT_URL`. Optional replacement form: `NEXT_PUBLIC_GHL_FORM_EMBED_URL`.

Webinar: `NEXT_PUBLIC_ZOOM_REGISTRATION_URL`, optional `NEXT_PUBLIC_GHL_WEBINAR_FORM_URL`, and real `WEBINAR_START_ISO` / `WEBINAR_END_ISO` when publishing a specific occurrence.

Company facts: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `SITE_LEGAL_NAME`, `SITE_FOUNDER_NAME`, `SITE_FOUNDER_BIO`, `SITE_FOUNDER_PHOTO`, `SITE_FOUNDED_YEAR`, `SITE_ADDRESS`, `SITE_LINKEDIN_URL`, `SITE_YOUTUBE_URL`, `SITE_FACEBOOK_URL`.

Optional measurement and search: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `INDEXNOW_KEY`, `ALLOW_GPTBOT`.

See `.env.example`. Missing analytics IDs disable their integrations. Only the server receives the webhook secret. Public configuration changes require a rebuild.

## Content completion and launch risks

See `CONTENT_TODO.md` for the full checklist: founder and legal identity, biography/photo, contact details and profiles; exact roofing dates, baseline, implementation facts, supporting revenue records, releases, screenshots, quotes and videos; GHL field mapping and consent handling; calendar and webinar registration; search verification; legal review; actual article publication dates; and operational capacity confirmation.

Do not enable the roofing result until the evidence and written permission are complete. Legal pages are clearly labeled templates. Do not describe this site as legally compliant. Analytics consent management and CRM retention require business review. The built-in rate limiter is process-local; distributed hosting needs trusted proxy handling and shared edge protection. Calendar-open is not calendar-booked, and a submission is never a sale or $17,000 in revenue. Real custom embed origins may need precise CSP additions.

## Deployment

Deploy on a Node-compatible Next.js host. Set intended production environment variables, run `npm ci`, then `npm run build` (or the verified `npm run build -- --webpack`), then `npm start`. Do not deploy the isolated regression build. Do not use static export because the lead route requires a server. Follow `docs/DEPLOYMENT.md` for GHL mapping, search verification, sitemap submission, deliberate IndexNow submission and privacy/security considerations. Complete `docs/LAUNCH_CHECKLIST.md` before public launch.

## Changed-file inventory

- `.env.example`
- `AGENTS.md`
- `CONTENT_TODO.md`
- `README.md`
- `URL_MIGRATION_MAP.md`
- `docs/90_DAY_CONTENT_PLAN.md`
- `docs/AI_MONITORING_PROMPTS.md`
- `docs/AI_VISIBILITY_OPERATING_PLAN.md`
- `docs/COMPANY_FACTS_TEMPLATE.md`
- `docs/DEPLOYMENT.md`
- `docs/IMPLEMENTATION_HANDOFF.md`
- `docs/LAUNCH_CHECKLIST.md`
- `docs/PROOF_COLLECTION_SOP.md`
- `docs/archive/revenue-website-page.tsx.txt`
- `docs/archive/revenue-website-thank-you.tsx.txt`
- `next.config.ts`
- `package.json`
- `playwright.config.ts`
- `scripts/indexnow.mjs`
- `scripts/test-lead-endpoint.mjs`
- `scripts/test-proof.mjs`
- `scripts/visual-review.mjs`
- `src/app/about/page.tsx`
- `src/app/api/leads/route.ts`
- `src/app/apply/page.tsx`
- `src/app/contractor-revenue-scorecard/page.tsx`
- `src/app/globals.css`
- `src/app/indexnow-key.txt/route.ts`
- `src/app/insights/[slug]/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/layout.tsx`
- `src/app/llms.txt/route.ts`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/results-disclaimer/page.tsx`
- `src/app/results/methodology/page.tsx`
- `src/app/results/page.tsx`
- `src/app/results/roofing-revenue-system/page.tsx`
- `src/app/revenue-capture-system/page.tsx`
- `src/app/revenue-website/page.tsx`
- `src/app/revenue-website/thank-you/page.tsx`
- `src/app/robots.ts`
- `src/app/rss.xml/route.ts`
- `src/app/sitemap.ts`
- `src/app/terms/page.tsx`
- `src/components/authority/application-form.tsx`
- `src/components/authority/interactions.tsx`
- `src/components/authority/shared.tsx`
- `src/components/landing/analytics-scripts.tsx`
- `src/content/articles.ts`
- `src/content/faq.ts`
- `src/content/navigation.ts`
- `src/content/offer.ts`
- `src/lib/analytics.ts`
- `src/lib/lead-schema.ts`
- `src/lib/proof.ts`
- `src/lib/seo.ts`
- `src/lib/site-config.ts`
- `tests/accessibility.spec.ts`
- `tests/analytics-helpers.ts`
- `tests/analytics.spec.ts`
- `tests/attribution.spec.ts`
- `tests/form-helpers.ts`
- `tests/landing.spec.ts`

The unrelated untracked Google Ads plan was not changed or included.

The default Playwright runner also builds an isolated production server with empty webhook and provider settings. It does not reuse an existing server, preventing accidental regression traffic from reaching a production-connected local setup.

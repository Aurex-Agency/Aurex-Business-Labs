<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes . APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` . verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aurex Business Labs project rules

## Brand and content

- The public brand name is Aurex Business Labs. Never use Aurex Agency in visible content.
- Be clear, direct, practical, locally grounded, and business-focused.
- Do not use em dash characters in copy, code comments, metadata, or documentation.
- Never fabricate testimonials, ratings, customer counts, performance metrics, awards, or scarcity.
- The flagship is the Aurex Revenue Capture System: $17,000 over 120 days, with $8,000 implementation and $3,000 on days 31, 61 and 91. Advertising and specified third-party costs are separate. Continued Growth Operations begin at $3,000 monthly.
- The 45-Day Core Launch and Tracking Assurance starts after the written Ready Date and prerequisites. An Aurex-controlled miss credits the first $3,000 management payment and pauses management billing until the agreed core system is live. Never guarantee revenue or ROI.
- Financial proof and client media require both verified status and publication permission in src/lib/proof.ts.
- Approved portfolio examples: Norton Equipment Co, Triple R Trailers, Wood Eye Clinic, and NetTech.

## Design and behavior

- Shared palette and responsive styles are in src/app/globals.css. Midnight #070C13, cool white #F0F6FA, Aurex cyan-blue #19BCE5, and pale blue #8BDFF6 are the primary tokens.
- Geist is the body font. Instrument Serif is for selected editorial emphasis.
- Preserve the official blue symbol with the Business Labs wordmark. The original Agency lockup is a source asset, not the public wordmark.
- The authority site uses restrained editorial layouts and a visible customer journey. If adding motion, use motion/react with the shared LazyMotion provider. Retain complete static content.
- Respect reduced motion and keep the full message available without animation. Mobile uses stacked system content.
- Maintain WCAG 2.2 AA expectations, keyboard navigation, focus visibility, error associations, and at least 44px practical touch targets.

## Source organization

- src/content/offer.ts, faq.ts and articles.ts contain reusable authority-site content. src/lib/site-config.ts owns company configuration. src/lib/proof.ts owns evidence and permission gates.
- Legacy website-offer source is archived in docs/archive; its supporting copy and assets are retained.
- src/components/authority contains shared authority chrome, sections and application interactions. src/components/landing retains shared attribution, analytics and motion utilities.
- src/lib/lead-schema.ts owns client/server validation. src/app/api/leads/route.ts owns delivery.
- The root route is the authority homepage. /revenue-website redirects with HTTP 301 to /revenue-capture-system; its old thank-you URL redirects with HTTP 301 to /apply. New applications confirm inline only after delivery.
- Read relevant Next.js documentation from node_modules/next/dist/docs before changing framework behavior.

## Configuration and verification

- Keep GHL_WEBHOOK_URL server-only. Never commit actual secrets or log production personal information.
- Missing or failed production webhook delivery must return an error, never simulated success.
- LEAD_DEV_MODE=true allows redacted local simulation only outside production.
- Analytics must remain disabled without IDs. Conversions require confirmed submission, not a page view.
- Run npm run lint, npm run typecheck, npm run build, npm run test:e2e, npm run test:a11y, and npm run test:api.
- Set PLAYWRIGHT_BASE_URL to test an existing production server. Browser tests use the approved GA4 ID explicitly, with GTM/Ads/Meta IDs and GHL/Zoom embed URLs unset. Analytics has no default enabled IDs. Google requests are intercepted so tests cannot send analytics traffic. The calendar and embed script are stubbed during regression tests. With the live webhook in .env.local, use a separate test server started with GHL_WEBHOOK_URL= on port 3002 to prevent test leads from reaching GHL.
- Capture and inspect requested viewport screenshots in artifacts/. Do not publish test artifacts.
- agentRules is disabled in next.config.ts so framework-generated prose does not reintroduce prohibited punctuation. Maintain this document manually.

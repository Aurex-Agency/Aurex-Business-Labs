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
- The approved offer starts at $3,500. The launch commitment has explicit prerequisites and a $1,000 payback if the agreed scope is not ready for launch within 21 business days for reasons within Aurex control, after the stated prerequisites.
- Approved portfolio examples: Norton Equipment Co, Triple R Trailers, Wood Eye Clinic, and NetTech.

## Design and behavior

- Shared palette and responsive styles are in src/app/globals.css. Midnight #070C13, cool white #F0F6FA, Aurex cyan-blue #19BCE5, and pale blue #8BDFF6 are the primary tokens.
- Geist is the body font. Instrument Serif is for selected editorial emphasis.
- Preserve the official blue symbol with the Business Labs wordmark. The original Agency lockup is a source asset, not the public wordmark.
- Use Motion from motion/react with the shared LazyMotion provider. The hero journey and desktop sticky story are the two main motion experiences.
- Respect reduced motion and keep the full message available without animation. Mobile uses a stacked system story.
- Maintain WCAG 2.2 AA expectations, keyboard navigation, focus visibility, error associations, and at least 44px practical touch targets.

## Source organization

- src/content/revenue-website.ts contains reusable copy. src/app/revenue-website/page.tsx composes static sections and portfolio entries.
- src/components/landing contains interactive components and shared chrome.
- src/lib/lead-schema.ts owns client/server validation. src/app/api/leads/route.ts owns delivery.
- Routes: / redirects temporarily to /revenue-website; /revenue-website/thank-you is noindex; /privacy is the privacy page.
- Read relevant Next.js documentation from node_modules/next/dist/docs before changing framework behavior.

## Configuration and verification

- Keep GHL_WEBHOOK_URL server-only. Never commit actual secrets or log production personal information.
- Missing or failed production webhook delivery must return an error, never simulated success.
- LEAD_DEV_MODE=true allows redacted local simulation only outside production.
- Analytics must remain disabled without IDs. Conversions require confirmed submission, not a page view.
- Run npm run lint, npm run typecheck, npm run build, npm run test:e2e, npm run test:a11y, and npm run test:api.
- Set PLAYWRIGHT_BASE_URL to test an existing production server. Browser tests assume the approved default GA4 ID and default GHL calendar are used, with optional GTM/Ads IDs unset. Google requests are intercepted so tests cannot send analytics traffic. The calendar and embed script are stubbed during regression tests. With the live webhook in .env.local, use a separate test server started with GHL_WEBHOOK_URL= on port 3002 to prevent test leads from reaching GHL.
- Capture and inspect requested viewport screenshots in artifacts/. Do not publish test artifacts.
- agentRules is disabled in next.config.ts so framework-generated prose does not reintroduce prohibited punctuation. Maintain this document manually.

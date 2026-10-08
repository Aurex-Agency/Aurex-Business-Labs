# Studio redesign handoff

The site now leads with real project work and a distinct visual identity. The homepage has oversized typography, a layered Norton project hero, an offset portfolio, a sticky three-part approach narrative, editorial links and a large contact invitation. Work detail pages, approach, about and contact share the same system.

Motion uses the shared LazyMotion provider: scroll-linked hero and project transforms, spring-based pointer movement, a rotating story mark and reading progress. Native scrolling, static content and reduced-motion support are preserved. Mobile stacks the narrative and uses a keyboard-accessible native menu dialog.

The packaged offer, pricing, assurance, capacity claims and sales application have been removed from the public experience, metadata and feeds. Six legacy routes redirect directly to approach, work or contact. The simple contact form validates on both client and server, preserves input after failures and confirms only after successful delivery. It does not enroll contacts in SMS marketing. Existing legacy payload validation remains for already-open forms.

## Configuration

Production contact delivery needs `GHL_WEBHOOK_URL`. Optional analytics require explicit IDs. Keep credentials server-only and rebuild after public configuration changes. Use verified contact/company facts only. See `.env.example`, `CONTENT_TODO.md` and deployment instructions. The educational webinar remains separately configurable.

## Verification

Run lint, typecheck, production build, API regression, browser regression, axe checks and responsive screenshot review. Automated browser tests intercept external requests and use a separate production server with an empty webhook. Screenshots remain in ignored `artifacts/` and are not published.

The older marketing strategy documents retain historical planning context. The current source, README and migration map govern the public experience; do not reintroduce the retired offer from earlier plans.

## Verified results, October 8, 2026

- Lint, typecheck, webpack production build and API regression passed.
- 48 browser tests passed, including contact failure recovery, attribution, offer removal, route migration, responsive overflow and normal/reduced scroll motion.
- 19 axe checks passed across public routes and mobile menu/form error states.
- Home, work, contact and article screenshots captured at 375, 768 and 1440 pixels. Visual review corrected hero/copy overlap and light-background accent contrast.
- Local simulated mobile Lighthouse: performance 90, accessibility 100, best practices 100, SEO 100. Cumulative layout shift was 0. This is a local measurement with analytics blocked, not a production guarantee.

No live test leads were sent. Deployment still requires the intended production configuration and a deliberate delivery check. The unrelated Google Ads plan remains outside this change.

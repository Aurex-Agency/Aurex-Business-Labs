# Verification report

Verified September 21, 2026 against a local optimized production build.

## Build and code checks

- npm run lint: passed without warnings.
- npm run typecheck: passed with strict TypeScript.
- npm run build: passed. Marketing and supporting pages are prerendered; lead delivery is a server endpoint.
- npm run test:api: passed. Covers upstream acceptance, normalization, attribution, timeout and delivery errors, and rejecting development simulation in production.
- npm audit during installation: zero known vulnerabilities.
- Authored content scan: no em dash characters found. No real credentials committed.

## Browser and accessibility coverage

- 43 Playwright interaction, attribution, analytics, and responsive tests: passed.
- 4 Axe test cases passed, covering the landing page, form error state, mobile menu, thank-you page, and privacy page.
- Keyboard navigation, Escape focus return, FAQ disclosures, form errors, step advancement and back navigation, accepted submission, failed submission and retry, campaign attribution, and server-side rejection behavior.
- The supplied VSL replaces the previous hero demo. Playback, seeking, captions, no autoplay, and no initial video download are verified. All four desktop scroll-story states remain covered.
- No horizontal overflow at 360, 390, 430, 768, 1024, 1280, 1440, and 1920 pixels.
- No browser runtime errors in the screenshot pass.

## Lighthouse mobile (initial implementation)

| Category       | Score |
| -------------- | ----- |
| Performance    | 93    |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 100   |

The mobile production audit reported 3.0 seconds LCP, 140 milliseconds total blocking time, and 0 cumulative layout shift. These are local lab measurements with Lighthouse mobile throttling; real hosting, analytics, network, and device conditions will affect field results. The audit was run without competing browser tests. Full reports are artifacts/lighthouse-mobile.report.html and artifacts/lighthouse-mobile.report.json.

Performance work included self-hosted fonts, one required serif style, optimized local WebP portfolio screenshots, lazy image loading, LazyMotion features, and loading Zod validation when the visitor interacts with the form instead of on first arrival.

## Screenshot review

Full-page captures:

- artifacts/review-1440x1200.png
- artifacts/review-1024x900.png
- artifacts/review-768x1024.png
- artifacts/review-390x844.png
- artifacts/review-360x800.png
- artifacts/review-430x932.png
- artifacts/review-1280x900.png
- artifacts/review-1920x1200.png

First-viewport images use artifacts/viewport-WIDTHxHEIGHT.png. Detail captures include artifacts/hero-1440.png, artifacts/hero-390.png, artifacts/selected-work-1440.png, artifacts/selected-work-390.png, artifacts/review-1440.png, and artifacts/review-390.png.

Inspected the actual rendered first viewport, editorial hierarchy, portfolio imagery, long-page rhythm, tablet composition, mobile form, navigation, and footer. Screenshots wait for fonts and portfolio image decoding. Fixed reduced-motion hydration mismatch, small text sizing, portfolio label contrast, and accessible link naming during review.

## Launch configuration still required

- The supplied GHL_WEBHOOK_URL is configured in ignored .env.local. A requested mapping sample was accepted by the live webhook. Finish field mapping and receiving workflow setup in GHL, and set the same server-only variable in the eventual production host.
- Supply booking URL, public contact phone/email, and advertising IDs if those features should be enabled.
- Configure Vercel and the production domain, then verify a real submission and conversion event.
- No additional portfolio imagery is required. All four approved examples and the official brand symbol are included.
- Production deployment and domain configuration remain separate from this repository handoff.

## Blue palette and revised offer

The $3,500 starting price, two $1,750 payments, $1,000 payback callouts, and blue palette passed the production build, strict type checking, lint, all 24 browser tests, all three accessibility cases, and the API checks. Fresh screenshots were captured across all eight viewport sizes with no horizontal overflow or browser errors. Desktop and mobile hero screenshots were inspected after the palette and guarantee changes.

The payback retains the existing 21-business-day conditions and covers completing the agreed scope for reasons within Aurex control. The user has now supplied a VSL through Drive. It is integrated as the default hero media with a local MP4, poster, and timed captions. A recording script and setup instructions are in docs/vsl-recording-brief.md.

## Supplied VSL and live mapping sample

- The Drive source matches the reviewed local recording byte for byte (SHA-256 verified).
- Optimized the 122,502,892-byte HDR HEVC MOV into a 720p SDR H.264/AAC MP4 with fast-start metadata and normalized audio. The original remains unchanged in ignored artifacts.
- Added a real frame as the WebP poster and 36 timed English caption cues. The supplied recording already has burned-in captions; selectable captions are available without being forced on top of them.
- The original spoken "21 days" remains. The written commitment beside the player and on the page specifies 21 business days and links to the prerequisites.
- Fixed a real preview submission failure: NextURL normalizes 127.0.0.1 to localhost, so the origin check now uses the request Host and protocol. Regression checks cover accepted same-origin requests and rejected foreign origins or different ports.
- One sample was accepted by the live GHL webhook through the production form endpoint. Receipt: ccc24bcd-9d7c-4fe7-8c4b-d93f13dc3267. The earlier 403 attempt was rejected locally before forwarding. Sample business: Aurex Webhook Mapping Test (Not a Real Lead). Email: aurex-ghl-mapping-test@example.com.
- HTTP acceptance is verified; GHL contact creation and downstream workflow actions remain dependent on user field mapping. See docs/ghl-field-mapping.md.
- The webhook URL is stored only in ignored .env.local; browser assets contain neither the URL nor GHL_WEBHOOK_URL. Regression browser tests run on a separate server with webhook delivery disabled.

## Video CTA and appointment booking

- Added a full-width Aurex-blue Book My Free Website Review button directly below the video, linked to the lead form.
- Confirmed form acceptance navigates to the thank-you page and automatically opens the GHL booking dialog. Rejected submissions retain their answers and do not open the calendar.
- The popup supports closing, reopening, Escape, focus restoration, and a direct booking link. The iframe and supplied resize script load only when opened.
- Production build, lint, strict type checking, API checks, 24 browser tests, and 4 accessibility tests passed. Calendar regression fixtures test our integration without creating appointments or sending extra live leads. Accessibility checks cover the popup shell; the third-party calendar is controlled by GHL.
- Loaded the actual GHL widget in a separate read-only browser check. It displays the 30-minute Website Revenue Review, date/time availability, and timezone. No appointment was booked.
- Updated CTA and booking screenshots are in artifacts/video-cta-WIDTH.png and artifacts/booking-calendar-WIDTH.png.

## GA4 integration

The supplied GA4 property G-N6CM45VW84 is enabled through the shared Google tag loader. The existing CTA, form, calendar, portfolio, and FAQ events are routed to that property without form answers or contact details. Confirmed lead events retain the single-use receipt guard, so direct visits and refreshed thank-you pages do not count again.

Lint, strict type checking, production build, API verification, 26 browser tests, and 4 accessibility cases passed. All Google requests are intercepted in regression tests. New checks verify one loader/configuration, one CTA event, and one confirmed lead event with no conversion on an unconfirmed or refreshed thank-you page. A separate live deployment check verifies tag delivery without submitting another lead.

GA4 can be disabled with an explicitly empty NEXT_PUBLIC_GA4_ID or overridden with another valid measurement ID. Optional Google Ads shares the gtag.js loader. Avoid duplicating the same destinations/events through GTM. GA4 admin settings, enhanced measurement settings, and key-event designation were not changed.

Implementation reference: https://developers.google.com/tag-platform/gtagjs/routing

## Attribution hardening

Verified against the optimized production build with the webhook disabled on port 3002. Lint, strict type checking, API tests, 43 Playwright browser tests, 4 accessibility tests, and the production build all pass. Duplicate generated Next type files were cleared by the production rebuild before the final successful type check.

The new browser suite covers all five UTM fields and case-preserving GCLID, WBRAID, GBRAID, MSCLKID, and FBCLID; query-preserving root redirects; same-tab navigation and query removal; new-tab restoration after closing the original tab; first-touch preservation and latest-touch replacement; stale-tab reconciliation on submission; exact 90-day and independent touch expiration; legacy migration; malformed and blocked storage; absence of form PII in both stores; submitted payload contents; and no duplicate lead conversion on thank-you refresh after a real form flow with a mocked acceptance response.

API tests verify both snapshots and compatibility aliases arrive at the mocked GHL endpoint without case changes, stale aliases cannot revive expired snapshots, malformed timestamps and oversized identifiers are rejected, unknown PII fields and URL query/fragment data are stripped, and UTF-8 request size limits hold. Existing delivery, timeout, origin, and fail-closed checks remain passing. No live leads or analytics events were sent during automated verification.

## Google Ads and simplified review form

The form now submits directly from a single screen with four required contact fields. Phone, website, and message are optional, and the former qualification step has been removed. API checks confirm minimal submissions succeed, optional values remain validated when supplied, and older complete payloads still work. Browser tests cover minimal submission, optional-field validation, delivery retry, and automatic booking after acceptance.

The shared Google tag configures GA4 plus AW-18192936048 once each. Browser tests verify the exact Google Ads conversion destination `AW-18192936048/zv3HCJH3sYAdEPDYiOND`, the receipt transaction ID, one conversion per accepted submission, and no conversion on direct thank-you visits, refreshes, expired receipts, or development simulations. Google requests and lead delivery remain mocked during automated verification.

Lint, TypeScript, API verification, production build, 46 browser tests, and 4 accessibility cases pass. Desktop and mobile form screenshots were inspected at 1440px and 390px; they are saved as ignored artifacts/simple-form-1440.png and artifacts/simple-form-390.png.

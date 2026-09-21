# Aurex Business Labs

A custom Google Search campaign landing page for the Aurex Revenue Website System. Built with the stable Next.js App Router, React, strict TypeScript, Tailwind CSS, Motion, React Hook Form, Zod, and Lucide. No page builder or component template.

## Run locally

Requires Node.js 20.9 or newer. Node.js 24 was used for verification.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000/revenue-website. The root redirects there with a temporary redirect. For a production preview, run `npm run build` and then `npm run start`.

## Configure live lead delivery

Set `GHL_WEBHOOK_URL` to a GoHighLevel inbound webhook using HTTPS. The endpoint is server-only. Configure the receiving workflow to map the validated JSON fields into your contact and opportunity fields, then handle the consent-aware response workflow in GoHighLevel. This repository implements the delivery integration; it does not configure a GoHighLevel account or send SMS itself.

The payload includes firstName, lastName, businessName, website, email, phone, city, service, customerValue, source, timeline, budget, challenge, sourcePage, submittedAt, receipt, and attribution. The attribution object contains separate firstTouch and latestTouch snapshots with the five UTM fields, gclid, wbraid, gbraid, msclkid, fbclid, landingPage, referrer, storedAt, and expiresAt when available. Session storage covers the active visit; first-party localStorage retains each touch for 90 days without extending first-touch on return visits. Existing flat attribution fields remain latest-touch aliases. Click identifiers retain exact capitalization, and form PII never enters attribution storage. See [GHL field mapping](docs/ghl-field-mapping.md) for the complete contract. Contacts are normalized before forwarding. The receiver should return a successful HTTP status only when it accepts the lead.

The form is one screen. First name, last name, business name, and email are required. Phone, website, and a short message are optional. City, service, customer value, acquisition source, timeline, and budget have been removed from the visible form; the API still accepts them optionally from older open forms. A successful submission opens appointment booking immediately.

Production returns 503 when no webhook is configured, or 502 when delivery fails. The UI preserves form answers for retry. Webhook requests have a 10-second timeout and do not follow redirects. The client waits up to 15 seconds. Honeypot, timestamp, same-origin, content-type, size, and schema checks provide basic abuse protection. A host-level rate limit can be added if spam warrants it; the form is intentionally free of custom infrastructure.

For local development only, set `LEAD_DEV_MODE=true` with no webhook. Submissions are simulated, logs are redacted, and the thank-you page labels the simulation. This flag cannot enable simulated success in production. The supplied webhook is configured in ignored `.env.local`. An explicitly requested mapping sample is sent separately from automated verification; regression tests never use the live webhook.

## Environment variables

| Variable                                  | Purpose                                                               |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `GHL_WEBHOOK_URL`                         | Required for real lead delivery. Secret, server-only HTTPS endpoint.  |
| `NEXT_PUBLIC_SITE_URL`                    | Site origin. Defaults to https://aurexbusinesslab.com.                |
| `NEXT_PUBLIC_BOOKING_URL`                 | Optional override for the supplied GHL booking calendar.              |
| `NEXT_PUBLIC_CONTACT_PHONE`               | Optional real phone number displayed in the footer.                   |
| `NEXT_PUBLIC_CONTACT_EMAIL`               | Optional real email displayed in the footer and privacy policy.       |
| `NEXT_PUBLIC_GA4_ID`                      | Defaults to approved property G-N6CM45VW84. Set empty to disable GA4. |
| `NEXT_PUBLIC_GTM_ID`                      | Optional GTM container ID, in GTM- format.                            |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`    | Defaults to approved AW-18192936048. Set empty to disable Ads.        |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Defaults to zv3HCJH3sYAdEPDYiOND for the approved Ads ID.             |
| `LEAD_DEV_MODE`                           | Explicit redacted development simulation, disabled by default.        |

Public environment variables are embedded at build time. Rebuild after changing them. Never put a secret in a NEXT_PUBLIC variable. Real .env files are ignored.

## Analytics

GA4 is enabled for the supplied public measurement ID G-N6CM45VW84. NEXT_PUBLIC_GA4_ID can override it; an explicitly empty value disables direct GA4 tracking. Google tag initialization and the gtag.js loader are shared with the Google Ads integration to avoid loading the library twice. GA4 receives the existing site events through gtag, with an explicit send_to destination. GTM data-layer events remain available when a GTM container is configured. Events cover hero, secondary and pricing CTAs, phone, form start, submission attempt/success/error, calendar, selected work, and FAQ opens. No form answers or personal information enter analytics events.

The supplied Google Ads destination is `AW-18192936048/zv3HCJH3sYAdEPDYiOND`. Every page configures the Ads account alongside GA4 through one shared Google tag loader. Only confirmed submissions send `conversion` to that destination, with the server receipt as `transaction_id`; buttons and ordinary page views do not count as lead conversions. The approved ID and label are defaults, with public environment overrides. An empty ID disables Ads; a different account ID requires its own label.

A successful server response creates a temporary receipt in session storage. The thank-you page consumes the receipt once, within 30 minutes, before emitting lead_submit_success and the Google Ads conversion. Opening or refreshing the thank-you page alone does not produce a conversion. Development simulation does not produce a conversion. If browser storage is blocked, delivery still works but conversion tracking can be unavailable. If GTM is configured alongside direct GA4 or Ads tracking, do not configure it to send the same events to the same destination again. To let GTM own GA4, explicitly set NEXT_PUBLIC_GA4_ID empty. GA4 key-event settings are managed in the Analytics property; the code does not change those admin settings.

## Routes and source files

- `src/app/revenue-website/page.tsx`: campaign page and static sections.
- `src/content/revenue-website.ts`: reusable content and offers.
- `src/app/globals.css`: design tokens, bespoke layouts, responsive behavior.
- `src/components/landing/`: navigation, interactive lead engine, scroll story, FAQ, form, and shared components.
- `src/lib/lead-schema.ts` and `src/app/api/leads/route.ts`: validation and webhook delivery.
- `src/lib/analytics.ts` and `src/lib/attribution.ts`: analytics and 90-day first-touch/latest-touch campaign attribution.
- `src/app/revenue-website/thank-you/page.tsx`: noindex confirmation and GHL booking popup.
- `src/app/privacy/page.tsx`: basic privacy disclosure. It is not represented as attorney-reviewed.
- `src/app/opengraph-image.tsx`: locally generated social card. The sitemap excludes the thank-you route.

The campaign canonical is https://aurexbusinesslab.com/revenue-website. Organization and Service schema contain no invented address, reviews, ratings, or results.

## Brand assets and portfolio

The official symbol and original logo were supplied through Google Drive. The original lockup says Agency, so the visible website uses the official symbol paired with Aurex Business Labs in type. No official replacement Business Labs lockup is required for this design, but one can replace the wordmark later.

All four portfolio previews are real screenshots captured from the user-provided websites on September 21, 2026. They are saved locally as optimized WebP files in public/projects. They are not hotlinked or simulated. The original screenshots and capture text are in ignored artifacts/. Browser chrome and screenshot crops are presentation treatments. Client claims inside screenshots belong to the captured sites and are not Aurex performance claims.

- norton.webp: https://nortonequipmentco.com
- triple-r.webp: https://triplertrailers.com
- wood-eye.webp: https://woodeyeclinic.com
- nettech.webp: https://nettech.ms

`node scripts/capture-projects.mjs` refreshes the previews. Review fresh captures for loading states and overlays before keeping them.

## Verification

```sh
npx playwright install chromium
npm run lint
npm run typecheck
npm run build
npm run test:api
npm run test:e2e
npm run test:a11y
```

The browser suite requires a server without a live webhook and with the approved default GA4 ID. Google requests are intercepted in tests, so no automated test visits or fabricated conversions reach Analytics. The supplied booking URL is the default; browser regression tests stub the calendar and embed script. When `.env.local` has a live webhook, start the test server with `GHL_WEBHOOK_URL= npm run start -- --hostname 127.0.0.1 --port 3002` and run tests with `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002`. The explicit empty environment variable overrides `.env.local`. It mocks browser submissions, validates server rejection behavior, checks keyboard interactions, and measures overflow at 360, 390, 430, 768, 1024, 1280, 1440, and 1920 pixels. Axe checks the landing page, form error state, mobile navigation, thank-you page, and privacy page. API verification mocks upstream fetch and checks successful forwarding, normalized values, attribution, failure, timeout, and production simulation rejection.

To test a separate local production server with live lead delivery disabled:

```sh
GHL_WEBHOOK_URL= npm run start -- --hostname 127.0.0.1 --port 3002
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm run test:e2e
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm run test:a11y
```

Visual review defaults to port 3001 and saves full-page captures to artifacts/review-WIDTHxHEIGHT.png, plus hero, portfolio, and form views. These are deliberately excluded from the shipped website. Reports are in docs/verification.md and artifacts/.

## Vercel

Import this repository as a Next.js project, configure the environment variables, and deploy with the standard `npm run build` command. No custom infrastructure is needed. Connect aurexbusinesslab.com in the hosting dashboard. Before launching ads, set the supplied webhook as the host's server-only GHL_WEBHOOK_URL, finish GHL field mapping, test the receiving workflow with your team, and verify the intended booking and conversion settings. The code is prepared for Vercel; no production deployment or live CRM configuration was performed as part of the local build.

## Updated offer and optional VSL

Projects start at $3,500, with two payments of $1,750. The $1,000 payback commitment appears beside the hero CTA, in the pricing panel, near the review form, in the process section, and in the FAQ. It applies when the agreed scope is not ready for launch within 21 business days for reasons within Aurex control, after the previously specified prerequisites. This is a payback, not a future project credit.

The interface uses the cyan and deeper blue family from the official Aurex symbol. The previous gold palette has been removed, including the social preview and favicon.

The supplied VSL is bundled in `public/videos` and appears beside the hero headline by default. It is an optimized 720p H.264/AAC MP4 with SDR color, normalized audio, fast-start metadata, and a still-image poster. The original recording remains in ignored review artifacts. The player uses native controls, inline mobile playback, no autoplay, and no video preload. Its burned-in captions remain intact; an optional English WebVTT track can also be enabled with the player controls.

NEXT_PUBLIC_VSL_URL, NEXT_PUBLIC_VSL_CAPTIONS_URL, and NEXT_PUBLIC_VSL_POSTER_URL can override the bundled assets. Replace the MP4 and captions together when updating the recording. The supplied recording says "21 days"; the adjacent written commitment and page terms specify 21 business days with prerequisites. See docs/vsl-recording-brief.md for the recommended wording update.

See docs/ghl-field-mapping.md for the exact form payload and mapping keys. The webhook URL stays out of source code and browser bundles.

## Booking after submission

The full-width button immediately beneath the VSL takes visitors to the review form. After confirmed webhook acceptance, the form navigates to `/revenue-website/thank-you#book`, which opens the supplied GHL calendar in a native modal dialog. The popup has a persistent close control, Escape support, focus restoration, a responsive scrollable container, and a direct-calendar fallback link. The confirmation page can reopen it with Choose My Review Time.

The iframe uses the supplied booking URL and form_embed.js resize script. Both load only when the calendar opens, keeping them off the initial landing-page load. A rejected form submission never opens the calendar. Booking remains a separate action that the visitor completes inside GHL; a successful review request does not mean an appointment has been booked. No form answers are added to calendar URLs.

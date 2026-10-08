# Deployment and search setup

## Build and host

Use a Node-compatible Next.js host with Node.js 22+. Install with `npm ci`, build with `npm run build`, and serve with `npm start`. Configure the production domain as `aurexbusinesslab.com`; redirect alternate hostnames at the host level. Canonicals always use that domain. Public environment settings are captured at build time. Google Fonts must be reachable during build; Next.js self-hosts the fetched fonts at runtime.

Set `GHL_WEBHOOK_URL` only on the server. Missing or unsuccessful delivery returns an error. Set `LEAD_DEV_MODE=false` in production. Native form success requires a successful upstream HTTP response; confirm separately that the receiving GHL workflow actually creates the expected contact and opportunity.

## Safe production regression

Do not use the live webhook during tests. Keep existing `.env.local` secrets unchanged. Build with explicit test overrides:

```sh
GHL_WEBHOOK_URL= NEXT_PUBLIC_GA4_ID=G-N6CM45VW84 NEXT_PUBLIC_GTM_ID= NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID= NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL= NEXT_PUBLIC_META_PIXEL_ID= NEXT_PUBLIC_GHL_FORM_EMBED_URL= NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL= NEXT_PUBLIC_GHL_AUDIT_URL= NEXT_PUBLIC_ZOOM_REGISTRATION_URL= NEXT_PUBLIC_GHL_WEBINAR_FORM_URL= npm run build -- --webpack
GHL_WEBHOOK_URL= LEAD_DEV_MODE=false npm start -- --hostname 127.0.0.1 --port 3002
```

The verified build used the supported webpack builder because this execution environment blocked the local worker port used by Turbopack. The normal `npm run build` command remains available on hosts that permit it.

In a second terminal:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm run test:e2e
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm run test:a11y
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm run test:visual
npm run test:api
```

Without PLAYWRIGHT_BASE_URL, Playwright builds and starts its own isolated production server on port 3002 with explicit empty webhook and provider settings; it never reuses an existing server. The production regression above remains the deployment check.

The browser suite intercepts external requests and mocks successful application delivery. The API suite replaces fetch in memory and uses synthetic data. No test lead reaches GHL. Rebuild using intended production configuration before deploying; do not deploy the test build.

## GHL and Zoom

Map every application field in `auditSchema`, `sourcePage`, `submittedAt`, `receipt`, SMS consent and first/latest attribution. Do not infer SMS consent from the presence of a phone number. Configure suppression across workflows. Success opens the configured calendar on demand or supplies a normal booking link. No booking or sale event is inferred from opening a calendar.

Optional `NEXT_PUBLIC_GHL_FORM_EMBED_URL` replaces the native form. Configure the embedded form with equivalent questions, consent, attribution and confirmation behavior. Third-party cross-origin submission cannot be verified by this site, so it does not fire `application_submit` for embed clicks.

Use `NEXT_PUBLIC_ZOOM_REGISTRATION_URL` first and `NEXT_PUBLIC_GHL_WEBINAR_FORM_URL` as fallback. Without either, registration is visibly unavailable. Supply both real `WEBINAR_START_ISO` and `WEBINAR_END_ISO` with explicit offset for a specific session; otherwise only the recurring Thursday 11 a.m. Central schedule appears. Keep occurrences current and rebuild. Daylight saving is handled by America/Chicago display formatting.

## Security and privacy

The CSP allows self-hosted assets, configured Google/Meta integrations and common GHL/Zoom frame hosts. Only development adds unsafe-eval for the React debug runtime; production does not. Add the precise origin to `frame-src` when using a custom branded embed domain. Do not loosen policy with unrestricted frame origins. Verify CSP in production when enabling each integration. TLS, proxy trust and edge protection are host responsibilities.

The basic limiter permits ten attempts per minute per proxy-derived client key, bounds memory and expires records. It is per process, so use a trusted edge/WAF or shared-store limiter for distributed/serverless deployments. Ensure the proxy overwrites client-supplied IP headers. The route does not store applications or log personal information. Configure retention with the CRM provider.

Analytics IDs are empty by default. Enable only intended providers and avoid double firing when GTM also deploys GA4. The site provides configuration switches but no regional consent-management platform. Complete the privacy/consent review before enabling nonessential tags. Browser custom events exclude form answers and do not assign revenue to submissions. `calendar_booked` is reserved for a future verifiable booking callback.

## Search verification and indexing

1. Verify the canonical domain in Google Search Console using DNS, or use the URL-prefix property and set `GOOGLE_SITE_VERIFICATION` for the HTML meta method. Rebuild and verify the tag.
2. Verify the site in Bing Webmaster Tools using DNS or set `BING_SITE_VERIFICATION` for its HTML meta method. Rebuild and complete verification.
3. Submit `https://aurexbusinesslab.com/sitemap.xml` in both properties. Inspect `/`, the offer and a cornerstone article using the tools' URL inspection features. Check the selected canonical and rendered content.
4. Set an IndexNow key with 8-128 letters, digits or hyphens. The route `/indexnow-key.txt` returns the configured public verification key. Confirm it is reachable at the canonical host, then run `node --env-file=.env.local scripts/indexnow.mjs / /about` for changed paths. This is a deliberate post-deployment action, never an automatic build side effect.
5. Review indexing reports and server errors after launch. Sitemap or IndexNow submission does not guarantee indexing. The supplementary `/llms.txt` does not guarantee AI inclusion or citations.
6. Standard crawlers and OAI-SearchBot are allowed. GPTBot is blocked unless `ALLOW_GPTBOT=true`. Rebuild to change the policy.

Use Schema.org validation and the relevant search-engine testing tools on deployed URLs. JSON-LD must match visible content. Legal templates require professional review. Update approved content dates at actual publication.

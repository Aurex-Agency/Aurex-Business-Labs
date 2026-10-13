# Ads funnel (/call)

The paid traffic page for the Aurex Revenue Capture System. Meta ads point straight at `https://aurexbusinesslab.com/call`. The page is headline, video, application and a thin trust strip. It has no navigation, FAQ, pricing, portfolio or popups, and it is `noindex` and out of the sitemap so it never competes with the educational site.

## Files

- `src/app/call/page.tsx`: headline, video, application, trust strip.
- `src/app/call/booked/page.tsx`: qualified confirmation page. Fires the Meta `Schedule` event.
- `src/components/funnel/`: `application.tsx` (multi-step form), `vsl-player.tsx` (click-to-play Vimeo or Wistia), `booking-details.tsx` (booked time and the Schedule event), `chrome.tsx` (logo-only header, one-line footer, trust strip).
- `src/lib/funnel.ts`: answer options, routing rules and CRM tags, shared by the browser and the server.
- Styles: the "Ads funnel" section at the end of `src/app/globals.css` (`l-call-` and `l-vsl-` classes).

## Environment variables

| Variable                      | Purpose                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FUNNEL_VSL_URL`              | Vimeo or Wistia link for the 6 minute VSL. Any other host is ignored, so a bare YouTube embed cannot slip in. Unlisted Vimeo links with a hash work.                                                                                                                                                                                                                          |
| `FUNNEL_VSL_POSTER`           | Optional local thumbnail, for example `/brand/vsl-thumb.webp` (1600x900, compressed). Without it a designed poster is shown.                                                                                                                                                                                                                                                  |
| `FUNNEL_CALENDAR_URL`         | Calendly or GHL calendar booking URL shown as the last step. Falls back to `NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL`. Its origin is added to the frame policy automatically, so white-label calendar domains work.                                                                                                                                                                 |
| `FUNNEL_CONFIRM_VIDEO_URL`    | Optional 60 to 90 second Vimeo or Wistia video for the booked page.                                                                                                                                                                                                                                                                                                           |
| `NEXT_PUBLIC_META_PIXEL_ID`   | Meta pixel. Without it no pixel loads.                                                                                                                                                                                                                                                                                                                                        |
| `NEXT_PUBLIC_GHL_TRACKING_ID` | GoHighLevel external tracking (`tk_...`), loaded on every page once it is idle. It records visits and campaign tags and sends each submitted form's fields to GoHighLevel, which ties the visit to the contact for attribution. This runs alongside the funnel webhook, so GHL also lists these as external form submissions, including each step of the `/call` application. |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | Shown in the footer and on the not-a-fit message.                                                                                                                                                                                                                                                                                                                             |
| `FUNNEL_WEBHOOK_URL`          | Server-only GHL inbound webhook for this funnel. Every `/call` submission goes here, and never to `GHL_WEBHOOK_URL`, the main website webhook. If it is missing or fails, the applicant sees an error instead of a false success.                                                                                                                                             |

These are read at build time. Redeploy after changing them.

## Application flow

1. Contact: first name, last name, phone, email, company, optional SMS consent. On Continue a **partial** submission is sent right away, so abandoned applications still reach GHL.
2. Trade and annual revenue. Revenue under $500K exits here.
3. Monthly leads, main lead source, biggest bottleneck.
4. Office or admin staff, average job value. No staff with an average job under $5K exits here.
5. Case study interest, then submit.
6. Qualified and borderline applicants see the calendar inside the form.

Routing (decided on the server from the answers, never trusted from the browser):

| Route       | Rule                                                       | GHL tag               |
| ----------- | ---------------------------------------------------------- | --------------------- |
| Unqualified | Revenue under $500K, or no staff and average job under $5K | `unqualified-lead`    |
| Borderline  | $500K to $1M, or $1M+ with no staff (and jobs $5K+)        | `borderline-lead`     |
| Qualified   | $1M+ with full or part-time staff                          | `qualified-lead`      |
| Partial     | Contact step only                                          | `partial-application` |

Every submission also carries the tag `call-funnel`.

## What GHL receives

Its own webhook (`FUNNEL_WEBHOOK_URL`), with `sourcePage: "/call"`. Fields: `firstName`, `lastName`, `email`, `phone`, `businessName`, `smsConsent`, `stage` (`partial` or `complete`), `trade`, `tradeOther`, `annualRevenue`, `monthlyLeads`, `leadSource`, `bottleneck`, `staff`, `jobValue`, `caseStudyInterest`, `contactTimezone` (the browser's time zone, such as `America/Chicago`), `attribution` (UTMs and click IDs, first and latest touch), `meta.fbp` and `meta.fbc`, `receipt`, `submittedAt`, and a `funnel` object:

- `funnel.route` and `funnel.tags`: apply the tags in the workflow.
- `funnel.pipelineStage`: `New Lead` in the Lead to Job pipeline.
- `funnel.callOpensOn`: Capture, Convert, Recover or Compound, from the bottleneck answer.
- `funnel.bottleneckKey`: a stable code for the bottleneck answer (`not_enough_leads`, `slow_response`, `no_shows`, `low_close_rate`, `no_repeat_business`, `unknown_numbers`). Branch GHL workflows on this rather than the answer text.
- `funnel.leadSource`, `funnel.campaignName`, `funnel.adName`: from `utm_source`, `utm_campaign` and `utm_content`. Map these to the Lead Source, Campaign Name and Ad Name custom fields.
- `funnel.metaEventId`: set only for qualified and borderline applicants. Send it as the `event_id` on the CAPI Lead event so Meta deduplicates it against the browser Lead event.

Answers arrive exactly as the dropdowns word them, for example `$1M to $3M`, `25 to 50`, `Yes, full-time staff` and `Maybe, I’d want details`. The full lists are in `src/lib/funnel.ts`. Match GHL conditions to these values, or to `funnel.route` and `funnel.bottleneckKey`.

In the GHL workflow, create or update the contact by email and phone, so the partial and the complete submission land on one contact. Only send a CAPI Lead event when `funnel.route` is `qualified` or `borderline`.

Use these Meta URL parameters on every ad: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`.

## Calendar setup

- Availability: Tuesday and Thursday blocks, set in the calendar itself.
- Set the calendar's post-booking redirect to `https://aurexbusinesslab.com/call/booked`. In Calendly, turn on "pass event details" so the booked time shows on the page. If a calendar redirects inside its own frame, the booked page moves itself to the full window.
- Calendly bookings are also detected from Calendly's embed message and sent to the booked page.
- Calendly's redirect puts the booker's name, email and answers in the page address. The booked page keeps only the time, host and first name in memory and removes the query from the address before the Meta pixel or Google tags run, so no personal details reach them.
- Name, email and phone are prefilled in the calendar from the application.

## Pixel events

| Moment                                                      | Event                                       |
| ----------------------------------------------------------- | ------------------------------------------- |
| Every page load                                             | `PageView` (base code)                      |
| Qualified or borderline application submitted and delivered | `Lead`, with `eventID` equal to the receipt |
| Booked page                                                 | `Schedule`, once per browser session        |
| Disqualified path                                           | Nothing. No standard or custom Meta events  |

The form start is sent to Google only, not to Meta, so the pixel never learns from people who later turn out to be unqualified.

Before launch, with Meta Pixel Helper: submit a qualified test application and confirm `Lead` fires, book a test time and confirm `Schedule` fires on the booked page, then submit a disqualified test application and confirm nothing fires.

## Trust strip

The $320,000 roofing result is shown only once `roofingProof` in `src/lib/proof.ts` is marked `verificationStatus: "verified"` and `permissionToPublish: true`. Add the lead report or dashboard image to `screenshots` to show the proof visual. Until then the strip states who the system is built for and lists the four phases, without any numbers.

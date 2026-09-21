# GHL form field mapping

The website sends JSON from its server to the inbound webhook configured in GHL_WEBHOOK_URL. The URL is stored in ignored .env.local for the local preview and must also be set in the production host's environment when deploying. It is never exposed to the browser.

## Sample to select in GHL

The explicitly requested test uses businessName `Aurex Webhook Mapping Test (Not a Real Lead)` and email `aurex-ghl-mapping-test@example.com`. The phone is a fictional test number. The challenge field identifies this as a mapping sample, not a real customer.

Live receipt confirmed on September 21, 2026: `ccc24bcd-9d7c-4fe7-8c4b-d93f13dc3267`. The website returned HTTP 200 only after the webhook accepted the JSON.

That historical sample covers the original flat fields only. It does not include the new first-touch/latest-touch records or braid fields. Use the example below when extending the inbound webhook mapping. HTTP acceptance confirms that GHL received the request; contact creation and subsequent workflow actions depend on the user's GHL mapping and workflow setup.

| JSON key      | Suggested GHL destination                               |
| ------------- | ------------------------------------------------------- |
| firstName     | Contact first name                                      |
| lastName      | Contact last name                                       |
| email         | Contact email                                           |
| phone         | Contact phone                                           |
| businessName  | Company / business name                                 |
| website       | Website                                                 |
| city          | City                                                    |
| service       | Custom field: primary product or service                |
| customerValue | Custom field: average customer value                    |
| source        | Custom field: how customers currently find the business |
| timeline      | Custom field: project timeline                          |
| budget        | Custom field: project budget                            |
| challenge     | Custom field: main website / lead-generation challenge  |
| sourcePage    | Custom field: submission page                           |
| submittedAt   | Submission timestamp in UTC                             |
| receipt       | Unique submission ID for reconciliation                 |

## Attribution fields

Map first-touch and latest-touch into separate GHL custom fields. All campaign values are optional and case-sensitive. Preserve click identifiers exactly; do not lowercase, trim, or numerically convert them in GHL.

| First-touch JSON key                | Latest-touch JSON key                | Suggested custom field suffix           |
| ----------------------------------- | ------------------------------------ | --------------------------------------- |
| attribution.firstTouch.utm_source   | attribution.latestTouch.utm_source   | Campaign source                         |
| attribution.firstTouch.utm_medium   | attribution.latestTouch.utm_medium   | Campaign medium                         |
| attribution.firstTouch.utm_campaign | attribution.latestTouch.utm_campaign | Campaign name                           |
| attribution.firstTouch.utm_term     | attribution.latestTouch.utm_term     | Campaign keyword                        |
| attribution.firstTouch.utm_content  | attribution.latestTouch.utm_content  | Campaign creative                       |
| attribution.firstTouch.gclid        | attribution.latestTouch.gclid        | Google click ID                         |
| attribution.firstTouch.wbraid       | attribution.latestTouch.wbraid       | Google WBRAID                           |
| attribution.firstTouch.gbraid       | attribution.latestTouch.gbraid       | Google GBRAID                           |
| attribution.firstTouch.msclkid      | attribution.latestTouch.msclkid      | Microsoft click ID                      |
| attribution.firstTouch.fbclid       | attribution.latestTouch.fbclid       | Meta click ID                           |
| attribution.firstTouch.landingPage  | attribution.latestTouch.landingPage  | Landing page address                    |
| attribution.firstTouch.referrer     | attribution.latestTouch.referrer     | Referring page address                  |
| attribution.firstTouch.storedAt     | attribution.latestTouch.storedAt     | Capture timestamp, Unix milliseconds    |
| attribution.firstTouch.expiresAt    | attribution.latestTouch.expiresAt    | Expiration timestamp, Unix milliseconds |

Use distinct names such as "First touch: Google WBRAID" and "Latest touch: Google WBRAID". For CRM contact-level first-touch fields, configure the workflow to set them only when empty if the contact's lifetime first touch must survive later submissions and browser resets. The website guarantees preservation only within the browser record's retention period.

Existing paths `attribution.utm_source`, `attribution.utm_medium`, `attribution.utm_campaign`, `attribution.utm_term`, `attribution.utm_content`, `attribution.gclid`, `attribution.msclkid`, `attribution.fbclid`, `attribution.landingPage`, and `attribution.referrer` remain supported as aliases of latest-touch. New aliases `attribution.wbraid` and `attribution.gbraid` are also included. Absent fields are omitted, not populated from a previous campaign. Do not use flat aliases for first-touch reporting. Older already-open forms with a flat attribution payload remain accepted; their first-touch timestamps cannot be reconstructed on the server.

## Capture and retention contract

- `aurex-attribution` in localStorage and sessionStorage contains a version 2 envelope with `firstTouch` and `latestTouch`. Each touch has its own explicit `storedAt` and `expiresAt` in Unix milliseconds, exactly 90 days apart.
- The first observed visit, including a direct visit, establishes first-touch. It is never replaced while unexpired. Latest-touch changes when any nonempty recognized campaign parameter or click identifier arrives. A new campaign replaces the complete latest snapshot so IDs from different campaigns are never mixed.
- Direct visits, empty parameters, unrelated parameters, query removal, and repeated capture during a single unchanged document do not refresh timestamps or erase an existing touch. A new document arriving with campaign parameters is a new touch, including a reload of a tagged URL.
- Touches expire independently at `now >= expiresAt`; they are filtered on capture and submission and overwritten in storage on the next capture. localStorage cannot delete itself while the site is closed. Once first-touch expires, the next observed visit starts a new first-touch record; a still-valid latest-touch remains available until its own expiration.
- Storage is shared only within the same origin and browser profile. New tabs recover localStorage; an open tab re-reads it before form submission. Clearing browser storage or browser-imposed eviction can shorten retention. If one store is blocked, the other is used; if both are blocked, in-memory capture survives only within the current document.
- Legacy session-only data is migrated once using the migration time because the old format did not record capture time. Unknown keys are discarded. Malformed, expired, future-dated, and invalid-duration stored touches are ignored.
- Only allowlisted attribution fields are stored. Form answers, names, email addresses, phone numbers, and business details are never copied into attribution storage. Landing/referrer addresses exclude credentials, query strings, and fragments. Campaign values are bounded to 500 characters; oversized identifiers are ignored rather than truncated into a different ID. Do not put personal information in campaign parameter values or URL paths.
- The API validates both touches, strips unknown fields, drops expired/future-dated touches, and derives flat aliases from the valid latest-touch. The request size limit is 96 KiB measured in UTF-8 bytes, accommodating both touches and compatibility aliases.

## New mapping example

This synthetic attribution fragment illustrates the new JSON paths. It has not been sent to the live webhook. Fields here are deliberately all populated for mapping; real visits only include parameters actually received. The complete lead still uses the contact and submission fields above.

```json
{
  "attribution": {
    "firstTouch": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "website_launch",
      "utm_term": "custom website",
      "utm_content": "blue_video",
      "gclid": "ExampleFirstGCLID",
      "wbraid": "ExampleFirstWBRAID",
      "gbraid": "ExampleFirstGBRAID",
      "msclkid": "ExampleFirstMSCLKID",
      "fbclid": "ExampleFirstFBCLID",
      "landingPage": "https://aurexbusinesslab.com/revenue-website",
      "referrer": "https://www.google.com/",
      "storedAt": 1790000000000,
      "expiresAt": 1797776000000
    },
    "latestTouch": {
      "utm_source": "microsoft",
      "utm_medium": "cpc",
      "utm_campaign": "website_remarketing",
      "utm_term": "business website",
      "utm_content": "review_offer",
      "gclid": "ExampleLatestGCLID",
      "wbraid": "ExampleLatestWBRAID",
      "gbraid": "ExampleLatestGBRAID",
      "msclkid": "ExampleLatestMSCLKID",
      "fbclid": "ExampleLatestFBCLID",
      "landingPage": "https://aurexbusinesslab.com/revenue-website",
      "referrer": "https://www.bing.com/",
      "storedAt": 1790086400000,
      "expiresAt": 1797862400000
    }
  }
}
```

The source answer describes the business's current customer acquisition, while attribution.utm_source describes the visitor's campaign source. Keep these separate. Attribution fields are optional for real visitors; the example above shows all supported keys.

The form's companyWebsite honeypot and startedAt timing check are removed before forwarding. Do not map them. A successful website response contains the same receipt included in the webhook payload.

Automated tests use a separate server with GHL_WEBHOOK_URL explicitly empty and mock upstream fetches. They must not generate additional live mapping samples.

# GHL form field mapping

The website sends JSON from its server to the inbound webhook configured in GHL_WEBHOOK_URL. The URL is stored in ignored .env.local for the local preview and must also be set in the production host's environment when deploying. It is never exposed to the browser.

## Sample to select in GHL

The explicitly requested test uses businessName `Aurex Webhook Mapping Test (Not a Real Lead)` and email `aurex-ghl-mapping-test@example.com`. The phone is a fictional test number. The challenge field identifies this as a mapping sample, not a real customer.

Live receipt confirmed on September 21, 2026: `ccc24bcd-9d7c-4fe7-8c4b-d93f13dc3267`. The website returned HTTP 200 only after the webhook accepted the JSON.

Select that request in the inbound webhook trigger to map these JSON keys. HTTP acceptance confirms that GHL received the request; contact creation and subsequent workflow actions depend on the user's GHL mapping and workflow setup.

| JSON key | Suggested GHL destination |
| --- | --- |
| firstName | Contact first name |
| lastName | Contact last name |
| email | Contact email |
| phone | Contact phone |
| businessName | Company / business name |
| website | Website |
| city | City |
| service | Custom field: primary product or service |
| customerValue | Custom field: average customer value |
| source | Custom field: how customers currently find the business |
| timeline | Custom field: project timeline |
| budget | Custom field: project budget |
| challenge | Custom field: main website / lead-generation challenge |
| sourcePage | Custom field: submission page |
| submittedAt | Submission timestamp in UTC |
| receipt | Unique submission ID for reconciliation |
| attribution.utm_source | Campaign source |
| attribution.utm_medium | Campaign medium |
| attribution.utm_campaign | Campaign name |
| attribution.utm_term | Campaign keyword |
| attribution.utm_content | Campaign creative |
| attribution.gclid | Google click ID |
| attribution.msclkid | Microsoft click ID |
| attribution.fbclid | Meta click ID |
| attribution.landingPage | Original landing page URL |
| attribution.referrer | Referring URL |

The source answer describes the business's current customer acquisition, while attribution.utm_source describes the visitor's campaign source. Keep these separate. Attribution fields are optional for real visitors; every supported key is populated in the mapping sample so it can be selected in GHL.

The form's companyWebsite honeypot and startedAt timing check are removed before forwarding. Do not map them. A successful website response contains the same receipt included in the webhook payload.

Automated tests use a separate server with GHL_WEBHOOK_URL explicitly empty and mock upstream fetches. They must not generate additional live mapping samples.

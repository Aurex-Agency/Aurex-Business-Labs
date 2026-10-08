# Proof collection SOP

The delivery owner maintains the evidence packet; the client confirms business records; the business owner approves publication. Never publish raw homeowner records. Redact names, addresses, phone numbers, emails and account credentials from screenshots.

## Milestones

Day 0:
- Current lead volume
- Contact rate
- Booking rate
- Show rate
- Estimates
- Sales
- Collected revenue
- Repeat and referral activity
- Screenshots
- Client permission

Day 30:
- System launch
- Workflow completion
- Response-time changes
- Early lead and booking activity
- Client feedback

Day 60:
- Campaign performance
- Conversion performance
- Recovery results
- Operational improvements

Day 120:
- Full before-and-after comparison
- Collected revenue
- Gross profit when supplied
- Repeat and referral activity
- Video testimonial
- Case-study interview
- Publication permission

## Reconciliation and permission

For every result, record the source, cohort/date range, opportunity ID, sale record, collected amount when known, refund/cancellation treatment and attribution classification. Record the baseline and the method consistently. Ask the client to confirm the record, not a prewritten success claim.

Use `src/lib/proof.ts`. Fields include id, clientDisplayName, anonymized, trade, location, problem, baseline, workPerformed, dateRange, results, resultType, attributionStatus, screenshots, testimonialUrl, video metadata, permissionToPublish, verificationStatus, methodologyNotes, disclaimer, publishedAt and updatedAt.

1. Keep `verificationStatus` pending while source, sale or revenue records remain incomplete.
2. Obtain written permission covering the claim, client identity or anonymized description, media and publication channels. Store the release privately outside this repository.
3. Require verification and permission independently. Both must pass before numeric results or media render.
4. Review each caption, video summary and quote against the evidence. Preserve the client's meaning. Use tracked revenue unless stronger causation is explicitly supported and approved.
5. Publish context and limitations with the result. Verify visible copy, metadata and JSON-LD use the same claim.
6. If permission is withdrawn or evidence changes, disable publication immediately, remove affected media and update the proof record and public page. Revalidate cached pages.

Do not publish customer-level data in this repo. Keep the internal evidence packet in an access-controlled location with a retention and deletion policy approved by the business.

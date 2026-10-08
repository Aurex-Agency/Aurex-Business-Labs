# Revenue-system redesign handoff

Aurex Business Labs remains a customer acquisition and revenue systems company for established residential contractors. The visual redesign retains expressive typography, motion, native scrolling, reduced-motion support and accessible navigation. The hero now shows the inquiry-to-repeat-customer journey. The sticky narrative follows Capture, Convert, Recover and Compound.

The Revenue Capture System, results, gated roofing case study and Revenue Leakage Audit routes are active. Website portfolio pages remain secondary examples, not the main positioning. Pricing, payment schedules, investment-readiness questions and monetary launch assurances are absent from public content and schema. The service schema does not include a priced Offer.

Audit and contact forms validate client/server input and confirm only after upstream delivery. The audit restores relevant business-fit questions and optional unchecked SMS reminder consent. Investment readiness is optional only for legacy API payload compatibility and is not asked publicly. Map the restored audit fields in GHL before deployment.

The only redirects are listed in URL_MIGRATION_MAP.md. Evidence gates still require verified status and publication permission. No financial proof has been enabled. Build with intended production settings before deployment; automated regression uses an isolated empty webhook and intercepted analytics. Screenshots remain in ignored artifacts/.

## Verification

Lint, typecheck, webpack production build and API regression passed. Browser regression passed 52 tests; accessibility passed 23 checks, including the audit error state. Responsive screenshots cover homepage, system, audit and article at 375, 768 and 1440 pixels. Regression verifies the contractor positioning, four stages, audit path, no investment-readiness field, and absence of public prices. No live test leads were sent.

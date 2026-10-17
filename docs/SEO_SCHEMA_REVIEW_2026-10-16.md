# SEO and schema review, 2026-10-16

Insight pages now emit article Open Graph metadata with existing publication/modification dates and stable BlogPosting IDs, canonical article URLs and language.

Based on the verified Vercel production source `main` at `dd4e10961f39`. Reviewed existing SEO work before making this focused follow-up.

Validation: lint; typecheck; production build; API/proof tests; 71 browser tests; 33 accessibility tests. The built-page validator parsed 38 JSON-LD blocks across 30 HTML files using the official Schema.org vocabulary and found no issues in the implemented checks. Representative homepage checks at desktop and mobile widths found no horizontal overflow, with primary conversion paths present. No production lead was submitted.

Remaining dependencies: Add/verify the requested aurexbusinesslab.com Search Console property. The accessible aurexagency.com property is a different domain. Validate qualified inquiry and CRM outcome reporting before claiming conversions.

This PR is independently reviewable. After release, recrawl production and recheck Search Console; local validation does not guarantee Google indexing or rich-result display.

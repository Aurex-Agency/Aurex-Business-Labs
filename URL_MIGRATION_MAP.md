# URL migration

| Old URL | New URL | Status | Reason |
| --- | --- | --- | --- |
| `/` temporary redirect | `/` authority homepage | 200, redirect removed | Root now establishes contractor revenue-system positioning. |
| `/revenue-website` | `/revenue-capture-system` | 301 | Retire the standalone website-build offer from the public site. |
| `/revenue-website/thank-you` | `/apply` | 301 | Old confirmation URLs cannot imply a new successful audit submission. |
| `/privacy` | `/privacy` | 200 | Updated privacy template covers the new application and attribution workflow. |

Next.js config uses explicit `statusCode: 301`. Query parameters are preserved. No destination redirects back to a source. Old page source is saved in `docs/archive/revenue-website-page.tsx.txt`; supporting components, reusable copy and assets remain in source control. Old campaign links should be updated to the new offer or application URL. Old hash anchors cannot be preserved server-side and should be updated in campaign destinations.

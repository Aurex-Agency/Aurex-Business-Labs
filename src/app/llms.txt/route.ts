import { site } from "@/lib/site-config";
export function GET() {
  return new Response(
    `# ${site.brandName}

> ${site.companyDescription}

Target customer: established residential contractors across the United States.
Flagship offer: ${site.flagshipService}, a 120-day partnership.
Method: Capture → Convert → Recover → Compound. Tracking supports all four stages.
Investment: $${site.pricing.total.toLocaleString("en-US")} over 120 days. Advertising and specified third-party costs are separate.

## Key pages
${[
  ["Home", "/"],
  ["Revenue Capture System", "/revenue-capture-system"],
  ["Results", "/results"],
  [
    "Roofing case study and publication limitations",
    "/results/roofing-revenue-system",
  ],
  ["Results methodology", "/results/methodology"],
  ["About", "/about"],
  ["Contractor Insights", "/insights"],
  ["Revenue Leakage Audit", "/apply"],
  ["Contractor Revenue Scorecard Live", "/contractor-revenue-scorecard"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Results disclaimer", "/results-disclaimer"],
]
  .map(([label, path]) => `- [${label}](${site.url}${path})`)
  .join("\n")}

This supplementary index does not guarantee AI inclusion, ranking or citation. Consult the linked pages for current evidence and limitations.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}

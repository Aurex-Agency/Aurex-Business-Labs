import { site } from "@/lib/site-config";
export function GET() {
  return new Response(
    `# ${site.brandName}

> ${site.companyDescription}

## Explore
${[
  ["Revenue Capture System", "/revenue-capture-system"],
  ["Results", "/results"],
  ["Roofing case study", "/results/roofing-revenue-system"],
  ["Revenue Leakage Audit", "/apply"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
  ["Results methodology", "/results/methodology"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Results disclaimer", "/results-disclaimer"],
]
  .map(([label, path]) => `- [${label}](${site.url}${path})`)
  .join("\n")}

The Aurex Revenue Capture System connects Capture, Convert, Recover and Compound. This supplementary index does not guarantee AI inclusion or citation.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}

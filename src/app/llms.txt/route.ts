import { site } from "@/lib/site-config";
export function GET() {
  return new Response(
    `# ${site.brandName}

> ${site.companyDescription}

## Explore
${[
  ["Selected work", "/work"],
  ["Approach", "/approach"],
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

The site presents capabilities and selected work. It does not publish a packaged offer or pricing. This supplementary index does not guarantee AI inclusion or citation.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}

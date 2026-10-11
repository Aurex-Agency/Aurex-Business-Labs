import fs from "node:fs/promises";
import ts from "typescript";
// Generate the download versions from the same content used by the resource pages.
const source = await fs.readFile("src/content/resources.ts", "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { resources } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);
await fs.mkdir("public/resources", { recursive: true });
for (const r of resources.filter((r) => r.visual !== "scorecard")) {
  const body = [
    "AUREX BUSINESS LABS",
    r.title,
    "",
    r.description,
    "",
    ...r.steps.flatMap((s, i) => [
      `${i + 1}. ${s.title}`,
      s.text,
      ...(s.script ? [`Example message: ${s.script}`] : []),
      "",
    ]),
    "Adapt this resource to your business and the homeowner's agreed contact preferences. Honor requests to stop contact.",
    "",
    `https://aurexbusinesslab.com/resources/${r.slug}`,
    "",
  ].join("\n");
  await fs.writeFile(`public${r.download}`, body);
}
await fs.writeFile(
  "public/resources/contractor-revenue-scorecard.csv",
  [
    "Aurex Business Labs - Contractor Revenue Scorecard,,,,",
    "Intake period (start and end),,,,",
    "Source and priority service,,,,",
    "Review date and owner,,,,",
    "Follow the same group of inquiries through every stage. Counts should not increase from stage to stage.,,,,",
    "Stage,Definition,Count,Share of previous stage,Notes or next action",
    "Valid inquiries,Unique valid inquiries in the selected group,,,",
    "Contacted,Two-way conversations,,,",
    "Appointments booked,Scheduled appointments,,,",
    "Estimates delivered,Delivered scope and estimate,,,",
    "Sold jobs,Accepted agreements (not collected cash),,,",
    "Rate calculation,Current stage count divided by previous stage count. Leave blank when denominator is zero.,,,",
    "Choose one action,Name the handoff to review and the person responsible,,,",
    "Next review date,,,,",
    "https://aurexbusinesslab.com/resources/contractor-revenue-scorecard,,,,",
  ].join("\n") + "\n",
);
console.log("Generated three resource downloads.");

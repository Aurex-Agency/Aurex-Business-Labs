import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
const require = createRequire(import.meta.url);
const moduleUrl = (code) =>
  "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const options = moduleUrl(
  compile(await fs.readFile("src/lib/lead-options.ts", "utf8")),
);
const schema = compile(
  await fs.readFile("src/lib/lead-schema.ts", "utf8"),
).replace('from "zod"', `from "${pathToFileURL(require.resolve("zod")).href}"`);
const schemaWithOptions = schema.replace(
  'from "./lead-options"',
  `from "${options}"`,
);
const route = compile(await fs.readFile("src/app/api/leads/route.ts", "utf8"))
  .replace('from "@/lib/lead-schema"', `from "${moduleUrl(schemaWithOptions)}"`)
  .replace(
    'from "next/server"',
    `from "${pathToFileURL(require.resolve("next/server.js")).href}"`,
  );
const { POST } = await import(moduleUrl(route));
const { NextRequest } = await import("next/server.js");
const originalFetch = globalThis.fetch;
const originalEnv = {
  NODE_ENV: process.env.NODE_ENV,
  GHL_WEBHOOK_URL: process.env.GHL_WEBHOOK_URL,
  LEAD_DEV_MODE: process.env.LEAD_DEV_MODE,
};
const payload = {
  firstName: " Alex ",
  lastName: "Example",
  businessName: "Example Services",
  website: "example.com",
  email: "Alex@example.com",
  phone: "(662) 555-0100",
  city: "Tupelo",
  service: "Equipment",
  customerValue: "$5,000 to $10,000",
  source: "Google",
  timeline: "Within 30 days",
  budget: "$5,000 to $10,000",
  challenge: "We need a clearer quote request.",
  companyWebsite: "",
  startedAt: Date.now() - 10000,
  sourcePage: "/revenue-website",
  attribution: {
    utm_source: "google",
    gclid: "example-id",
    landingPage: "https://aurexbusinesslab.com/revenue-website",
  },
};
const request = () =>
  new NextRequest("https://aurexbusinesslab.com/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://aurexbusinesslab.com",
    },
    body: JSON.stringify(payload),
  });
try {
  process.env.NODE_ENV = "production";
  process.env.GHL_WEBHOOK_URL = "https://example.invalid/webhook";
  let forwarded;
  globalThis.fetch = async (url, options) => {
    forwarded = { url: String(url), ...options };
    return new Response("{}", { status: 200 });
  };
  const accepted = await POST(request());
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).success, true);
  const delivered = JSON.parse(forwarded.body);
  assert.equal(delivered.firstName, "Alex");
  assert.equal(delivered.email, "alex@example.com");
  assert.equal(delivered.phone, "6625550100");
  assert.equal(delivered.website, "https://example.com");
  assert.equal(delivered.attribution.gclid, "example-id");
  assert.ok(delivered.submittedAt);
  assert.ok(delivered.receipt);
  assert.ok(forwarded.signal);
  assert.equal(forwarded.redirect, "error");
  assert.equal(delivered.companyWebsite, undefined);
  const localRequest = (origin) =>
    new NextRequest("http://127.0.0.1:3001/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        host: "127.0.0.1:3001",
        origin,
      },
      body: JSON.stringify(payload),
    });
  assert.equal((await POST(localRequest("http://127.0.0.1:3001"))).status, 200);
  assert.equal((await POST(localRequest("http://127.0.0.1:3002"))).status, 403);
  assert.equal((await POST(localRequest("https://example.org"))).status, 403);
  globalThis.fetch = async () => new Response("{}", { status: 500 });
  assert.equal((await POST(request())).status, 502);
  globalThis.fetch = async () => {
    throw new DOMException("Timed out", "TimeoutError");
  };
  assert.equal((await POST(request())).status, 502);
  delete process.env.GHL_WEBHOOK_URL;
  process.env.LEAD_DEV_MODE = "true";
  assert.equal((await POST(request())).status, 503);
  console.log(
    "Lead endpoint: successful forwarding, normalization, attribution, upstream errors, timeout recovery, and production fail-closed behavior passed.",
  );
} finally {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

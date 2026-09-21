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
const attributionModule = moduleUrl(
  compile(await fs.readFile("src/lib/attribution.ts", "utf8")),
);
const schema = compile(
  await fs.readFile("src/lib/lead-schema.ts", "utf8"),
).replace('from "zod"', `from "${pathToFileURL(require.resolve("zod")).href}"`);
const schemaWithOptions = schema
  .replace('from "./attribution"', `from "${attributionModule}"`)
  .replace('from "./lead-options"', `from "${options}"`);
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
const request = (body = payload) =>
  new NextRequest("https://aurexbusinesslab.com/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://aurexbusinesslab.com",
    },
    body: JSON.stringify(body),
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
  const ttl = 90 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const firstTouch = {
    utm_source: "Google",
    utm_medium: "cpc",
    utm_campaign: "Original",
    utm_term: "Equipment",
    utm_content: "Video",
    gclid: "AbC-First_GCLID",
    storedAt: now - 1000,
    expiresAt: now - 1000 + ttl,
    landingPage: "https://example.com/landing?email=private@example.com#secret",
    email: "private@example.com",
  };
  const latestTouch = {
    utm_source: "Microsoft",
    wbraid: "AbC-WBRAID",
    gbraid: "XyZ-GBRAID",
    msclkid: "MiXeD-MSCLKID",
    fbclid: "MiXeD-FBCLID",
    storedAt: now,
    expiresAt: now + ttl,
    referrer: "https://user:password@example.org/from?phone=123#secret",
  };
  const modern = {
    ...payload,
    attribution: { firstTouch, latestTouch, gclid: "StaleAlias", phone: "123" },
  };
  assert.equal((await POST(request(modern))).status, 200);
  const modernDelivered = JSON.parse(forwarded.body).attribution;
  const { email: omittedEmail, ...expectedFirst } = firstTouch;
  assert.ok(omittedEmail);
  assert.deepEqual(modernDelivered.firstTouch, {
    ...expectedFirst,
    landingPage: "https://example.com/landing",
  });
  assert.deepEqual(modernDelivered.latestTouch, {
    ...latestTouch,
    referrer: "https://example.org/from",
  });
  for (const key of ["wbraid", "gbraid", "msclkid", "fbclid"])
    assert.equal(modernDelivered[key], latestTouch[key]);
  assert.equal(modernDelivered.gclid, undefined);
  assert.equal(modernDelivered.phone, undefined);
  const expiredTouch = {
    ...firstTouch,
    storedAt: now - ttl - 1000,
    expiresAt: now - 1000,
  };
  assert.equal(
    (
      await POST(
        request({
          ...payload,
          attribution: {
            firstTouch: expiredTouch,
            latestTouch: expiredTouch,
            gclid: "DoNotRevive",
          },
        }),
      )
    ).status,
    200,
  );
  assert.deepEqual(JSON.parse(forwarded.body).attribution, {});
  for (const touch of [
    { ...firstTouch, storedAt: "invalid" },
    { ...firstTouch, expiresAt: now + 2 * ttl },
    { ...firstTouch, gclid: "x".repeat(501) },
  ]) {
    assert.equal(
      (await POST(request({ ...payload, attribution: { firstTouch: touch } })))
        .status,
      200,
    );
    assert.deepEqual(JSON.parse(forwarded.body).attribution, {});
  }
  assert.equal(
    (
      await POST(
        request({
          ...payload,
          attribution: {
            latestTouch: {
              ...latestTouch,
              storedAt: now + ttl,
              expiresAt: now + 2 * ttl,
            },
          },
        }),
      )
    ).status,
    200,
  );
  assert.deepEqual(JSON.parse(forwarded.body).attribution, {});
  // Check the real UTF-8 byte limit, including requests without Content-Length.
  assert.equal(
    (await POST(request({ ...payload, challenge: "x".repeat(100000) }))).status,
    413,
  );
  assert.equal(
    (await POST(request({ ...payload, challenge: "😀".repeat(30000) }))).status,
    413,
  );
  const minimal = {
    firstName: "Alex",
    lastName: "Example",
    businessName: "Example Services",
    email: "alex@example.com",
    companyWebsite: "",
    startedAt: Date.now() - 10000,
    sourcePage: "/revenue-website",
    attribution: modern.attribution,
  };
  assert.equal((await POST(request(minimal))).status, 200);
  const minimalDelivered = JSON.parse(forwarded.body);
  assert.equal(minimalDelivered.email, "alex@example.com");
  for (const key of [
    "city",
    "service",
    "customerValue",
    "source",
    "timeline",
    "budget",
    "challenge",
    "phone",
  ])
    assert.equal(minimalDelivered[key], undefined);
  assert.equal(
    (await POST(request({ ...minimal, phone: "", website: "", challenge: "" })))
      .status,
    200,
  );
  assert.equal(
    (await POST(request({ ...minimal, challenge: "Hi" }))).status,
    200,
  );
  assert.equal(
    (await POST(request({ ...minimal, phone: "invalid" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...minimal, website: "invalid" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...minimal, challenge: "x".repeat(3001) }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...minimal, email: "invalid" }))).status,
    400,
  );
  const invalidEmail = await POST(request({ ...minimal, email: "invalid" }));
  assert.equal(invalidEmail.status, 400);
  assert.deepEqual((await invalidEmail.json()).fieldErrors, {
    email: "Enter a valid email address.",
  });
  const trapped = await POST(
    request({ ...minimal, companyWebsite: "autofilled-company.example" }),
  );
  assert.equal(trapped.status, 400);
  assert.match((await trapped.json()).message, /autofill/);
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

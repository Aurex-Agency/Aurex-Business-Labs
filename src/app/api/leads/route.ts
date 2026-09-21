import { NextRequest, NextResponse } from "next/server";
import { submissionSchema, type GhlLeadPayload } from "@/lib/lead-schema";
export const runtime = "nodejs";
// Room for two bounded attribution snapshots plus backward-compatible aliases.
const MAX_BODY_BYTES = 96 * 1024;
const fail = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status });
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // NextURL normalizes loopback addresses; Host preserves the browser's origin.
  const host = request.headers.get("host");
  const requestOrigin = host
    ? `${request.nextUrl.protocol}//${host}`
    : request.nextUrl.origin;
  if (
    origin &&
    origin !== requestOrigin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return fail("Please submit the form from our website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("Please submit a valid form.", 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES)
    return fail("Please shorten your response.", 413);
  let raw: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES)
      return fail("Please shorten your response.", 413);
    raw = JSON.parse(text);
  } catch {
    return fail("Please check the form and try again.", 400);
  }
  const result = submissionSchema.safeParse(raw);
  if (!result.success)
    return fail("Please check your answers and try again.", 400);
  const { companyWebsite, startedAt, ...lead } = result.data;
  if (companyWebsite) return fail("Please check the form and try again.", 400);
  const age = Date.now() - startedAt;
  if (age < 2500 || age > 24 * 60 * 60 * 1000)
    return fail(
      "Please take a moment to review your answers, then try again. If this page has been open a day, refresh it.",
      400,
    );
  const receipt = crypto.randomUUID();
  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.LEAD_DEV_MODE === "true"
    ) {
      console.info("[lead development simulation]", {
        receipt,
        fieldCount: Object.keys(lead).length,
        personalInformation: "REDACTED",
      });
      return NextResponse.json({ success: true, receipt, development: true });
    }
    return fail(
      "We could not send your request right now. Your answers are still here. Please try again shortly.",
      503,
    );
  }
  try {
    const destination = new URL(webhook);
    if (destination.protocol !== "https:") throw new Error("Invalid endpoint");
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        submittedAt: new Date().toISOString(),
        receipt,
      } satisfies GhlLeadPayload),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Delivery unsuccessful");
    return NextResponse.json({ success: true, receipt });
  } catch {
    return fail(
      "Your request could not be delivered. Your answers are saved on this page. Please try again.",
      502,
    );
  }
}

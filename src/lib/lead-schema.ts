import { z } from "zod";
import {
  ATTRIBUTION_TTL,
  campaignKeys,
  attributionFields,
  attributionPageUrl,
  type CampaignKey,
  type Attribution,
} from "./attribution";
const clean = (min: number, max: number, message: string) =>
  z
    .string()
    .trim()
    .transform((v) => v.replace(/[<>\u0000-\u001f]/g, "").trim())
    .pipe(
      z.string().min(min, message).max(max, "Please shorten this response."),
    );
import { customerValues, timelines, budgets } from "./lead-options";
import {
  funnelTrades,
  funnelRevenue,
  funnelLeadVolume,
  funnelLeadSources,
  funnelBottlenecks,
  funnelStaff,
  funnelJobValue,
  funnelCaseStudy,
  routeApplication,
} from "./funnel";
const optionalText = (max: number) =>
  clean(0, max, "")
    .transform((value) => value || undefined)
    .optional();
const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .enum(values)
    .or(z.literal("").transform(() => undefined))
    .optional();
export const leadSchema = z.object({
  firstName: clean(1, 80, "Enter your first name."),
  lastName: clean(1, 80, "Enter your last name."),
  businessName: clean(1, 160, "Enter your business name."),
  website: z
    .string()
    .trim()
    .max(500)
    .refine((v) => {
      if (!v) return true;
      try {
        const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
        return (
          ["http:", "https:"].includes(u.protocol) &&
          u.hostname.includes(".") &&
          !u.username &&
          !u.password
        );
      } catch {
        return false;
      }
    }, "Enter a valid website, such as example.com.")
    .transform((v) => (v ? (/^https?:\/\//i.test(v) ? v : `https://${v}`) : ""))
    .optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.").max(254)),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (v) =>
        !v ||
        (/^\+?[\d\s().-]+$/.test(v) &&
          v.replace(/\D/g, "").length >= 10 &&
          v.replace(/\D/g, "").length <= 15),
      "Enter a valid phone number.",
    )
    .transform((v) => (v ? v.replace(/[^\d+]/g, "") : undefined))
    .optional(),
  // Older open forms may still send these details. They never gate a new lead.
  city: optionalText(100),
  service: optionalText(200),
  customerValue: optionalChoice(customerValues),
  source: optionalText(200),
  timeline: optionalChoice(timelines),
  budget: optionalChoice(budgets),
  challenge: optionalText(3000),
});
export type LeadInput = z.input<typeof leadSchema>;
const campaignShape = Object.fromEntries(
  campaignKeys.map((key) => [key, z.string().max(500).optional()]),
) as Record<CampaignKey, z.ZodOptional<z.ZodString>>;
const attributionFieldsSchema = z.object({
  ...campaignShape,
  landingPage: z.string().max(2000).transform(attributionPageUrl).optional(),
  referrer: z.string().max(2000).transform(attributionPageUrl).optional(),
});
export const attributionTouchSchema = attributionFieldsSchema
  .extend({
    storedAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().nonnegative(),
  })
  .refine((touch) => touch.expiresAt - touch.storedAt === ATTRIBUTION_TTL, {
    message: "Attribution must expire 90 days after capture.",
  });
export const attributionSchema = attributionFieldsSchema
  .extend({
    firstTouch: attributionTouchSchema.optional(),
    latestTouch: attributionTouchSchema.optional(),
  })
  .transform((value): Attribution => {
    const now = Date.now();
    const valid = (touch: typeof value.firstTouch) =>
      touch && touch.storedAt <= now && touch.expiresAt > now
        ? touch
        : undefined;
    const firstTouch = valid(value.firstTouch);
    const latestTouch = valid(value.latestTouch);
    // Modern records derive legacy aliases from latest-touch only. Never revive
    // expired modern data through a stale flat alias. Accept older open forms.
    const fields =
      value.firstTouch || value.latestTouch
        ? attributionFields(latestTouch)
        : attributionFields(value);
    return {
      ...fields,
      ...(firstTouch && { firstTouch }),
      ...(latestTouch && { latestTouch }),
    };
  });
const submissionFields = {
  companyWebsite: z.string().max(2000),
  startedAt: z.number().finite(),
  // Campaign metadata must never prevent an otherwise valid inquiry.
  attribution: attributionSchema.catch({}).default({}),
};
export const auditSchema = leadSchema.extend({
  role: clean(1, 100, "Enter your role."),
  trade: clean(1, 100, "Choose your trade."),
  annualRevenue: optionalText(100),
  monthlyLeads: clean(1, 100, "Choose a lead volume range."),
  marketingSpend: optionalText(100),
  primaryService: clean(1, 200, "Enter your priority service."),
  jobValue: optionalText(100),
  bottleneck: clean(1, 3000, "Describe your biggest bottleneck."),
  hasStaff: z.enum(["Yes", "No"]),
  capacity: z.enum(["Yes", "Limited", "No"]),
  tracksSales: z.enum(["Yes", "Partially", "No"]),
  investmentReady: z.enum(["Yes", "Need to evaluate", "No"]).optional(),
  caseStudyInterest: z.enum(["Yes", "Maybe", "No"]),
  smsConsent: z.boolean().default(false),
});
// The /call application. Contact details arrive first as a partial so an
// abandoned application still reaches the CRM; the complete stage carries the
// answers. Questions after an early exit are left out, never invented.
const metaId = z
  .string()
  .max(500)
  .regex(/^fb\.\d\.\d+\.[\w.-]+$/)
  .optional()
  .catch(undefined);
export const funnelContactSchema = leadSchema
  .pick({ firstName: true, lastName: true, email: true, businessName: true })
  .extend({
    phone: leadSchema.shape.phone.refine(
      (v) => !!v,
      "Enter your phone number.",
    ),
    smsConsent: z.boolean().default(false),
  });
export const funnelSchema = funnelContactSchema
  .extend({
    stage: z.enum(["partial", "complete"]),
    trade: optionalChoice(funnelTrades),
    tradeOther: optionalText(100),
    annualRevenue: optionalChoice(funnelRevenue),
    monthlyLeads: optionalChoice(funnelLeadVolume),
    leadSource: optionalChoice(funnelLeadSources),
    bottleneck: optionalChoice(funnelBottlenecks),
    staff: optionalChoice(funnelStaff),
    jobValue: optionalChoice(funnelJobValue),
    caseStudyInterest: optionalChoice(funnelCaseStudy),
    // The browser's IANA time zone, such as America/Chicago.
    contactTimezone: z
      .string()
      .max(64)
      .regex(/^[A-Za-z_]+(\/[A-Za-z0-9_+-]+){0,2}$/)
      .optional()
      .catch(undefined),
    meta: z.object({ fbp: metaId, fbc: metaId }).optional().catch(undefined),
  })
  .superRefine((v, ctx) => {
    if (v.stage === "partial") return;
    const need = (key: keyof typeof v, message: string) => {
      if (!v[key]) ctx.addIssue({ code: "custom", path: [key], message });
    };
    need("trade", "Choose your trade.");
    if (v.trade === "Other") need("tradeOther", "Tell us your trade.");
    need("annualRevenue", "Choose your annual revenue.");
    if (v.annualRevenue === funnelRevenue[0]) return;
    need("monthlyLeads", "Choose your monthly lead volume.");
    need("leadSource", "Choose where most leads come from.");
    need("bottleneck", "Choose your biggest bottleneck.");
    need("staff", "Choose an answer.");
    need("jobValue", "Choose your average job value.");
    if (routeApplication(v) !== "unqualified")
      need("caseStudyInterest", "Choose an answer.");
  });
export const contactSchema = leadSchema.extend({
  challenge: clean(
    10,
    3000,
    "Tell us a little about your project (at least 10 characters).",
  ),
});
export const submissionSchema = z.union([
  contactSchema.extend({
    ...submissionFields,
    sourcePage: z.literal("/contact"),
  }),
  auditSchema.extend({ ...submissionFields, sourcePage: z.literal("/apply") }),
  leadSchema.extend({
    ...submissionFields,
    sourcePage: z.literal("/revenue-website"),
  }),
  funnelSchema.and(
    z.object({ ...submissionFields, sourcePage: z.literal("/call") }),
  ),
]);
export type LeadSubmission = z.input<typeof submissionSchema>;
export type GhlLeadPayload = Omit<
  z.output<typeof submissionSchema>,
  "companyWebsite" | "startedAt"
> & {
  submittedAt: string;
  receipt: string;
  // Present on /call applications so GHL can tag, route and report them.
  funnel?: {
    route: string;
    tags: string[];
    pipelineStage: string;
    callOpensOn?: string;
    bottleneckKey?: string;
    trade?: string;
    leadSource?: string;
    campaignName?: string;
    adName?: string;
    metaEventId?: string;
  };
};

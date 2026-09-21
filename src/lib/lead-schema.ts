import { z } from "zod";
const clean = (min: number, max: number, message: string) =>
  z
    .string()
    .trim()
    .transform((v) => v.replace(/[<>\u0000-\u001f]/g, "").trim())
    .pipe(
      z.string().min(min, message).max(max, "Please shorten this response."),
    );
import { customerValues, timelines, budgets } from "./lead-options";
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
    .transform((v) =>
      v ? (/^https?:\/\//i.test(v) ? v : `https://${v}`) : "",
    ),
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
        /^\+?[\d\s().-]+$/.test(v) &&
        v.replace(/\D/g, "").length >= 10 &&
        v.replace(/\D/g, "").length <= 15,
      "Enter a valid phone number.",
    )
    .transform((v) => v.replace(/[^\d+]/g, "")),
  city: clean(1, 100, "Enter your city."),
  service: clean(1, 200, "Tell us your primary product or service."),
  customerValue: z.enum(customerValues, { error: "Choose a customer value." }),
  source: clean(1, 200, "Tell us how customers find you."),
  timeline: z.enum(timelines, { error: "Choose a timeline." }),
  budget: z.enum(budgets, { error: "Choose a budget." }),
  challenge: clean(10, 3000, "Tell us a little more, at least 10 characters."),
});
export type LeadInput = z.input<typeof leadSchema>;
export const submissionSchema = leadSchema.extend({
  companyWebsite: z.string().max(0),
  startedAt: z.number().finite(),
  sourcePage: z.literal("/revenue-website"),
  attribution: z
    .object(
      Object.fromEntries(
        [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_term",
          "utm_content",
          "gclid",
          "msclkid",
          "fbclid",
          "landingPage",
          "referrer",
        ].map((key) => [key, z.string().max(2000).optional()]),
      ),
    )
    .default({}),
});

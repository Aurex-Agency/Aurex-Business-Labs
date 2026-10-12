"use client";
import { useRef, useState } from "react";
import { auditSchema } from "@/lib/lead-schema";
import { captureAttribution } from "@/lib/attribution";
import { confirmedConversion, track } from "@/lib/analytics";
import { ArrowUpRight } from "lucide-react";
import { DeferredEmbed } from "./interactions";
import { trades } from "@/content/trades";
const choices: Record<string, string[]> = {
  trade: [...trades],
  monthlyLeads: [
    "Fewer than 20",
    "20 to 50",
    "51 to 100",
    "101 to 250",
    "More than 250",
    "Not sure",
  ],
  hasStaff: ["Yes", "No"],
  capacity: ["Yes", "Limited", "No"],
  tracksSales: ["Yes", "Partially", "No"],
  caseStudyInterest: ["Yes", "Maybe", "No"],
};
const groups = [
  {
    legend: "01 / You and your business",
    fields: [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["email", "Work email"],
      ["phone", "Phone (optional)"],
      ["businessName", "Company name"],
      ["website", "Website (optional)"],
      ["role", "Your role"],
      ["trade", "Trade"],
    ],
  },
  {
    legend: "02 / Your opportunities",
    fields: [
      ["monthlyLeads", "Approximate monthly lead volume"],
      ["primaryService", "Priority service or project"],
      ["bottleneck", "Biggest sales or marketing bottleneck"],
    ],
  },
  {
    legend: "03 / Your team",
    fields: [
      [
        "hasStaff",
        "Do you have office, admin, dispatch, estimating or sales staff?",
      ],
      ["capacity", "Do you have capacity for additional work?"],
      ["tracksSales", "Do you track sales outcomes?"],
      ["caseStudyInterest", "Open to being featured as a case study?"],
    ],
  },
];
export function ApplicationForm({
  calendarUrl,
  calendarEmbed,
}: {
  calendarUrl?: string;
  calendarEmbed?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tone, setTone] = useState<"error" | "pending" | "success">("error");
  const [step, setStep] = useState(0);
  const startedAt = useRef<number>(0);
  const started = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  function begin() {
    if (!started.current) {
      started.current = true;
      startedAt.current = Date.now();
      track("application_start");
    }
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const raw = {
      ...Object.fromEntries(data),
      smsConsent: data.get("smsConsent") === "on",
    };
    const parsed = auditSchema.safeParse(raw);
    if (!parsed.success) {
      const issues = Object.fromEntries(
        parsed.error.issues.map((i) => [String(i.path[0]), i.message]),
      );
      setErrors(issues);
      setTone("error");
      setMessage(
        "Please correct the highlighted fields. Your answers are still here.",
      );
      const first = form.elements.namedItem(Object.keys(issues)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setErrors({});
    setBusy(true);
    setTone("pending");
    setMessage("Sending your application…");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          companyWebsite: data.get("companyWebsite") || "",
          startedAt: startedAt.current,
          sourcePage: "/apply",
          attribution: captureAttribution(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setErrors(result.fieldErrors || {});
        setTone("error");
        setMessage(
          result.message ||
            "We could not send your application. Please try again.",
        );
      } else {
        setSuccess(true);
        setTone("success");
        setMessage(
          "Your application has been received. Thank you for sharing your business details.",
        );
        track("application_submit");
        confirmedConversion(result.receipt);
      }
    } catch {
      setTone("error");
      setMessage(
        "We could not reach the server. Your answers are still here. Please try again.",
      );
    } finally {
      setBusy(false);
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  return (
    <div className="l-form-card">
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="l-form-status"
        data-tone={tone}
      >
        {message}
      </div>
      {success ? (
        <div className="l-form-success">
          {calendarEmbed ? (
            <DeferredEmbed url={calendarEmbed} title="audit calendar" />
          ) : calendarUrl ? (
            <a
              className="l-button"
              href={calendarUrl}
              onClick={() => track("calendar_open")}
            >
              Choose an audit time <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <p>
              We will contact you using the details you provided to arrange the
              next step.
            </p>
          )}
        </div>
      ) : (
        <form noValidate onSubmit={submit} onFocus={begin}>
          <ol className="l-form-steps" aria-hidden="true">
            {groups.map((g, i) => (
              <li key={g.legend} data-active={step === i ? "" : undefined}>
                <span>{i + 1}</span>
                {g.legend.split(" / ")[1]}
              </li>
            ))}
          </ol>
          <p className="l-small l-form-intro">
            All fields are required unless marked optional. You can select “Not
            sure” or “Prefer to discuss” where available.
          </p>
          {groups.map((g, gi) => (
            <fieldset key={g.legend} onFocus={() => setStep(gi)}>
              <legend>
                <span className="l-legend-index">
                  {g.legend.split(" / ")[0]}
                </span>
                {g.legend.split(" / ")[1]}
              </legend>
              <div className="l-form-grid">
                {g.fields.map(([name, label]) => (
                  <div
                    className={
                      name === "bottleneck" ? "l-field is-wide" : "l-field"
                    }
                    key={name}
                  >
                    <label htmlFor={name}>{label}</label>
                    {choices[name] ? (
                      <select
                        required
                        id={name}
                        name={name}
                        defaultValue=""
                        aria-invalid={!!errors[name]}
                        aria-describedby={
                          errors[name] ? `${name}-error` : undefined
                        }
                      >
                        <option value="" disabled>
                          Select an answer
                        </option>
                        {choices[name].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    ) : name === "bottleneck" ? (
                      <textarea
                        required
                        id={name}
                        name={name}
                        maxLength={3000}
                        rows={4}
                        aria-invalid={!!errors[name]}
                        aria-describedby={
                          errors[name] ? `${name}-error` : undefined
                        }
                      />
                    ) : (
                      <input
                        id={name}
                        name={name}
                        required={name !== "phone" && name !== "website"}
                        type={
                          name === "email"
                            ? "email"
                            : name === "phone"
                              ? "tel"
                              : "text"
                        }
                        maxLength={name === "website" ? 500 : 254}
                        autoComplete={
                          (
                            {
                              firstName: "given-name",
                              lastName: "family-name",
                              email: "email",
                              phone: "tel",
                              businessName: "organization",
                              website: "url",
                              role: "organization-title",
                            } as Record<string, string>
                          )[name] || "off"
                        }
                        aria-invalid={!!errors[name]}
                        aria-describedby={
                          errors[name] ? `${name}-error` : undefined
                        }
                      />
                    )}
                    {errors[name] && (
                      <p id={`${name}-error`} className="l-field-error">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="l-honeypot" aria-hidden="true">
            <label htmlFor="companyWebsite">Leave this field empty</label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="l-consent">
            <input name="smsConsent" type="checkbox" />
            <span>
              Optional: I agree to receive SMS reminders about my audit from
              Aurex Business Labs at the number provided. Consent is not
              required to apply or purchase. Message frequency varies. Message
              and data rates may apply. Reply STOP to opt out or HELP for help.
            </span>
          </label>
          <p className="l-small l-form-legal">
            By submitting, you ask Aurex Business Labs to respond to this
            application. Read our{" "}
            <a className="l-inline" href="/privacy">
              Privacy policy
            </a>{" "}
            and{" "}
            <a className="l-inline" href="/terms">
              Terms
            </a>
            . Do not send passwords, payment details or homeowner records.
          </p>
          <div className="l-form-submit">
            <button className="l-button" type="submit" disabled={busy}>
              {busy ? "Sending…" : "Request My Revenue Leakage Audit"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

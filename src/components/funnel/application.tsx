"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { captureAttribution } from "@/lib/attribution";
import { confirmedConversion, metaStandard, track } from "@/lib/analytics";
import {
  bookedPath,
  funnelBottlenecks,
  funnelCaseStudy,
  funnelJobValue,
  funnelLeadSources,
  funnelLeadVolume,
  funnelRevenue,
  funnelStaff,
  funnelTrades,
  isCalendly,
  routeApplication,
  type FunnelRoute,
} from "@/lib/funnel";

type Field = {
  name: string;
  label: string;
  options?: readonly string[];
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  half?: boolean;
};

const steps: { title: string; fields: Field[] }[] = [
  {
    title: "Where should we reach you?",
    fields: [
      {
        name: "firstName",
        label: "First name",
        autoComplete: "given-name",
        half: true,
      },
      {
        name: "lastName",
        label: "Last name",
        autoComplete: "family-name",
        half: true,
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        autoComplete: "tel",
        half: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        autoComplete: "email",
        half: true,
      },
      {
        name: "businessName",
        label: "Company name",
        autoComplete: "organization",
      },
    ],
  },
  {
    title: "Your business",
    fields: [
      { name: "trade", label: "What trade are you in?", options: funnelTrades },
      {
        name: "annualRevenue",
        label: "What is your approximate annual revenue?",
        options: funnelRevenue,
      },
    ],
  },
  {
    title: "Your leads",
    fields: [
      {
        name: "monthlyLeads",
        label: "How many leads does your business get in a typical month?",
        options: funnelLeadVolume,
      },
      {
        name: "leadSource",
        label: "Where do most of your leads come from right now?",
        options: funnelLeadSources,
      },
      {
        name: "bottleneck",
        label: "What is your biggest bottleneck right now?",
        options: funnelBottlenecks,
      },
    ],
  },
  {
    title: "Your team and jobs",
    fields: [
      {
        name: "staff",
        label: "Do you have office, dispatch or admin staff?",
        options: funnelStaff,
      },
      {
        name: "jobValue",
        label: "What is your average job value?",
        options: funnelJobValue,
      },
    ],
  },
  {
    title: "One last question",
    fields: [
      {
        name: "caseStudyInterest",
        label:
          "Would you be open to being featured as a case study client in exchange for reduced implementation pricing?",
        options: funnelCaseStudy,
      },
    ],
  },
];

const notAFit =
  "Thanks for your interest. Based on your answers, the Aurex Revenue Capture System isn’t the right fit at this stage. We work with established contractors who have existing lead flow and a team in place. If that changes, reach out anytime.";

function cookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Browser identifiers that raise Meta match quality for the server event.
function metaIds(fbclid?: string) {
  const fbp = cookie("_fbp");
  const fbc =
    cookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);
  return fbp || fbc ? { fbp, fbc } : undefined;
}

function timeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

export function FunnelApplication({
  calendar,
  contactEmail,
}: {
  calendar?: string;
  contactEmail?: string;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sms, setSms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<"fit" | "unqualified">();
  const startedAt = useRef(0);
  const moved = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus({ preventScroll: true });
    const top = card.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) card.current?.scrollIntoView({ block: "start" });
  }, [step, result]);

  useEffect(() => {
    if (result !== "fit" || !calendar || !isCalendly(calendar)) return;
    const booked = (event: MessageEvent) => {
      if (
        event.origin === "https://calendly.com" &&
        event.data?.event === "calendly.event_scheduled"
      )
        // Give Calendly's own redirect, which carries the booked time, a
        // moment to happen first. Without one, go to the booked page.
        fallback = window.setTimeout(
          () => window.location.assign(bookedPath),
          2500,
        );
    };
    let fallback = 0;
    window.addEventListener("message", booked);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("message", booked);
    };
  }, [result, calendar]);

  function begin() {
    if (startedAt.current) return;
    startedAt.current = Date.now();
    track("application_start", { form: "call" }, { meta: false });
  }

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name])
      setErrors((e) => {
        const rest = { ...e };
        delete rest[name];
        return rest;
      });
  }

  function payload(stage: "partial" | "complete", upTo: number) {
    const answered = Object.fromEntries(
      steps
        .slice(0, upTo + 1)
        .flatMap((s) => s.fields.map((f) => f.name))
        .concat(values.trade === "Other" ? ["tradeOther"] : [])
        .map((name) => [name, values[name] ?? ""]),
    );
    const attribution = captureAttribution();
    return {
      ...answered,
      smsConsent: sms,
      stage,
      companyWebsite: honeypot.current?.value || "",
      startedAt: startedAt.current,
      sourcePage: "/call",
      attribution,
      meta: metaIds(attribution.fbclid),
      contactTimezone: timeZone(),
    };
  }

  function check(index: number) {
    const found: Record<string, string> = {};
    if (index === 0) {
      // A light check keeps zod out of the page bundle; the server validates
      // everything again with the shared schema.
      const text = (name: string) => (values[name] ?? "").trim();
      if (!text("firstName")) found.firstName = "Enter your first name.";
      if (!text("lastName")) found.lastName = "Enter your last name.";
      const digits = text("phone").replace(/\D/g, "");
      if (!digits) found.phone = "Enter your phone number.";
      else if (
        !/^\+?[\d\s().-]+$/.test(text("phone")) ||
        digits.length < 10 ||
        digits.length > 15
      )
        found.phone = "Enter a valid phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text("email")))
        found.email = "Enter a valid email address.";
      if (!text("businessName"))
        found.businessName = "Enter your business name.";
    } else {
      for (const f of steps[index].fields)
        if (!values[f.name]) found[f.name] = "Choose an answer.";
      if (index === 1 && values.trade === "Other" && !values.tradeOther?.trim())
        found.tradeOther = "Tell us your trade.";
    }
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setMessage("Please answer the highlighted questions.");
      document.getElementById(`call-${first}`)?.focus();
      return false;
    }
    setMessage("");
    return true;
  }

  function go(index: number) {
    moved.current = true;
    setStep(index);
  }

  async function next(event: React.FormEvent) {
    event.preventDefault();
    if (busy || !check(step)) return;
    begin();
    if (step === 0) {
      // Capture the contact even if the rest is never finished.
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload("partial", 0)),
        keepalive: true,
      }).catch(() => {});
      return go(1);
    }
    const route = routeApplication(values);
    if (route === "unqualified" || step === steps.length - 1)
      return finish(route ?? "qualified");
    go(step + 1);
  }

  async function finish(expected: FunnelRoute) {
    setBusy(true);
    setMessage("Sending your application…");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload("complete", step)),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        const fieldErrors: Record<string, string> = data.fieldErrors || {};
        setErrors(fieldErrors);
        setMessage(
          data.message ||
            "We could not send your application. Please try again.",
        );
        const back = steps.findIndex((s) =>
          s.fields.some((f) => fieldErrors[f.name]),
        );
        if (back >= 0 && back !== step) go(back);
        return;
      }
      const route: FunnelRoute = data.route || expected;
      setMessage("");
      moved.current = true;
      if (route === "unqualified") return setResult("unqualified");
      // Only applicants on the qualified path ever reach the pixel.
      metaStandard("Lead", data.receipt);
      confirmedConversion(data.receipt);
      track("application_submit", { form: "call" });
      setResult("fit");
    } catch {
      setMessage(
        "We could not reach the server. Your answers are still here. Please try again.",
      );
    } finally {
      setBusy(false);
      requestAnimationFrame(() => {
        if (status.current?.textContent) status.current.focus();
      });
    }
  }

  const calendarSrc = (() => {
    if (!calendar) return undefined;
    const url = new URL(calendar);
    const prefill: Record<string, string | undefined> = {
      first_name: values.firstName,
      last_name: values.lastName,
      name: `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim(),
      email: values.email,
      phone: values.phone,
    };
    for (const [key, value] of Object.entries(prefill))
      if (value) url.searchParams.set(key, value);
    if (isCalendly(calendar) && typeof window !== "undefined") {
      url.searchParams.set("embed_domain", window.location.host);
      url.searchParams.set("embed_type", "Inline");
    }
    return url.href;
  })();

  const total = steps.length;
  return (
    <div className="l-call-card" ref={card}>
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="l-form-status"
        data-tone={busy ? "pending" : "error"}
      >
        {message}
      </div>
      {result === "unqualified" ? (
        <div className="l-call-result">
          <h3 ref={heading} tabIndex={-1}>
            Thanks for applying
          </h3>
          <p>{notAFit}</p>
          {contactEmail && (
            <p>
              <a className="l-inline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          )}
        </div>
      ) : result === "fit" ? (
        <div className="l-call-result is-fit">
          <p className="l-call-kicker">
            <Check size={16} aria-hidden="true" /> Application received
          </p>
          <h3 ref={heading} tabIndex={-1}>
            Last step: pick a time for your call
          </h3>
          {calendarSrc ? (
            <>
              <p>
                Choose a time that works below. You will get a confirmation by
                email as soon as it is booked.
              </p>
              <iframe
                className="l-call-calendar"
                src={calendarSrc}
                title="Book your strategy call"
                onLoad={() => track("calendar_open", { form: "call" })}
              />
              <p className="l-small">
                Calendar not loading?{" "}
                <a
                  className="l-inline"
                  href={calendarSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open it in a new tab
                </a>
              </p>
            </>
          ) : (
            <p>
              We will call you at the number you gave us to set up a time that
              works.
            </p>
          )}
        </div>
      ) : (
        <form noValidate onSubmit={next} onFocus={begin}>
          <div className="l-call-apply-head">
            <h2 id="apply-title">See if your business is a fit</h2>
            <p>Apply for a strategy call. Takes about two minutes.</p>
          </div>
          <div className="l-call-progress">
            <p>
              Step {step + 1} of {total}
            </p>
            <span
              className="l-call-bar"
              role="progressbar"
              aria-label="Application progress"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={step + 1}
            >
              <span style={{ width: `${((step + 1) / total) * 100}%` }} />
            </span>
          </div>
          <div role="group" aria-labelledby="call-step-title" key={step}>
            <h3 id="call-step-title" ref={heading} tabIndex={-1}>
              {steps[step].title}
            </h3>
            <div className="l-call-grid">
              {steps[step].fields.map((f) => (
                <FieldRow
                  key={f.name}
                  field={f}
                  value={values[f.name] ?? ""}
                  error={errors[f.name]}
                  onChange={(v) => set(f.name, v)}
                />
              ))}
              {step === 1 && values.trade === "Other" && (
                <FieldRow
                  field={{
                    name: "tradeOther",
                    label: "Which trade?",
                    autoComplete: "off",
                  }}
                  value={values.tradeOther ?? ""}
                  error={errors.tradeOther}
                  onChange={(v) => set("tradeOther", v)}
                />
              )}
            </div>
            {step === 0 && (
              <label className="l-consent l-call-consent">
                <input
                  type="checkbox"
                  name="smsConsent"
                  checked={sms}
                  onChange={(e) => setSms(e.target.checked)}
                />
                <span>
                  Optional: text me reminders about my call from Aurex Business
                  Labs at this number. Not required to apply. Message frequency
                  varies. Message and data rates may apply. Reply STOP to opt
                  out or HELP for help.
                </span>
              </label>
            )}
          </div>
          <div className="l-honeypot" aria-hidden="true">
            <label htmlFor="call-companyWebsite">Leave this field empty</label>
            <input
              ref={honeypot}
              id="call-companyWebsite"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="l-call-actions">
            {step > 0 && (
              <button
                type="button"
                className="l-button is-ghost"
                onClick={() => {
                  setErrors({});
                  setMessage("");
                  go(step - 1);
                }}
                disabled={busy}
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>
            )}
            <button className="l-button" type="submit" disabled={busy}>
              {busy
                ? "Sending…"
                : step === total - 1
                  ? "Submit and pick a time"
                  : "Continue"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          {step === 0 && (
            <p className="l-small l-call-legal">
              By continuing you agree to our{" "}
              <a className="l-inline" href="/privacy">
                privacy policy
              </a>{" "}
              and{" "}
              <a className="l-inline" href="/terms">
                terms
              </a>
              . We never sell your information.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function FieldRow({
  field,
  value,
  error,
  onChange,
}: {
  field: Field;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = `call-${field.name}`;
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className={field.half ? "l-field" : "l-field is-wide"}>
      <label htmlFor={id}>{field.label}</label>
      {field.options ? (
        <select
          id={id}
          name={field.name}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        >
          <option value="" disabled>
            Select an answer
          </option>
          {field.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          required
          type={field.type ?? "text"}
          inputMode={field.type === "tel" ? "tel" : undefined}
          autoComplete={field.autoComplete}
          maxLength={
            field.type === "email" ? 254 : field.type === "tel" ? 30 : 160
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="l-field-error">
          {error}
        </p>
      )}
    </div>
  );
}

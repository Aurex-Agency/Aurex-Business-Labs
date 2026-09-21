"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath, type Resolver } from "react-hook-form";
import { ArrowLeft, ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { customerValues, timelines, budgets } from "@/lib/lead-options";
import type { LeadInput } from "@/lib/lead-schema";
import { captureAttribution } from "@/lib/attribution";
import { PaybackPromise } from "./payback-promise";
import { track } from "@/lib/analytics";
const resolveLead: Resolver<LeadInput> = async (values) => {
  const { leadSchema } = await import("@/lib/lead-schema");
  const result = leadSchema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors = Object.fromEntries(
    result.error.issues.map((issue) => [
      issue.path[0],
      { type: issue.code, message: issue.message },
    ]),
  );
  return { values: {}, errors };
};
const stepOne: FieldPath<LeadInput>[] = [
  "firstName",
  "lastName",
  "businessName",
  "website",
  "email",
  "phone",
  "city",
];
export function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const started = useRef(0);
  const began = useRef(false);
  const honey = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement | null>(null);
  const focusSummary = useCallback((node: HTMLDivElement | null) => {
    summary.current = node;
    node?.focus();
  }, []);
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: resolveLead,
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      website: "",
      email: "",
      phone: "",
      city: "",
      service: "",
      source: "",
      challenge: "",
    },
    shouldUnregister: false,
    shouldFocusError: false,
  });
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const focusHeading = () =>
    requestAnimationFrame(() => heading.current?.focus());
  async function next() {
    setShowErrors(true);
    if (await trigger(stepOne)) {
      track("form_step_one_complete");
      setShowErrors(false);
      setStep(2);
      focusHeading();
    } else requestAnimationFrame(() => summary.current?.focus());
  }
  async function submit(values: LeadInput) {
    setBusy(true);
    setStatus("Sending your request securely…");
    track("lead_submit_attempt");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          companyWebsite: honey.current?.value || "",
          startedAt: started.current,
          sourcePage: "/revenue-website",
          attribution: captureAttribution(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.receipt)
        throw new Error(
          result.message || "We could not send your request. Please try again.",
        );
      try {
        sessionStorage.setItem(
          "aurex-confirmed-lead",
          JSON.stringify({
            receipt: result.receipt,
            time: Date.now(),
            development: !!result.development,
          }),
        );
      } catch {}
      setSuccess(true);
      setStatus("Request received. Opening the booking calendar.");
      router.push("/revenue-website/thank-you#book");
    } catch (error) {
      track("lead_submit_error");
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The request took too long. Your answers are still here. Please try again.",
      );
      setBusy(false);
    }
  }
  const input = (
    name: FieldPath<LeadInput>,
    label: string,
    type = "text",
    autocomplete?: string,
    wide = false,
  ) => (
    <div className={`field ${wide ? "wide" : ""}`} key={name}>
      <label htmlFor={name}>
        {label}
        {name === "website" && <span> (optional)</span>}
      </label>
      <input
        id={name}
        type={type}
        autoComplete={autocomplete}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  const select = (
    name: "customerValue" | "timeline" | "budget",
    label: string,
    options: readonly string[],
  ) => (
    <div className="field" key={name}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name)}
        defaultValue=""
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  const visibleErrors = Object.entries(errors).filter(([key]) =>
    step === 1
      ? stepOne.includes(key as FieldPath<LeadInput>)
      : !stepOne.includes(key as FieldPath<LeadInput>),
  );
  return (
    <section className="section review-section" id="review">
      <div className="container review-layout">
        <div className="review-intro">
          <span className="eyebrow">09 / FREE WEBSITE REVENUE REVIEW</span>
          <h2>
            See what your website may be <em>leaving on the table.</em>
          </h2>
          <p>
            Tell us about the business and current website. Aurex will review
            the experience, conversion path, tracking, and follow-up process
            before the call.
          </p>
          <div className="review-promise">
            <span className="little-rule" />
            <strong>
              A practical conversation.
              <br />A clearer way forward.
            </strong>
            <p>
              We&apos;ll look at what&apos;s working, what&apos;s missing, and
              whether a connected system makes sense for your business.
            </p>
          </div>
          <p className="review-price">
            Custom projects start at $3,500.
            <br />
            Your Website Revenue Review is free.
          </p>
          <PaybackPromise compact />
        </div>
        <div className="form-shell">
          <div className="form-progress" aria-label={`Step ${step} of 2`}>
            <span className={step === 1 ? "current" : "done"}>
              <b>{step > 1 ? <Check size={13} /> : 1}</b>Your business
            </span>
            <i />
            <span className={step === 2 ? "current" : ""}>
              <b>2</b>The opportunity
            </span>
          </div>
          <form
            noValidate
            onFocus={() => {
              if (!began.current) {
                began.current = true;
                track("form_start");
              }
            }}
            onSubmit={(e) => {
              if (step === 1) {
                e.preventDefault();
                void next();
              } else
                void handleSubmit(submit, () => {
                  setShowErrors(true);
                  requestAnimationFrame(() => summary.current?.focus());
                })(e);
            }}
          >
            <div className="form-title">
              <span className="micro-label">STEP 0{step} / 02</span>
              <h3 ref={heading} tabIndex={-1}>
                {step === 1 ? "About Your Business" : "About the Opportunity"}
              </h3>
              <p>
                {step === 1
                  ? "First, a little context so we can come prepared."
                  : "Help us understand what a better website could do."}
              </p>
            </div>
            {showErrors && visibleErrors.length > 0 && (
              <div
                className="error-summary"
                role="alert"
                tabIndex={-1}
                ref={focusSummary}
              >
                <strong>Please check the following:</strong>
                <ul>
                  {visibleErrors.map(([name, error]) => (
                    <li key={name}>
                      <a href={`#${name}`}>{error?.message}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="companyWebsite">Leave this empty</label>
              <input
                ref={honey}
                id="companyWebsite"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <fieldset disabled={busy} hidden={step !== 1}>
              <legend className="sr-only">About your business</legend>
              <div className="form-grid">
                {input("firstName", "First name", "text", "given-name")}
                {input("lastName", "Last name", "text", "family-name")}
                {input(
                  "businessName",
                  "Business name",
                  "text",
                  "organization",
                  true,
                )}
                {input("website", "Website URL", "text", "url", true)}
                {input("email", "Email", "email", "email")}
                {input("phone", "Phone", "tel", "tel")}
                {input("city", "City", "text", "address-level2", true)}
              </div>
            </fieldset>
            <fieldset disabled={busy} hidden={step !== 2}>
              <legend className="sr-only">About the opportunity</legend>
              <div className="form-grid">
                {input(
                  "service",
                  "Primary product or service",
                  "text",
                  undefined,
                  true,
                )}
                {select(
                  "customerValue",
                  "Average value of a new customer",
                  customerValues,
                )}
                {select("timeline", "Desired project timeline", timelines)}
                {input(
                  "source",
                  "Current primary source of new business",
                  "text",
                  undefined,
                  true,
                )}
                {select("budget", "Project budget", budgets)}
                <div className="field wide">
                  <label htmlFor="challenge">
                    Biggest website or growth challenge
                  </label>
                  <textarea
                    id="challenge"
                    rows={4}
                    {...register("challenge")}
                    aria-invalid={!!errors.challenge}
                    aria-describedby={
                      errors.challenge ? "challenge-error" : undefined
                    }
                  />
                  {errors.challenge && (
                    <span className="field-error" id="challenge-error">
                      {errors.challenge.message}
                    </span>
                  )}
                </div>
              </div>
            </fieldset>
            <div
              role="status"
              aria-live="polite"
              className={`form-status ${status && !busy && !success ? "has-error" : ""}`}
            >
              {status}
            </div>
            <div className="form-actions">
              {step === 2 && (
                <button
                  type="button"
                  className="back-button"
                  disabled={busy}
                  onClick={() => {
                    setStep(1);
                    setStatus("");
                    setShowErrors(false);
                    focusHeading();
                  }}
                >
                  <ArrowLeft size={17} />
                  Back
                </button>
              )}
              <button className="button" disabled={busy} type="submit">
                {busy ? (
                  <>
                    <LoaderCircle className="spinner" size={18} />
                    {success ? "Request received" : "Sending request…"}
                  </>
                ) : (
                  <>
                    {step === 1
                      ? "Continue to the opportunity"
                      : "Request My Free Review"}
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
            </div>
            <p className="consent">
              By submitting this form, you agree that Aurex Business Labs may
              contact you by phone, email, or text about your request. Message
              and data rates may apply. Consent is not a condition of purchase.{" "}
              <a href="/privacy">Privacy policy</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

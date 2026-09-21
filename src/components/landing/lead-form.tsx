"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath, type Resolver } from "react-hook-form";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import type { LeadInput, LeadSubmission } from "@/lib/lead-schema";
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
export function LeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const started = useRef(0);
  const began = useRef(false);
  const honey = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement | null>(null);
  const focusSummary = useCallback((node: HTMLDivElement | null) => {
    summary.current = node;
    node?.focus();
  }, []);
  const {
    register,
    handleSubmit,
    setError,
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
      challenge: "",
    },
    shouldUnregister: false,
    shouldFocusError: false,
  });
  useEffect(() => {
    started.current = Date.now();
  }, []);
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
        } satisfies LeadSubmission),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.receipt) {
        const visibleFields = [
          "firstName",
          "lastName",
          "businessName",
          "email",
          "phone",
          "website",
          "challenge",
        ] as const;
        for (const field of visibleFields) {
          if (typeof result.fieldErrors?.[field] === "string") {
            setError(field, {
              type: "server",
              message: result.fieldErrors[field],
            });
            setShowErrors(true);
          }
        }
        requestAnimationFrame(() => summary.current?.focus());
        throw new Error(
          result.message || "We could not send your request. Please try again.",
        );
      }
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
        {(name === "website" || name === "phone") && <span> (optional)</span>}
      </label>
      <input
        id={name}
        type={type}
        autoComplete={autocomplete}
        aria-required={name !== "website" && name !== "phone"}
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
  const visibleErrors = Object.entries(errors);
  return (
    <section className="section review-section" id="review">
      <div className="container review-layout">
        <div className="review-intro">
          <span className="eyebrow">09 / FREE WEBSITE REVENUE REVIEW</span>
          <h2>
            See what your website may be <em>leaving on the table.</em>
          </h2>
          <p>
            Share your contact details, then choose a time for your free review.
            We can talk through your goals together on the call.
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
          <form
            noValidate
            onFocus={() => {
              if (!began.current) {
                began.current = true;
                track("form_start");
              }
            }}
            onSubmit={handleSubmit(submit, () => {
              setShowErrors(true);
              requestAnimationFrame(() => summary.current?.focus());
            })}
          >
            <div className="form-title">
              <span className="micro-label">
                LET&apos;S TALK ABOUT YOUR WEBSITE
              </span>
              <h3>Book Your Free Review</h3>
              <p>Just the basics. You can choose your call time next.</p>
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
            <div className="honeypot" aria-hidden="true" hidden>
              <label htmlFor="contact-check">Leave this empty</label>
              <input
                ref={honey}
                id="contact-check"
                name="contact_check"
                tabIndex={-1}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
              />
            </div>
            <fieldset disabled={busy}>
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
                <div className="field wide">
                  <label htmlFor="challenge">
                    Anything you&apos;d like us to know? <span>(optional)</span>
                  </label>
                  <textarea
                    id="challenge"
                    rows={3}
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
              <button className="button" disabled={busy} type="submit">
                {busy ? (
                  <>
                    <LoaderCircle className="spinner" size={18} />
                    {success ? "Request received" : "Sending request…"}
                  </>
                ) : (
                  <>
                    Request My Free Review
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

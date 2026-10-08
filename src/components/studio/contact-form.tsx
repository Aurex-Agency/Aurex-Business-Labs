"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { contactSchema } from "@/lib/lead-schema";
import { captureAttribution } from "@/lib/attribution";
import { confirmedConversion, track } from "@/lib/analytics";
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const start = useRef(0);
  const status = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const values = new FormData(form);
    const parsed = contactSchema.safeParse(Object.fromEntries(values));
    if (!parsed.success) {
      const errs = Object.fromEntries(
        parsed.error.issues.map((i) => [String(i.path[0]), i.message]),
      );
      setErrors(errs);
      setMessage(
        "A few details need another look. Your message is still here.",
      );
      const field = form.elements.namedItem(Object.keys(errs)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setErrors({});
    setBusy(true);
    setMessage("Sending your message…");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          sourcePage: "/contact",
          companyWebsite: values.get("companyWebsite") || "",
          startedAt: start.current,
          attribution: captureAttribution(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setMessage(
          result.message || "Your message could not be sent. Please try again.",
        );
        setErrors(result.fieldErrors || {});
      } else {
        setSent(true);
        setMessage(
          "Message received. Thank you for telling us a little about your business. We’ll be in touch using the details you shared.",
        );
        track("contact_submit");
        confirmedConversion(result.receipt);
      }
    } catch {
      setMessage(
        "We couldn’t connect. Your message is still here. Please try again.",
      );
    } finally {
      setBusy(false);
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  return (
    <div className="s-form">
      <div
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={status}
        className="s-form-status"
      >
        {message}
      </div>
      {sent ? (
        <Link className="s-text-link" href="/work">
          Explore the work ↗
        </Link>
      ) : (
        <form
          noValidate
          onSubmit={submit}
          onFocus={() => {
            if (!start.current) {
              start.current = Date.now();
              track("contact_start");
            }
          }}
        >
          <div className="s-form-grid">
            {[
              ["firstName", "First name", "given-name"],
              ["lastName", "Last name", "family-name"],
              ["email", "Email", "email"],
              ["businessName", "Business name", "organization"],
              ["website", "Website (optional)", "url"],
              ["phone", "Phone (optional)", "tel"],
            ].map(([name, label, autoComplete]) => (
              <div className="s-field" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  name={name}
                  autoComplete={autoComplete}
                  type={
                    name === "email"
                      ? "email"
                      : name === "phone"
                        ? "tel"
                        : "text"
                  }
                  required={!["website", "phone"].includes(name)}
                  maxLength={name === "website" ? 500 : 254}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
                {errors[name] && (
                  <p className="s-error" id={`${name}-error`}>
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
            <div className="s-field s-field-wide">
              <label htmlFor="challenge">What are you thinking about?</label>
              <textarea
                name="challenge"
                id="challenge"
                rows={4}
                required
                maxLength={3000}
                placeholder="A new website, a clearer direction, a better way to connect things…"
                aria-invalid={!!errors.challenge}
                aria-describedby={
                  errors.challenge ? "challenge-error" : undefined
                }
              />
              {errors.challenge && (
                <p id="challenge-error" className="s-error">
                  {errors.challenge}
                </p>
              )}
            </div>
          </div>
          <div className="s-honeypot" aria-hidden="true">
            <label htmlFor="companyWebsite">Leave this empty</label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <p className="a-small">
            We’ll use these details to respond to your message. Please don’t
            include passwords or sensitive customer information.{" "}
            <a className="a-inline" href="/privacy">
              Privacy policy
            </a>
            .
          </p>
          <button type="submit" disabled={busy} className="a-button">
            {busy ? "Sending…" : "Send your message"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      )}
    </div>
  );
}

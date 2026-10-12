"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Printer,
  RotateCcw,
  Check,
  Copy,
} from "lucide-react";
import { track } from "@/lib/analytics";
const fields = [
  "Valid inquiries",
  "Contacted",
  "Appointments booked",
  "Estimates delivered",
  "Sold jobs",
];
export function DownloadResource({
  href,
  label,
  slug,
}: {
  href: string;
  label: string;
  slug: string;
}) {
  return (
    <a
      className="l-button"
      href={href}
      download
      onClick={() => track("resource_download", { resource: slug })}
    >
      {label}
      <Download size={17} />
    </a>
  );
}
export function PrintResource() {
  return (
    <button className="l-text-link l-print" onClick={() => window.print()}>
      Print this resource <Printer size={17} />
    </button>
  );
}
// Copies an example message so it can be adapted in the team's own tools.
export function CopyScript({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }
  return (
    <button type="button" className="l-copy" data-state={state} onClick={copy}>
      {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
      <span aria-live="polite">
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Select the text to copy"
            : "Copy message"}
      </span>
    </button>
  );
}
export function Scorecard() {
  const [values, setValues] = useState<string[]>(fields.map(() => ""));
  const [calculated, setCalculated] = useState<number[] | null>(null);
  const [error, setError] = useState("");
  function calculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const numbers = values.map(Number);
    if (
      values.some((v) => v.trim() === "") ||
      numbers.some((v) => !Number.isSafeInteger(v) || v < 0)
    ) {
      setError("Enter a whole number of zero or more for each stage.");
      const invalid = values.findIndex(
        (v) =>
          v.trim() === "" || !Number.isSafeInteger(Number(v)) || Number(v) < 0,
      );
      e.currentTarget
        .querySelector<HTMLInputElement>(`#count-${invalid}`)
        ?.focus();
      return;
    }
    if (numbers.some((n, i) => i > 0 && n > numbers[i - 1])) {
      setError(
        "Use the same group of inquiries. Each stage must be equal to or smaller than the previous stage.",
      );
      const invalid = numbers.findIndex((n, i) => i > 0 && n > numbers[i - 1]);
      e.currentTarget
        .querySelector<HTMLInputElement>(`#count-${invalid}`)
        ?.focus();
      return;
    }
    setError("");
    setCalculated(numbers);
    track("resource_tool_complete", {
      resource: "contractor-revenue-scorecard",
    });
  }
  function download() {
    if (!calculated) return;
    const rows = [
      "Stage,Count,Share of previous stage",
      ...fields.map(
        (f, i) =>
          `${f},${calculated[i]},${i && calculated[i - 1] ? ((calculated[i] / calculated[i - 1]) * 100).toFixed(1) + "%" : "Not applicable"}`,
      ),
    ];
    const url = URL.createObjectURL(
      new Blob([rows.join("\r\n")], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "aurex-scorecard.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    track("resource_download", { resource: "completed-scorecard" });
  }
  return (
    <div className="l-tool" id="scorecard">
      <p className="l-eyebrow">Your working scorecard</p>
      <h2>Follow the handoffs.</h2>
      <p id="scorecard-help">
        Enter counts for the same group of inquiries, in order. Your entries
        stay in this browser session and are not sent to Aurex.
      </p>
      <form
        onSubmit={calculate}
        aria-describedby="scorecard-help scorecard-error"
        noValidate
      >
        <div className="l-score-inputs">
          {fields.map((f, i) => (
            <label key={f} htmlFor={`count-${i}`}>
              <span>
                0{i + 1} / {f}
              </span>
              <input
                id={`count-${i}`}
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                value={values[i]}
                aria-invalid={!!error}
                aria-describedby={error ? "scorecard-error" : undefined}
                onChange={(e) => {
                  setValues((v) =>
                    v.map((old, j) => (j === i ? e.target.value : old)),
                  );
                  setCalculated(null);
                  setError("");
                }}
                placeholder="0"
              />
            </label>
          ))}
        </div>
        <p className="l-tool-error" id="scorecard-error" role="alert">
          {error}
        </p>
        <div className="l-actions">
          <button className="l-button" type="submit">
            Calculate handoff rates{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <button
            className="l-text-link"
            type="button"
            onClick={() => {
              setValues(fields.map(() => ""));
              setCalculated(null);
              setError("");
            }}
          >
            Reset <RotateCcw size={15} />
          </button>
        </div>
      </form>
      <div aria-live="polite">
        {calculated && (
          <div className="l-score-results">
            <h3>Your handoff rates</h3>
            <dl>
              {fields.slice(1).map((f, i) => (
                <div key={f}>
                  <dt>
                    {f} / {fields[i].toLowerCase()}
                  </dt>
                  <dd>
                    {calculated[i]
                      ? `${((calculated[i + 1] / calculated[i]) * 100).toFixed(1)}%`
                      : "No denominator"}
                  </dd>
                </div>
              ))}
            </dl>
            <p>
              These are observed handoffs for your group, not benchmarks or
              forecasts. Review records and timing before deciding what to
              change.
            </p>
            <button className="l-text-link" onClick={download}>
              Download your results <Download size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export function Checklist({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="l-check-tool">
      <div className="l-check-progress">
        <p aria-live="polite">
          {checked.length} of {items.length} reviewed
        </p>
        <button className="l-text-link" onClick={() => setChecked([])}>
          Reset <RotateCcw size={15} />
        </button>
      </div>
      <p className="l-small">
        Use this with your team. Progress lasts for this page visit only.
      </p>
      <div className="l-check-items">
        {items.map((item, i) => (
          <label key={item.title} id={`step-${i}`}>
            <input
              type="checkbox"
              checked={checked.includes(item.title)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...checked, item.title]
                  : checked.filter((v) => v !== item.title);
                setChecked(next);
                if (next.length === items.length)
                  track("resource_tool_complete", {
                    resource: "lead-response-checklist",
                  });
              }}
            />
            <span className="l-check-box" aria-hidden="true">
              <Check size={15} />
            </span>
            <span>
              <strong>
                <small>{String(i + 1).padStart(2, "0")} / </small>
                {item.title}
              </strong>
              <span>{item.text}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

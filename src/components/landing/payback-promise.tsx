import { ArrowUpRight, ShieldCheck } from "lucide-react";
export function PaybackPromise({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`payback-promise ${compact ? "compact" : ""}`}
      href="#launch-guarantee"
    >
      <ShieldCheck
        size={compact ? 22 : 27}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span>
        <strong>$1,000 back if we miss our commitment.</strong>
        <small>
          Your agreed scope, ready for launch in 21 business days. See the
          conditions.
        </small>
      </span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

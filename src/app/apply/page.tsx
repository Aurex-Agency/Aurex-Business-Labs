import {
  BadgeCheck,
  Gauge,
  ListChecks,
  Route,
  ShieldCheck,
  Target,
} from "lucide-react";
import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
import { ApplicationForm } from "@/components/authority/application-form";
export const metadata = pageMeta(
  "Request a Revenue Leakage Audit",
  "Map your contractor lead-to-sale process, find missed opportunities and identify three priority improvements.",
  "/apply",
);
const deliverables = [
  [Gauge, "Revenue Leak Scorecard"],
  [Route, "Lead-to-sale process map"],
  [Target, "Break-Even Job Target"],
  [ListChecks, "Three-Action Priority Plan"],
  [BadgeCheck, "Aurex Fit Assessment"],
] as const;
export default function Apply() {
  return (
    <Shell>
      <PageHero
        eyebrow="Revenue Leakage Audit"
        path="/apply"
        title={
          <>
            Where is the next job <em>getting lost?</em>
          </>
        }
        description="Map your current lead-to-sale process, find where opportunities stall, and identify the three improvements most worth addressing first."
      />
      <section
        className="l-form-section"
        aria-label="Revenue Leakage Audit application"
      >
        <div className="l-wrap l-form-layout">
          <aside className="l-form-aside">
            <h2>
              A clearer picture. <em>A practical next step.</em>
            </h2>
            <ul className="l-deliverables">
              {deliverables.map(([Icon, label]) => (
                <li key={label}>
                  <span className="l-icon-badge" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className="l-assurance">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>
                Complimentary diagnostic. No obligation to hire Aurex. No
                account passwords required. You keep the findings.
              </span>
            </p>
          </aside>
          <ApplicationForm
            calendarUrl={site.auditUrl}
            calendarEmbed={site.calendarEmbed}
          />
        </div>
      </section>
    </Shell>
  );
}

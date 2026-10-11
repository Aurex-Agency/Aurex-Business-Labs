import Link from "next/link";
import { Shell, PageHero, Schema } from "@/components/authority/shared";
import { JourneyExplorer } from "@/components/learn/field-guide";
import { LearningCTA } from "@/components/learn/shared";
import { stages } from "@/content/resources";
import { pageMeta, organization } from "@/lib/seo";
import { site } from "@/lib/site-config";
export const metadata = pageMeta(
  "Revenue Capture System for Contractors",
  site.companyDescription,
  "/revenue-capture-system",
);
export default function System() {
  return (
    <Shell>
      <Schema
        data={{
          "@type": "Service",
          name: site.flagshipService,
          description: site.companyDescription,
          provider: organization,
          areaServed: site.serviceArea,
        }}
      />
      <PageHero
        eyebrow="Aurex Revenue Capture System"
        path="/revenue-capture-system"
        title="See how the pieces connect."
        description="A practical framework for customer acquisition, lead handling, opportunity recovery, and repeat business. Four stages, with measurement supporting each one."
      />
      <div className="l-wrap">
        <JourneyExplorer />
        <section className="l-section">
          <div className="l-section-head">
            <div>
              <p className="l-eyebrow">A shared way to think</p>
              <h2>
                From the first inquiry
                <br />
                to the next opportunity.
              </h2>
            </div>
            <p>
              A handoff needs an owner, an action, and a way to know what
              happened. Use the framework to find the question your team should
              answer next.
            </p>
          </div>
          <div className="l-method-grid">
            {stages.map((s, i) => (
              <article key={s.name}>
                <span className="l-method-index">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <Link
                  className="l-text-link"
                  href={`/start-here#${s.name.toLowerCase()}`}
                >
                  Explore this stage ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="l-section l-feature">
          <div>
            <p className="l-eyebrow">Measurement supports every stage</p>
            <h2>
              Follow the handoff.
              <br />
              Keep the context.
            </h2>
          </div>
          <div>
            <p>
              Track sources, conversations, appointments, estimates, and sold
              jobs together. Keep collected revenue distinct from signed work,
              and preserve the original source when a follow-up helps an
              opportunity move forward.
            </p>
            <p style={{ marginTop: 20 }}>
              The Aurex Revenue Command Center brings that view together. The
              same definitions can start in a simple worksheet.
            </p>
            <Link
              className="l-text-link"
              href="/resources/contractor-revenue-scorecard"
            >
              Use the free scorecard ↗
            </Link>
            <br />
            <Link className="l-text-link" href="/results/methodology">
              Read our measurement standard ↗
            </Link>
          </div>
        </section>
        <section className="l-section l-feature">
          <div>
            <p className="l-eyebrow">Putting the system to work</p>
            <h2>
              A process your
              <br />
              team can own.
            </h2>
          </div>
          <div>
            <p>
              Aurex helps established residential contractors build and operate
              the campaigns, follow-up, recovery, and reporting around this
              journey. Your team brings the service expertise, live
              conversations, estimating, and fulfillment.
            </p>
            <p style={{ marginTop: 20 }}>
              The Revenue Leakage Audit maps your current process and identifies
              the handoffs that need attention.
            </p>
            <Link className="l-text-link" href="/apply">
              Learn about working with Aurex ↗
            </Link>
          </div>
        </section>
      </div>
      <LearningCTA />
    </Shell>
  );
}

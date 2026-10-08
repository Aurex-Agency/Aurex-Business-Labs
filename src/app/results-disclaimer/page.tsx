import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Results Disclaimer",
  "The work, the evidence, and the limits of what a result can tell you.",
  "/results-disclaimer",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/results-disclaimer"
        title="Results Disclaimer"
        description="The work, the evidence, and the limits of what a result can tell you."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                This disclaimer is a template requiring professional review
                before launch. It must be checked against approved client
                releases and published evidence.
              </p>
            </section>
            <section>
              <h2>Portfolio and results</h2>
              <p>
                Portfolio imagery shows selected design work. A design
                presentation does not establish a revenue or performance result.
                Financial claims and client testimonials require supporting
                evidence and publication permission.
              </p>
            </section>
            <section>
              <h2>No guaranteed outcomes</h2>
              <p>
                Results vary. Past performance does not guarantee future
                results. Business outcomes depend on demand, pricing, margins,
                capacity, execution, budget, timing and other factors. The
                website does not promise leads, appointments, sales, revenue,
                profit or ROI.
              </p>
            </section>
            <section>
              <h2>Measurement matters</h2>
              <p>
                Leads are not revenue. Appointments are not sold jobs. Tracked
                revenue is tied to records in an agreed tracking system and does
                not necessarily prove sole causation. Collected revenue is money
                received. Estimated gross profit uses a documented margin
                assumption and is not net profit.
              </p>
            </section>
            <section>
              <h2>Educational examples</h2>
              <p>
                Hypothetical examples are labeled and illustrate a method. They
                are not client results, typical outcomes or earnings
                projections. Evaluate decisions against your own documented
                business economics.
              </p>
            </section>
            <p>
              <a className="a-inline" href="/contact">
                Contact Aurex Business Labs
              </a>
            </p>
          </div>
        </div>
      </article>
    </Shell>
  );
}

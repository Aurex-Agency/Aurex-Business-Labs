import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Results and Earnings Disclaimer",
  "How to interpret outcomes, examples and revenue claims.",
  "/results-disclaimer",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/results-disclaimer"
        title="Results and Earnings Disclaimer"
        description="How to interpret outcomes, examples and revenue claims."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                This disclaimer is a template requiring professional review
                before launch. It must be reconciled with approved proof, client
                releases and the signed service agreement.
              </p>
            </section>
            <section>
              <h2>No guaranteed outcomes</h2>
              <p>
                Results vary. Past performance does not guarantee future
                results. Aurex Business Labs does not guarantee leads,
                appointments, sales, revenue, profit or ROI. Business outcomes
                depend on service demand, pricing, margins, capacity, sales
                execution, budget, timing and other factors.
              </p>
            </section>
            <section>
              <h2>What the numbers mean</h2>
              <p>
                Leads are not revenue. Appointments are not sold jobs. Tracked
                revenue is tied to records visible in the agreed tracking system
                and does not necessarily prove sole causation. Collected revenue
                is money the client confirms it received. Estimated gross profit
                uses a documented margin assumption and is not net profit.
              </p>
            </section>
            <section>
              <h2>Publication standard</h2>
              <p>
                Financial results and client media are published only when the
                proof record is verified and the client has permitted
                publication. We distinguish verified results, influenced results
                and estimates. A case-study page without published figures is
                not evidence of a verified financial result.
              </p>
            </section>
            <section>
              <h2>Examples and decisions</h2>
              <p>
                Hypothetical examples are labeled and explain a method. They are
                not typical results, an earnings projection or a promise.
                Evaluate the full investment, including advertising and
                specified third-party costs, against your own documented
                economics.
              </p>
            </section>
            <section>
              <h2>Delivery assurance</h2>
              <p>
                The Core Launch and Tracking Assurance is limited to the agreed
                delivery conditions. It is not an earnings or performance
                guarantee. Read the Revenue Capture System page and your signed
                agreement for its prerequisites and remedy.
              </p>
            </section>
            <p>
              <a className="a-inline" href="/about">
                Company information
              </a>{" "}
              ·{" "}
              <a className="a-inline" href="/revenue-capture-system">
                Offer and assurance
              </a>{" "}
              ·{" "}
              <a className="a-inline" href="/results/methodology">
                Results methodology
              </a>
            </p>
          </div>
        </div>
      </article>
    </Shell>
  );
}

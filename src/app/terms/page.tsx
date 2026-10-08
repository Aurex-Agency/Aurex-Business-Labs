import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Website Terms",
  "Terms template for using this website and requesting an audit.",
  "/terms",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/terms"
        title="Website Terms"
        description="Terms template for using this website and requesting an audit."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                These website terms are a template requiring professional review
                before launch. The signed client agreement governs paid
                services, deliverables, payment, renewal, intellectual property,
                termination and disputes.
              </p>
            </section>
            <section>
              <h2>Website information</h2>
              <p>
                Aurex Business Labs provides educational information about
                customer acquisition and revenue systems for established
                residential contractors. Examples labeled hypothetical
                illustrate calculations or workflows. They are not client
                results or forecasts.
              </p>
            </section>
            <section>
              <h2>Audit requests</h2>
              <p>
                A Revenue Leakage Audit is a complimentary diagnostic with no
                obligation to hire Aurex. Submitting an application does not
                create a paid engagement or confirm an appointment. Do not send
                passwords, sensitive personal information or data you lack
                permission to share.
              </p>
            </section>
            <section>
              <h2>Paid engagement</h2>
              <p>
                The initial Revenue Capture System engagement is $17,000 over
                120 days: $8,000 for implementation, followed by $3,000 on days
                31, 61 and 91. Advertising and specified third-party costs are
                separate. Continued Growth Operations begin at $3,000 monthly
                under the applicable renewal agreement. The signed agreement
                controls the final scope and payment obligations.
              </p>
            </section>
            <section>
              <h2>Delivery assurance</h2>
              <p>
                The 45-Day Core Launch and Tracking Assurance concerns the
                agreed system after the Ready Date and its prerequisites. Client
                delays, platform reviews, restrictions, third-party outages and
                material scope changes may adjust the timeline. Review the full
                assurance on the Revenue Capture System page and the signed
                agreement. No leads, appointments, sales, revenue, profit or ROI
                are guaranteed.
              </p>
            </section>
            <section>
              <h2>Acceptable use and ownership</h2>
              <p>
                Use the website lawfully. Do not interfere with its operation,
                attempt unauthorized access or submit abusive or false
                information. Website content and brand assets are protected by
                applicable rights. Obtain permission before reusing protected
                material beyond legally permitted uses.
              </p>
            </section>
            <section>
              <h2>Third parties and legal review</h2>
              <p>
                Third-party registration and scheduling services have their own
                terms. Counsel must review the legal entity, contact method,
                governing law, dispute process, limitations and
                jurisdiction-specific requirements before these terms are
                adopted. No missing term should be interpreted as a factual
                claim about the business.
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

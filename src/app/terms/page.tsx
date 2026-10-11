import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Website Terms",
  "A few things to know about using this website.",
  "/terms",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/terms"
        title="Website Terms"
        description="A few things to know about using this website."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                These terms are a template requiring professional review before
                launch. Any paid services are governed by a separately agreed
                written contract.
              </p>
            </section>
            <section>
              <h2>Using the website</h2>
              <p>
                Aurex Business Labs shares information about its approach,
                capabilities and selected work. Educational examples explain
                methods and are not forecasts or promises of business outcomes.
                Portfolio images show a captured design; live websites may
                change.
              </p>
            </section>
            <section>
              <h2>Getting in touch</h2>
              <p>
                Sending a message does not create a paid engagement or confirm
                an appointment. Do not send passwords, sensitive customer
                records or information you do not have permission to share.
              </p>
            </section>
            <section>
              <h2>Content and acceptable use</h2>
              <p>
                Use the website lawfully. Do not interfere with its operation or
                attempt unauthorized access. Brand assets, designs, writing and
                project imagery are protected by applicable rights. Obtain
                permission for reuse beyond legally permitted uses.
              </p>
            </section>
            <section>
              <h2>Third-party websites</h2>
              <p>
                External websites and registration providers operate under their
                own terms. Aurex Business Labs does not control changes made to
                third-party websites.
              </p>
            </section>
            <section>
              <h2>Legal review</h2>
              <p>
                The business must confirm its legal identity, contact method,
                governing law, dispute process and jurisdiction-specific
                requirements with appropriate professional advice before
                adopting these terms.
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

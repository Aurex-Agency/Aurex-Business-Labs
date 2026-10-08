import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Privacy Policy",
  "How we handle the information you choose to share.",
  "/privacy",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/privacy"
        title="Privacy Policy"
        description="How we handle the information you choose to share."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                This privacy policy is a template requiring professional review
                before launch. It must be checked against the legal entity,
                vendors, retention rules and jurisdictions actually used.
              </p>
            </section>
            <section>
              <h2>Your message</h2>
              <p>
                The contact form collects your name, email, business name,
                message and optional website and phone number. We use these
                details to respond to your inquiry. Do not submit passwords,
                payment information or sensitive customer records.
              </p>
            </section>
            <section>
              <h2>Processing and retention</h2>
              <p>
                Messages are sent through a server-side connection to our
                configured CRM provider. The website does not keep a separate
                local database of messages. The business must confirm the CRM
                retention period and process for access, correction and deletion
                requests before launch. Use a published contact channel or the
                contact form for privacy questions.
              </p>
            </section>
            <section>
              <h2>Attribution and analytics</h2>
              <p>
                The website stores first and latest campaign information in
                browser storage for up to 90 days, including campaign
                parameters, click identifiers, and landing and referring page
                paths. Form answers are not included in our analytics events.
                Configured analytics services may receive page and interaction
                data. Services without configured IDs do not load.
              </p>
            </section>
            <section>
              <h2>External services</h2>
              <p>
                Links to live project websites and webinar registration lead to
                third-party services with their own privacy policies. Review
                those notices before sharing information. Analytics and
                advertising providers, consent requirements and retention
                practices must be confirmed during legal review.
              </p>
            </section>
            <section>
              <h2>Contact preferences</h2>
              <p>
                Sending a message asks Aurex Business Labs to respond to that
                inquiry. It does not enroll you in promotional text messages.
                Tell us if you no longer want to hear from us.
              </p>
            </section>
            <section>
              <h2>Security and changes</h2>
              <p>
                We use input validation, spam checks and basic rate limiting. No
                system can promise absolute security. This policy should be
                updated when the actual processing practices change and does not
                assert compliance with any particular law.
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

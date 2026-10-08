import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
export const metadata = pageMeta(
  "Privacy Policy",
  "How application information and measurement data are handled.",
  "/privacy",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path="/privacy"
        title="Privacy Policy"
        description="How application information and measurement data are handled."
      />
      <article className="a-section a-light">
        <div className="a-wrap">
          <div className="a-reading">
            <section>
              <h2>Review status</h2>
              <p>
                This privacy policy is a template requiring professional review
                before launch. It describes the intended website workflow and
                must be checked against the legal entity, vendors, retention
                rules and jurisdictions actually used.
              </p>
            </section>
            <section>
              <h2>Information you provide</h2>
              <p>
                The audit application collects your name, work contact details,
                company information, role, business ranges, operational answers
                and optional SMS consent. Do not submit account passwords,
                payment information or homeowner personal information.
              </p>
            </section>
            <section>
              <h2>How we use information</h2>
              <p>
                Aurex Business Labs uses your application to assess fit, respond
                to your request, prepare the audit and coordinate an
                appointment. The application is sent to the configured CRM
                provider through a server-side integration. A successful
                submission is recorded only after that delivery succeeds.
              </p>
            </section>
            <section>
              <h2>Attribution and analytics</h2>
              <p>
                This site stores first and latest campaign information in
                browser storage for up to 90 days. This may include UTM values,
                click identifiers, the landing-page path and referring-page
                path. Arbitrary URL queries are not copied into page-address
                fields. Configured analytics providers may receive page and
                interaction events. Application answers are not included in our
                analytics events. If an analytics ID is absent, that service
                does not load.
              </p>
            </section>
            <section>
              <h2>Third-party services</h2>
              <p>
                Configured GHL forms and calendars load when you open them.
                Webinar registration may take you to Zoom or GHL. These
                providers process information under their own terms. Review
                their notices before submitting. Contact, scheduling, analytics
                and advertising providers must be confirmed during legal review.
              </p>
            </section>
            <section>
              <h2>SMS reminders</h2>
              <p>
                SMS consent is optional, unchecked by default, and separate from
                requesting an audit. Consent is not required to purchase.
                Message frequency varies and message or data rates may apply.
                Reply STOP to opt out or HELP for help. Consent handling and
                suppression must be configured in the CRM before reminders are
                enabled.
              </p>
            </section>
            <section>
              <h2>Retention and requests</h2>
              <p>
                Application data is not stored in a local website database. The
                receiving CRM may retain it. Aurex must document an appropriate
                retention period and process for access, correction, deletion
                and marketing opt-out requests before launch. Use a verified
                contact channel published on the About page. If no channel is
                published, request assistance through the audit application.
              </p>
            </section>
            <section>
              <h2>Security and changes</h2>
              <p>
                The site uses input validation, spam checks and basic rate
                limiting. No system can promise absolute security. This policy
                should be updated when the actual processing practices change;
                it does not assert compliance with any particular law.
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

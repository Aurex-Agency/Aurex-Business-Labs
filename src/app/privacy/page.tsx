import type { Metadata } from "next";
import { Brand } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { site } from "@/lib/site-config";
export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Aurex Business Labs handles information submitted through its Website Revenue Review form.",
  alternates: { canonical: `${site.url}/privacy` },
};
export default function Privacy() {
  return (
    <>
      <header className="secondary-header">
        <div className="container">
          <Brand />
          <a className="text-link" href="/revenue-website">
            Back to the website ↗
          </a>
        </div>
      </header>
      <main id="main" className="container">
        <article className="document-page">
          <span className="eyebrow">YOUR INFORMATION, HANDLED WITH CARE</span>
          <h1>
            Privacy <em>policy.</em>
          </h1>
          <p>Last updated September 21, 2026</p>
          <p>
            This policy explains how Aurex Business Labs handles information
            collected through this website and the Website Revenue Review form.
          </p>
          <h2>Information you provide</h2>
          <p>
            When you request a review, we collect the contact details, business
            information, website address, and project information you submit.
            Please do not include sensitive personal, financial, or medical
            information in the form.
          </p>
          <h2>How we use your information</h2>
          <p>
            We use your information to evaluate your request, review your
            website, respond to you, arrange a review, and discuss services
            relevant to your business. Submitting the form allows us to contact
            you by phone, email, or text about your request. Message and data
            rates may apply. Consent is not a condition of purchase. You can ask
            us to stop contacting you at any time, including by replying STOP to
            a text message.
          </p>
          <h2>Service providers and lead delivery</h2>
          <p>
            Submitted information may be processed by our hosting, customer
            relationship management, email, text messaging, and scheduling
            providers as needed to handle your request. We do not sell your
            personal information. Mobile phone information and messaging consent
            are not shared with third parties for their own marketing.
          </p>
          <h2>Campaign information and browser storage</h2>
          <p>
            We temporarily store campaign parameters, advertising click
            identifiers, the landing page address, and referring page in your
            browser&apos;s session storage. These may be sent with your form to
            help us understand how you found Aurex. Session storage normally
            ends when you close the browser tab. We also use a temporary
            confirmation record to avoid counting a review request more than
            once.
          </p>
          <h2>Analytics and advertising</h2>
          <p>
            We use Google Analytics 4 to measure website visits, interactions,
            and confirmed review requests. When configured, Google Tag Manager
            and Google Ads may also process these events. These services may use
            cookies or similar technologies according to their settings and your
            browser preferences. We do not include your form answers or contact
            details in our analytics events. You can manage cookies through your
            browser and advertising preferences through Google.
          </p>
          <h2>Retention and security</h2>
          <p>
            We keep inquiry information for as long as reasonably needed to
            respond, manage the business relationship, and meet applicable
            obligations. We use reasonable safeguards, but no website or
            transmission method can guarantee absolute security.
          </p>
          <h2>Your choices and questions</h2>
          <p>
            You may request access to, correction of, or deletion of the
            information you provided, or opt out of further contact. Reply to
            any message from Aurex Business Labs concerning your review request
            {site.email ? (
              <>
                {" "}
                or email <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            ) : null}
            .
          </p>
          <h2>External websites and changes</h2>
          <p>
            Portfolio and scheduling links may take you to third-party websites
            with their own privacy practices. We may update this policy when our
            processes change and will revise the date above.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-config";
import { List } from "@/components/authority/shared";
import {
  LegalPage,
  companyName,
  contactMethod,
} from "@/components/authority/legal";

export const metadata = pageMeta(
  "Terms of Service",
  "The terms for using the Aurex Business Labs website, free resources and forms.",
  "/terms",
);

const updated = "October 12, 2026";
const governingLaw = site.legalState
  ? `the State of ${site.legalState}`
  : "the state in which Aurex Business Labs is organized";

export default function Page() {
  return (
    <LegalPage
      title="Terms of service"
      accent="service"
      path="/terms"
      updated={updated}
      description="The ground rules for using this website, our free resources and our forms. Plain language wherever we could manage it."
      summary={[
        {
          title: "Free resources, used fairly",
          text: "Use our guides, templates and tools in your own business. Please do not resell or republish them as your own.",
        },
        {
          title: "Education, not a guarantee",
          text: "Our content explains methods and examples. It is not legal, tax or financial advice and does not promise business results.",
        },
        {
          title: "Paid work has its own agreement",
          text: "Sending a form does not create an engagement. Any paid services are covered by a separate written agreement.",
        },
      ]}
      related={[
        { label: "Privacy policy", href: "/privacy" },
        { label: "Results disclaimer", href: "/results-disclaimer" },
      ]}
      sections={[
        {
          id: "agreement",
          title: "Agreement to these terms",
          body: (
            <>
              <p>
                These terms of service (&ldquo;terms&rdquo;) are an agreement
                between you and {companyName} (&ldquo;Aurex Business
                Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) covering your
                use of aurexbusinesslab.com, including its content, free
                resources, interactive tools and forms (together, the
                &ldquo;website&rdquo;).
              </p>
              <p>
                By using the website you agree to these terms. If you use it on
                behalf of a business, you agree for that business and confirm
                you can do so. If you do not agree, please do not use the
                website.
              </p>
            </>
          ),
        },
        {
          id: "services",
          title: "Our services and engagements",
          body: (
            <>
              <p>
                The website shares information about the Aurex Revenue Capture
                System, our approach and selected work. Sending a contact
                message or audit application does not create a client
                relationship, confirm an appointment or commit either of us to
                any paid work.
              </p>
              <p>
                The Revenue Leakage Audit is a complimentary diagnostic. There
                is no obligation to hire Aurex Business Labs, and we may decline
                an application at our discretion. Any paid services are governed
                by a separate written agreement signed by both parties. If that
                agreement conflicts with these terms, the agreement controls for
                those services.
              </p>
            </>
          ),
        },
        {
          id: "resources",
          title: "Free resources and tools",
          body: (
            <>
              <p>
                Our guides, worksheets, checklists, message templates and the
                Contractor Revenue Scorecard are free. We grant you a personal,
                non-exclusive, non-transferable license to view, download,
                print, adapt and use them in your own business and with your
                team.
              </p>
              <p>You may not:</p>
              <List
                items={[
                  "Sell, sublicense or charge for our resources, or bundle them into a paid product",
                  "Republish them, in whole or in substantial part, as your own work",
                  "Remove our name or notices from copies you share outside your business",
                ]}
              />
              <p>
                Scorecard results show the handoffs you entered. They are
                observations for your team to discuss, not benchmarks, forecasts
                or professional advice. Adapt message templates to your
                customer, follow their contact preferences, and make sure your
                communications comply with the laws that apply to you.
              </p>
            </>
          ),
        },
        {
          id: "no-advice",
          title: "Educational content and results",
          body: (
            <>
              <p>
                Content on the website is general education about running and
                growing a contracting business. It is not legal, tax,
                accounting, financial or other professional advice, and it does
                not account for your specific situation. Talk to a qualified
                professional before acting on it.
              </p>
              <p>
                Hypothetical examples illustrate a method and are labeled as
                such. They are not client results or typical outcomes. Business
                results depend on demand, pricing, margins, capacity, execution,
                timing and other factors outside our control. We do not promise
                any number of leads, appointments, sales, revenue, profit or
                return on investment. See our{" "}
                <Link className="l-inline" href="/results-disclaimer">
                  results disclaimer
                </Link>{" "}
                and{" "}
                <Link className="l-inline" href="/results/methodology">
                  measurement standard
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          id: "submissions",
          title: "Information you send us",
          body: (
            <>
              <p>When you send a form, you agree that:</p>
              <List
                items={[
                  "The information is accurate and you have the right to share it",
                  "You will not include passwords, payment card details, homeowner records or other sensitive information",
                  "We may use what you send to respond, prepare any audit you request and operate our business, as described in our privacy policy",
                ]}
              />
              <p>
                Ideas or feedback you share with us may be used to improve our
                content and services without any obligation to you. Our{" "}
                <Link className="l-inline" href="/privacy">
                  privacy policy
                </Link>{" "}
                explains how we handle personal information.
              </p>
            </>
          ),
        },
        {
          id: "text-messages",
          title: "Text messages",
          body: (
            <p>
              If you opt in to SMS reminders on one of our applications, you
              agree to receive text messages about your audit or call at the
              number you provide. Consent is optional and is not a condition of
              applying or buying anything. Message frequency varies. Message and
              data rates may apply. Reply STOP to opt out at any time and HELP
              for help. Carriers are not liable for delayed or undelivered
              messages.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: (
            <>
              <p>Please use the website lawfully and respectfully. Do not:</p>
              <List
                items={[
                  "Attempt to gain unauthorized access to the website, our systems or other people's information",
                  "Interfere with the website's operation, security or forms, including through spam, automated submissions or malicious code",
                  "Scrape or copy the website at scale, or use it to build a competing collection of resources",
                  "Submit false, misleading or someone else's information, or impersonate any person or business",
                  "Use the website in a way that violates any law or the rights of others",
                ]}
              />
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          body: (
            <>
              <p>
                The website and its content, including text, guides, tools,
                illustrations, motion graphics, design and code, belong to Aurex
                Business Labs or its licensors and are protected by copyright,
                trademark and other laws. The Aurex Business Labs name, logo,
                Aurex Revenue Capture System, Revenue Leakage Audit and related
                names are our marks. Except for the resource license in section
                3, nothing in these terms gives you a right to use them.
              </p>
              <p>
                Portfolio images show selected design work. Client names, logos
                and websites belong to their respective owners and appear with
                permission. Live websites may change after our work was
                captured.
              </p>
            </>
          ),
        },
        {
          id: "third-parties",
          title: "Third-party websites and services",
          body: (
            <p>
              The website links to, and may embed, services run by others, such
              as client websites, scheduling tools, video meeting registration
              and analytics providers. Those services have their own terms and
              privacy policies. We do not control them and are not responsible
              for their content, availability or practices.
            </p>
          ),
        },
        {
          id: "disclaimers",
          title: "Disclaimers",
          body: (
            <p className="l-legal-caps">
              The website and its content are provided &ldquo;as is&rdquo; and
              &ldquo;as available.&rdquo; To the fullest extent permitted by
              law, Aurex Business Labs disclaims all warranties, express or
              implied, including warranties of merchantability, fitness for a
              particular purpose, accuracy and non-infringement. We do not
              warrant that the website will be uninterrupted, error free or free
              of harmful components, or that its content is complete or current.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <>
              <p className="l-legal-caps">
                To the fullest extent permitted by law, Aurex Business Labs and
                its owners, employees and contractors will not be liable for any
                indirect, incidental, special, consequential or punitive
                damages, or for lost profits, revenue, data or business
                opportunities, arising from or related to your use of the
                website or its content, even if we were told such damages were
                possible.
              </p>
              <p className="l-legal-caps">
                Our total liability for any claim arising from or related to the
                website will not exceed one hundred US dollars ($100).
              </p>
              <p>
                Some jurisdictions do not allow certain limitations, so some of
                these may not apply to you. These limits do not apply to paid
                services, which are governed by their own written agreement.
              </p>
            </>
          ),
        },
        {
          id: "indemnity",
          title: "Indemnity",
          body: (
            <p>
              You agree to defend, indemnify and hold harmless Aurex Business
              Labs and its owners, employees and contractors from claims, losses
              and expenses, including reasonable attorneys&rsquo; fees, arising
              from your misuse of the website, your violation of these terms or
              your violation of anyone else&rsquo;s rights.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law and disputes",
          body: (
            <>
              <p>
                These terms are governed by the laws of {governingLaw} and
                applicable federal law of the United States, without regard to
                conflict of law rules. Any dispute arising from these terms or
                the website will be brought in the state or federal courts
                located in that state, and you and we consent to their
                jurisdiction.
              </p>
              <p>
                Before filing a claim, please contact us so we can try to
                resolve the issue informally. Most concerns can be settled with
                a conversation.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes and termination",
          body: (
            <p>
              We may update these terms from time to time. The date at the top
              shows the latest version, and continuing to use the website after
              an update means you accept it. We may change, suspend or stop any
              part of the website, and may restrict access for anyone who
              violates these terms.
            </p>
          ),
        },
        {
          id: "general",
          title: "General terms",
          body: (
            <p>
              These terms, together with our privacy policy and results
              disclaimer, are the entire agreement about your use of the
              website. If any part is found unenforceable, the rest remains in
              effect. Our not enforcing a provision is not a waiver of it. You
              may not transfer your rights under these terms; we may transfer
              ours as part of a sale or reorganization of our business.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>If you have questions about these terms, {contactMethod()}.</p>
          ),
        },
      ]}
    />
  );
}

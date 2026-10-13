import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { List } from "@/components/authority/shared";
import {
  LegalPage,
  companyName,
  contactMethod,
} from "@/components/authority/legal";

export const metadata = pageMeta(
  "Privacy Policy",
  "What Aurex Business Labs collects, why, who it is shared with, how long it is kept, and the choices you have.",
  "/privacy",
);

const updated = "October 13, 2026";

export default function Page() {
  return (
    <LegalPage
      title="Privacy policy"
      accent="policy"
      path="/privacy"
      updated={updated}
      description="What we collect, why we collect it, who helps us handle it, and the choices you have. Written to be read, not skimmed past."
      summary={[
        {
          title: "Only what you choose to send",
          text: "Our free guides, tools and downloads need no sign-up. We receive personal information when you send a contact message or an audit application.",
        },
        {
          title: "Used to respond, never sold",
          text: "We use your details to reply, prepare the audit and run our business. We do not sell your personal information.",
        },
        {
          title: "You stay in control",
          text: "Text messages are optional and stop when you reply STOP. You can ask us to access, correct or delete your information at any time.",
        },
      ]}
      related={[
        { label: "Terms of service", href: "/terms" },
        { label: "Results disclaimer", href: "/results-disclaimer" },
      ]}
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>
                This policy explains how {companyName} (&ldquo;Aurex Business
                Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles
                personal information collected through aurexbusinesslab.com (the
                &ldquo;website&rdquo;). Aurex Business Labs provides customer
                acquisition and revenue systems for established residential
                contractors.
              </p>
              <p>
                This policy covers the website only. If you become a client, the
                written agreement for that engagement explains how we handle
                information we work with on your behalf.
              </p>
            </>
          ),
        },
        {
          id: "information-you-give-us",
          title: "Information you give us",
          body: (
            <>
              <p>
                You can read every guide, use every tool and download every
                resource without giving us any personal information. We receive
                information only when you send one of our forms.
              </p>
              <h3>Contact form</h3>
              <List
                items={[
                  "First and last name",
                  "Email address",
                  "Business name",
                  "Website and phone number, if you add them",
                  "Your message",
                ]}
              />
              <h3>Revenue Leakage Audit application</h3>
              <List
                items={[
                  "First and last name, work email and company name",
                  "Phone number and website, if you add them",
                  "Your role and trade",
                  "Approximate monthly lead volume and your priority service",
                  "Your biggest sales or marketing bottleneck",
                  "Whether you have office or sales staff, capacity for more work and sales tracking in place",
                  "Whether you are open to being featured as a case study",
                  "Whether you agree to optional SMS reminders",
                ]}
              />
              <h3>Strategy call application</h3>
              <List
                items={[
                  "First and last name, phone number, email and company name",
                  "Your trade and approximate annual revenue range",
                  "Monthly lead volume and where most of your leads come from",
                  "Your biggest bottleneck",
                  "Whether you have office, dispatch or admin staff, and your average job value range",
                  "Whether you are open to being featured as a case study",
                  "Whether you agree to optional SMS reminders",
                ]}
              />
              <p>
                This application has several steps. Your contact details are
                sent to us when you finish the first step, so we can follow up
                even if you do not finish the rest.
              </p>
              <p>
                Please do not send passwords, payment card details, homeowner
                records or other sensitive information through our forms. We do
                not ask for them and do not need them.
              </p>
            </>
          ),
        },
        {
          id: "collected-automatically",
          title: "Information collected automatically",
          body: (
            <>
              <h3>Campaign details sent with a form</h3>
              <p>
                When you arrive from an ad, email or link that carries campaign
                details, the website saves those details in your browser&rsquo;s
                local storage so we can see which marketing led to an inquiry.
                This includes campaign tags (such as utm_source and
                utm_campaign), ad click identifiers (such as gclid, wbraid,
                gbraid, msclkid and fbclid), and the address of the page you
                landed on and the page that referred you, without any query
                string. We keep your first and most recent visit, and each
                record expires after 90 days. These details are sent to us only
                if you submit a form.
              </p>
              <p>
                When Meta measurement is enabled, the strategy call application
                also sends the Meta browser identifiers stored in the _fbp and
                _fbc cookies, if present, so an application can be matched to
                the ad that led to it.
              </p>
              <p>
                Each submission also records which form you used, when it was
                sent and a random receipt number. The website measures how long
                the form was open and includes a hidden field to filter out
                automated spam. Those two checks are used on our server and are
                not stored with your submission.
              </p>
              <h3>Spam and abuse protection</h3>
              <p>
                Our server briefly uses your IP address to limit repeated
                submissions. It is held in memory for about a minute and is not
                saved with your submission or sent to our CRM.
              </p>
              <h3>Analytics and advertising measurement</h3>
              <p>
                When we enable them, the website may use Google Analytics,
                Google Tag Manager, Google Ads conversion measurement and the
                Meta Pixel. These services can receive your IP address, device
                and browser details, the pages you view and identifiers stored
                in cookies, and may combine that with information they already
                hold. We send them events such as a page view, a click on a call
                to action, a resource download (identified only by the resource
                name) and a confirmed form submission (identified only by its
                random receipt number). Your form answers are never included in
                these events. Services we have not configured do not load.
              </p>
              <h3>CRM visit and attribution tracking</h3>
              <p>
                When we enable it, the website loads a tracking script from our
                CRM provider, GoHighLevel, so we can see which visits, pages and
                campaigns led to an inquiry. It records the pages you visit, the
                page you arrived from and campaign tags, and keeps a session
                identifier in a cookie and in your browser&rsquo;s storage. When
                you submit a form on the website, it also sends the fields you
                entered, such as your name, email, phone number and answers,
                directly to GoHighLevel and links them to your visit. It does
                not collect password or payment card fields. This information is
                handled by GoHighLevel as our service provider, as described in
                section 6.
              </p>
              <h3>Hosting logs</h3>
              <p>
                Like most websites, our hosting provider automatically records
                technical information such as IP address, browser type, the page
                requested and the time of the request to deliver the website and
                keep it secure.
              </p>
            </>
          ),
        },
        {
          id: "browser-only-tools",
          title: "Tools that stay in your browser",
          body: (
            <p>
              The numbers you enter in the Contractor Revenue Scorecard and the
              progress you make on the Lead Response Checklist stay on your
              device for that page visit. They are not sent to us or to any
              analytics service. A downloaded scorecard is created in your
              browser and saved directly to your device.
            </p>
          ),
        },
        {
          id: "how-we-use",
          title: "How we use information",
          body: (
            <List
              items={[
                "To respond to your message or audit application and arrange next steps",
                "To prepare and deliver the Revenue Leakage Audit you request",
                "To send appointment reminders by text message, only if you opted in",
                "To understand which content and campaigns lead to inquiries, so we can improve them",
                "To protect the website and our forms from spam, abuse and security threats",
                "To keep business records and meet legal, tax and accounting obligations",
              ]}
            />
          ),
        },
        {
          id: "sharing",
          title: "How we share information",
          body: (
            <>
              <p>
                <strong>We do not sell your personal information.</strong> We
                share it only as described here.
              </p>
              <h3>Service providers</h3>
              <p>
                Companies that help us run the website and our business handle
                information on our behalf and only for those purposes. They
                include our website hosting provider, our customer relationship
                management (CRM) and messaging platform, which receives form
                submissions and visit tracking and sends any text messages,
                scheduling and video meeting tools if you book a call, video
                hosting providers when you press play on an embedded video, and
                the analytics and advertising services described above when they
                are enabled.
              </p>
              <h3>Advertising measurement</h3>
              <p>
                If we enable Google Ads or Meta measurement, those companies
                receive information about your visit as described above. Under
                some state laws this can count as &ldquo;sharing&rdquo; personal
                information for targeted advertising. You can opt out at any
                time using the choices in section 9.
              </p>
              <h3>Legal and business reasons</h3>
              <p>
                We may disclose information if required by law or legal process,
                to protect the rights, safety and property of our clients,
                visitors or Aurex Business Labs, or as part of a merger,
                acquisition or sale of all or part of our business, in which
                case this policy continues to apply to the information
                transferred.
              </p>
            </>
          ),
        },
        {
          id: "text-messages",
          title: "Text messages",
          body: (
            <>
              <p>
                Agreeing to text messages is optional and is never required to
                apply, contact us or buy anything. If you check the SMS box on
                one of our applications, we may text the number you provided
                about your audit or call, such as scheduling and reminders.
              </p>
              <List
                items={[
                  "Message frequency varies. Message and data rates may apply.",
                  "Reply STOP to opt out at any time. Reply HELP for help.",
                  "We do not share your mobile number or SMS consent with third parties or affiliates for their own marketing or promotional purposes.",
                ]}
              />
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and similar technologies",
          body: (
            <>
              <p>
                The website&rsquo;s own code does not set cookies. It uses your
                browser&rsquo;s local and session storage only for the campaign
                details described in section 3. When analytics, advertising or
                CRM tracking services are enabled, they set their own cookies
                and browser storage to measure visits, attribute inquiries and
                count conversions.
              </p>
              <p>
                You can block or delete cookies and local storage in your
                browser settings at any time. The website works without them.
              </p>
            </>
          ),
        },
        {
          id: "your-choices",
          title: "Your choices",
          body: (
            <List
              items={[
                "Use the website without sending a form. Every resource is available without sign-up.",
                "Reply STOP to any text message to stop texts.",
                "Clear your browser storage to remove saved campaign details.",
                "Block cookies in your browser, or use Google's Analytics opt-out add-on, your Google Ads settings and your Meta ad preferences to limit measurement and ad personalization.",
                "Ask us to opt you out of sharing for targeted advertising and to stop using your information for marketing.",
              ]}
            />
          ),
        },
        {
          id: "retention",
          title: "How long we keep information",
          body: (
            <>
              <p>
                We keep form submissions in our CRM for as long as needed to
                respond to you and, if we work together, for the length of that
                relationship. After that we keep only what we need for
                legitimate business records or to meet legal obligations, then
                delete it. You can ask us to delete your information sooner.
              </p>
              <p>
                Campaign details in your browser expire after 90 days. The
                in-memory IP check for spam protection lasts about a minute.
                Analytics providers keep data according to their own retention
                settings and policies.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Security",
          body: (
            <p>
              Forms are sent over an encrypted connection, checked and cleaned
              on our server, and delivered to our CRM over HTTPS. The website
              uses a content security policy and does not keep a separate
              database of your messages. No method of transmission or storage is
              completely secure, so we cannot guarantee absolute security, but
              we work to protect your information and will notify you if the law
              requires it.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your privacy rights",
          body: (
            <>
              <p>
                Depending on where you live, you may have the right to know what
                personal information we hold about you, to get a copy, to
                correct it, to delete it, and to opt out of the sale or sharing
                of personal information for targeted advertising. We extend
                these requests to every visitor, wherever they live.
              </p>
              <p>
                To make a request, {contactMethod()}. We will confirm your
                request, may ask for information to verify your identity, and
                respond within the time the law requires, usually 45 days. You
                may use an authorized agent. If we decline your request, you can
                ask us to reconsider by replying to our response. We will not
                treat you differently for exercising your rights.
              </p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <p>
              The website is intended for business owners and their teams. It is
              not directed to children under 16, and we do not knowingly collect
              their personal information. If you believe a child has sent us
              information, contact us and we will delete it.
            </p>
          ),
        },
        {
          id: "international",
          title: "Visitors outside the United States",
          body: (
            <p>
              Aurex Business Labs serves contractors in the United States, and
              information is processed and stored in the United States. If you
              visit from elsewhere, your information will be transferred to and
              handled in the United States under this policy.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <p>
              We will update this policy when our practices change. The date at
              the top shows the latest version. If we make a significant change
              to how we use personal information you have already sent us, we
              will tell you before it applies.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              For questions about this policy or a privacy request,{" "}
              {contactMethod()}. Please include &ldquo;Privacy request&rdquo; in
              your message. You can also read our{" "}
              <Link className="l-inline" href="/terms">
                terms of service
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}

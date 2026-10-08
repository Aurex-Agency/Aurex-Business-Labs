import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  FAQ,
  Schema,
} from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
export const metadata = pageMeta(
  "Contractor Revenue Scorecard Live",
  "Every Thursday at 11:00 a.m. Central: learn to track marketing from first lead to sold job and identify the real constraint.",
  "/contractor-revenue-scorecard",
);
const renderedAt = Date.now();
export default function Webinar() {
  const start = site.webinarStart ? new Date(site.webinarStart) : null;
  const end = site.webinarEnd ? new Date(site.webinarEnd) : null;
  const occurrence =
    start &&
    end &&
    Number.isFinite(+start) &&
    Number.isFinite(+end) &&
    +end > +start &&
    +start > renderedAt &&
    site.webinarUrl;
  return (
    <Shell>
      {occurrence && (
        <Schema
          data={{
            "@type": "Event",
            name: "Contractor Revenue Scorecard Live",
            description:
              "Learn the numbers every contractor should track from first lead to sold job.",
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "VirtualLocation", url: site.webinarUrl },
            organizer: {
              "@type": "Organization",
              name: site.brandName,
              url: site.url,
            },
          }}
        />
      )}
      <PageHero
        eyebrow="Contractor Revenue Scorecard Live"
        path="/contractor-revenue-scorecard"
        title="Track Every Lead From First Click to Sold Job"
        description="Learn the numbers every contractor should track, how to identify the real constraint in your sales and marketing process, and which questions your marketing providers should be able to answer."
      >
        <p className="a-schedule">Every Thursday at 11:00 a.m. Central</p>
        {occurrence && (
          <p>
            Configured session:{" "}
            {start.toLocaleString("en-US", {
              timeZone: "America/Chicago",
              dateStyle: "full",
              timeStyle: "short",
            })}{" "}
            Central
          </p>
        )}
        {site.webinarUrl ? (
          <>
            <Action href={site.webinarUrl} event="webinar_register_click">
              Register for Thursday
            </Action>
            {site.webinarFallback &&
              site.webinarFallback !== site.webinarUrl && (
                <p>
                  <a className="a-inline" href={site.webinarFallback}>
                    Alternative registration
                  </a>
                </p>
              )}
          </>
        ) : (
          <p className="a-closing">
            Registration is not open yet. Explore the guides below or request an
            audit for your business.
          </p>
        )}
      </PageHero>
      <Section title="Know Which Number to Fix Next" light>
        <div className="a-three">
          <article>
            <h3>What you will learn</h3>
            <List
              items={[
                "Marketing source, total and valid leads",
                "Contact, booking and show rates",
                "Estimate and sold rates",
                "Cost per sold job",
                "Collected revenue and gross profit where known",
              ]}
            />
          </article>
          <article>
            <h3>Who it is for</h3>
            <p>
              Established residential contractor owners, general managers,
              office leaders and sales managers who want a clearer view of
              marketing and sales performance.
            </p>
          </article>
          <article>
            <h3>What to bring</h3>
            <p>
              Bring your current lead, appointment, estimate and sales totals if
              available. No passwords or homeowner personal information are
              needed. You can follow along without sharing private business
              data.
            </p>
          </article>
        </div>
      </Section>
      <Section title="A Practical Working Session">
        <p className="a-lead">
          Expect clear definitions, worked examples and questions you can take
          back to your team. No promised returns or secret shortcuts.
        </p>
        <FAQ
          items={[
            [
              "Do I need a specific CRM?",
              "No. The scorecard concepts apply whether you use a CRM or a simple spreadsheet.",
            ],
            [
              "Do I have to share my numbers?",
              "No. Bring them for your own reference. Do not share homeowner personal information.",
            ],
            [
              "Will a recording be available?",
              "Available recordings will be linked from Insights after publication. A recording is not promised for every session.",
            ],
            [
              "Can Aurex help with our specific process?",
              "Get in touch to talk about your business and the process you want to improve.",
            ],
          ]}
        />
        <div className="a-actions">
          <Action href="/contact">Start a conversation</Action>
          <Action href="/insights" secondary event="secondary_cta_click">
            Browse Contractor Insights
          </Action>
        </div>
      </Section>
    </Shell>
  );
}

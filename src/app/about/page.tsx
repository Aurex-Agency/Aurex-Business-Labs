import Image from "next/image";
import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
export const metadata = pageMeta(
  "About Aurex Business Labs",
  "Customer acquisition and revenue systems for established residential contractors.",
  "/about",
);
export default function About() {
  return (
    <Shell>
      <Schema data={organization} />
      <PageHero
        eyebrow="About Aurex Business Labs"
        path="/about"
        title="Built around the sold job."
        description="Aurex Business Labs connects acquisition, lead handling, opportunity recovery, referrals, and repeat business into one measurable system."
      />
      <Section eyebrow="Our point of view" title="">
        <h2 className="s-about-statement">
          From marketing activity
          <br />
          to the outcomes
          <br />
          <em>your business runs on.</em>
        </h2>
        <div className="a-two" style={{ marginTop: 55 }}>
          <p className="a-lead">
            Aurex Business Labs is a customer acquisition and revenue systems
            company for established residential contractors.
          </p>
          <div>
            <p>
              We help contractors acquire customers, convert more opportunities,
              recover missed revenue, and make each customer worth more.
            </p>
            <p style={{ marginTop: 24 }}>
              The Aurex Revenue Capture System connects Capture, Convert,
              Recover and Compound. Tracking supports every stage, from the
              original inquiry to the sold job and the next referral.
            </p>
          </div>
        </div>
      </Section>
      {site.founderName && site.founderBio && (
        <Section title={site.founderName} light>
          <div className="a-two">
            {site.founderPhoto && (
              <Image
                src={site.founderPhoto}
                alt={site.founderName}
                width={600}
                height={750}
                className="a-founder-photo"
              />
            )}
            <p className="a-lead">{site.founderBio}</p>
          </div>
        </Section>
      )}
      <Section title="What we hold ourselves to." light>
        <div className="a-three">
          {[
            [
              "Own the next step.",
              "Every inquiry, estimate and follow-up needs a clear owner and a clear next action.",
            ],
            [
              "Fix the actual constraint.",
              "Use the scorecard to find whether acquisition, response, booking, sales or capacity needs attention.",
            ],
            [
              "Evidence over promises.",
              "Show the work. Be clear about what is known. Publish results only when the evidence and permissions support them.",
            ],
          ].map(([h, p]) => (
            <article className="a-card" key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </Shell>
  );
}

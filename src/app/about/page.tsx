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
const principles = [
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
];
export default function About() {
  return (
    <Shell>
      <Schema data={organization} />
      <PageHero
        eyebrow="About Aurex Business Labs"
        path="/about"
        title={
          <>
            Built around <em>the sold job.</em>
          </>
        }
        description="Aurex Business Labs connects acquisition, lead handling, opportunity recovery, referrals, and repeat business into one measurable system."
      />
      <section className="l-section l-about">
        <div className="l-wrap">
          <p className="l-eyebrow" data-reveal="fade">
            Our point of view
          </p>
          <h2 className="l-statement" data-reveal>
            From marketing activity to the outcomes{" "}
            <em>your business runs on.</em>
          </h2>
          <div className="l-split l-about-split" data-reveal>
            <p className="l-lead">
              Aurex Business Labs is a customer acquisition and revenue systems
              company for established residential contractors.
            </p>
            <div>
              <p>
                We help contractors acquire customers, convert more
                opportunities, recover missed revenue, and make each customer
                worth more.
              </p>
              <p>
                The Aurex Revenue Capture System connects Capture, Convert,
                Recover and Compound. Tracking supports every stage, from the
                original inquiry to the sold job and the next referral.
              </p>
            </div>
          </div>
        </div>
      </section>
      {site.founderName && site.founderBio && (
        <Section title={site.founderName} light>
          <div className="l-split">
            {site.founderPhoto && (
              <Image
                src={site.founderPhoto}
                alt={site.founderName}
                width={600}
                height={750}
                className="l-founder-photo"
              />
            )}
            <p className="l-lead">{site.founderBio}</p>
          </div>
        </Section>
      )}
      <section className="l-section is-paper l-sheet">
        <div className="l-wrap">
          <div className="l-section-head" data-reveal>
            <h2>What we hold ourselves to.</h2>
          </div>
          <div className="l-grid-3" data-stagger>
            {principles.map(([h, p], i) => (
              <article className="l-card" key={h}>
                <span className="l-index">0{i + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </Shell>
  );
}

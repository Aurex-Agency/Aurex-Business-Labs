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
  "Business thinking and creative care, brought together. Meet the approach behind Aurex Business Labs.",
  "/about",
);
export default function About() {
  return (
    <Shell>
      <Schema data={organization} />
      <PageHero
        eyebrow="About Aurex Business Labs"
        path="/about"
        title="A business mind. A designer’s eye."
        description="We care about what a business is trying to do, and how it feels to interact with it. The strongest work gets both right."
      />
      <Section eyebrow="Our point of view" title="">
        <h2 className="s-about-statement">
          The way you show up
          <br />
          should reflect
          <br />
          <em>what you’re made of.</em>
        </h2>
        <div className="a-two" style={{ marginTop: 55 }}>
          <p className="a-lead">
            Aurex Business Labs brings strategy, distinctive websites, and
            connected systems together.
          </p>
          <div>
            <p>
              We work with established businesses that want their digital
              presence to feel as considered as the work they do. That means
              clear communication, purposeful design, and attention to what
              happens after someone gets in touch.
            </p>
            <p style={{ marginTop: 24 }}>
              No borrowed personality. No design decision without a reason. Just
              a thoughtful response to the business in front of us.
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
              "Clarity over noise.",
              "Make the important things easy to find, understand, and act on.",
            ],
            [
              "Character over convention.",
              "Let the business shape the work. The result should feel specific, not interchangeable.",
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

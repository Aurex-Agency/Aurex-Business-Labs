import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  FinalCTA,
} from "@/components/authority/shared";
import { StudioStory } from "@/components/studio/motion";
export const metadata = pageMeta(
  "Our Approach",
  "Business thinking, distinctive design, and connected systems. A deliberate approach to the whole customer experience.",
  "/approach",
);
export default function Approach() {
  return (
    <Shell>
      <PageHero
        eyebrow="Our approach"
        path="/approach"
        title="Good design starts with better questions."
        description="What makes the business different? What does the customer need to understand? What should happen next? We start there."
      />
      <div className="s-approach-opening">
        <p className="s-kicker">
          Think it through.
          <br />
          Bring it together.
        </p>
        <h2>
          A website is one part of
          <br />
          <em>a bigger experience.</em>
        </h2>
      </div>
      <StudioStory />
      <Section
        eyebrow="Working together"
        title="Clear conversations. Thoughtful work."
      >
        <div className="a-three">
          {[
            [
              "Understand first.",
              "We listen, look at what already exists, and define the problem before deciding what to build.",
            ],
            [
              "Build with intention.",
              "Strategy informs the words, the structure, and the design. You see how decisions connect to the business.",
            ],
            [
              "Sweat the details.",
              "We consider the small screens, the keyboard, the loading time, the form errors, and the handoff. They are all part of the experience.",
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

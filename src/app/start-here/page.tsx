import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Shell, PageHero } from "@/components/authority/shared";
import { ResourceArt } from "@/components/learn/graphics";
import { LearningCTA } from "@/components/learn/shared";
import { stages } from "@/content/resources";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Start Here | A Contractor’s Growth Field Guide",
  "Understand Capture, Convert, Recover, and Compound. Choose a practical first step for your contractor customer journey.",
  "/start-here",
);
const prompts = [
  "Can we connect each valid inquiry to a source and a requested service?",
  "Who owns the next action after the phone rings or a form arrives?",
  "Which open estimates have an agreed follow-up date and an owner?",
  "What happens after the job is complete, and does the customer know?",
];
export default function StartHere() {
  return (
    <Shell>
      <PageHero
        eyebrow="Start here"
        path="/start-here"
        title={
          <>
            Find the next <em>useful step.</em>
          </>
        }
        description="You know your trade. This is a field guide to the customer journey around it. Choose the part you want to understand, then put one idea to work."
      >
        <nav className="l-stage-nav" aria-label="Learning path">
          {stages.map((s, i) => (
            <a key={s.name} href={`#${s.name.toLowerCase()}`}>
              <span>0{i + 1}</span>
              {s.name}
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="l-wrap l-lessons">
        {stages.map((s, i) => (
          <section className="l-lesson" id={s.name.toLowerCase()} key={s.name}>
            <div className="l-lesson-copy" data-reveal>
              <p className="l-eyebrow">
                0{i + 1} / {s.name}
              </p>
              <h2>{s.question}</h2>
              <p>{s.description}</p>
              <p>{s.detail}</p>
              <div className="l-lesson-prompt">
                <span className="l-eyebrow">Ask your team</span>
                <p>{prompts[i]}</p>
              </div>
              <Link className="l-text-link" href={`/resources/${s.resource}`}>
                Open the practical resource <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="l-art-frame" data-reveal="scale">
              <span className="l-art-index" aria-hidden="true">
                0{i + 1}
              </span>
              <ResourceArt
                kind={["scorecard", "checklist", "recover", "compound"][i]}
                animate
              />
            </div>
          </section>
        ))}
      </div>
      <LearningCTA />
    </Shell>
  );
}

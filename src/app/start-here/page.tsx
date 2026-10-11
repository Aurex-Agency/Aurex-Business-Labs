import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
export default function StartHere() {
  return (
    <Shell>
      <PageHero
        eyebrow="Start here"
        path="/start-here"
        title="Find the next useful step."
        description="You know your trade. This is a field guide to the customer journey around it. Choose the part you want to understand, then put one idea to work."
      />
      <nav className="l-wrap l-stage-nav" aria-label="Learning path">
        {stages.map((s, i) => (
          <a key={s.name} href={`#${s.name.toLowerCase()}`}>
            <span>0{i + 1}</span>
            {s.name} ↓
          </a>
        ))}
      </nav>
      <div className="l-wrap l-lessons">
        {stages.map((s, i) => (
          <section className="l-lesson" id={s.name.toLowerCase()} key={s.name}>
            <div>
              <p className="l-eyebrow">
                0{i + 1} / {s.name}
              </p>
              <h2>{s.question}</h2>
              <p>{s.description}</p>
              <p>{s.detail}</p>
              <div className="l-lesson-prompt">
                <span className="l-eyebrow">Ask your team</span>
                <p>
                  {
                    [
                      "Can we connect each valid inquiry to a source and a requested service?",
                      "Who owns the next action after the phone rings or a form arrives?",
                      "Which open estimates have an agreed follow-up date and an owner?",
                      "What happens after the job is complete, and does the customer know?",
                    ][i]
                  }
                </p>
              </div>
              <Link className="l-text-link" href={`/resources/${s.resource}`}>
                Open the practical resource <ArrowUpRight size={17} />
              </Link>
            </div>
            <ResourceArt
              kind={["scorecard", "checklist", "recover", "compound"][i]}
              animate
            />
          </section>
        ))}
      </div>
      <LearningCTA />
    </Shell>
  );
}

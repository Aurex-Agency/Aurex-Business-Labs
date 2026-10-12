"use client";
import { useRef, useState } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  Search,
  Send,
  MousePointer2,
  Crosshair,
} from "lucide-react";
import { stages } from "@/content/revenue-website";
const icons = [Search, MousePointer2, Send, Crosshair];
function StageVisual({ index }: { index: number }) {
  const Icon = icons[index];
  return (
    <div className="system-visual">
      <div className="system-visual-top">
        <span className="micro-label">AUREX / SYSTEM ARCHITECTURE</span>
        <span className="accent">0{index + 1}</span>
      </div>
      <div className="system-orbit" aria-hidden="true">
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="orbit-core">
          <Icon size={35} strokeWidth={1} />
        </div>
        <span className="orbit-point p1" />
        <span className="orbit-point p2" />
        <span className="orbit-point p3" />
        <span className="orbit-word w1">WEBSITE</span>
        <span className="orbit-word w2">CUSTOMER</span>
        <span className="orbit-word w3">BUSINESS</span>
      </div>
      <div className="system-display">
        <span className="micro-label">{stages[index].label}</span>
        <h3>{stages[index].detail}</h3>
        <div className="system-display-row">
          {index === 0 ? (
            <>
              <Search size={16} />
              <span>Your service. Your community.</span>
              <ArrowUpRight size={16} />
            </>
          ) : index === 1 ? (
            <>
              <MousePointer2 size={16} />
              <span>Request a quote</span>
              <ArrowUpRight size={16} />
            </>
          ) : index === 2 ? (
            <>
              <Send size={16} />
              <span>Thanks for reaching out. We&apos;re on it.</span>
              <Check size={16} />
            </>
          ) : (
            <>
              <Crosshair size={16} />
              <span>Google Search → Inquiry → Opportunity</span>
              <Check size={16} />
            </>
          )}
        </div>
      </div>
      <div className="system-dots">
        {stages.map((s, i) => (
          <span key={s.name} className={i === index ? "active" : ""}>
            {s.name}
          </span>
        ))}
      </div>
      <p className="visual-caption">Conceptual system illustration</p>
    </div>
  );
}
export function SystemStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(3, Math.floor(v * 4))),
  );
  return (
    <section className="section system-section" id="system">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">02 / THE AUREX REVENUE WEBSITE SYSTEM</span>
          <h2>
            One website.
            <br />
            <em>Four jobs.</em>
          </h2>
          <p>
            The website is only the front end. Aurex connects the experience
            visitors see with the systems your business needs behind the scenes.
          </p>
        </div>
        <div className="system-story" ref={ref}>
          <div className="system-steps">
            {stages.map((s, i) => (
              <article
                className={`system-step ${active === i ? "active" : ""}`}
                key={s.name}
              >
                <span className="step-index">0{i + 1}</span>
                <div>
                  <span className="eyebrow">{s.name}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <div className="mobile-stage">
                  <StageVisual index={i} />
                </div>
              </article>
            ))}
          </div>
          <div className="system-sticky">
            <m.div
              key={active}
              initial={{ opacity: reduced ? 1 : 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <StageVisual index={active} />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

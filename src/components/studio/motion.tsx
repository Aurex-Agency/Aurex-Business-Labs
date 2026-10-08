"use client";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Action } from "@/components/authority/interactions";
import { work, type Project } from "@/content/work";

export function KineticHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 2]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <section className="s-hero" ref={ref}>
      <div className="s-hero-top">
        <span className="s-kicker">
          For established residential contractors
        </span>
        <span className="s-kicker">Aurex Revenue Capture System</span>
      </div>
      <div className="s-hero-main">
        <m.h1 style={{ x: reduce ? 0 : titleX }}>
          <span>More booked jobs.</span>
          <span className="s-serif">More from each lead.</span>
        </m.h1>
        <m.div
          className="s-hero-art"
          style={{ y: reduce ? 0 : imageY, rotate: reduce ? -8 : rotate }}
          initial={false}
          animate={reduce ? {} : { rotate: [-11, -8], y: [30, 0] }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="s-revenue-map">
            <span className="s-kicker">
              The opportunity does not end at the lead.
            </span>
            {[
              "Inquiry",
              "Appointment",
              "Estimate",
              "Sold job",
              "Repeat & referral",
            ].map((step, i) => (
              <div className="s-revenue-step" key={step}>
                <span>0{i + 1}</span>
                <strong>{step}</strong>
                <span aria-hidden="true">↗</span>
              </div>
            ))}
            <p>One connected customer journey.</p>
          </div>
        </m.div>
        <span className="s-hero-cross" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="s-hero-bottom">
        <div className="r-hero-actions">
          <Action href="/apply" event="audit_cta_click">
            Request a Revenue Leakage Audit
          </Action>
          <Link className="s-text-link" href="/results/roofing-revenue-system">
            See the roofing case study ↗
          </Link>
        </div>
        <p>
          Turn more marketing spend into booked appointments and sold jobs.
          Recover open opportunities. Build repeat and referral revenue.
        </p>
        <Link
          className="s-round-link"
          href="/apply"
          aria-label="Request a Revenue Leakage Audit"
        >
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="s-hero-rule">
        <span>Capture. Convert. Recover. Compound.</span>
        <span>Scroll to discover</span>
      </div>
    </section>
  );
}
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const pointerX = useSpring(0, { stiffness: 170, damping: 23 });
  const pointerY = useSpring(0, { stiffness: 170, damping: 23 });
  return (
    <article ref={ref} className={`s-project s-project-${index}`}>
      <Link
        href={`/work/${project.slug}`}
        className="s-project-link"
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          pointerX.set((e.clientX - rect.left - rect.width / 2) * 0.025);
          pointerY.set((e.clientY - rect.top - rect.height / 2) * 0.025);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <div className="s-project-media" style={{ background: project.accent }}>
          <span className="s-project-id">0{index + 1} / SELECTED WORK</span>
          <m.div
            className="s-project-canvas"
            style={{
              y: reduce ? 0 : y,
              x: reduce ? 0 : pointerX,
              rotate: reduce ? 0 : pointerY,
            }}
          >
            <Image
              src={project.image}
              alt={`${project.name} website design`}
              width={1440}
              height={1000}
              sizes="(max-width: 700px) 100vw, 60vw"
            />
          </m.div>
          <span className="s-project-view">
            Explore project <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="s-project-info">
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <p>{project.summary}</p>
      </Link>
    </article>
  );
}
export function WorkGrid({ limit = 4 }: { limit?: number }) {
  return (
    <div className="s-work-grid">
      {work.slice(0, limit).map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
const disciplines = [
  {
    number: "01",
    title: "Capture.",
    label: "Create qualified opportunities",
    text: "Put the right homeowner offer in front of the right market through the appropriate acquisition channel and conversion assets.",
    words: ["Homeowner offer", "Acquisition campaigns", "Conversion funnel"],
    symbol: "↗",
  },
  {
    number: "02",
    title: "Convert.",
    label: "Connect the lead to the appointment",
    text: "Connect new inquiries to rapid response, qualification, booking, reminders, and a clear next step. Give your team a process they can follow.",
    words: ["Lead response", "Booking", "Pipeline visibility"],
    symbol: "↳",
  },
  {
    number: "03",
    title: "Recover.",
    label: "Follow up on the opportunities you earned",
    text: "Follow up on unresponsive leads, missed appointments, delayed projects, and open estimates. Keep promising opportunities from disappearing into an inbox.",
    words: ["Open estimates", "No-shows", "Dormant opportunities"],
    symbol: "⤴",
  },
  {
    number: "04",
    title: "Compound.",
    label: "Make the next job count too",
    text: "Turn completed jobs and past customers into reviews, referrals, repeat service, reactivation, and appropriate additional offers.",
    words: ["Reviews & referrals", "Repeat service", "Customer reactivation"],
    symbol: "✳",
  },
];
export function StudioStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const spin = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const line = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  return (
    <section
      id="revenue-system"
      className="s-story"
      ref={ref}
      aria-labelledby="story-title"
    >
      <div className="s-story-aside">
        <span className="s-kicker">The Aurex method / 01-04</span>
        <h2 id="story-title">
          One system.
          <br />
          Four jobs.
          <br />
          <em>Every opportunity.</em>
        </h2>
        <m.span
          className="s-story-mark"
          style={{ rotate: reduce ? 0 : spin }}
          aria-hidden="true"
        >
          ✳
        </m.span>
        <Link className="s-text-link" href="/revenue-capture-system">
          Explore the system <span aria-hidden="true">↗</span>
        </Link>
        <div className="s-story-progress" aria-hidden="true">
          <m.div style={{ scaleX: reduce ? 1 : line }} />
        </div>
      </div>
      <div className="s-story-chapters">
        {disciplines.map((d) => (
          <article className="s-chapter" key={d.number}>
            <div className="s-chapter-top">
              <span>{d.number}</span>
              <span>{d.label}</span>
              <span aria-hidden="true">{d.symbol}</span>
            </div>
            <h3>{d.title}</h3>
            <p>{d.text}</p>
            <ul>
              {d.words.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return (
    <m.div
      className="s-reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? 0 : scrollYProgress }}
    />
  );
}

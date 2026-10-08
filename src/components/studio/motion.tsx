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
        <span className="s-kicker">Aurex Business Labs</span>
        <span className="s-kicker">Strategy. Design. Connection.</span>
      </div>
      <div className="s-hero-main">
        <m.h1 style={{ x: reduce ? 0 : titleX }}>
          <span>Good business.</span>
          <span className="s-serif">Great presence.</span>
        </m.h1>
        <m.div
          className="s-hero-art"
          style={{ y: reduce ? 0 : imageY, rotate: reduce ? -8 : rotate }}
          initial={false}
          animate={reduce ? {} : { rotate: [-11, -8], y: [30, 0] }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="s-art-frame">
            <div className="s-browser-bar">
              <i />
              <i />
              <i />
              <span>Made for the real world.</span>
            </div>
            <Image
              src="/projects/norton.webp"
              alt="Norton Equipment Co website design by Aurex Business Labs"
              width={1440}
              height={1000}
              priority
              sizes="(max-width: 700px) 80vw, 42vw"
            />
          </div>
          <span className="s-art-caption">
            Selected work / Norton Equipment Co
          </span>
        </m.div>
        <span className="s-hero-cross" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="s-hero-bottom">
        <a className="s-scroll-cue" href="#selected-work">
          <span aria-hidden="true">↓</span>Take a closer look
        </a>
        <p>
          We bring sharp thinking, distinctive websites, and connected systems
          to businesses with something real to offer.
        </p>
        <Link
          className="s-round-link"
          href="/contact"
          aria-label="Start a conversation"
        >
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="s-hero-rule">
        <span>Independent thinking. Deliberate execution.</span>
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
    title: "Find the right direction.",
    label: "Strategy & positioning",
    text: "Start with the business. Understand the customer, the decision they are making, and what needs to be clearer. That thinking gives every design decision a purpose.",
    words: ["Customer journey", "Messaging", "Digital direction"],
    symbol: "↗",
  },
  {
    number: "02",
    title: "Make every interaction count.",
    label: "Design & development",
    text: "Give your business a presence that feels considered from the first impression to the smallest interaction. Clear structure. Distinctive design. A website that works as well as it looks.",
    words: ["Web experiences", "Content & structure", "Responsive development"],
    symbol: "✳",
  },
  {
    number: "03",
    title: "Connect what happens next.",
    label: "Systems & automation",
    text: "A good website should fit the way your business works. Connect inquiries, follow-up, and useful measurement so a promising conversation has somewhere to go.",
    words: ["Lead handling", "CRM connections", "Measurement"],
    symbol: "⤴",
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
    <section className="s-story" ref={ref} aria-labelledby="story-title">
      <div className="s-story-aside">
        <span className="s-kicker">How we think / 01-03</span>
        <h2 id="story-title">
          The details.
          <br />
          The big picture.
          <br />
          <em>All connected.</em>
        </h2>
        <m.span
          className="s-story-mark"
          style={{ rotate: reduce ? 0 : spin }}
          aria-hidden="true"
        >
          ✳
        </m.span>
        <Link className="s-text-link" href="/approach">
          Inside our approach <span aria-hidden="true">↗</span>
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

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Phone,
  CalendarDays,
  MessageSquare,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { stages } from "@/content/resources";
import { ResourceArt } from "./graphics";
import { useMotionPreference } from "./use-motion-preference";

export function FieldIllustration() {
  const reduce = useMotionPreference();
  const [replay, setReplay] = useState(0);
  return (
    <div className="f-illustration">
      <div className="f-orbit-label">
        <span>FROM FIRST HELLO</span>
        <ArrowUpRight size={18} />
      </div>
      <svg
        className="f-house"
        viewBox="0 0 640 540"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="field-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path d="M40 0H0V40" stroke="#8bdff6" strokeOpacity=".12" />
          </pattern>
          <linearGradient
            id="field-wall"
            x1="180"
            y1="220"
            x2="480"
            y2="420"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#19bce5" />
            <stop offset="1" stopColor="#086b9c" />
          </linearGradient>
        </defs>
        <path d="M20 300 325 120 630 300 325 485Z" fill="#103b59" />
        <path d="M20 300 325 120 630 300 325 485Z" fill="url(#field-grid)" />
        <path d="m20 300 305 185 305-185" stroke="#23759c" />
        <path
          d="m170 302 152-86 158 88-157 92Z"
          fill="#050e1a"
          opacity=".6"
          transform="translate(0 38)"
        />
        <path d="M184 258v109l137 77V329Z" fill="url(#field-wall)" />
        <path d="M321 329v115l153-87V241Z" fill="#0b759e" />
        <path d="m173 256 146-159 164 91-153 154Z" fill="#b8effc" />
        <path d="m319 97 13 132 151-41Z" fill="#dff8ff" />
        <path
          d="m319 97 164 91-153 154-157-86Z"
          stroke="#f0f6fa"
          strokeWidth="2"
        />
        <path
          d="m212 224 152 83m-121-116 153 84m-122-117 154 85m-123-118 153 86"
          stroke="#4ca6c5"
          strokeOpacity=".6"
        />
        <path d="M217 302v45l35 20v-45Z" fill="#083449" stroke="#8bdff6" />
        <path d="m235 313 0 45m-18-34 35 20" stroke="#8bdff6" />
        <path d="M355 353v70l39-22v-70Z" fill="#07384d" stroke="#8bdff6" />
        <circle cx="385" cy="372" r="2" fill="#8bdff6" />
        <path d="M419 294v39l28-16v-39Z" fill="#8bdff6" />
        <path d="M433 286v39" stroke="#0b759e" />
        <path d="m365 425 47 28 107-61" stroke="#19bce5" strokeWidth="18" />
        <path
          d="m86 203 59-34 47 27m286 14 70 40v102l-44 26M89 388l65 38 62-35"
          stroke="#318ab3"
          strokeDasharray="4 7"
        />
        <m.path
          key={`${replay}-${reduce}`}
          data-motion-path
          d="M74 174v109q0 16 15 24l61 35q14 8 0 16l-52 30q-14 8 0 16l135 77q14 8 28 0l290-167q14-8 0-16l-38-22"
          stroke="#19bce5"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          whileInView={reduce ? {} : { pathLength: [0, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 3.2 }}
        />
        {[
          [74, 174],
          [150, 342],
          [248, 481],
          [519, 283],
        ].map(([cx, cy]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r="9" fill="#08344c" stroke="#8bdff6" />
            <circle cx={cx} cy={cy} r="3" fill="#8bdff6" />
          </g>
        ))}
      </svg>
      <m.div
        className="f-float f-inquiry"
        initial={false}
        whileInView={reduce ? {} : { y: [14, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <span className="f-icon">
          <Phone size={19} />
        </span>
        <div>
          <small>01 / THE OPPORTUNITY</small>
          <strong>A homeowner reaches out.</strong>
          <span>“Can we talk about our project?”</span>
        </div>
      </m.div>
      <m.div
        className="f-float f-booked"
        initial={false}
        whileInView={reduce ? {} : { y: [20, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <CalendarDays size={18} />
        <div>
          <small>A CLEAR NEXT STEP</small>
          <strong>Conversation → appointment</strong>
        </div>
        <Check size={16} />
      </m.div>
      <div className="f-art-foot">
        <span>TO THE NEXT OPPORTUNITY ↗</span>
        <button
          disabled={reduce}
          onClick={() => setReplay((v) => v + 1)}
          aria-label="Replay customer journey animation"
        >
          <RotateCcw size={15} />
        </button>
      </div>
      <span className="f-illustration-note">
        An illustrated customer journey, not live activity.
      </span>
    </div>
  );
}

const questions = [
  "Where are inquiries coming from?",
  "Who owns the first response?",
  "Why have estimates gone quiet?",
  "What happens after the job?",
];
export function StartingPoint() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <section
      id="explore"
      className="f-start l-wrap"
      aria-labelledby="starting-title"
    >
      <div>
        <p className="l-eyebrow">Find your starting point</p>
        <h2 id="starting-title">What’s on your mind?</h2>
      </div>
      <div className="f-start-options" aria-label="Choose a business question">
        {questions.map((q, i) => (
          <button
            key={q}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {q}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div className="f-start-answer" aria-live="polite">
        <span className="l-eyebrow">Start with {stage.name}</span>
        <p>{stage.detail}</p>
        <Link className="l-text-link" href={`/resources/${stage.resource}`}>
          Open the practical resource <ArrowRight size={16} />
        </Link>
      </div>
      <noscript>
        <Link href="/start-here">Explore all four starting points</Link>
      </noscript>
    </section>
  );
}

export function StageScene({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="f-capture-scene" aria-hidden="true">
        <div className="f-source-labels">
          <span>Local search</span>
          <span>A referral</span>
          <span>Your website</span>
        </div>
        <svg viewBox="0 0 400 90">
          <path
            d="M65 0v28q0 15 15 15h105q15 0 15 15v32M200 0v90M335 0v28q0 15-15 15H215q-15 0-15 15v32"
            fill="none"
            stroke="#8bdff6"
            strokeWidth="2"
          />
        </svg>
        <div className="f-capture-record">
          <span className="f-icon">
            <Phone size={24} />
          </span>
          <span className="l-eyebrow">One inquiry. Keep the context.</span>
          <strong>A new project starts here.</strong>
          <div>
            <span>Requested service</span>
            <Check size={16} />
          </div>
          <div>
            <span>Original source</span>
            <Check size={16} />
          </div>
          <div>
            <span>The right person to respond</span>
            <Check size={16} />
          </div>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="f-convert-scene" aria-hidden="true">
        <div className="f-convert-call">
          <MessageSquare size={23} />
          <span>“Let’s talk through the project.”</span>
        </div>
        <div className="f-calendar">
          <div>
            <span>THE NEXT STEP</span>
            <CalendarDays size={20} />
          </div>
          <strong>A time to connect.</strong>
          <div className="f-calendar-cells">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className={i === 9 ? "is-selected" : ""}>
                {i === 9 ? <Check size={18} /> : <i />}
              </span>
            ))}
          </div>
          <p>Clear details. One owner. A confirmed appointment.</p>
        </div>
      </div>
    );
  return <ResourceArt kind={index === 2 ? "recover" : "compound"} animate />;
}

export function SystemStory() {
  const [active, setActive] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const reduce = useMotionPreference();
  useEffect(() => {
    const chapters =
      container.current?.querySelectorAll<HTMLElement>(".f-chapter");
    if (!chapters) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.stage));
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="f-system" aria-labelledby="system-title">
      <div className="l-wrap">
        <div className="f-system-heading">
          <p className="l-eyebrow">02 / The Aurex Revenue Capture System</p>
          <h2 id="system-title">
            Good businesses don’t
            <br />
            leave the next step <em>to chance.</em>
          </h2>
          <p>Four connected habits. One better customer journey.</p>
        </div>
        <div className="f-story" ref={container}>
          <div className="f-story-visual">
            <nav
              className="f-story-nav"
              aria-label="Explore the customer journey"
            >
              {stages.map((s, i) => (
                <a
                  key={s.name}
                  href={`#story-${s.name.toLowerCase()}`}
                  aria-current={active === i ? "step" : undefined}
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                  {s.name}
                </a>
              ))}
            </nav>
            <div className="f-scene-frame">
              <span className="f-scene-number" aria-hidden="true">
                0{active + 1}
              </span>
              <m.div
                key={`${active}-${reduce}`}
                className="f-scene-content"
                initial={false}
                animate={reduce ? {} : { opacity: [0.5, 1], y: [12, 0] }}
                transition={{ duration: 0.5 }}
              >
                <StageScene index={active} />
              </m.div>
              <p className="f-scene-caption">{stages[active].question}</p>
              <span className="f-scene-disclaimer">Illustrative workflow</span>
            </div>
          </div>
          <div className="f-chapters">
            {stages.map((s, i) => (
              <article
                id={`story-${s.name.toLowerCase()}`}
                className="f-chapter"
                data-stage={i}
                key={s.name}
              >
                <p className="l-eyebrow">
                  0{i + 1} / {s.name}
                </p>
                <h3>{s.question}</h3>
                <p>{s.description}</p>
                <div className="f-chapter-note">
                  <span>IN PRACTICE</span>
                  <p>{s.detail}</p>
                </div>
                <Link className="l-text-link" href={`/resources/${s.resource}`}>
                  Put it into practice <ArrowUpRight size={17} />
                </Link>
                <div className="f-mobile-scene">
                  <StageScene index={i} />
                </div>
              </article>
            ))}
          </div>
        </div>
        <Link
          className="l-text-link f-framework-link"
          href="/revenue-capture-system"
        >
          Explore the full framework <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function JourneyExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useMotionPreference();
  const stage = stages[active];
  return (
    <div className="f-explorer">
      <div className="f-explorer-controls" aria-label="Choose a system stage">
        {stages.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>0{i + 1}</span>
            {s.name}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div className="f-explorer-body">
        <m.div
          className="f-explorer-scene"
          key={`${active}-${reduce}`}
          initial={false}
          animate={reduce ? {} : { opacity: [0.5, 1], y: [10, 0] }}
          transition={{ duration: 0.4 }}
        >
          <StageScene index={active} />
        </m.div>
        <div aria-live="polite">
          <p className="l-eyebrow">{stage.name} / Illustrated workflow</p>
          <h2>{stage.question}</h2>
          <p>{stage.description}</p>
          <p>{stage.detail}</p>
          <Link className="l-text-link" href={`/resources/${stage.resource}`}>
            Explore the {stage.name.toLowerCase()} resource{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

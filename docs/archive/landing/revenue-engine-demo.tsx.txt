"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  Search,
  Workflow,
  MousePointer2,
  Send,
  Crosshair,
  FolderKanban,
} from "lucide-react";
const flow = [
  {
    name: "Search Visit",
    icon: Search,
    title: "A search becomes a visit.",
    description:
      "A prospective customer finds your business on Google and lands on a page built around their needs.",
    label: "Traffic source",
    value: "Google Search",
  },
  {
    name: "Lead Captured",
    icon: MousePointer2,
    title: "Interest becomes an inquiry.",
    description:
      "A clear offer and a focused form make it easy for the right customer to take the next step.",
    label: "Conversion",
    value: "Quote request received",
  },
  {
    name: "Follow-Up Triggered",
    icon: Send,
    title: "The conversation starts.",
    description:
      "An automatic email and text acknowledge the inquiry while your team prepares a personal response.",
    label: "Workflow",
    value: "Email + SMS follow-up",
  },
  {
    name: "Opportunity Created",
    icon: FolderKanban,
    title: "Every inquiry has a place.",
    description:
      "Contact details and the request arrive together in your CRM, ready for the next conversation.",
    label: "Pipeline stage",
    value: "New opportunity",
  },
  {
    name: "Source Tracked",
    icon: Crosshair,
    title: "See the whole journey.",
    description:
      "The original source stays with the opportunity. Know how a visitor found you and what happened next.",
    label: "Attribution",
    value: "Google Search → Website → CRM",
  },
];
export function RevenueEngine() {
  const [active, setActive] = useState(4);
  const [manual, setManual] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || manual || reduced) return;
    const frame = requestAnimationFrame(() => setActive(0));
    const timers = flow
      .slice(1)
      .map((_, i) => setTimeout(() => setActive(i + 1), (i + 1) * 1600));
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [inView, manual, reduced]);
  const current = active;
  const item = flow[current];
  return (
    <div className="engine-wrap" ref={ref}>
      <div className="engine-label">
        <span className="tiny-cross">+</span> FROM FIRST CLICK TO NEXT
        CONVERSATION <span>0{current + 1} / 05</span>
      </div>
      <div className="engine">
        <div className="engine-chrome">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>aurex / revenue system</span>
          <span className="example-tag">EXAMPLE LEAD FLOW</span>
        </div>
        <div className="engine-body">
          <div className="engine-topline">
            <span className="micro-label">THE CONNECTED JOURNEY</span>
            <Workflow size={18} />
          </div>
          <h2>Attention. Connected.</h2>
          <p className="engine-intro">A website is just the beginning.</p>
          <div
            className="journey-tabs"
            aria-label="Example lead journey stages"
          >
            {flow.map((f, i) => (
              <button
                key={f.name}
                aria-label={f.name}
                aria-pressed={current === i}
                onClick={() => {
                  setManual(true);
                  setActive(i);
                }}
                className={i <= current ? "stage complete" : "stage"}
              >
                <span>
                  {i < current ? <Check size={17} /> : <f.icon size={17} />}
                </span>
                <small>{f.name}</small>
              </button>
            ))}
          </div>
          <div className="journey-view">
            <div className="lead-preview">
              <div className="lead-avatar">
                <MousePointer2 size={20} />
              </div>
              <div>
                <span className="micro-label">EXAMPLE INQUIRY</span>
                <strong>A potential customer</strong>
                <small>From interested visitor to sales opportunity</small>
              </div>
              <ArrowUpRight size={19} />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -5 }}
                transition={{ duration: 0.25 }}
                className="journey-detail"
              >
                <div className="journey-detail-title">
                  <span className="accent">0{current + 1}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <div className="journey-data">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
          <div className="engine-footer">
            <span>
              <i className="status-dot" /> Every step connected
            </span>
            <span>
              Click a stage to explore <ChevronRight size={13} />
            </span>
          </div>
        </div>
      </div>
      <div className="engine-note">
        <span className="note-icon">
          <Mail size={18} />
        </span>
        <span>
          <strong>Good design gets attention.</strong>
          <br />A connected system gives it somewhere to go.
        </span>
      </div>
    </div>
  );
}

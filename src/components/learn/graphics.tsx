"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { useMotionPreference } from "./use-motion-preference";
import {
  ArrowUpRight,
  Check,
  Phone,
  MessageSquare,
  CalendarDays,
  FileText,
  House,
  RotateCcw,
  MoveUpRight,
  Users,
  Star,
} from "lucide-react";
import { stages } from "@/content/resources";
const icons = [House, CalendarDays, MessageSquare, Users];

export function JourneyGraphic() {
  const [active, setActive] = useState(0);
  const [replay, setReplay] = useState(0);
  const reduce = useMotionPreference();
  const stage = stages[active];
  return (
    <div className="l-journey">
      <div className="l-diagram-label">
        <span>
          <i /> A connected customer journey
        </span>
        <span>Illustrative workflow</span>
      </div>
      <div className="l-journey-canvas">
        <svg
          className="l-connections"
          viewBox="0 0 1100 290"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="journey-line">
              <stop stopColor="#33546a" />
              <stop offset=".5" stopColor="#8bdff6" />
              <stop offset="1" stopColor="#33546a" />
            </linearGradient>
          </defs>
          {[
            "M150 80 H300 Q325 80 325 105 V125 Q325 145 350 145 H550",
            "M150 210 H300 Q325 210 325 190 V165 Q325 145 350 145 H550",
            "M550 145 H750 Q775 145 775 125 V80 Q775 60 800 60 H950",
            "M550 145 H950",
            "M550 145 H750 Q775 145 775 165 V210 Q775 230 800 230 H950",
          ].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke="#243340" />
              <m.path
                key={`${replay}-${reduce}-${i}`}
                data-motion-path
                d={d}
                fill="none"
                stroke="url(#journey-line)"
                strokeWidth="1.5"
                initial={false}
                whileInView={
                  reduce ? {} : { pathLength: [0, 1], opacity: [0.3, 1] }
                }
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: i * 0.13 }}
              />
            </g>
          ))}
        </svg>
        <div className="l-inquiries">
          <div className="l-signal">
            <span className="l-signal-icon">
              <Phone size={17} />
            </span>
            <span>
              First phone call<small>A homeowner has a question</small>
            </span>
            <span className="l-tiny-dot" />
          </div>
          <div className="l-signal">
            <span className="l-signal-icon">
              <MessageSquare size={17} />
            </span>
            <span>
              New inquiry<small>A project starts here</small>
            </span>
            <span className="l-tiny-dot" />
          </div>
        </div>
        <div className="l-system-core">
          <div className="l-core-orbit" />
          <div className="l-core-chip">
            <Image src="/brand/aurex-mark.png" width={64} height={64} alt="" />
          </div>
          <span>A clear next step.</span>
        </div>
        <div className="l-outcomes">
          {[
            [
              CalendarDays,
              "Appointment booked",
              "The right person. The right time.",
            ],
            [
              FileText,
              "Estimate followed up",
              "A conversation worth continuing.",
            ],
            [Check, "Job completed", "The start of a lasting relationship."],
          ].map(([Icon, label, detail]) => {
            const Symbol = Icon as typeof Check;
            return (
              <div className="l-outcome" key={String(label)}>
                <Symbol size={17} />
                <span>
                  {String(label)}
                  <small>{String(detail)}</small>
                </span>
                <Check size={13} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="l-stage-controls"
        aria-label="Explore the customer journey"
      >
        {stages.map((s, i) => {
          const Icon = icons[i];
          return (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <Icon size={16} />
              <span>{s.name}</span>
              <small>0{i + 1}</small>
            </button>
          );
        })}
      </div>
      <div className="l-journey-caption">
        <p aria-live="polite">
          <strong>{stage.question}</strong> {stage.description}
        </p>
        <div>
          <Link
            href={`/resources/${stage.resource}`}
            aria-label={`Explore the ${stage.name.toLowerCase()} resource`}
          >
            <ArrowUpRight size={20} />
          </Link>
          <button
            onClick={() => setReplay((v) => v + 1)}
            aria-label="Replay customer journey animation"
            disabled={!!reduce}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResourceArt({
  kind,
  animate = false,
}: {
  kind: string;
  animate?: boolean;
}) {
  const reduce = useMotionPreference();
  return (
    <div className={`l-resource-art l-art-${kind}`} aria-hidden="true">
      <div className="l-art-grid" />
      {kind === "scorecard" ? (
        <div className="l-mini-scorecard">
          <div className="l-mini-top">
            <span>THE WEEKLY PICTURE</span>
            <MoveUpRight size={15} />
          </div>
          {["Inquiries", "Appointments", "Estimates", "Sold jobs"].map(
            (label, i) => (
              <div className="l-score-line" key={label}>
                <span>{label}</span>
                <m.i
                  initial={false}
                  whileInView={animate && !reduce ? { scaleX: [0.2, 1] } : {}}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12 }}
                  style={{ width: `${70 - i * 13}%`, transformOrigin: "left" }}
                />
                <span>···</span>
              </div>
            ),
          )}
          <small>One group of leads. Every next step.</small>
        </div>
      ) : kind === "recover" ? (
        <div className="l-message-scene">
          <span className="l-message-status">
            <FileText size={13} /> Estimate delivered <Check size={12} />
          </span>
          <div className="l-message-thread" />
          <m.div
            className="l-message-card"
            key={String(reduce)}
            initial={false}
            whileInView={animate && !reduce ? { y: [12, 0] } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div>
              <MessageSquare size={16} />
              <span>A useful check-in</span>
            </div>
            <p>
              Any questions about the scope?
              <br />
              Happy to talk it through.
            </p>
          </m.div>
          <span className="l-message-reply">
            <Check size={12} /> Conversation reopened
          </span>
        </div>
      ) : kind === "compound" ? (
        <div className="l-compound-scene">
          <svg viewBox="0 0 330 220">
            <ellipse
              cx="165"
              cy="110"
              rx="115"
              ry="74"
              fill="none"
              stroke="#2b414b"
              strokeDasharray="3 6"
            />
            <m.path
              d="M50 110 C50 12 280 12 280 110 C280 210 50 210 50 110"
              fill="none"
              stroke="#8bdff6"
              strokeWidth="1.5"
              initial={false}
              whileInView={animate && !reduce ? { pathLength: [0, 1] } : {}}
              viewport={{ once: true }}
              transition={{ duration: 2.5 }}
            />
          </svg>
          <span className="l-loop-center">
            <House size={25} />
            <small>A job well done</small>
          </span>
          <span className="l-loop-node l-loop-one">
            <Star size={14} /> Review
          </span>
          <span className="l-loop-node l-loop-two">
            <Users size={14} /> Referral
          </span>
          <span className="l-loop-node l-loop-three">
            <RotateCcw size={14} /> Return
          </span>
        </div>
      ) : (
        <div className="l-checklist-scene">
          <div className="l-check-seal">
            <Check size={31} />
          </div>
          <div className="l-mini-list">
            {[
              "An owner for every lead",
              "A clear next action",
              "A thoughtful handoff",
            ].map((t) => (
              <span key={t}>
                <Check size={13} />
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

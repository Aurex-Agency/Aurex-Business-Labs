"use client";
import { m } from "motion/react";
import { useMotionPreference } from "./use-motion-preference";
import {
  Check,
  MessageSquare,
  FileText,
  House,
  RotateCcw,
  MoveUpRight,
  Users,
  Star,
} from "lucide-react";

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

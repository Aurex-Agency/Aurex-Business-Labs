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

// Original illustrations for each resource. They render complete and still.
// With motion allowed, CSS plays a short build sequence once the art enters
// the viewport (data-play) or mounts inside a journey scene.
export function ResourceArt({
  kind,
  animate = false,
}: {
  kind: string;
  animate?: boolean;
}) {
  return (
    <div
      className={`l-resource-art l-art-${kind}`}
      aria-hidden="true"
      data-play={animate ? "" : undefined}
    >
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
                <span className="l-score-track">
                  <i style={{ width: `${88 - i * 17}%` }} />
                </span>
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
          <div className="l-message-card">
            <div>
              <MessageSquare size={16} />
              <span>A useful check-in</span>
            </div>
            <p>
              Any questions about the scope?
              <br />
              Happy to talk it through.
            </p>
          </div>
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
              stroke="currentColor"
              strokeOpacity=".25"
              strokeDasharray="3 6"
            />
            <path
              className="l-loop-path"
              d="M50 110 C50 12 280 12 280 110 C280 210 50 210 50 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              pathLength={1}
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

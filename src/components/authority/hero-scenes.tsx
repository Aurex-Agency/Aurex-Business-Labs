import Image from "next/image";
import { work } from "@/content/work";

export type HeroSceneKind = "leak" | "docs" | "chart" | "loop" | "work";

const stagesInPipe = ["Inquiry", "Conversation", "Estimate", "Sold job"];

// Decorative, original illustrations for inner page heroes. They are
// aria-hidden, animate with CSS only when data-motion is on, and sit behind
// the copy on wide screens.
export function HeroScene({ kind }: { kind: HeroSceneKind }) {
  return (
    <div className={`l-hero-scene is-${kind}`} aria-hidden="true">
      {kind === "leak" && <Leak />}
      {kind === "docs" && <Docs />}
      {kind === "chart" && <Chart />}
      {kind === "loop" && <Loop />}
      {kind === "work" && <WorkDrift />}
    </div>
  );
}

function Leak() {
  return (
    <svg viewBox="0 0 520 360" fill="none">
      <path
        className="hs-pipe"
        d="M20 120H140q20 0 20 20v40q0 20 20 20h140q20 0 20-20v-40q0-20 20-20h160"
      />
      <path
        className="hs-pipe-flow"
        d="M20 120H140q20 0 20 20v40q0 20 20 20h140q20 0 20-20v-40q0-20 20-20h160"
        pathLength={1}
      />
      {[
        [40, 120],
        [170, 200],
        [330, 200],
        [480, 120],
      ].map(([x, y], i) => (
        <g
          key={x}
          className="hs-joint"
          style={{ "--i": i } as React.CSSProperties}
        >
          <circle cx={x} cy={y} r="13" />
          <circle cx={x} cy={y} r="4" className="hs-joint-core" />
          <text x={x} y={y - 26} textAnchor="middle">
            {stagesInPipe[i]}
          </text>
        </g>
      ))}
      {[
        [160, 168, 0],
        [250, 214, 1],
        [340, 168, 2],
        [255, 214, 3],
      ].map(([x, y, i]) => (
        <g
          key={`${x}-${i}`}
          className="hs-drop"
          style={{ "--i": i } as React.CSSProperties}
        >
          <path d={`M${x} ${y}c0 0 7 9 7 14a7 7 0 0 1-14 0c0-5 7-14 7-14Z`} />
        </g>
      ))}
      <path className="hs-puddle" d="M150 330h220" />
      <path className="hs-puddle is-two" d="M190 342h140" />
    </svg>
  );
}

function Docs() {
  return (
    <div className="hs-docs">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`hs-doc is-${i}`}>
          <span className="hs-doc-tag" />
          <span className="hs-doc-line is-wide" />
          <span className="hs-doc-line" />
          <span className="hs-doc-line is-short" />
          {i === 2 && (
            <div className="hs-doc-checks">
              {[0, 1, 2].map((c) => (
                <span key={c} style={{ "--c": c } as React.CSSProperties}>
                  <i />
                  <b />
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 520 340" fill="none">
      <g className="hs-chart-grid">
        {[60, 120, 180, 240, 300].map((y) => (
          <path key={y} d={`M30 ${y}H500`} />
        ))}
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          className="hs-bar"
          x={58 + i * 74}
          y={300 - (60 + i * 30)}
          width="30"
          height={60 + i * 30}
          rx="5"
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
      <path
        className="hs-line is-soft"
        d="M40 250C110 240 140 200 200 196s110-40 160-70 90-50 130-70"
        pathLength={1}
      />
      <path
        className="hs-line"
        d="M40 280C100 270 150 250 210 232s100-60 150-90 80-36 130-48"
        pathLength={1}
      />
      <circle className="hs-line-dot" cx="490" cy="94" r="6" />
    </svg>
  );
}

function Loop() {
  const labels = ["Capture", "Convert", "Recover", "Compound"];
  return (
    <svg viewBox="0 0 420 420" fill="none">
      <circle className="hs-loop-track" cx="210" cy="210" r="150" />
      <circle className="hs-loop-inner" cx="210" cy="210" r="96" />
      <g className="hs-loop-spin">
        <circle
          className="hs-loop-arc"
          cx="210"
          cy="210"
          r="150"
          pathLength={1}
        />
        <circle className="hs-loop-comet" cx="210" cy="60" r="6" />
      </g>
      {labels.map((label, i) => {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const x = 210 + Math.cos(a) * 150;
        const y = 210 + Math.sin(a) * 150;
        return (
          <g
            key={label}
            className="hs-loop-node"
            style={{ "--i": i } as React.CSSProperties}
          >
            <circle cx={x} cy={y} r="11" />
            <text
              x={x + (i === 1 ? 20 : i === 3 ? -20 : 0)}
              y={y + (i === 0 ? -22 : i === 2 ? 32 : 5)}
              textAnchor={i === 1 ? "start" : i === 3 ? "end" : "middle"}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function WorkDrift() {
  return (
    <div className="hs-work">
      {work.map((p, i) => (
        <div
          key={p.slug}
          className={`hs-work-card is-${i}`}
          style={{ "--accent-tone": p.accent } as React.CSSProperties}
        >
          <Image src={p.image} alt="" width={360} height={250} sizes="240px" />
        </div>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";

// Signal lines for the background network. Light pulses travel along them
// like leads moving through a pipeline.
const circuits = [
  "M-40 180H260q24 0 24 24v120q0 24 24 24h340",
  "M1480 120H1180q-24 0-24 24v96q0 24-24 24H900",
  "M-40 640h200q24 0 24-24V500q0-24 24-24h260",
  "M1480 560h-180q-24 0-24 24v140q0 24-24 24h-300",
  "M520 -40v120q0 24 24 24h180q24 0 24 24v80",
  "M980 940V820q0-24-24-24H760q-24 0-24-24v-60",
];
const nodes: [number, number][] = [
  [648, 348],
  [900, 264],
  [508, 476],
  [948, 748],
  [752, 272],
  [736, 712],
];

// The fixed atmosphere behind every page, plus the shared pointer layer that
// drives the cursor spotlight, card tilt and magnetic buttons. Everything is
// decorative and stays still when the visitor prefers reduced motion.
export function AmbientField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches) return;
    let frame = 0;
    let pointer: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let pulled: HTMLElement | null = null;
    const release = () => {
      if (tilted) {
        tilted.style.removeProperty("--rx");
        tilted.style.removeProperty("--ry");
        tilted.removeAttribute("data-tilting");
      }
      if (pulled) pulled.style.removeProperty("translate");
      tilted = null;
      pulled = null;
    };
    const flush = () => {
      frame = 0;
      layer.style.setProperty("--par", `${(window.scrollY * 0.16) % 64}px`);
      const e = pointer;
      if (!e) return;
      pointer = null;
      layer.style.setProperty("--mx", `${e.clientX}px`);
      layer.style.setProperty("--my", `${e.clientY}px`);
      layer.setAttribute("data-pointer", "");
      const target = e.target instanceof Element ? e.target : null;
      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== tilt) {
        tilted.style.removeProperty("--rx");
        tilted.style.removeProperty("--ry");
        tilted.removeAttribute("data-tilting");
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        tilt.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
        tilt.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        tilt.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
        tilt.setAttribute("data-tilting", "");
      }
      tilted = tilt;
      const magnet =
        target?.closest<HTMLElement>(
          ".l-button, .l-nav-cta, [data-magnetic]",
        ) ?? null;
      if (pulled && pulled !== magnet) pulled.style.removeProperty("translate");
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.16;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        magnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
      pulled = magnet;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = e;
      schedule();
    };
    const onLeave = () => {
      layer.removeAttribute("data-pointer");
      release();
    };
    flush();
    window.addEventListener("scroll", schedule, { passive: true });
    if (fine.matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(frame);
      release();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return (
    <div className="l-ambient" ref={ref} aria-hidden="true">
      <span className="l-ambient-glow is-one" />
      <span className="l-ambient-glow is-two" />
      <span className="l-ambient-glow is-three" />
      <span className="l-ambient-grid" />
      <span className="l-ambient-grid is-hot" />
      <svg
        className="l-ambient-circuits"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {circuits.map((d) => (
          <path key={d} d={d} className="l-circuit" />
        ))}
        {circuits.map((d, i) => (
          <path
            key={`pulse-${d}`}
            d={d}
            className="l-circuit-pulse"
            pathLength={1}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
        {nodes.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            className="l-node"
          />
        ))}
      </svg>
      <span className="l-ambient-spot" />
      <span className="l-ambient-grain" />
    </div>
  );
}

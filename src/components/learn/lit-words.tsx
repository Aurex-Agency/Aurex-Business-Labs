"use client";
import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useMotionPreference } from "./use-motion-preference";

const COUNT = 7;

function Word({
  i,
  progress,
  children,
}: {
  i: number;
  progress: MotionValue<number>;
  children: string;
}) {
  const start = (i / COUNT) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.14], [0.48, 1]);
  return (
    <m.span className="f-word" style={{ opacity }}>
      {children}
    </m.span>
  );
}

// The point of view statement lights up one word at a time as it scrolls
// through the viewport, then the lead count is struck through. Unlit words
// stay at 48% so the large text keeps at least 3:1 contrast, and the already
// muted "lead count." is never dimmed further.
export function PerspectiveHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  const strike = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  if (reduce)
    return (
      <h2 ref={ref}>
        Look beyond
        <br />
        the <span className="f-crossout">lead count.</span>
        <br />
        <em>Follow the whole story.</em>
      </h2>
    );
  const w = (i: number, text: string) => (
    <Word i={i} progress={scrollYProgress}>
      {text}
    </Word>
  );
  return (
    <h2 ref={ref}>
      {w(0, "Look")} {w(1, "beyond")}
      <br />
      {w(2, "the")}{" "}
      <span className="f-crossout is-live">
        lead count.
        <m.span
          className="f-cross-line"
          aria-hidden="true"
          style={{ scaleX: strike, rotate: -7 }}
        />
      </span>
      <br />
      <em>
        {w(3, "Follow")} {w(4, "the")} {w(5, "whole")} {w(6, "story.")}
      </em>
    </h2>
  );
}

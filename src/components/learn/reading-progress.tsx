"use client";
import { m, useScroll, useSpring } from "motion/react";
import { useMotionPreference } from "./use-motion-preference";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });
  const reduce = useMotionPreference();
  return (
    <m.div
      className="l-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}

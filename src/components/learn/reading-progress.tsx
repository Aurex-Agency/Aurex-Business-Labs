"use client";
import { m, useScroll } from "motion/react";
import { useMotionPreference } from "./use-motion-preference";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useMotionPreference();
  return (
    <m.div
      className="l-reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? 0 : scrollYProgress }}
    />
  );
}

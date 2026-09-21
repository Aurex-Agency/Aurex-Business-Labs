"use client";
import { LazyMotion } from "motion/react";
const features = () =>
  import("./motion-features").then((module) => module.default);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      {children}
    </LazyMotion>
  );
}

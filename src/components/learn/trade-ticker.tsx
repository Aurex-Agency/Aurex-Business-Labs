"use client";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { trades } from "@/content/trades";
import { useMotionPreference } from "./use-motion-preference";

const band = trades.filter((t) => !t.startsWith("Other"));

// A band of the trades we serve. It drifts on its own and leans into the
// direction of scroll; screen readers get the list once.
export function TradeTicker() {
  const reduce = useMotionPreference();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 80, damping: 30 });
  const skew = useTransform(smooth, [-2500, 0, 2500], [7, 0, -7], {
    clamp: true,
  });
  const row = (hidden: boolean) => (
    <ul className="f-ticker-row" aria-hidden={hidden || undefined}>
      {band.map((t, i) => (
        <li key={t} className={i % 2 ? "is-outline" : undefined}>
          {t}
          <span className="f-ticker-mark" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="f-ticker" aria-label="Residential trades">
      <m.div className="f-ticker-track" style={{ skewX: reduce ? 0 : skew }}>
        {row(false)}
        {row(true)}
      </m.div>
    </section>
  );
}

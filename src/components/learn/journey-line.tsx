"use client";
import { useEffect, useRef } from "react";

type Stop = { y: number; label: string };

// A single line that runs down the homepage gutter and draws itself with the
// reader. Stops are any element inside the root with data-journey; labelled
// stops become numbered markers that light up as the line reaches them.
export function JourneyLine() {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = svg.current;
    const root = el?.parentElement;
    if (!el || !root) return;
    const ns = "http://www.w3.org/2000/svg";
    const track = el.querySelector<SVGPathElement>(".f-journey-track")!;
    const drawn = el.querySelector<SVGPathElement>(".f-journey-drawn")!;
    const head = el.querySelector<SVGCircleElement>(".f-journey-head")!;
    const markers = el.querySelector<SVGGElement>(".f-journey-markers")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let samples: [number, number][] = [];
    let total = 0;
    let stops: (Stop & { node: SVGGElement })[] = [];
    let frame = 0;

    const layout = () => {
      const rootBox = root.getBoundingClientRect();
      const top = rootBox.top + window.scrollY;
      const wrap = root.querySelector(".l-wrap");
      const gutter = wrap
        ? Math.max(18, wrap.getBoundingClientRect().left - rootBox.left)
        : 40;
      const mobile = window.innerWidth <= 860;
      const x = mobile ? Math.min(10, gutter / 2) : gutter / 2;
      const sway = mobile ? 0 : Math.min(18, gutter * 0.22);
      const height = root.offsetHeight;
      el.setAttribute("viewBox", `0 0 ${Math.ceil(gutter)} ${height}`);
      el.style.width = `${Math.ceil(gutter)}px`;
      el.style.height = `${height}px`;
      const found: Stop[] = [
        ...root.querySelectorAll<HTMLElement>("[data-journey]"),
      ]
        .map((node) => ({
          y: node.getBoundingClientRect().top + window.scrollY - top + 28,
          label: node.dataset.journey ?? "",
        }))
        .filter((s) => s.y > 0)
        .sort((a, b) => a.y - b.y);
      // On phones the four stage timeline already draws its own rail.
      const gap = mobile
        ? root
            .querySelector<HTMLElement>(".f-chapters")
            ?.getBoundingClientRect()
        : undefined;
      const gapTop = gap ? gap.top + window.scrollY - top - 40 : -1;
      const gapBottom = gap ? gap.bottom + window.scrollY - top + 20 : -1;
      const points = [
        { y: 60, label: "" },
        ...found,
        { y: height - 80, label: "" },
      ];
      let d = `M${x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1].y;
        const b = points[i].y;
        const side = i % 2 ? sway : -sway;
        if (gap && a < gapBottom && b > gapTop) {
          d += `L${x} ${Math.max(a, gapTop)}M${x} ${Math.min(b, gapBottom)}L${x} ${b}`;
          continue;
        }
        const mid = (a + b) / 2;
        d += `C${x} ${a + (mid - a) * 0.6} ${x + side} ${mid - (mid - a) * 0.4} ${x + side} ${mid}`;
        d += `S${x} ${b - (b - mid) * 0.6} ${x} ${b}`;
      }
      track.setAttribute("d", d);
      drawn.setAttribute("d", d);
      total = drawn.getTotalLength();
      drawn.style.strokeDasharray = `${total} ${total}`;
      samples = [];
      for (let l = 0; l <= total; l += 6)
        samples.push([l, drawn.getPointAtLength(l).y]);
      markers.replaceChildren();
      stops = found
        .filter((s) => !(gap && s.y > gapTop && s.y < gapBottom))
        .map((s) => {
          const g = document.createElementNS(ns, "g");
          g.setAttribute(
            "class",
            s.label ? "f-journey-stop is-stage" : "f-journey-stop",
          );
          g.setAttribute("transform", `translate(${x} ${s.y})`);
          const ring = document.createElementNS(ns, "circle");
          ring.setAttribute("r", s.label ? "9" : "5");
          ring.setAttribute("class", "f-journey-ring");
          const dot = document.createElementNS(ns, "circle");
          dot.setAttribute("r", s.label ? "5" : "3");
          dot.setAttribute("class", "f-journey-dot");
          g.append(ring, dot);
          if (s.label && !mobile) {
            const text = document.createElementNS(ns, "text");
            text.setAttribute("x", "14");
            text.setAttribute("y", "4");
            text.textContent = s.label;
            g.append(text);
          }
          markers.append(g);
          return { ...s, node: g };
        });
      update();
    };

    const lengthAt = (y: number) => {
      if (!samples.length) return 0;
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid][1] < y) lo = mid + 1;
        else hi = mid;
      }
      return samples[lo][0];
    };

    const update = () => {
      frame = 0;
      const top = root.getBoundingClientRect().top + window.scrollY;
      const y = reduce.matches
        ? Infinity
        : window.scrollY + window.innerHeight * 0.55 - top;
      const length = y === Infinity ? total : lengthAt(y);
      drawn.style.strokeDashoffset = `${total - length}`;
      const point = drawn.getPointAtLength(
        Math.max(0, Math.min(length, total)),
      );
      head.setAttribute("cx", `${point.x}`);
      head.setAttribute("cy", `${point.y}`);
      head.style.opacity = length > 0 && length < total ? "1" : "0";
      for (const s of stops)
        s.node.toggleAttribute("data-lit", s.y <= point.y + 2);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(() => layout());
    resize.observe(root);
    document.fonts?.ready.then(layout);
    layout();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", layout);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", layout);
    };
  }, []);
  return (
    <svg className="f-journey" ref={svg} aria-hidden="true" focusable="false">
      <path className="f-journey-track" />
      <path className="f-journey-drawn" />
      <g className="f-journey-markers" />
      <circle className="f-journey-head" r="4.5" />
    </svg>
  );
}

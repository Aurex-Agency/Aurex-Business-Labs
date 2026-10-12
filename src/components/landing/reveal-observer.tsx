"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    __aurexMotion?: boolean;
  }
}

// Inline script that runs before first paint. Motion is opt-in: the page is
// complete and still unless the visitor allows motion and scripts are running.
export const motionScript = `(function(){try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","on");setTimeout(function(){if(!window.__aurexMotion)d.removeAttribute("data-motion")},4000)}}catch(e){}})()`;

// Marks [data-reveal], [data-stagger] and [data-play] elements as they enter the viewport.
// Server components only add the attribute; styling lives in globals.css.
export function RevealObserver() {
  useEffect(() => {
    window.__aurexMotion = true;
    const root = document.documentElement;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const selector =
      "[data-reveal]:not([data-in]),[data-stagger]:not([data-in]),[data-play]:not([data-in])";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            observer.unobserve(entry.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    const scan = () =>
      document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    const mutations = new MutationObserver(scan);
    const preference = () => {
      if (media.matches) {
        root.removeAttribute("data-motion");
        observer.disconnect();
        mutations.disconnect();
      } else {
        root.setAttribute("data-motion", "on");
        scan();
        mutations.observe(document.body, { childList: true, subtree: true });
      }
    };
    preference();
    media.addEventListener("change", preference);
    return () => {
      media.removeEventListener("change", preference);
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  return null;
}

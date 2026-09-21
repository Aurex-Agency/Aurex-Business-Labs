"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let pastHero = false;
    let atReview = false;
    const hero = document.getElementById("hero");
    const review = document.getElementById("review");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === "hero")
          pastHero =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        else
          atReview = entry.isIntersecting || entry.boundingClientRect.top < 0;
      });
      setVisible(pastHero && !atReview);
    });
    if (hero) observer.observe(hero);
    if (review) observer.observe(review);
    return () => observer.disconnect();
  }, []);
  return visible ? (
    <div className="mobile-sticky">
      <a className="button" href="#review">
        Get My Free Website Review
        <ArrowUpRight size={18} />
      </a>
    </div>
  ) : null;
}

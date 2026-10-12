import { ArrowUpRight } from "lucide-react";
import { RevenueEngine } from "./revenue-engine-demo";
import { site } from "@/lib/site-config";
import { VideoPlayer } from "./video-player";
import { TrackedLink } from "./tracked-link";

export function HeroMedia() {
  if (!site.vsl || !site.vslCaptions) return <RevenueEngine />;
  return (
    <div className="hero-video">
      <span className="eyebrow">WATCH THE OVERVIEW / 1 MIN 26 SEC</span>
      <VideoPlayer
        src={site.vsl}
        captions={site.vslCaptions}
        poster={site.vslPoster || "/brand/vsl-poster.svg"}
      />
      <TrackedLink
        event="hero_cta_click"
        detail="below_video"
        href="#review"
        className="button video-booking-cta"
      >
        Book My Free Website Review
        <ArrowUpRight size={19} />
      </TrackedLink>
      <h2>
        More than a website.
        <br />
        <em>A connected sales system.</em>
      </h2>
      <p>
        See how the website, lead tracking, CRM, and follow-up work together.
        Then let&apos;s look at what your business needs.
      </p>
      <a href="#launch-guarantee" className="video-guarantee-note">
        $1,000 back if we miss the agreed scope and 21-business-day deadline for
        reasons within our control. See the launch commitment and prerequisites.
      </a>
    </div>
  );
}

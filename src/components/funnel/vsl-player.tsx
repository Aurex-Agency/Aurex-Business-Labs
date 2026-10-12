"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// A click-to-play poster. The Vimeo or Wistia player is not requested until
// someone presses play, which keeps the page fast on a phone.
export function VslPlayer({
  src,
  poster,
  title,
  length,
  caption,
  priority = false,
}: {
  src?: string;
  poster?: string;
  title: string;
  length: string;
  caption: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const warm = () => {
    if (!src || document.querySelector(`link[data-warm="${src}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = new URL(src).origin;
    link.dataset.warm = src;
    document.head.append(link);
  };
  const face = (
    <>
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(max-width: 860px) 100vw, 800px"
          priority={priority}
        />
      ) : (
        <span className="l-vsl-art" aria-hidden="true">
          <span className="l-vsl-eyebrow">Watch this first</span>
          <span className="l-vsl-caption">{caption}</span>
        </span>
      )}
      <span className="l-vsl-play" aria-hidden="true">
        <Play size={30} fill="currentColor" />
      </span>
      <span className="l-vsl-length" aria-hidden="true">
        {src ? length : "Video coming soon"}
      </span>
    </>
  );
  return (
    <div className="l-vsl" data-playing={playing ? "" : undefined}>
      {playing && src ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : src ? (
        <button
          type="button"
          className="l-vsl-face"
          aria-label={`Play video: ${title} (${length})`}
          onPointerEnter={warm}
          onFocus={warm}
          onClick={() => setPlaying(true)}
        >
          {face}
        </button>
      ) : (
        <div className="l-vsl-face is-pending">{face}</div>
      )}
    </div>
  );
}

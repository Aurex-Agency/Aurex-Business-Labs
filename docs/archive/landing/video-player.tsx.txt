"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export function VideoPlayer({
  src,
  captions,
  poster,
}: {
  src: string;
  captions: string;
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  const [playError, setPlayError] = useState(false);

  async function play() {
    const player = video.current;
    if (!player) return;
    const moveFocus = document.activeElement === button.current;
    setPlayError(false);
    try {
      await player.play();
      if (moveFocus) player.focus({ preventScroll: true });
    } catch {
      setPlayError(true);
    }
  }

  return (
    <>
      <div className="hero-video-frame">
        <video
          ref={video}
          controls
          playsInline
          width="1280"
          height="720"
          preload="none"
          poster={poster}
          aria-label="How the Aurex Revenue Website System works"
          crossOrigin="anonymous"
          onPlay={() => setStarted(true)}
          onEnded={() => setStarted(false)}
        >
          <source src={src} type="video/mp4" />
          <track kind="captions" src={captions} srcLang="en" label="English" />
          Your browser does not support this video.{" "}
          <a href={src}>Download the video</a>.
        </video>
        {!started && (
          <button
            ref={button}
            type="button"
            className="video-play-button"
            onClick={play}
          >
            <Play size={34} fill="currentColor" aria-hidden="true" />
            <span>Click to play</span>
          </button>
        )}
      </div>
      {playError && (
        <p role="status">Please use the video controls to start playback.</p>
      )}
    </>
  );
}

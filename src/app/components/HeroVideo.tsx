"use client";

import { useAutoplayBackgroundVideo } from "./useAutoplayBackgroundVideo";

export function HeroVideo() {
  const ref = useAutoplayBackgroundVideo(true);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src="/images/heroVideo.mp4" type="video/mp4" />
    </video>
  );
}

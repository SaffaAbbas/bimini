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
      poster="/images/hero3.jpg"
    >
      <source src="/images/hero4.mp4" type="video/mp4" />
    </video>
  );
}

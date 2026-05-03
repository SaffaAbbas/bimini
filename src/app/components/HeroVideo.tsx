"use client";

import {
  HERO_VIDEO_DESKTOP_SRC,
  HERO_VIDEO_MOBILE_MEDIA,
  HERO_VIDEO_MOBILE_SRC,
} from "./hero-assets";
import { useAutoplayBackgroundVideo } from "./useAutoplayBackgroundVideo";

export function HeroVideo() {
  const ref = useAutoplayBackgroundVideo(true);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-[1.1s] motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // poster={HERO_VIDEO_POSTER_SRC}
    >
      <source
        src={HERO_VIDEO_MOBILE_SRC}
        type="video/mp4"
        media={HERO_VIDEO_MOBILE_MEDIA}
      />
      <source src={HERO_VIDEO_DESKTOP_SRC} type="video/mp4" />
    </video>
  );
}

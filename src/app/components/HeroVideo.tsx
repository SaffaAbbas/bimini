"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const kick = () => {
      void v.play().catch(() => {});
    };

    kick();
    v.addEventListener("loadeddata", kick);
    v.addEventListener("canplay", kick);

    const onVis = () => {
      if (document.visibilityState === "visible") kick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("loadeddata", kick);
      v.removeEventListener("canplay", kick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

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
      <source src="/images/hero3.mp4" type="video/mp4" />
    </video>
  );
}

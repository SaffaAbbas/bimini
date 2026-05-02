"use client";

import { useEffect, useRef } from "react";

export function useAutoplayBackgroundVideo(enabled: boolean) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  return ref;
}

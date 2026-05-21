"use client";

import { useEffect, useState } from "react";
import { HERO_VIDEO_MOBILE_MEDIA } from "./hero-assets";

/** True when viewport matches phone hero breakpoint (≤767px). */
export function useHeroMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(HERO_VIDEO_MOBILE_MEDIA);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

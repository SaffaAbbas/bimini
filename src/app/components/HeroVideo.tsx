"use client";

import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_DESKTOP_1,
  HERO_VIDEO_DESKTOP_2,
  HERO_VIDEO_DESKTOP_3,
} from "./hero-assets";

const videos = [
  HERO_VIDEO_DESKTOP_1,
  HERO_VIDEO_DESKTOP_2,
  HERO_VIDEO_DESKTOP_3,
];

export function HeroVideo() {
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const [activeLayer, setActiveLayer] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const activeVideo =
      activeLayer === 0 ? video1Ref.current : video2Ref.current;

    const hiddenVideo =
      activeLayer === 0 ? video2Ref.current : video1Ref.current;

    if (!activeVideo || !hiddenVideo) return;

    const handleEnded = async () => {
      const nextIndex = (videoIndex + 1) % videos.length;

      hiddenVideo.src = videos[nextIndex];
      hiddenVideo.load();

      try {
        await hiddenVideo.play();
      } catch (err) {}

      setVideoIndex(nextIndex);
      setActiveLayer((prev) => (prev === 0 ? 1 : 0));
    };

    activeVideo.addEventListener("ended", handleEnded);

    return () => {
      activeVideo.removeEventListener("ended", handleEnded);
    };
  }, [activeLayer, videoIndex]);

  useEffect(() => {
    const firstVideo = video1Ref.current;

    if (!firstVideo) return;

    firstVideo.src = videos[0];
    firstVideo.load();

    firstVideo.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <video
        ref={video1Ref}
        muted
        playsInline
        autoPlay
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-linear will-change-opacity ${
          activeLayer === 0 ? "opacity-100" : "opacity-0"
        }`}
      />

      <video
        ref={video2Ref}
        muted
        playsInline
        autoPlay
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-linear will-change-opacity ${
          activeLayer === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

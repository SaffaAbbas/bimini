"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_DESKTOP_1,
  HERO_VIDEO_DESKTOP_2,
  HERO_VIDEO_DESKTOP_3,
} from "./hero-assets";

const videos = [
  HERO_VIDEO_DESKTOP_1,
  HERO_VIDEO_DESKTOP_2,
  HERO_VIDEO_DESKTOP_3,
] as const;

const TOTAL = videos.length;

function HeroVideoControls({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-24 z-20 px-6 sm:bottom-28 lg:bottom-32 lg:px-10">
      <motion.div
        className="mx-auto flex max-w-7xl items-end justify-end"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center gap-2.5"
          role="tablist"
          aria-label="Hero videos"
        >
            {videos.map((_, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Video ${i + 1} of ${TOTAL}`}
                  onClick={() => onSelect(i)}
                  className="flex h-6 items-center justify-center p-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-accent)]"
                >
                  <motion.span
                    layout
                    className={`block h-2 rounded-full ${
                      isActive
                        ? "bg-[color:var(--brand-accent)]"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    animate={{
                      width: isActive ? 32 : 8,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              );
            })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HeroVideo() {
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const switchingRef = useRef(false);

  const [activeLayer, setActiveLayer] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const switchToVideo = useCallback(
    async (targetIndex: number) => {
      if (
        switchingRef.current ||
        targetIndex === videoIndex ||
        targetIndex < 0 ||
        targetIndex >= TOTAL
      ) {
        return;
      }

      const activeVideo =
        activeLayer === 0 ? video1Ref.current : video2Ref.current;
      const hiddenVideo =
        activeLayer === 0 ? video2Ref.current : video1Ref.current;

      if (!activeVideo || !hiddenVideo) return;

      switchingRef.current = true;

      hiddenVideo.src = videos[targetIndex];
      hiddenVideo.load();

      try {
        await hiddenVideo.play();
        setVideoIndex(targetIndex);
        setActiveLayer((prev) => (prev === 0 ? 1 : 0));
      } catch {
        /* autoplay may be blocked */
      } finally {
        switchingRef.current = false;
      }
    },
    [activeLayer, videoIndex],
  );

  useEffect(() => {
    const activeVideo =
      activeLayer === 0 ? video1Ref.current : video2Ref.current;
    const hiddenVideo =
      activeLayer === 0 ? video2Ref.current : video1Ref.current;

    if (!activeVideo || !hiddenVideo) return;

    const handleEnded = () => {
      const nextIndex = (videoIndex + 1) % TOTAL;
      void switchToVideo(nextIndex);
    };

    activeVideo.addEventListener("ended", handleEnded);

    return () => {
      activeVideo.removeEventListener("ended", handleEnded);
    };
  }, [activeLayer, videoIndex, switchToVideo]);

  useEffect(() => {
    const firstVideo = video1Ref.current;
    if (!firstVideo) return;

    firstVideo.src = videos[0];
    firstVideo.load();
    firstVideo.play().catch(() => {});
  }, []);

  return (
    <>
      <motion.div className="absolute inset-0 -z-20 overflow-hidden">
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

        {/* Smooth top → bottom scrim (no hard line under header) */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_14%,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.22)_50%,rgba(0,0,0,0.34)_72%,rgba(0,0,0,0.42)_100%)]"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      <HeroVideoControls activeIndex={videoIndex} onSelect={switchToVideo} />
    </>
  );
}

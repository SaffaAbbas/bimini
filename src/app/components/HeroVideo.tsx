"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_CLIP_DURATION_MS,
  HERO_SLIDES,
  type HeroSlide,
} from "./hero-assets";

const TOTAL = HERO_SLIDES.length;
const CROSSFADE_MS = 1000;
const clipDurationSec = HERO_CLIP_DURATION_MS / 1000;

const mediaClass =
  "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-linear will-change-opacity";

/** Slow zoom / pan while the slide is visible (video-like motion on stills). */
const KEN_BURNS = [
  { scale: [1.04, 1.14], x: ["0%", "-2.5%"], y: ["0%", "-1.5%"] },
  { scale: [1.1, 1.03], x: ["-2%", "1.5%"], y: ["-1%", "0.5%"] },
  { scale: [1.02, 1.12], x: ["1.5%", "-1%"], y: ["0.5%", "-2%"] },
  { scale: [1.06, 1.16], x: ["0.5%", "-2%"], y: ["-0.5%", "-1.5%"] },
] as const;

function kenBurnsIndex(src: string): number {
  let h = 0;
  for (let i = 0; i < src.length; i++) h = (h + src.charCodeAt(i)) % KEN_BURNS.length;
  return h;
}

function HeroAnimatedImage({
  slide,
  visible,
  priority,
  playKey,
}: {
  slide: Extract<HeroSlide, { type: "image" }>;
  visible: boolean;
  priority: boolean;
  /** Changes when this slide becomes active — restarts Ken Burns. */
  playKey: number;
}) {
  const reducedMotion = useReducedMotion();
  const variant = KEN_BURNS[kenBurnsIndex(slide.src)];

  const layerClass = `absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-linear ${
    visible ? "opacity-100" : "opacity-0"
  }`;

  if (reducedMotion) {
    return (
      <div className={layerClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src}
          alt={slide.alt}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={layerClass}>
      <motion.div
        key={`${slide.src}-${playKey}`}
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, scale: variant.scale[0], x: variant.x[0], y: variant.y[0] }}
        animate={
          visible
            ? {
                opacity: 1,
                scale: variant.scale[1],
                x: variant.x[1],
                y: variant.y[1],
              }
            : { opacity: 0, scale: variant.scale[0], x: variant.x[0], y: variant.y[0] }
        }
        transition={{
          opacity: { duration: CROSSFADE_MS / 1000, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: clipDurationSec, ease: "linear" },
          x: { duration: clipDurationSec, ease: "linear" },
          y: { duration: clipDurationSec, ease: "linear" },
        }}
        style={{ transformOrigin: "center center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src}
          alt={slide.alt}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function HeroSlideControls({
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
          aria-label="Hero slides"
        >
          {HERO_SLIDES.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={`${slide.type}-${slide.src}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${i + 1} of ${TOTAL}${slide.type === "image" ? " (photo)" : " (video)"}`}
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

function HeroSlideLayer({
  slide,
  visible,
  videoRef,
  priority,
  playKey,
}: {
  slide: HeroSlide;
  visible: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  priority: boolean;
  playKey: number;
}) {
  if (slide.type === "video") {
    return (
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay={visible}
        preload={priority ? "auto" : "metadata"}
        className={`${mediaClass} ${visible ? "opacity-100" : "opacity-0"}`}
      />
    );
  }

  return (
    <HeroAnimatedImage
      slide={slide}
      visible={visible}
      priority={priority}
      playKey={playKey}
    />
  );
}

export function HeroVideo() {
  const video0Ref = useRef<HTMLVideoElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const switchingRef = useRef(false);
  const activeLayerRef = useRef(0);
  const slideIndexRef = useRef(0);

  const [activeLayer, setActiveLayer] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [layer0, setLayer0] = useState<HeroSlide>(HERO_SLIDES[0]);
  const [layer1, setLayer1] = useState<HeroSlide>(
    HERO_SLIDES[1] ?? HERO_SLIDES[0],
  );
  /** Bumps when a layer becomes active so image Ken Burns restarts. */
  const [playEpoch, setPlayEpoch] = useState(0);

  activeLayerRef.current = activeLayer;
  slideIndexRef.current = slideIndex;

  const playVideoOnLayer = useCallback(
    async (layer: 0 | 1, slide: HeroSlide) => {
      if (slide.type !== "video") return;
      const video = layer === 0 ? video0Ref.current : video1Ref.current;
      if (!video) return;
      video.src = slide.src;
      video.load();
      try {
        await video.play();
      } catch {
        /* autoplay may be blocked */
      }
    },
    [],
  );

  const switchToSlide = useCallback(
    async (targetIndex: number) => {
      if (
        switchingRef.current ||
        targetIndex === slideIndexRef.current ||
        targetIndex < 0 ||
        targetIndex >= TOTAL
      ) {
        return;
      }

      const slide = HERO_SLIDES[targetIndex];
      const hiddenLayer = activeLayerRef.current === 0 ? 1 : 0;

      switchingRef.current = true;

      if (hiddenLayer === 0) {
        setLayer0(slide);
      } else {
        setLayer1(slide);
      }

      const otherVideo =
        hiddenLayer === 0 ? video1Ref.current : video0Ref.current;
      otherVideo?.pause();

      setSlideIndex(targetIndex);
      setActiveLayer(hiddenLayer);
      setPlayEpoch((n) => n + 1);
      switchingRef.current = false;
    },
    [playVideoOnLayer],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      const nextIndex = (slideIndexRef.current + 1) % TOTAL;
      void switchToSlide(nextIndex);
    }, HERO_CLIP_DURATION_MS);

    return () => window.clearInterval(id);
  }, [switchToSlide]);

  useEffect(() => {
    if (layer0.type === "video") void playVideoOnLayer(0, layer0);
  }, [layer0, playVideoOnLayer]);

  useEffect(() => {
    if (layer1.type === "video") void playVideoOnLayer(1, layer1);
  }, [layer1, playVideoOnLayer]);

  useEffect(() => {
    for (const slide of HERO_SLIDES) {
      if (slide.type === "image") {
        const img = new Image();
        img.src = slide.src;
      }
    }
  }, []);

  return (
    <>
      <motion.div className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className={`absolute inset-0 ${activeLayer === 0 ? "z-10" : "z-0"}`}
        >
          <HeroSlideLayer
            slide={layer0}
            visible={activeLayer === 0}
            videoRef={video0Ref}
            priority={activeLayer === 0}
            playKey={activeLayer === 0 ? playEpoch : 0}
          />
        </div>
        <div
          className={`absolute inset-0 ${activeLayer === 1 ? "z-10" : "z-0"}`}
        >
          <HeroSlideLayer
            slide={layer1}
            visible={activeLayer === 1}
            videoRef={video1Ref}
            priority={activeLayer === 1}
            playKey={activeLayer === 1 ? playEpoch : 0}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_14%,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.22)_50%,rgba(0,0,0,0.34)_72%,rgba(0,0,0,0.42)_100%)]"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      <HeroSlideControls activeIndex={slideIndex} onSelect={switchToSlide} />
    </>
  );
}

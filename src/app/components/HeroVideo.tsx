"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_CLIP_DURATION_MS,
  HERO_SLIDES,
  HERO_VIDEO_MOBILE_MEDIA,
  isHeroImageSlide,
  resolveHeroImageSrc,
  resolveHeroObjectPosition,
  type HeroImageSlide,
  type HeroSlide,
  type HeroVideoSlide,
} from "./hero-assets";
import { useHeroMobile } from "./use-hero-mobile";

const TOTAL = HERO_SLIDES.length;
const CROSSFADE_MS = 1000;
const clipDurationSec = HERO_CLIP_DURATION_MS / 1000;

const mediaClass =
  "absolute inset-0 h-full min-h-full w-full min-w-full object-cover transition-opacity duration-1000 ease-linear will-change-[opacity,transform]";

/** Slow zoom / pan — desktop / tablet */
const KEN_BURNS = [
  { scale: [1.04, 1.14], x: ["0%", "-2.5%"], y: ["0%", "-1.5%"] },
  { scale: [1.1, 1.03], x: ["-2%", "1.5%"], y: ["-1%", "0.5%"] },
  { scale: [1.02, 1.12], x: ["1.5%", "-1%"], y: ["0.5%", "-2%"] },
  { scale: [1.06, 1.16], x: ["0.5%", "-2%"], y: ["-0.5%", "-1.5%"] },
] as const;

/** Gentler motion on phones — less crop at edges */
const KEN_BURNS_MOBILE = [
  { scale: [1.02, 1.07], x: ["0%", "-1.5%"], y: ["0%", "-1%"] },
  { scale: [1.06, 1.02], x: ["-1%", "1%"], y: ["-0.5%", "0.5%"] },
  { scale: [1.01, 1.08], x: ["1%", "-0.5%"], y: ["0.5%", "-1%"] },
  { scale: [1.03, 1.09], x: ["0.5%", "-1%"], y: ["-0.5%", "-1%"] },
] as const;

function kenBurnsIndex(src: string): number {
  let h = 0;
  for (let i = 0; i < src.length; i++) h = (h + src.charCodeAt(i)) % 4;
  return h;
}

function HeroPicture({
  slide,
  isMobile,
  priority,
  className,
  style,
}: {
  slide: HeroImageSlide;
  isMobile: boolean;
  priority: boolean;
  className: string;
  style?: React.CSSProperties;
}) {
  const imgSrc = resolveHeroImageSrc(slide, isMobile);
  const objectPosition = resolveHeroObjectPosition(slide, isMobile);

  return (
    <picture className="absolute inset-0 block h-full w-full">
      {slide.srcMobile ? (
        <source media={HERO_VIDEO_MOBILE_MEDIA} srcSet={slide.srcMobile} />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={slide.alt}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className={className}
        style={{ ...style, objectPosition: objectPosition ?? "center center" }}
        sizes="100vw"
      />
    </picture>
  );
}

function HeroAnimatedImage({
  slide,
  visible,
  priority,
  playKey,
  isMobile,
}: {
  slide: HeroImageSlide;
  visible: boolean;
  priority: boolean;
  playKey: number;
  isMobile: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const variants = isMobile ? KEN_BURNS_MOBILE : KEN_BURNS;
  const variant = variants[kenBurnsIndex(slide.src)];
  const imgSrc = resolveHeroImageSrc(slide, isMobile);

  const layerClass = `absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-linear ${
    visible ? "opacity-100" : "opacity-0"
  }`;

  const imgClass = `${mediaClass} max-md:min-h-[100dvh] max-md:min-w-[100vw]`;

  if (reducedMotion) {
    return (
      <div className={layerClass}>
        <HeroPicture
          slide={slide}
          isMobile={isMobile}
          priority={priority}
          className={imgClass}
        />
      </div>
    );
  }

  return (
    <div className={layerClass}>
      <motion.div
        key={`${imgSrc}-${playKey}-${isMobile ? "m" : "d"}`}
        className="absolute inset-0 h-full w-full max-md:min-h-[100dvh] max-md:min-w-[100vw]"
        initial={{
          opacity: 0,
          scale: variant.scale[0],
          x: variant.x[0],
          y: variant.y[0],
        }}
        animate={
          visible
            ? {
                opacity: 1,
                scale: variant.scale[1],
                x: variant.x[1],
                y: variant.y[1],
              }
            : {
                opacity: 0,
                scale: variant.scale[0],
                x: variant.x[0],
                y: variant.y[0],
              }
        }
        transition={{
          opacity: { duration: CROSSFADE_MS / 1000, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: clipDurationSec, ease: "linear" },
          x: { duration: clipDurationSec, ease: "linear" },
          y: { duration: clipDurationSec, ease: "linear" },
        }}
        style={{ transformOrigin: "center center" }}
      >
        <HeroPicture
          slide={slide}
          isMobile={isMobile}
          priority={priority}
          className={imgClass}
        />
      </motion.div>
    </div>
  );
}

function HeroVideoMedia({
  slide,
  visible,
  videoRef,
  priority,
}: {
  slide: HeroVideoSlide;
  visible: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  priority: boolean;
}) {
  return (
    <video
      ref={videoRef}
      muted
      playsInline
      autoPlay={visible}
      preload={priority ? "auto" : "metadata"}
      className={`${mediaClass} max-md:min-h-[100dvh] max-md:min-w-[100vw] ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {slide.srcMobile ? (
        <source
          media={HERO_VIDEO_MOBILE_MEDIA}
          src={slide.srcMobile}
          type="video/mp4"
        />
      ) : null}
      <source src={slide.src} type="video/mp4" />
    </video>
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
    <div className="pointer-events-auto absolute inset-x-0 bottom-20 z-20 px-4 sm:bottom-28 sm:px-6 lg:bottom-32 lg:px-10">
      <motion.div
        className="mx-auto flex max-w-7xl items-end justify-end"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Hero slides"
        >
          {HERO_SLIDES.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${i + 1} of ${TOTAL}${slide.type === "image" ? " (photo)" : " (video)"}`}
                onClick={() => onSelect(i)}
                className="flex h-7 min-w-[28px] items-center justify-center p-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-accent)] sm:h-6"
              >
                <motion.span
                  layout
                  className={`block h-2 rounded-full ${
                    isActive
                      ? "bg-[color:var(--brand-accent)]"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  animate={{
                    width: isActive ? 28 : 8,
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
  isMobile,
}: {
  slide: HeroSlide;
  visible: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  priority: boolean;
  playKey: number;
  isMobile: boolean;
}) {
  if (slide.type === "video") {
    return (
      <HeroVideoMedia
        slide={slide}
        visible={visible}
        videoRef={videoRef}
        priority={priority}
      />
    );
  }

  return (
    <HeroAnimatedImage
      slide={slide}
      visible={visible}
      priority={priority}
      playKey={playKey}
      isMobile={isMobile}
    />
  );
}

export function HeroVideo() {
  const isMobile = useHeroMobile();
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
  const [playEpoch, setPlayEpoch] = useState(0);

  activeLayerRef.current = activeLayer;
  slideIndexRef.current = slideIndex;

  const playVideoOnLayer = useCallback(async (layer: 0 | 1) => {
    const video = layer === 0 ? video0Ref.current : video1Ref.current;
    if (!video) return;
    video.load();
    try {
      await video.play();
    } catch {
      /* autoplay may be blocked */
    }
  }, []);

  const switchToSlide = useCallback(async (targetIndex: number) => {
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
  }, []);

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
    if (layer0.type === "video") void playVideoOnLayer(0);
  }, [layer0, isMobile, playVideoOnLayer]);

  useEffect(() => {
    if (layer1.type === "video") void playVideoOnLayer(1);
  }, [layer1, isMobile, playVideoOnLayer]);

  useEffect(() => {
    const mq = window.matchMedia(HERO_VIDEO_MOBILE_MEDIA);
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    for (const slide of HERO_SLIDES) {
      if (!isHeroImageSlide(slide)) continue;
      preload(slide.src);
      if (slide.srcMobile) preload(slide.srcMobile);
      if (!mq.matches) continue;
      preload(resolveHeroImageSrc(slide, true));
    }
  }, []);

  return (
    <>
      <motion.div className="absolute inset-0 -z-20 min-h-[100dvh] w-full overflow-hidden">
        <div
          className={`absolute inset-0 min-h-[100dvh] w-full ${activeLayer === 0 ? "z-10" : "z-0"}`}
        >
          <HeroSlideLayer
            slide={layer0}
            visible={activeLayer === 0}
            videoRef={video0Ref}
            priority={activeLayer === 0}
            playKey={activeLayer === 0 ? playEpoch : 0}
            isMobile={isMobile}
          />
        </div>
        <div
          className={`absolute inset-0 min-h-[100dvh] w-full ${activeLayer === 1 ? "z-10" : "z-0"}`}
        >
          <HeroSlideLayer
            slide={layer1}
            visible={activeLayer === 1}
            videoRef={video1Ref}
            priority={activeLayer === 1}
            playKey={activeLayer === 1 ? playEpoch : 0}
            isMobile={isMobile}
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

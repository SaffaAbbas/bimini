"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_DESKTOP_SRC,
  HERO_VIDEO_MOBILE_MEDIA,
  HERO_VIDEO_MOBILE_SRC,
  HERO_VIDEO_POSTER_SRC,
} from "./hero-assets";
import { useAutoplayBackgroundVideo } from "./useAutoplayBackgroundVideo";

type HeroProps = {
  videoSrcMobile?: string;
  videoSrcDesktop?: string;
  posterSrc?: string;
};

export default function Hero({
  videoSrcMobile = HERO_VIDEO_MOBILE_SRC,
  videoSrcDesktop = HERO_VIDEO_DESKTOP_SRC,
  posterSrc = HERO_VIDEO_POSTER_SRC,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useAutoplayBackgroundVideo(videoOk);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[65vh] w-full overflow-hidden sm:h-[65vh] md:h-[75vh]"
    >
      {videoOk ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full rounded-3xl object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onError={() => setVideoOk(false)}
        >
          <source
            src={videoSrcMobile}
            type="video/mp4"
            media={HERO_VIDEO_MOBILE_MEDIA}
          />
          <source src={videoSrcDesktop} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-blue-950" />
      )}

      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-5xl items-center px-6">
          <div className="max-w-4xl">
            <h2
              className={`mb-3 text-sm font-medium tracking-wide text-white/90 transition-all duration-1000 sm:text-base md:text-lg ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              DEVLYS — modern digital delivery for teams that want results.
            </h2>

            <h1
              className={`mb-4 text-3xl font-extrabold tracking-tight text-white transition-all duration-1000 sm:mb-6 sm:text-5xl md:text-6xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Build products people find, love, and buy.
            </h1>

            <p
              className={`mb-6 max-w-xl text-sm leading-relaxed text-white/85 transition-all duration-1000 sm:mb-8 sm:text-base md:text-lg ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              We design and develop conversion-ready <strong>websites</strong>,
              ship <strong>SEO</strong> that compounds, build{" "}
              <strong>mobile apps</strong> users keep, and deploy{" "}
              <strong>AI</strong> that saves time and increases margin.
            </p>

            <Link
              href="/contactUs"
              className={`inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 sm:px-7 sm:text-base ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Get a free growth plan &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

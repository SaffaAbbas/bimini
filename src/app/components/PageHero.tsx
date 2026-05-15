"use client";

import { motion } from "framer-motion";
import { fadeUp, heroStagger } from "../lib/motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  minHeightClass?: string;
  showWave?: boolean;
};

export function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  minHeightClass = "min-h-[55svh]",
  showWave = false,
}: PageHeroProps) {
  return (
    <header
      className={`group relative isolate overflow-hidden ${minHeightClass}`}
    >
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/15 to-black/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        aria-hidden
      />

      <div
        className={`mx-auto flex ${minHeightClass} max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32`}
      >
        <motion.div
          className="flex flex-1 flex-col items-center justify-center text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/95 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </div>

      {showWave ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 1440 120"
            className="h-20 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,72 C180,112 360,30 540,72 C720,112 900,30 1080,72 C1260,112 1350,35 1440,72 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </motion.div>
      ) : null}
    </header>
  );
}

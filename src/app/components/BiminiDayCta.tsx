"use client";

import { motion } from "framer-motion";
import { AnimatedAnchor } from "./AnimatedButton";
import { RevealSection } from "./RevealSection";
import { fadeUp, heroStagger } from "../lib/motion";

/** Full-width “Make today a Bimini day.” banner (same as home CTA strip). */
export function BiminiDayCta() {
  return (
    <RevealSection className="group relative isolate mt-2 w-full overflow-hidden sm:mt-6 lg:mt-10">
      <motion.div
        className="absolute inset-0 -z-20 bg-[url('/images/img161.jpg')] bg-cover bg-center"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/35 to-black/20"
        aria-hidden
      />

      <motion.div
        className="mx-auto flex min-h-[400px] max-w-7xl items-center px-6 py-10 sm:min-h-[400px] sm:py-12 lg:min-h-[560px] lg:px-8 lg:py-14"
        variants={heroStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="max-w-2xl" variants={fadeUp}>
          <motion.h3
            variants={fadeUp}
            className="text-balance text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-4xl"
          >
            Make today a Bimini day.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-sm leading-6 text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)] sm:text-base sm:leading-7"
          >
            Crystal‑clear water, white‑sand beaches, and unforgettable
            adventures—pick your perfect tour and let our local team handle the
            rest.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <AnimatedAnchor
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand-accent)] px-7 py-3 text-sm font-extrabold text-[color:var(--brand-primary-2)] shadow-lg"
            >
              Plan your trip
            </AnimatedAnchor>
          </motion.div>
        </motion.div>
      </motion.div>
    </RevealSection>
  );
}

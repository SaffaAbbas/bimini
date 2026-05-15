"use client";

import { motion } from "framer-motion";
import { fadeUp, heroStagger } from "../lib/motion";
import { RevealSection } from "./RevealSection";

type ParallaxQuoteBannerProps = {
  imageSrc: string;
  imageAlt: string;
};

export function ParallaxQuoteBanner({
  imageSrc,
  imageAlt,
}: ParallaxQuoteBannerProps) {
  return (
    <RevealSection
      className="relative overflow-hidden py-6 lg:py-10"
      delayMs={200}
    >
      <motion.div
        className="relative h-[320px] w-full sm:h-[420px] lg:h-[520px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
          decoding="async"
        />
        <motion.div className="absolute inset-0 " aria-hidden />

        <motion.div
          className="absolute inset-0 flex items-center"
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.blockquote
              variants={fadeUp}
              className="max-w-xl text-balance text-2xl font-extrabold leading-snug tracking-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl"
            ></motion.blockquote>
          </div>
        </motion.div>
      </motion.div>
    </RevealSection>
  );
}

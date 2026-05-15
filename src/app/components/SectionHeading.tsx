"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-lg text-left";

  return (
    <motion.div
      className={`${alignClass} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className={`${eyebrow ? "mt-3" : ""} text-balance text-3xl font-extrabold tracking-tight text-[color:var(--brand-primary-2)] sm:text-4xl`}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

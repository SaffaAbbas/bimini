"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants, viewportOnce } from "../lib/motion";

export type RevealAs = "section" | "article" | "motion.div";

const motionComponents = {
  section: motion.section,
  article: motion.article,
  div: motion.div,
} as const;

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Extra delay before animation starts (ms). */
  delayMs?: number;
  /** Root element — use `article` for tour rows, `div` for inner blocks. */
  as?: RevealAs | "div";
};

export function RevealSection({
  children,
  className = "",
  id,
  delayMs = 0,
  as = "section",
}: RevealSectionProps) {
  const tag = as === "motion.div" ? "motion.div" : as;
  const Component = motionComponents[tag === "motion.div" ? "div" : tag];

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={revealVariants(delayMs)}
    >
      {children}
    </Component>
  );
}

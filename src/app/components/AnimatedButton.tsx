"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { hoverLift, tapScale } from "../lib/motion";

const motionProps = {
  whileHover: hoverLift,
  whileTap: tapScale,
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

type AnimatedButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedButton({
  href,
  className = "",
  children,
}: AnimatedButtonProps) {
  return (
    <motion.div className="inline-flex" {...motionProps}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export function AnimatedAnchor({
  href,
  className = "",
  children,
}: AnimatedButtonProps) {
  return (
    <motion.a href={href} className={className} {...motionProps}>
      {children}
    </motion.a>
  );
}

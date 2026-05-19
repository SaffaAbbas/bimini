"use client";

import { motion } from "framer-motion";
import { slideFromLeft, slideFromRight, viewportOnce } from "../lib/motion";
import { SectionHeading } from "./SectionHeading";

export function MissionSection() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div className="lg:col-span-6" variants={slideFromLeft}>
          <SectionHeading
            eyebrow="OUR MISSION"
            title="Connecting you with the real Bimini"
            subtitle="We share the island respectfully, highlighting its culture and natural beauty while helping guests feel at ease from the first question to the last photo."
            align="left"
            className="!max-w-none"
          />
          <p className="mt-6 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg lg:max-w-lg">
            Personalized tours and expert local guides who know the water,
            wildlife, and history firsthand. Every itinerary is built around
            what you want to see—not a one-size-fits-all bus route.
          </p>
        </motion.div>

        <motion.div className="lg:col-span-6" variants={slideFromRight}>
          <motion.div
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-1xl bg-slate-100 shadow-lg ring-1 ring-slate-200/80"
            whileHover={{
              y: -6,
              boxShadow: "0 24px 48px rgba(6, 42, 68, 0.14)",
            }}
            transition={{ duration: 0.35 }}
          >
            <img
              src="/images/new37.jpeg"
              alt="Bimini shoreline and clear water"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--brand-deep)]/40 via-transparent to-transparent opacity-60"
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

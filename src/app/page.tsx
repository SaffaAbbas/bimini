"use client";
import { motion } from "framer-motion";
import { AnimatedAnchor } from "./components/AnimatedButton";
import { BiminiDayCta } from "./components/BiminiDayCta";
import { HeroVideo } from "./components/HeroVideo";
import { RevealSection } from "./components/RevealSection";
import { SectionHeading } from "./components/SectionHeading";
import { SiteHeader } from "./components/SiteHeader";
import { tourPackages } from "./data/tour-packages";
import {
  fadeUp,
  heroStagger,
  hoverLift,
  slideFromLeft,
  slideFromRight,
  viewportOnce,
} from "./lib/motion";

export default function Home() {
  const packages = tourPackages;

  const galleryImages = [
    "/images/img10.jpg",
    "/images/new45.jpg",
    "/images/img18.jpg",
    "/images/new48.jpg",
    "/images/new49.jpg",
    "/images/img21.webp",
    "/images/beach2.webp",
    "/images/img9.jpg",
  ] as const;
  const images = [...galleryImages, ...galleryImages];

  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <section className="group relative isolate min-h-[100svh] overflow-hidden">
        <HeroVideo />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-0 pt-28 lg:px-8 lg:pt-32">
          <motion.div
            className="flex flex-1 flex-col items-center justify-center pb-28 pt-12 text-center sm:pb-32 sm:pt-16 lg:pb-40"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold tracking-wide text-white"
            >
              Bimini, Bahamas
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Explore Bimini
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-balance text-2xl font-normal tracking-tight text-white sm:text-4xl"
            >
              Bimini Tours & Adventures
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-6 h-px w-44 origin-center bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-pretty text-base font-semibold leading-7 text-white sm:text-lg"
            >
              Experience Bimini beyond the beach with authentic cultural tours
              that celebrate history, heritage, food, music, and the island’s
              way of life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <AnimatedAnchor
                href="#tours"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#063a5a] shadow-md hover:bg-slate-100 hover:shadow-lg"
              >
                View Tours
              </AnimatedAnchor>
              <AnimatedAnchor
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-[#063a5a] hover:shadow-lg"
              >
                Contact Us
              </AnimatedAnchor>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 1440 120"
            className="h-24 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C160,100 320,20 480,60 C640,100 800,20 960,60 C1120,100 1280,20 1440,60 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
            <path
              d="M0,72 C180,112 360,30 540,72 C720,112 900,30 1080,72 C1260,112 1350,35 1440,72 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
          <motion.div
            className="h-10 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
        </motion.div>
      </section>

      <section
        id="tours"
        className="relative overflow-hidden text-[color:var(--brand-deep)]"
      >
        <RevealSection
          as="div"
          className="mx-auto max-w-7xl px-6 pt-16 pb-2 lg:px-8 lg:pb-4"
        >
          <SectionHeading
            eyebrow="TOUR PACKAGES"
            title="Choose your perfect Bimini day"
          />
        </RevealSection>

        <motion.div
          className="mx-auto max-w-7xl px-6 pb-6 lg:px-8 lg:pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="mt-12 space-y-32 lg:mt-16">
            {packages.map((pkg, idx) => {
              const reverse = idx % 2 === 1;
              const imageVariants = reverse ? slideFromRight : slideFromLeft;
              const textVariants = reverse ? slideFromLeft : slideFromRight;

              return (
                <RevealSection
                  as="article"
                  key={pkg.slug}
                  className={`grid items-start gap-14 lg:grid-cols-12 lg:gap-16 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                  delayMs={Math.min(idx * 90, 480)}
                >
                  <motion.div
                    className="lg:col-span-7"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <motion.div
                      className="group aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200"
                      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(6,42,68,0.12)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={pkg.imageSrc}
                        alt={pkg.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-5"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <motion.div className="mx-auto max-w-lg text-center lg:text-left">
                      <h3 className="text-balance text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary)] sm:text-3xl">
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-600">
                        Category: {pkg.category}
                      </p>

                      <p className="mt-3 text-pretty text-sm leading-6 text-slate-700">
                        {pkg.description}
                      </p>

                      <motion.div
                        className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
                        whileHover={hoverLift}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm font-extrabold text-slate-900">
                          Duration: {pkg.duration}
                        </p>
                        <motion.div className="mt-3 space-y-1">
                          {pkg.priceLines.map((line) => (
                            <p
                              key={line}
                              className="text-sm font-semibold text-slate-800"
                            >
                              {line}
                            </p>
                          ))}
                        </motion.div>
                      </motion.div>

                      <div className="mt-4">
                        <p className="text-sm font-extrabold tracking-wide text-slate-900">
                          Inclusions
                        </p>
                        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
                          {pkg.inclusions.map((inc) => (
                            <li key={inc} className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-accent)]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-start justify-center">
                        <AnimatedAnchor
                          href={`/tours/${pkg.slug}`}
                          className="inline-flex items-center justify-center rounded-md bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-extrabold text-white shadow-md hover:brightness-95 hover:shadow-lg"
                        >
                          Book Now
                        </AnimatedAnchor>
                      </div>
                    </motion.div>
                  </motion.div>
                </RevealSection>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section id="gallery" className="bg-white py-16 lg:py-24">
        <RevealSection as="div" className="w-full">
          <motion.div className="mx-auto max-w-7xl px-6 pb-4 pt-2 text-center lg:px-8 lg:pb-6 lg:pt-4">
            <SectionHeading
              eyebrow="GALLERY"
              title="Moments from Bimini"
            />
          </motion.div>
        </RevealSection>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            }}
          >
            {images.map((src, i) => (
              <motion.div
                key={`${src}-${i}`}
                className="relative aspect-[4/3] w-[300px] shrink-0 overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={src}
                  alt={`Gallery ${(i % galleryImages.length) + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <BiminiDayCta />
    </main>
  );
}

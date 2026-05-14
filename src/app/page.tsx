"use client";
import { motion } from "framer-motion";
import { BiminiDayCta } from "./components/BiminiDayCta";
import { HeroVideo } from "./components/HeroVideo";
import { RevealSection } from "./components/RevealSection";
import { SiteHeader } from "./components/SiteHeader";
import { tourPackages } from "./data/tour-packages";

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
      {/* fixed header */}
      <SiteHeader bookNowHref="/contact" />

      <section className="group relative isolate min-h-[100svh] overflow-hidden">
        <HeroVideo />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-0 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center pb-28 pt-12 text-center sm:pb-32 sm:pt-16 lg:pb-40">
            <p className="text-sm font-bold tracking-wide text-white">
              Bimini, Bahamas
            </p>
            <h1 className="mt-4 text-balance font-extrabold tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl">
              Explore Bimini
            </h1>
            <p className="mt-4 text-balance text-2xl font-normal tracking-tight text-white sm:text-4xl">
              Bimini Tours & Adventures
            </p>
            <div className="mt-6 h-px w-44 bg-white" />
            <p className="mt-5 max-w-2xl text-pretty text-base font-semibold leading-7 text-white sm:text-lg">
              Experience Bimini beyond the beach with authentic cultural tours
              that celebrate history, heritage, food, music, and the island’s
              way of life.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#tours"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#063a5a] shadow-md transition-all duration-200 hover:bg-slate-100 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg active:translate-y-0"
              >
                View Tours
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-[#063a5a] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg active:translate-y-0"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
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
          <div className="h-10 bg-white" />
        </div>
      </section>

      {/* <section id="tours" className="bg-white text-[color:var(--brand-deep)]"> */}
      <section
        id="tours"
        className="relative overflow-hidden text-[color:var(--brand-deep)]"
      >
        <RevealSection
          as="div"
          className="mx-auto max-w-7xl px-6 pt-16 pb-2 lg:px-8 lg:pb-4"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
              TOUR PACKAGES
            </p>
            <h2 className="mt-3 text-balance text-3xl  text-blue-800 font-extrabold tracking-tight sm:text-4xl">
              Choose your perfect Bimini day
            </h2>
          </div>
        </RevealSection>

        <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-8 lg:pb-10">
          <div className="mt-12 space-y-32 lg:mt-16">
            {packages.map((pkg, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <RevealSection
                  as="article"
                  key={pkg.slug}
                  className={`grid items-start gap-14 lg:gap-16 lg:grid-cols-12 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                  delayMs={Math.min(idx * 90, 480)}
                >
                  <div className="lg:col-span-6">
                    <div className="group aspect-[4/3] w-full overflow-hidden rounded-1xl bg-slate-100 shadow-sm ring-1 ring-slate-200 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:ease-out hover:shadow-xl motion-safe:hover:-translate-y-1">
                      <img
                        src={pkg.imageSrc}
                        alt={pkg.imageAlt}
                        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="mx-auto max-w-lg text-center lg:text-left">
                      <h3 className="text-balance text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary)] sm:text-3xl">
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-600">
                        Category: {pkg.category}
                      </p>

                      <p className="mt-3 text-pretty text-sm leading-6 text-slate-700">
                        {pkg.description}
                      </p>

                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition-all duration-300 hover:bg-slate-100/90 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md">
                        <p className="text-sm font-extrabold text-slate-900">
                          Duration: {pkg.duration}
                        </p>
                        <div className="mt-3 space-y-1">
                          {pkg.priceLines.map((line) => (
                            <p
                              key={line}
                              className="text-sm font-semibold text-slate-800"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

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
                        <a
                          href={`/tours/${pkg.slug}`}
                          className="inline-flex items-center justify-center rounded-md bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all duration-200 hover:brightness-95 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg active:translate-y-0"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white py-16 lg:py-24">
        <RevealSection as="div" className="w-full">
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-2 text-center lg:px-8 lg:pb-6 lg:pt-4">
            <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
              GALLERY
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-blue-800 sm:text-4xl">
              Moments from Bimini
            </h2>
          </div>
        </RevealSection>

        {/* <div className="grid w-full grid-cols-2 gap-0 sm:grid-cols-4">
          {galleryImages.map((src, i) => (
            <RevealSection
              as="div"
              key={src}
              className="group relative aspect-[4/3] w-full overflow-hidden bg-slate-200"
              delayMs={Math.min(i * 55, 350)}
            >
              <img
                src={src}
                alt={`Bimini gallery photo ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 motion-safe:group-hover:brightness-105"
                loading="lazy"
              />
            </RevealSection>
          ))}
        </div> */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {images.map((src, i) => (
              <RevealSection
                as="div"
                key={i}
                className="relative aspect-[4/3] w-[300px] flex-shrink-0 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </RevealSection>
            ))}
          </motion.div>
        </div>
      </section>

      <BiminiDayCta />
    </main>
  );
}

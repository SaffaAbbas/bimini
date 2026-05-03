"use client";

import { RevealSection } from "./RevealSection";

/** Full-width “Make today a Bimini day.” banner (same as home CTA strip). */
export function BiminiDayCta() {
  return (
    <RevealSection className="group relative isolate w-full overflow-hidden -mt-px">
      <div className="absolute inset-0 -z-20 bg-[url('/images/img14.jpg')] bg-cover bg-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:scale-105" />
      <div className="mx-auto flex min-h-[280px] max-w-7xl items-center px-6 py-10 sm:min-h-[320px] sm:py-12 lg:min-h-[380px] lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <h3 className="text-balance text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-4xl">
            Make today a Bimini day.
          </h3>
          <p className="mt-4 text-pretty text-sm leading-6 text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)] sm:text-base sm:leading-7">
            Crystal‑clear water, white‑sand beaches, and unforgettable
            adventures—pick your perfect tour and let our local team handle the
            rest.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}

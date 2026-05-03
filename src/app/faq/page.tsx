import { BiminiDayCta } from "../components/BiminiDayCta";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";

export default function FAQPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <header className="group relative isolate min-h-[48svh] overflow-hidden sm:min-h-[50svh]">
        <img
          src="/images/hero3.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="mx-auto flex min-h-[48svh] max-w-7xl flex-col px-6 pb-12 pt-24 sm:min-h-[50svh] lg:px-8 lg:pb-16 lg:pt-28">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              FAQ
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white sm:text-lg">
              Tell me your FAQ questions and answers and I’ll design it nicely.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
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
        </div>
      </header>

      <RevealSection className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg sm:p-10">
          <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
            COMING NEXT
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Add items like cancellation policy, what to bring, pickup details,
            weather, safety, and booking help.
          </p>
        </div>
      </RevealSection>

      <BiminiDayCta />
    </main>
  );
}

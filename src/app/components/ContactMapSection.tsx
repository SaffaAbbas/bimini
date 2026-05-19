import Link from "next/link";
import { MEETING_POINT } from "../data/business-info";
import { RevealSection } from "./RevealSection";

export function ContactMapSection() {
  return (
    <RevealSection className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/90">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-primary)]">
              Meeting point
            </p>
            <h2 className="mt-2 font-serif text-xl font-bold text-slate-900">
              {MEETING_POINT.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {MEETING_POINT.address}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {MEETING_POINT.detail}
            </p>
            <Link
              href={MEETING_POINT.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              Open in Google Maps →
            </Link>
          </div>
          <div className="relative min-h-[240px] bg-slate-100 lg:min-h-[280px]">
            <iframe
              title="Map: Alice Town, North Bimini, Bahamas"
              src={MEETING_POINT.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

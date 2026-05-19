import Link from "next/link";
import { REVIEW_LINKS } from "../data/business-info";

export function ReviewBadges({ className = "" }: { className?: string }) {
  const google = REVIEW_LINKS.google.trim();
  const tripadvisor = REVIEW_LINKS.tripadvisor.trim();
  const hasLinks = Boolean(google || tripadvisor);

  if (!hasLinks) {
    return (
      <p
        className={`text-center text-sm text-slate-600 ${className}`}
      >
        Proudly recommended by guests from Florida and beyond.{" "}
        <Link href="/contact" className="font-semibold text-[color:var(--brand-primary)] hover:underline">
          Ask us for references
        </Link>
        .
      </p>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
    >
      {google ? (
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
        >
          <span className="text-lg" aria-hidden>
            G
          </span>
          Google Reviews
        </a>
      ) : null}
      {tripadvisor ? (
        <a
          href={tripadvisor}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
        >
          <span className="text-lg text-emerald-700" aria-hidden>
            ●
          </span>
          TripAdvisor
        </a>
      ) : null}
    </div>
  );
}

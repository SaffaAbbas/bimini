"use client";

import { useState } from "react";
import { countryFlag } from "../data/phone-countries";

/** flagcdn.com only serves fixed widths (w20, w40, w80, …) — custom sizes 404. */
const FLAGCDN_WIDTHS = [20, 40, 80, 160, 320] as const;

function flagcdnWidth(requested: number): (typeof FLAGCDN_WIDTHS)[number] {
  return FLAGCDN_WIDTHS.find((w) => w >= requested) ?? 320;
}

export function countryFlagSrc(iso2: string, displaySize = 20) {
  const w = flagcdnWidth(displaySize);
  return `https://flagcdn.com/w${w}/${iso2.toLowerCase()}.png`;
}

type CountryFlagProps = {
  iso2: string;
  /** Display width in px (height scales ~3:2). */
  size?: number;
  className?: string;
};

export function CountryFlag({ iso2, size = 20, className = "" }: CountryFlagProps) {
  const [failed, setFailed] = useState(false);
  const height = Math.round(size * 0.67);
  const src1x = countryFlagSrc(iso2, size);
  const src2x = countryFlagSrc(iso2, size * 2);

  if (failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-[3px] bg-slate-100 text-base leading-none ring-1 ring-slate-200/90 ${className}`}
        style={{ width: size, height }}
        aria-hidden
      >
        {countryFlag(iso2)}
      </span>
    );
  }

  return (
    <img
      src={src1x}
      srcSet={`${src2x} 2x`}
      width={size}
      height={height}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className={`inline-block shrink-0 rounded-[3px] object-cover shadow-sm ring-1 ring-slate-200/90 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

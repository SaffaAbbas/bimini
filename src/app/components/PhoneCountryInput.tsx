"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PHONE_COUNTRY_ISO,
  formatPhoneValue,
  getCountryByIso,
  parsePhoneValue,
  phoneCountries,
  type PhoneCountry,
} from "../data/phone-countries";
import { CountryFlag } from "./CountryFlag";

type PhoneCountryInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  fieldClassName: string;
  error?: string;
};

export function PhoneCountryInput({
  value,
  onChange,
  onBlur,
  fieldClassName,
  error,
}: PhoneCountryInputProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const parsed = useMemo(() => parsePhoneValue(value), [value]);
  const [iso, setIso] = useState(
    () => parsed?.country.iso2 ?? DEFAULT_PHONE_COUNTRY_ISO,
  );
  const [national, setNational] = useState(() => parsed?.national ?? "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = getCountryByIso(iso) ?? phoneCountries[0]!;

  useEffect(() => {
    if (!value) {
      setIso(DEFAULT_PHONE_COUNTRY_ISO);
      setNational("");
      return;
    }
    const p = parsePhoneValue(value);
    if (p) {
      setIso(p.country.iso2);
      setNational(p.national);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return phoneCountries;
    return phoneCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q.replace(/\D/g, "")) ||
        c.iso2.toLowerCase().includes(q),
    );
  }, [query]);

  function pickCountry(country: PhoneCountry) {
    setIso(country.iso2);
    setOpen(false);
    setQuery("");
    onChange(formatPhoneValue(country.iso2, national));
  }

  function onNationalChange(raw: string) {
    const digits = raw.replace(/\D/g, "");
    setNational(digits);
    onChange(formatPhoneValue(iso, digits));
  }

  return (
    <div ref={rootRef} className="relative min-w-0 w-full">
      <div className="flex w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:border-slate-300 hover:shadow-sm focus-within:border-[color:var(--brand-primary)] focus-within:ring-2 focus-within:ring-[color:var(--brand-primary)]/20">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="flex max-w-[42%] shrink-0 items-center gap-1 border-r border-slate-200 bg-slate-50/80 px-2 py-3 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 sm:max-w-none sm:gap-2 sm:px-3 sm:text-sm"
        >
          <CountryFlag iso2={selected.iso2} size={22} />
          <span className="tabular-nums">+{selected.dial}</span>
          <svg
            className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="tel"
          value={national}
          onChange={(e) => onNationalChange(e.target.value)}
          onBlur={onBlur}
          placeholder="826 8687"
          autoComplete="tel-national"
          inputMode="numeric"
          className={`min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-0 ${fieldClassName.includes("rounded") ? "" : ""}`}
        />
      </div>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30"
        >
          <div className="border-b border-slate-100 p-2">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/20"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-500">No matches</li>
            ) : (
              filtered.map((country, index) => (
                <li key={country.iso2} role="option" aria-selected={country.iso2 === iso}>
                  <button
                    type="button"
                    onClick={() => pickCountry(country)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                      country.iso2 === iso
                        ? "bg-[color:var(--brand-primary)]/8 font-semibold text-[color:var(--brand-deep)]"
                        : "text-slate-800"
                    } ${index === 0 && country.iso2 === DEFAULT_PHONE_COUNTRY_ISO && !query ? "border-b border-slate-100" : ""}`}
                  >
                    <CountryFlag iso2={country.iso2} size={24} />
                    <span className="min-w-0 flex-1 truncate">{country.name}</span>
                    <span className="shrink-0 tabular-nums text-slate-500">
                      +{country.dial}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}

      {error ? <p className="mt-1 text-xs font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}

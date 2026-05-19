import { OPERATING_INFO } from "../data/business-info";

export function OperatingHoursCard() {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/90 sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-primary)]">
        Hours &amp; season
      </p>
      <dl className="mt-3 space-y-3 text-sm text-slate-700">
        <div>
          <dt className="font-extrabold text-slate-900">Operating hours</dt>
          <dd className="mt-0.5">{OPERATING_INFO.hours}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-900">Season</dt>
          <dd className="mt-0.5">{OPERATING_INFO.season}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-900">Hurricane season</dt>
          <dd className="mt-0.5">{OPERATING_INFO.hurricane}</dd>
        </div>
      </dl>
    </div>
  );
}

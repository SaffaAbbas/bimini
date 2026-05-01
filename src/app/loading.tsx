export default function Loading() {
  return (
    <div className="grid min-h-[60svh] place-items-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[color:var(--brand-primary)]"
          aria-label="Loading"
          role="status"
        />
        <p className="text-sm font-semibold text-slate-600">Loading…</p>
      </div>
    </div>
  );
}


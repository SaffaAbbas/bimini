export function parsePriceLine(line: string): {
  label: string | null;
  value: string;
} {
  const colon = line.indexOf(":");
  if (colon === -1) return { label: null, value: line };
  return {
    label: line.slice(0, colon).trim(),
    value: line.slice(colon + 1).trim(),
  };
}

type TourPriceListProps = {
  lines: readonly string[];
  className?: string;
  /** Larger text for tour detail / checkout panels */
  size?: "sm" | "md";
};

export function TourPriceList({
  lines,
  className = "",
  size = "sm",
}: TourPriceListProps) {
  const labelClass =
    size === "md"
      ? "text-sm font-extrabold text-slate-700"
      : "text-xs font-bold uppercase tracking-wide text-slate-600 sm:text-sm sm:normal-case sm:font-extrabold sm:text-slate-700";
  const valueClass =
    size === "md"
      ? "text-base font-semibold tabular-nums text-slate-900"
      : "text-sm font-semibold tabular-nums text-slate-900";

  return (
    <ul className={`space-y-2.5 ${className}`}>
      {lines.map((line) => {
        const { label, value } = parsePriceLine(line);
        if (!label) {
          return (
            <li key={line} className={valueClass}>
              {line}
            </li>
          );
        }
        return (
          <li
            key={line}
            className="flex flex-col gap-0.5 border-b border-slate-200/70 pb-2.5 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span className={labelClass}>{label}</span>
            <span className={valueClass}>{value}</span>
          </li>
        );
      })}
    </ul>
  );
}

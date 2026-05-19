import type { SiteFaqItem } from "../data/site-faq";

export function FaqAccordion({ items }: { items: readonly SiteFaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md"
        >
          <summary className="cursor-pointer list-none font-semibold text-[color:var(--brand-primary)] [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-2">
              <span
                className="text-lg leading-none text-[color:var(--brand-primary)] transition group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
              {item.q}
            </span>
          </summary>
          <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

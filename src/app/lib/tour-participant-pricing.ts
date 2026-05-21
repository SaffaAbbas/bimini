/** Parse tour price lines and calculate totals by adult / child / infant counts. */

export type ParticipantCounts = {
  adults: number;
  children: number;
  infants: number;
};

/** UI fields for Adult / Child / Infant dropdowns (like islandvibestours booking form). */
export type ParticipantTierFields = {
  adultLabel: string;
  adultPriceLabel: string;
  childLabel: string;
  childPriceLabel: string;
  infantLabel: string;
  infantPriceLabel: string;
};

export type ParticipantPricingModel =
  | {
      type: "tiered";
      adultUsd: number;
      childUsd: number;
      infantUsd: number;
      adultLabel: string;
      childLabel: string;
      infantLabel: string;
    }
  | { type: "per_person"; rateUsd: number; label: string; infantFree: boolean }
  | { type: "flat"; amountUsd: number; label: string; maxGuests: number }
  | { type: "family"; amountUsd: number; maxGuests: number; label: string }
  | { type: "adults_only"; adultUsd: number; familyUsd: number | null; familyMax: number };

function parseMoney(s: string): number {
  return Number(s.replace(/,/g, ""));
}

function extractUsd(line: string): number | null {
  const m = line.match(/\$([\d,]+(?:\.\d{2})?)/);
  return m ? parseMoney(m[1]) : null;
}

export function totalParticipants(c: ParticipantCounts): number {
  return c.adults + c.children + c.infants;
}

export function clampParticipants(c: ParticipantCounts): ParticipantCounts {
  const clamp = (n: number) => Math.max(0, Math.min(16, Math.floor(n)));
  const out = {
    adults: clamp(c.adults),
    children: clamp(c.children),
    infants: clamp(c.infants),
  };
  const total = totalParticipants(out);
  if (total > 50) {
    const scale = 50 / total;
    return {
      adults: Math.floor(out.adults * scale),
      children: Math.floor(out.children * scale),
      infants: Math.floor(out.infants * scale),
    };
  }
  return out;
}

function parseTieredFromPriceLines(
  priceLines: readonly string[],
): Extract<ParticipantPricingModel, { type: "tiered" }> | null {
  const adultLine = priceLines.find((l) => /^adults?\b/i.test(l.trim()));
  const adultUsd = adultLine ? extractUsd(adultLine) : null;
  if (adultUsd == null) return null;

  let childUsd = 0;
  let infantUsd = 0;
  let childLabel = "Child (Age 5–12)";
  let infantLabel = "Infant (Age 0–4)";

  for (const line of priceLines) {
    const lower = line.toLowerCase();
    const title = line.split(":")[0]?.trim();
    if (/kids?\s*\(ages?\s*\d/i.test(line) || /kids?\s*\(age\s*\d/i.test(line)) {
      childUsd = extractUsd(line) ?? 0;
      childLabel = title || childLabel;
    } else if (/^child\b/i.test(line.trim()) && !lower.includes("free")) {
      childUsd = extractUsd(line) ?? 0;
      childLabel = title || "Child (Age 3–10)";
    } else if (/^kids?:/i.test(line.trim()) && !lower.includes("free")) {
      childUsd = extractUsd(line) ?? 0;
      childLabel = title || "Child";
    } else if (
      (lower.includes("4 and under") || lower.includes("0-2") || lower.includes("0–2")) &&
      lower.includes("free")
    ) {
      infantUsd = 0;
      infantLabel = title || infantLabel;
    } else if (lower.includes("infant") && lower.includes("free")) {
      infantUsd = 0;
      infantLabel = title || "Infant (Age 0–2)";
    }
  }

  return {
    type: "tiered",
    adultUsd,
    childUsd,
    infantUsd,
    adultLabel: "Adult",
    childLabel,
    infantLabel,
  };
}

function priceLabel(usd: number): string {
  return usd === 0 ? "$0.00" : formatUsd(usd);
}

/** Always use this for booking calendar UI — three participant dropdowns. */
export function getParticipantTierFields(
  slug: string,
  priceLines: readonly string[],
): ParticipantTierFields | null {
  const model = getParticipantPricingModel(slug, priceLines);
  if (!model) return null;

  if (model.type === "tiered") {
    return {
      adultLabel: model.adultLabel,
      adultPriceLabel: priceLabel(model.adultUsd),
      childLabel: model.childLabel,
      childPriceLabel: priceLabel(model.childUsd),
      infantLabel: model.infantLabel,
      infantPriceLabel: priceLabel(model.infantUsd),
    };
  }

  if (model.type === "per_person") {
    return {
      adultLabel: "Adult",
      adultPriceLabel: priceLabel(model.rateUsd),
      childLabel: "Child",
      childPriceLabel: priceLabel(model.rateUsd),
      infantLabel: "Infant (Age 0–2)",
      infantPriceLabel: model.infantFree ? "$0.00" : priceLabel(model.rateUsd),
    };
  }

  if (model.type === "family") {
    return {
      adultLabel: "Adult",
      adultPriceLabel: `${priceLabel(model.amountUsd)} package (up to ${model.maxGuests})`,
      childLabel: "Child",
      childPriceLabel: "Included in package",
      infantLabel: "Infant (Age 0–2)",
      infantPriceLabel: "$0.00",
    };
  }

  if (model.type === "adults_only") {
    return {
      adultLabel: "Adult",
      adultPriceLabel: priceLabel(model.adultUsd),
      childLabel: "Child",
      childPriceLabel:
        model.familyUsd != null
          ? `Family ${priceLabel(model.familyUsd)} (up to ${model.familyMax})`
          : priceLabel(0),
      infantLabel: "Infant (Age 0–2)",
      infantPriceLabel: "$0.00",
    };
  }

  if (model.type === "flat") {
    return {
      adultLabel: "Adult",
      adultPriceLabel: `${priceLabel(model.amountUsd)} — ${model.label}`,
      childLabel: "Child",
      childPriceLabel: "Same charter rate",
      infantLabel: "Infant (Age 0–2)",
      infantPriceLabel: "$0.00",
    };
  }

  return null;
}

/** Infer pricing + totals from catalog price lines. */
export function getParticipantPricingModel(
  slug: string,
  priceLines: readonly string[],
): ParticipantPricingModel | null {
  const tiered = parseTieredFromPriceLines(priceLines);
  if (tiered) return tiered;

  const j = priceLines.join(" | ");
  const lines = priceLines.map((l) => l.toLowerCase());

  if (slug === "fishing-charter") {
    const m = j.match(/\$([\d,]+)/);
    if (m) {
      return {
        type: "flat",
        amountUsd: parseMoney(m[1]),
        label: "Charter (up to 4 people)",
        maxGuests: 4,
      };
    }
  }

  if (slug === "eco-tour") {
    const m = j.match(/\$([\d,]+)/);
    if (m) {
      return {
        type: "per_person",
        rateUsd: parseMoney(m[1]),
        label: "Per person",
        infantFree: lines.some((l) => l.includes("4 and under") && l.includes("free")),
      };
    }
  }

  if (slug === "family-fun") {
    return { type: "family", amountUsd: 500, maxGuests: 4, label: "Family package (up to 4)" };
  }
  if (slug === "family-culture") {
    return { type: "family", amountUsd: 600, maxGuests: 4, label: "Family package (up to 4)" };
  }

  if (slug === "down-for-whateva") {
    const adult = j.match(/Adults[^\d$]*\$([\d,]+)/i);
    const fam = j.match(/Family[^\d$]*\$([\d,]+)/i);
    if (adult) {
      return {
        type: "adults_only",
        adultUsd: parseMoney(adult[1]),
        familyUsd: fam ? parseMoney(fam[1]) : null,
        familyMax: 4,
      };
    }
  }

  if (slug === "private-tours") {
    const m = j.match(/\$([\d,]+)/);
    if (m) {
      return {
        type: "flat",
        amountUsd: parseMoney(m[1]),
        label: "Starting quote (min. group of 4)",
        maxGuests: 50,
      };
    }
  }

  const any = j.match(/\$([\d,]+(?:\.\d{2})?)/);
  if (any) {
    return {
      type: "per_person",
      rateUsd: parseMoney(any[1]),
      label: "Per person",
      infantFree: false,
    };
  }

  return null;
}

export type BookingTotalResult = {
  amount: number;
  basis: string;
  breakdown: string[];
};

export function calculateBookingTotal(
  slug: string,
  priceLines: readonly string[],
  raw: ParticipantCounts,
): BookingTotalResult | null {
  const counts = clampParticipants(raw);
  const total = totalParticipants(counts);
  if (total < 1) return null;

  const model = getParticipantPricingModel(slug, priceLines);
  if (!model) return null;

  switch (model.type) {
    case "tiered": {
      const amount =
        counts.adults * model.adultUsd +
        counts.children * model.childUsd +
        counts.infants * model.infantUsd;
      const breakdown: string[] = [];
      if (counts.adults > 0) {
        breakdown.push(
          `${counts.adults} adult${counts.adults > 1 ? "s" : ""} × ${formatUsd(model.adultUsd)}`,
        );
      }
      if (counts.children > 0) {
        breakdown.push(
          `${counts.children} child${counts.children > 1 ? "ren" : ""} × ${formatUsd(model.childUsd)}`,
        );
      }
      if (counts.infants > 0) {
        breakdown.push(
          `${counts.infants} infant${counts.infants > 1 ? "s" : ""} × ${formatUsd(model.infantUsd)}`,
        );
      }
      return {
        amount,
        basis: "By participant type (+ VAT)",
        breakdown,
      };
    }
    case "per_person": {
      const paying = model.infantFree ? counts.adults + counts.children : total;
      const amount = paying * model.rateUsd;
      return {
        amount,
        basis: `${model.label} × ${paying}`,
        breakdown: [`${paying} guest${paying > 1 ? "s" : ""} × ${formatUsd(model.rateUsd)}`],
      };
    }
    case "flat": {
      if (total > model.maxGuests) return null;
      if (counts.children > 0 || counts.infants > 0) {
        return {
          amount: model.amountUsd,
          basis: model.label,
          breakdown: [
            `${total} participant${total > 1 ? "s" : ""} — ${formatUsd(model.amountUsd)} charter`,
          ],
        };
      }
      return {
        amount: model.amountUsd,
        basis: model.label,
        breakdown: [`${counts.adults} adult${counts.adults > 1 ? "s" : ""} — ${formatUsd(model.amountUsd)}`],
      };
    }
    case "family": {
      if (total > model.maxGuests) return null;
      return {
        amount: model.amountUsd,
        basis: model.label,
        breakdown: [`${total} participant${total > 1 ? "s" : ""} — ${model.label}`],
      };
    }
    case "adults_only": {
      if (counts.children > 0 || counts.infants > 0) {
        if (total <= model.familyMax && model.familyUsd != null) {
          return {
            amount: model.familyUsd,
            basis: `Family (${model.familyMax} people)`,
            breakdown: [`Family package: ${formatUsd(model.familyUsd)}`],
          };
        }
      }
      if (counts.adults < 1) return null;
      const amount = counts.adults * model.adultUsd;
      return {
        amount,
        basis: `Adult rate × ${counts.adults}`,
        breakdown: [`${counts.adults} adult${counts.adults > 1 ? "s" : ""} × ${formatUsd(model.adultUsd)}`],
      };
    }
    default:
      return null;
  }
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

/** Legacy guest-only estimate — treats all guests as adults. */
export function participantCountsFromGuests(guests: number): ParticipantCounts {
  return { adults: Math.max(1, guests), children: 0, infants: 0 };
}

export function parseParticipantsFromSearchParams(sp: {
  adults?: string;
  children?: string;
  infants?: string;
  guests?: string;
}): ParticipantCounts {
  const parse = (v: string | undefined) => {
    if (!v || !/^\d+$/.test(v)) return 0;
    return Number(v);
  };
  let adults = parse(sp.adults);
  const children = parse(sp.children);
  const infants = parse(sp.infants);

  if (adults === 0 && children === 0 && infants === 0 && sp.guests && /^\d+$/.test(sp.guests)) {
    adults = Number(sp.guests);
  }

  return clampParticipants({ adults, children, infants });
}

export function buildCheckoutSearchParams(
  tourSlug: string,
  date: string,
  time: string,
  counts: ParticipantCounts,
): string {
  const q = new URLSearchParams();
  q.set("date", date);
  q.set("time", time);
  q.set("adults", String(counts.adults));
  q.set("children", String(counts.children));
  q.set("infants", String(counts.infants));
  q.set("guests", String(totalParticipants(counts)));
  return `/tours/${tourSlug}/checkout?${q.toString()}`;
}

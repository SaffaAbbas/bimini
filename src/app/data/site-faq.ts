export type SiteFaqItem = {
  readonly q: string;
  readonly a: string;
};

export type SiteFaqSection = {
  readonly title: string;
  readonly items: readonly SiteFaqItem[];
};

export const siteFaqSections: readonly SiteFaqSection[] = [
  {
    title: "Booking & payments",
    items: [
      {
        q: "How do I book a tour?",
        a: "Choose a package, pick a date on the tour calendar, and checkout. You can pay immediately with PayPal or send a booking request without paying online. We confirm availability by email, phone, or WhatsApp before your trip. Meeting-point details follow in your confirmation.",
      },
      {
        q: "Do prices include VAT?",
        a: "Listed prices are shown before VAT unless noted as “Free.” VAT is added at checkout or on your final invoice so the total matches Bahamian tax requirements. Every paid tier on a package uses the same + VAT notation.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept PayPal on tour checkout (pay now) or by invoice after we confirm your date. Cash may be accepted for certain on-island extras—ask when you book.",
      },
      {
        q: "Is a deposit required?",
        a: "Full payment or a confirmed reservation is typically required to hold your date, especially in peak season. Private charters may have different terms—your confirmation email will spell out what is due and when.",
      },
    ],
  },
  {
    title: "Cancellations, refunds & weather",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made at least 48 hours before your tour receive a full refund. Cancellations within 48 hours are subject to a 50% fee. Private charters require 7 days’ notice for a full refund. No-shows are not refunded. See our Refund Policy page for full details.",
      },
      {
        q: "What happens if weather cancels our tour?",
        a: "All tours are weather permitting. If the captain cancels due to weather, you receive a full refund or we work with you to reschedule. Check your email 12–24 hours before departure for updates.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed as soon as we approve them. Depending on your bank or card issuer, it may take a few business days to appear on your statement.",
      },
    ],
  },
  {
    title: "On the day of your tour",
    items: [
      {
        q: "Where do we meet?",
        a: "Meeting points vary by package—ferry dock, marina, beach base, or activity operator. Your confirmation email includes the exact location, time, and any ID or ferry requirements.",
      },
      {
        q: "What should I bring?",
        a: "Towels, swimwear, reef-safe sunblock, a hat, and a camera are standard. Some tours need closed-toe shoes or cash for extras. Each tour page lists specific “what to bring” items.",
      },
      {
        q: "Are tours suitable for children?",
        a: "Many packages welcome families. Kids’ pricing and age rules are listed per tour (often ages 5–12 with reduced rates; ages 4 and under free on selected packages). Life vests are provided where water activities are included.",
      },
      {
        q: "Can you accommodate dietary needs or mobility?",
        a: "Tell us when you book. We work with local restaurants and guides to accommodate common dietary requests where possible. Some cultural tours involve moderate walking—contact us if anyone in your group has mobility concerns.",
      },
    ],
  },
  {
    title: "Groups & private tours",
    items: [
      {
        q: "Do you offer group discounts?",
        a: "Yes—groups of 10 or more may qualify for a discount. Contact us with your dates and headcount for a quote.",
      },
      {
        q: "Can we book a private charter?",
        a: "Yes. Private tours start from our listed packages and can be customized. Minimum group sizes and pricing are shown on each tour; contact us for a tailored itinerary.",
      },
    ],
  },
  {
    title: "Getting to Bimini",
    items: [
      {
        q: "How do I get to Bimini from Florida?",
        a: "Most guests arrive by ferry from Fort Lauderdale, by seaplane or scheduled flight, or by private boat. Ferry and flight schedules vary by season—book transport before your tour date.",
      },
      {
        q: "Do I need a passport?",
        a: "U.S. citizens need valid passport documentation for Bahamas entry (requirements vary by sea vs. air—check official guidance before you travel). Other nationalities should confirm visa rules with Bahamas immigration.",
      },
    ],
  },
  {
    title: "Still have questions?",
    items: [
      {
        q: "How do I reach you?",
        a: "Email bookings@toursbimini.com, WhatsApp +1 (242) 826-8687, call (242) 826-TOUR (8687), or use the contact form on this site. We aim to reply quickly—especially within 48 hours of your tour date.",
      },
    ],
  },
];

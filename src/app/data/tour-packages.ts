/** Full tour catalog — home page + `/tours/[slug]` detail pages. */

export type TourFaq = { readonly q: string; readonly a: string };

export type TourPackage = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly duration: string;
  readonly priceLines: readonly string[];
  /** Short blurb (home cards) */
  readonly description: string;
  /** Short bullets (home cards) */
  readonly inclusions: readonly string[];
  readonly locationLabel: string;
  readonly meetingPoint: string;
  readonly overviewParagraphs: readonly string[];
  readonly experienceHighlights: readonly string[];
  readonly includesChecklist: readonly string[];
  readonly whatToBring: readonly string[];
  readonly faq: readonly TourFaq[];
  readonly gallery?: readonly string[];
  readonly footnote?: string;
};

export const BOOKING_FOOTNOTE =
  "After your booking is confirmed we will email you a confirmation. Cancellations made 48 hours before the tour receive a full refund; after that a 50% fee applies. Group discounts for 10+ guests—ask us for details.";

const COMMON_BRING = [
  "Towels and swimwear",
  "Sunblock and hat",
  "Camera or phone",
  "Cash or card for extras",
] as const;

export const tourPackages: TourPackage[] = [
  {
    slug: "real-deal",
    title: "The Real Deal Package",
    category: "Island Tour",
    imageSrc: "/images/new18.jpeg",
    imageAlt: "Bimini island tour experience",
    duration: "2 hours",
    priceLines: [
      "Adults: $95 + VAT",
      "Kids (Ages 5–12): $70 + VAT",
      "Kids (4 and under): Free",
    ],
    description:
      'Join us for a fun-filled day in beautiful Bimini! Our "Real Deal Package" is the perfect intro to the island—culture, iconic stops, and time to relax.',
    inclusions: [
      "Guided tour of key Bimini attractions",
      "Lunch at a local restaurant",
      "Free time for beaches and local shops",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Confirmed at booking — typical meet: Alice Town / central Bimini.",
    overviewParagraphs: [
      'Join us for a fun-filled day in beautiful Bimini! Our "Real Deal Package" offers a fantastic opportunity to explore the island\'s must-see sites while immersing yourself in vibrant local culture.',
      "This package includes a guided tour of iconic Bimini attractions—including Stuart's Conch Salad Stand, the Bimini Craft Center, Nate's Bakery, Radio Beach, the Bimini War Memorial, Heroes Park, and the Dolphin House Museum.",
      "Enjoy a delicious lunch at a local restaurant with traditional Bahamian cuisine, then relax on stunning beaches or browse local shops at your own pace.",
      "Don't miss this opportunity to experience the best of Bimini—book your Real Deal Package today!",
    ],
    experienceHighlights: [
      "Guided tour of Stuart's Conch Stand, Craft Center, Nate's Bakery, Radio Beach, War Memorial, Heroes Park & Dolphin House Museum",
      "Lunch at a local restaurant",
      "Free time on the beach and for shopping",
    ],
    includesChecklist: [
      "Expert guided tour of Bimini highlights",
      "Lunch at a local restaurant",
      "Free time for beaches and exploration",
      "Local insights from Bimini guides",
    ],
    whatToBring: [...COMMON_BRING],
    faq: [
      {
        q: "Is this tour good for first-time visitors?",
        a: "Yes—it's designed as a perfect introduction to North Bimini's culture and landmarks with a relaxed pace.",
      },
      {
        q: "Are food allergies accommodated at lunch?",
        a: "Tell us when you book and we will do our best to coordinate with the restaurant.",
      },
    ],
    gallery: ["/images/beach.webp", "/images/img3.jpg", "/images/img4.jpg"],
  },
  {
    slug: "bimini-adventure",
    title: "Bimini Adventure Package",
    category: "Adventure",
    imageSrc: "/images/new19.jpeg",
    imageAlt: "Snorkeling and ocean adventure in Bimini",
    duration: "3 hours",
    priceLines: [
      "Adults: $199 + VAT",
      "Kids (Ages 5–12): $95 + VAT",
      "Kids (4 and under): Free",
    ],
    description:
      "Calling all adventure seekers—snorkel vibrant reefs, feel the rush on a jet ski, then unwind with beach access and a beachfront lunch.",
    inclusions: [
      "Snorkeling gear included",
      "30-minute jet ski rental",
      "Lunch at a beachfront restaurant",
      "Beach chairs + umbrellas access",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Confirmed at booking — beach / marina pickup details sent with confirmation.",
    overviewParagraphs: [
      "Calling all adventure seekers! The Bimini Adventure Package blends ocean thrills with beach relaxation in one unforgettable morning or afternoon.",
      "Snorkel vibrant coral reefs, enjoy a 30-minute jet ski session, then unwind with beach chairs and umbrellas. Finish with lunch at a beachfront restaurant overlooking the water.",
      "Book your Bimini Adventure Package and get ready for fun in the sun!",
    ],
    experienceHighlights: [
      "Snorkeling excursion on Bimini's reefs",
      "30-minute jet ski rental",
      "Beach access with chairs and umbrellas",
      "Lunch at a beachfront restaurant",
    ],
    includesChecklist: [
      "Snorkeling gear",
      "30-minute jet ski rental",
      "Beach chairs and umbrellas",
      "Beachfront lunch",
      "Professional crew and safety briefing",
    ],
    whatToBring: [...COMMON_BRING, "Dry bag for electronics"],
    faq: [
      {
        q: "Do I need prior jet ski experience?",
        a: "No—our crew provides instruction and life jackets for all skill levels.",
      },
      {
        q: "What if weather affects snorkeling?",
        a: "We may adjust stops for safety; your captain will explain alternatives on the day.",
      },
    ],
    gallery: ["/images/img10.jpg", "/images/img7.jpg", "/images/b3.webp"],
  },
  {
    slug: "fishing-charter",
    title: "Bimini Fishing Charter Package",
    category: "Private Charter",
    imageSrc: "/images/new8.jpeg",
    imageAlt: "Private fishing charter in Bimini",
    duration: "4 hours (Half Day)",
    priceLines: ["$750 + VAT (up to 4 people)"],
    description:
      "A private deep-sea fishing adventure tailored for your group—perfect for beginners and seasoned anglers.",
    inclusions: [
      "Private charter (up to 4 people)",
      "All fishing gear + bait",
      "Experienced captain and crew",
      "Snacks + beverages on board",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Marina / dock confirmed at booking (Radio Beach Marina area typical).",
    overviewParagraphs: [
      "Experience deep-sea fishing in Bimini's clear Atlantic waters on a private half-day charter built for your group.",
      "Your crew supplies all tackle and bait, runs the boat to proven fishing grounds, and keeps you refreshed with snacks and drinks while you fish.",
      "Ideal for serious anglers or first-timers who want a calm, private day on the water.",
    ],
    experienceHighlights: [
      "Private 4-hour charter (up to 4 guests)",
      "All fishing gear and bait included",
      "Experienced captain and crew",
      "Snacks and beverages on board",
    ],
    includesChecklist: [
      "Private charter vessel",
      "Rods, reels, tackle, and bait",
      "Captain and crew",
      "Snacks and non-alcoholic beverages",
    ],
    whatToBring: [...COMMON_BRING, "Light jacket", "Motion-sickness remedy if needed"],
    faq: [
      {
        q: "Can we keep our catch?",
        a: "Regulations vary by species and season—your captain will advise on the day.",
      },
      {
        q: "Can we add extra guests?",
        a: "The listed price covers up to 4; contact us for larger groups or longer trips.",
      },
    ],
    gallery: ["/images/fishing.jpg", "/images/img9.jpg"],
  },
  {
    slug: "eco-tour",
    title: "Bimini Eco‑Tour Package",
    category: "Eco Adventure",
    imageSrc: "/images/new24.jpeg",
    imageAlt: "Eco tour and nature adventure in Bimini",
    duration: "3 hours",
    priceLines: ["$350 + VAT (per person)"],
    description:
      "Explore mangroves with a naturalist, then paddle through calm waters—an unforgettable blend of nature, learning, and island flavor.",
    inclusions: [
      "Guided eco-boat tour through mangroves",
      "Kayak or paddleboard rental",
      "Lunch featuring fresh local seafood",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Eco tour dock / ramp — details in your confirmation email.",
    overviewParagraphs: [
      "Immerse yourself in Bimini's natural beauty with a guided eco-boat tour through lush mangroves, wildlife viewing, and calm turquoise flats.",
      "Paddle a kayak or paddleboard to explore at your own pace, then enjoy lunch featuring fresh local seafood and island flavors.",
    ],
    experienceHighlights: [
      "Guided eco-boat tour with naturalist",
      "Kayak or paddleboard session",
      "Seafood lunch with Caribbean flavors",
    ],
    includesChecklist: [
      "Naturalist guide",
      "Kayak or paddleboard use",
      "Lunch with local seafood",
      "Safety equipment",
    ],
    whatToBring: [...COMMON_BRING, "Water shoes recommended"],
    faq: [
      {
        q: "Is the tour suitable for children?",
        a: "Yes—families welcome; we adjust pacing for mixed ages.",
      },
    ],
    gallery: ["/images/img7.jpg", "/images/img22.webp"],
  },
  {
    slug: "family-fun",
    title: "Bimini Family Fun Package",
    category: "Family",
    imageSrc: "/images/new2.jpeg",
    imageAlt: "Family fun on the water in Bimini",
    duration: "2 hours",
    priceLines: ["$500 + VAT (family of 4)", "Kids 4 and under: Free"],
    description:
      "A family-friendly mix of snorkeling, beach games, and a thrilling jet ski session—plus a lunch everyone will enjoy.",
    inclusions: [
      "Guided activities (snorkeling + beach games)",
      "30-minute jet ski rental",
      "Lunch at a kid-friendly restaurant",
      "Beach amenities + free time to relax",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Family-friendly beach / activity base — confirmed at booking.",
    overviewParagraphs: [
      "Create unforgettable memories with our Family Fun Package—snorkeling, beach games, a 30-minute jet ski session, and lunch at a kid-friendly spot.",
      "We balance guided fun with free time on the sand so everyone gets to relax and play.",
    ],
    experienceHighlights: [
      "Snorkeling and beach games",
      "30-minute jet ski rental",
      "Kid-friendly lunch",
      "Beach amenities and downtime",
    ],
    includesChecklist: [
      "Guided family activities",
      "Jet ski session (30 minutes)",
      "Lunch at family-friendly restaurant",
      "Beach time and amenities",
    ],
    whatToBring: [...COMMON_BRING, "Kids' snacks", "Life vests provided for water activities"],
    faq: [
      {
        q: "What ages is this best for?",
        a: "Great for school-age kids and teens; toddlers can enjoy the beach with supervision.",
      },
    ],
    gallery: ["/images/img3.jpg", "/images/img1.jpg"],
  },
  {
    slug: "family-culture",
    title: "Bimini Family Fun‑Filled Culture Package",
    category: "Culture",
    imageSrc: "/images/new27.jpeg",
    imageAlt: "Cultural tour experience in Bimini",
    duration: "2½ – 3 hours",
    priceLines: ["$600 + VAT (family of 4)", "Kids 4 and under: Free"],
    description:
      "A cultural, story-filled day with iconic landmarks and local flavor—balanced with time to unwind on Bimini’s beautiful beaches.",
    inclusions: [
      "Healing Hole, Craft Center, Bimini Bread stop",
      "War Memorial + Heroes Park + Dolphin House Museum",
      "Lunch at a local restaurant",
      "Free time at the beach",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Central Alice Town — exact pin sent before your tour.",
    overviewParagraphs: [
      "Immerse your family in Bimini's culture and history with stops at the Healing Hole, Stuart's Conch Salad Stand, the Craft Center, famous Bimini Bread, Radio Beach, the War Memorial, Heroes Park, and the Dolphin House Museum.",
      "Enjoy authentic Bahamian lunch and plenty of time to relax on the beach between stories from your local guide.",
    ],
    experienceHighlights: [
      "Healing Hole & cultural landmarks",
      "Craft Center & Bimini Bread",
      "War Memorial, Heroes Park, Dolphin House Museum",
      "Local lunch + beach time",
    ],
    includesChecklist: [
      "Expert cultural guide",
      "Landmark tour as described",
      "Lunch for the family",
      "Beach relaxation time",
    ],
    whatToBring: [...COMMON_BRING],
    faq: [
      {
        q: "How much walking is involved?",
        a: "Moderate walking at stops; comfortable shoes recommended.",
      },
    ],
    gallery: ["/images/img4.jpg", "/images/img2.jpg"],
  },
  {
    slug: "little-bit-of-that",
    title: "Bimini Little Bit & Little Bit of That Package",
    category: "Culture + Adventure",
    imageSrc: "/images/new38.jpeg",
    imageAlt: "Adventure and beach vibes in Bimini",
    duration: "2½ – 3 hours",
    priceLines: [
      "Adults: $200 + VAT",
      "Kids: $150 + VAT",
      "Family (4 people): $750 + VAT",
    ],
    description:
      "Island highlights plus a quick jet ski add‑on—perfect for families who want culture, beach, and a touch of adrenaline.",
    inclusions: [
      "Top attractions tour (Healing Hole, Craft Center, Radio Beach, more)",
      "30-minute jet ski rental",
      "Lunch at a local restaurant",
      "Beach free time",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Alice Town area — meet point in confirmation.",
    overviewParagraphs: [
      "See Bimini's top highlights—Healing Hole, Craft Center, Bimini Bread, Radio Beach, War Memorial, Heroes Park, and Dolphin House—then feel the rush with a 30-minute jet ski add-on.",
      "Lunch features authentic Bahamian flavors, followed by free time on the beach.",
    ],
    experienceHighlights: [
      "Full highlights driving/walking tour",
      "30-minute jet ski",
      "Local restaurant lunch",
      "Beach relaxation",
    ],
    includesChecklist: [
      "Guided landmark tour",
      "Jet ski rental (30 minutes)",
      "Lunch",
      "Beach time",
    ],
    whatToBring: [...COMMON_BRING],
    faq: [
      {
        q: "Can we skip the jet ski?",
        a: "Ask when booking—we may be able to swap for extra beach time subject to availability.",
      },
    ],
    gallery: ["/images/img2.jpg", "/images/img6.jpg"],
  },
  {
    slug: "two-for-one",
    title: "Two for One Island Tour",
    category: "North + South Bimini",
    imageSrc: "/images/new12.jpeg",
    imageAlt: "Explore North and South Bimini",
    duration: "4 hours",
    priceLines: [
      "Adults: $200 + VAT",
      "Kids: $150",
      "Family (4 people): $750 + VAT",
    ],
    description:
      "See the best of both islands—North Bimini classics and South Bimini legends—plus the scenic ferry ride between them.",
    inclusions: [
      "Round-trip ferry (North ↔ South)",
      "Expert guided tour across key stops",
      "Lunch included",
      "Beach free time",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Ferry dock / tour start — detailed in confirmation.",
    overviewParagraphs: [
      "Explore North and South Bimini in one unforgettable outing—including the scenic ferry between islands.",
      "North Bimini features Stuart's Conch Stand, Nate's Bakery, the Craft Center, and the Dolphin House Museum. South Bimini includes the Fountain of Youth and the Shark Lab (Bimini Biological Field Station) viewpoint/stop when available.",
      "Includes round-trip ferry, expert guide, lunch, and beach free time.",
    ],
    experienceHighlights: [
      "North Bimini food & culture stops",
      "South Bimini nature & science highlights",
      "Round-trip ferry",
      "Lunch + beach time",
    ],
    includesChecklist: [
      "Round-trip North ↔ South ferry",
      "Guided tour both islands",
      "Lunch",
      "Beach relaxation time",
    ],
    whatToBring: [...COMMON_BRING, "ID for ferry if required"],
    faq: [
      {
        q: "Is the Shark Lab always open to visitors?",
        a: "Schedules vary; your guide will confirm what is possible on your tour date.",
      },
    ],
    gallery: ["/images/img6.jpg", "/images/img23.jpg"],
  },
  {
    slug: "underwater-adventure",
    title: "Bimini Underwater Adventure Tour",
    category: "Underwater + Culture",
    imageSrc: "/images/new36.jpeg",
    imageAlt: "Underwater adventure experience in Bimini",
    duration: "2½ – 3 hours",
    priceLines: [
      "Adults: $300 + VAT",
      "Kids: $250",
      "Family (4 people): $750 + VAT",
    ],
    description:
      "A unique submarine experience paired with local culture—perfect for all ages and a truly memorable Bimini day.",
    inclusions: [
      "Submarine tour experience",
      "Bimini craft market visit",
      "Scenic island drive",
      "Lunch included",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Submarine / tour operator meeting point — emailed with ticket.",
    overviewParagraphs: [
      "Dive into Bimini's underwater world with a submarine-style experience, then explore local culture at the craft market and enjoy a scenic island drive.",
      "Includes guided commentary and a satisfying island lunch.",
    ],
    experienceHighlights: [
      "Underwater / submarine experience",
      "Bimini Craft Market",
      "Scenic island drive",
      "Lunch",
    ],
    includesChecklist: [
      "Submarine tour tickets / experience",
      "Craft market visit",
      "Guided island drive",
      "Lunch",
    ],
    whatToBring: [...COMMON_BRING],
    faq: [
      {
        q: "Is the submarine OK for young children?",
        a: "Generally family-friendly; height/age rules may apply—ask at booking.",
      },
    ],
    gallery: ["/images/underwater.webp", "/images/img21.webp"],
  },
  {
    slug: "down-for-whateva",
    title: "Down for Whateva Tour Package",
    category: "Full Day Adventure",
    imageSrc: "/images/new7.jpeg",
    imageAlt: "Full day beach and ocean adventure in Bimini",
    duration: "Approx. 5 hours",
    priceLines: ["Adults ONLY: $350 + VAT", "Family (4 people): $950 + VAT"],
    description:
      "The ultimate Bimini day—snorkeling, sandbar beach time, island exploration, plus a signature rum demonstration and tasting.",
    inclusions: [
      "Snorkeling adventure",
      "Beach day at sandbar",
      "Island-style lunch",
      "Island exploration tour",
      "Rum demonstration + tasting",
      "Round-trip transportation",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Pickup from your accommodation or agreed central point.",
    overviewParagraphs: [
      "The ultimate Bimini day: snorkeling, sandbar beach time, island exploration, island-style lunch, and a signature Bahamian rum demonstration with tasting.",
      "Round-trip transportation is included so you can relax from start to finish.",
      "Whether you want adrenaline or chill time, this full-day adventure balances both.",
    ],
    experienceHighlights: [
      "Guided snorkeling",
      "Sandbar beach session",
      "Island exploration",
      "Rum demo + tasting",
      "Round-trip transfers",
    ],
    includesChecklist: [
      "Snorkeling adventure",
      "Sandbar beach time",
      "Island exploration",
      "Island-style lunch",
      "Rum demonstration and samples",
      "Round-trip transportation",
    ],
    whatToBring: [...COMMON_BRING, "Valid ID (21+ for rum tasting)"],
    faq: [
      {
        q: "Why adults only for the listed adult price?",
        a: "Pricing tiers differ by package rules—ask us about family options when you call or email.",
      },
    ],
    gallery: ["/images/down.webp", "/images/b4.jpg"],
  },
  {
    slug: "private-tours",
    title: "Private Tours",
    category: "Private",
    imageSrc: "/images/new28.jpeg",
    imageAlt: "Private tours in Bimini",
    duration: "Custom (you choose)",
    priceLines: ["Starting from $375 + VAT", "Minimum group of 4"],
    description:
      "Want something exclusive? Build a custom private day for your group—perfect for couples, friends, birthdays, or corporate outings.",
    inclusions: [
      "Private experience for your group",
      "Custom itinerary (activities + stops)",
      "Flexible timing based on your requests",
      "Group discounts available (10+ people)",
    ],
    locationLabel: "Bimini, Bahamas",
    meetingPoint: "Flexible — we plan with you before arrival.",
    overviewParagraphs: [
      "Design a private Bimini day for your group—custom stops, timing, and activities built around what you want to see and do.",
      "Perfect for celebrations, corporate outings, or travelers who prefer a dedicated crew and vessel experience.",
      "Starting from $375 + VAT with a minimum group of 4; contact us for a tailored quote.",
    ],
    experienceHighlights: [
      "Fully private scheduling",
      "Custom itinerary",
      "Dedicated guide / crew coordination",
      "Group discounts for 10+",
    ],
    includesChecklist: [
      "Private tour planning session",
      "Custom route and activities (as agreed)",
      "Flexible timing",
      "Optional add-ons quoted separately",
    ],
    whatToBring: [...COMMON_BRING],
    faq: [
      {
        q: "How far ahead should we book?",
        a: "We recommend booking early, especially in peak season, to reserve boats and guides.",
      },
    ],
    gallery: ["/images/private.png", "/images/img10.jpg"],
    footnote:
      "All packages can be booked online or through customer service. Advanced booking recommended during peak season. Cancellations 48 hours before the tour receive a full refund; after that a 50% fee applies. Group discounts for 10+ guests—inquire for details. Questions: (242) 826-TOUR (8687) · www.toursbimini.com",
  },
];

export function getTourBySlug(slug: string): TourPackage | undefined {
  return tourPackages.find((p) => p.slug === slug);
}

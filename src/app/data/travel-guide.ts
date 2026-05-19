export type TravelGuideBlock = {
  readonly title: string;
  readonly body: string;
  readonly icon?: "ferry" | "plane" | "boat" | "passport" | "globe" | "customs";
};

export const gettingToBimini: readonly TravelGuideBlock[] = [
  {
    icon: "ferry",
    title: "Ferry from South Florida",
    body: "The Balearia Caribbean ferry runs between Fort Lauderdale (Port Everglades) and Bimini. It's a popular option for Florida travelers bringing cars or traveling as foot passengers. Book sailings in advance during holidays and peak season.",
  },
  {
    icon: "plane",
    title: "Seaplane & air",
    body: "Scheduled and charter flights connect South Florida airports to South Bimini and North Bimini. Flight time is short—ideal for day trips when ferry schedules don't fit.",
  },
  {
    icon: "boat",
    title: "Private boat & yacht",
    body: "Many guests arrive by private vessel. Clear customs and immigration on arrival in Bahamian waters. Tell us your marina or anchorage when you book—we'll confirm the best pickup.",
  },
];

export const entryRequirements: readonly TravelGuideBlock[] = [
  {
    icon: "passport",
    title: "U.S. visitors",
    body: "U.S. citizens need a valid passport (passport card works for sea entry on approved routes—confirm current rules before you sail). Return documentation and customs forms are required. Requirements can change—check the latest U.S. State Department and Bahamas immigration guidance before travel.",
  },
  {
    icon: "globe",
    title: "Other nationalities",
    body: "Most visitors need a valid passport and may require a visa depending on citizenship. Contact Bahamas immigration or your consulate for current entry rules.",
  },
  {
    icon: "customs",
    title: "Customs & pets",
    body: "The Bahamas enforces customs limits on alcohol, tobacco, and goods. Pets require advance permits. Declare items honestly at arrival.",
  },
];

export const destinationHighlights = [
  {
    slug: "north-bimini",
    title: "North Bimini",
    body: "Alice Town, marinas, Radio Beach, conch stands, and the classic Bimini island vibe—most of our tours start here.",
    accent: "from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)]",
  },
  {
    slug: "south-bimini",
    title: "South Bimini",
    body: "Quieter beaches, the airport, and stops like the Shark Lab on our cross-island tours.",
    accent: "from-[color:var(--brand-ocean)] to-[color:var(--brand-sea)]",
  },
  {
    slug: "sandbars-cays",
    title: "Sandbars & cays",
    body: "Shallow turquoise bars and offshore cays—perfect for beach days, photos, and snorkeling.",
    accent: "from-[color:var(--brand-sea)] to-[color:var(--brand-accent)]",
  },
  {
    slug: "reefs-wrecks",
    title: "Reefs & wrecks",
    body: "World-class snorkeling and dive sites, including legendary reefs and wreck structures offshore.",
    accent: "from-[color:var(--brand-deep)] to-[color:var(--brand-primary)]",
  },
] as const;

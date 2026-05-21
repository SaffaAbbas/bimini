export type Testimonial = {
  readonly quote: string;
  readonly name: string;
  readonly location: string;
  readonly tour: string;
  readonly rating?: number;
};

/** Shorter quotes — testimonials tab */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Best day of our Florida trip—professional crew, amazing lunch, and more fish than we expected.",
    name: "Marcus & Elena T.",
    location: "Miami, FL",
    tour: "Bimini Adventure Package",
    rating: 5,
  },
  {
    quote:
      "Kids loved the ferry and Shark Lab. Guides made it easy for our whole family.",
    name: "Jennifer R.",
    location: "Fort Lauderdale, FL",
    tour: "Two for One Island Tour",
    rating: 5,
  },
  {
    quote:
      "Clear communication start to finish. Captain knew every reef—we were on fish early.",
    name: "David K.",
    location: "West Palm Beach, FL",
    tour: "Bimini Fishing Charter",
    rating: 5,
  },
  {
    quote:
      "Personal, not cookie-cutter. Healing Hole, local food, and Radio Beach were unforgettable.",
    name: "Priya & James L.",
    location: "Orlando, FL",
    tour: "Little Bit of This & Little Bit of That",
    rating: 5,
  },
];

/** Longer guest narratives — guest stories tab */
export const guestStories: readonly Testimonial[] = [
  {
    quote:
      "We booked the Two for One tour after reading about the Fountain of Youth on South Bimini. The crew timed everything perfectly—ferry ride, lunch, and stops felt relaxed, not rushed. Our teenagers still talk about the Shark Lab visit months later.",
    name: "Marcus & Elena T.",
    location: "Miami, FL",
    tour: "Two for One Island Tour",
    rating: 5,
  },
  {
    quote:
      "First time in the Bahamas and Bimini Tours made it effortless. They answered every WhatsApp question before we left Fort Lauderdale, met us right on time, and the fishing charter delivered nonstop action. We will book the adventure package again next spring.",
    name: "David K.",
    location: "West Palm Beach, FL",
    tour: "Bimini Fishing Charter",
    rating: 5,
  },
  {
    quote:
      "The Little Bit of This & Little Bit of That tour was exactly what we wanted—culture, food, and beach without a crowded bus. Healing Hole, local bites, and Radio Beach in one day. Felt like friends showing us their island.",
    name: "Priya & James L.",
    location: "Orlando, FL",
    tour: "Little Bit of This & Little Bit of That",
    rating: 5,
  },
  {
    quote:
      "Traveled with grandparents and two young kids. The team checked on us before the ferry, kept the boat steady, and made sure everyone had shade and snacks. That kind of care is why we recommend Bimini Tours to everyone in our condo group.",
    name: "Jennifer R.",
    location: "Fort Lauderdale, FL",
    tour: "Bimini Adventure Package",
    rating: 5,
  },
];

export function testimonialInitials(name: string): string {
  const parts = name.replace(/[.&]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? "?").toUpperCase();
}

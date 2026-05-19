export type Testimonial = {
  readonly quote: string;
  readonly name: string;
  readonly location: string;
  readonly tour: string;
  readonly rating?: number;
};

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

export function testimonialInitials(name: string): string {
  const parts = name.replace(/[.&]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? "?").toUpperCase();
}

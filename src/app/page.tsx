import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  const packages = [
    {
      slug: "real-deal",
      title: "The Real Deal Package",
      category: "Island Tour",
      imageSrc: "/images/beach.webp",
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
    },
    {
      slug: "bimini-adventure",
      title: "Bimini Adventure Package",
      category: "Adventure",
      imageSrc: "/images/img10.jpg",
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
    },
    {
      slug: "fishing-charter",
      title: "Bimini Fishing Charter Package",
      category: "Private Charter",
      imageSrc: "/images/fishing.jpg",
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
    },
    {
      slug: "eco-tour",
      title: "Bimini Eco‑Tour Package",
      category: "Eco Adventure",
      imageSrc: "/images/img7.jpg",
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
    },
    {
      slug: "family-fun",
      title: "Bimini Family Fun Package",
      category: "Family",
      imageSrc: "/images/img3.jpg",
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
    },
    {
      slug: "family-culture",
      title: "Bimini Family Fun‑Filled Culture Package",
      category: "Culture",
      imageSrc: "/images/img4.jpg",
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
    },
    {
      slug: "little-bit-of-that",
      title: "Bimini Little Bit & Little Bit of That Package",
      category: "Culture + Adventure",
      imageSrc: "/images/img2.jpg",
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
    },
    {
      slug: "two-for-one",
      title: "Two for One Island Tour",
      category: "North + South Bimini",
      imageSrc: "/images/img6.jpg",
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
    },
    {
      slug: "underwater-adventure",
      title: "Bimini Underwater Adventure Tour",
      category: "Underwater + Culture",
      imageSrc: "/images/underwater.webp",
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
    },
    {
      slug: "down-for-whateva",
      title: "Down for Whateva Tour Package",
      category: "Full Day Adventure",
      imageSrc: "/images/down.webp",
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
    },
    {
      slug: "private-tours",
      title: "Private Tours",
      category: "Private",
      imageSrc: "/images/private.png",
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
    },
  ] as const;

  const galleryImages = [
    "/images/img1.jpg",
    "/images/img23.jpg",
    "/images/img3.jpg",
    "/images/img22.webp",
    "/images/img21.webp",
    "/images/img9.jpg",
    "/images/b3.webp",
    "/images/b4.jpg",
  ] as const;

  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      {/* fixed header */}
      <SiteHeader bookNowHref="/contact" />

      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero3.jpg"
        >
          <source src="/images/hero3.mp4" type="video/mp4" />
        </video>

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-0 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center pb-28 pt-12 text-center sm:pb-32 sm:pt-16 lg:pb-40">
            <p className="text-sm font-bold tracking-wide text-white">
              Bimini, Bahamas
            </p>
            <h1 className="mt-4 text-balance font-extrabold tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl">
              Explore the Bimini Islands
            </h1>
            <p className="mt-4 text-balance text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Bimini Tours & Adventures
            </p>
            <div className="mt-6 h-px w-44 bg-white" />
            <p className="mt-5 max-w-2xl text-pretty text-base font-semibold leading-7 text-white sm:text-lg">
              Snorkeling, fishing charters, island tours,
              eco-adventures—explore, adventure, chill.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#tours"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#063a5a] hover:bg-slate-100"
              >
                View Tours
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#063a5a]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
          <svg
            viewBox="0 0 1440 120"
            className="h-24 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C160,100 320,20 480,60 C640,100 800,20 960,60 C1120,100 1280,20 1440,60 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
            <path
              d="M0,72 C180,112 360,30 540,72 C720,112 900,30 1080,72 C1260,112 1350,35 1440,72 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
          <div className="h-10 bg-white" />
        </div>
      </section>

      <section id="tours" className="bg-white text-[color:var(--brand-deep)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
              TOUR PACKAGES
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Choose your perfect Bimini day
            </h2>
            <p className="mt-4 text-pretty text-base leading-7 text-slate-700 sm:text-lg">
              You’ll add your real tour photos later—right now this is the exact
              layout/structure (image + details) like your reference.
            </p>
          </div>

          <div className="mt-16 space-y-32">
            {packages.map((pkg, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <article
                  key={pkg.slug}
                  className={`grid items-start gap-14 lg:gap-16 lg:grid-cols-12 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="lg:col-span-6">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                      <img
                        src={pkg.imageSrc}
                        alt={pkg.imageAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="mx-auto max-w-lg text-center lg:text-left">
                      <h3 className="text-balance text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary)] sm:text-3xl">
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-600">
                        Category: {pkg.category}
                      </p>

                      <p className="mt-3 text-pretty text-sm leading-6 text-slate-700">
                        {pkg.description}
                      </p>

                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                        <p className="text-sm font-extrabold text-slate-900">
                          Duration: {pkg.duration}
                        </p>
                        <div className="mt-3 space-y-1">
                          {pkg.priceLines.map((line) => (
                            <p
                              key={line}
                              className="text-sm font-semibold text-slate-800"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-extrabold tracking-wide text-slate-900">
                          Inclusions
                        </p>
                        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
                          {pkg.inclusions.map((inc) => (
                            <li key={inc} className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-accent)]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-start justify-center">
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-md bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-extrabold text-white hover:brightness-95"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white py-0">
        <div className="w-full pb-0">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
              GALLERY
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[color:var(--brand-deep)] sm:text-4xl">
              Moments from Bimini
            </h2>
            <p className="mt-4 text-pretty text-base leading-7 text-slate-700 sm:text-lg">
              You’ll replace these placeholders with your real photos later.
            </p>
          </div>

          <div className="mt-10 grid w-full grid-cols-2 gap-0 sm:grid-cols-4">
            {galleryImages.map((src, i) => (
              <div
                key={src}
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-transparent"
              >
                <img
                  src={src}
                  alt={`Bimini gallery photo ${i + 1}`}
                  className="block h-full w-full object-contain object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden -mt-px">
        <div className="absolute inset-0 -z-20 bg-[url('/images/img14.jpg')] bg-cover bg-center" />
        <div className="mx-auto flex min-h-[280px] max-w-7xl items-center px-6 py-10 sm:min-h-[320px] sm:py-12 lg:min-h-[380px] lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <h3 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Make today a Bimini day.
            </h3>
            <p className="mt-4 text-pretty text-sm leading-6 text-slate-800 sm:text-base sm:leading-7">
              Crystal‑clear water, white‑sand beaches, and unforgettable
              adventures—pick your perfect tour and let our local team handle
              the rest.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

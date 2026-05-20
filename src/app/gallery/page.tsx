import { BiminiDayCta } from "../components/BiminiDayCta";
import { GallerySection } from "../components/GallerySection";
import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta(
  "Photo Gallery",
  "Photos from Bimini Tours & Adventures—snorkeling, beaches, fishing, and island life in the Bahamas. See what your day on the water could look like.",
);

export default function GalleryPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <PageHero
        title="Gallery"
        subtitle="Turquoise water, golden sunsets, and the moments that make Bimini unforgettable."
        imageSrc="/images/about.jpg"
        imageAlt="Bimini ocean and tour boat"
        minHeightClass="min-h-[55svh] sm:min-h-[65svh] lg:min-h-[100svh]"
        showWave
      />

      <GallerySection
        variant="masonry"
        showHeading
        className="!pt-8 sm:!pt-12"
      />

      <BiminiDayCta />
    </main>
  );
}

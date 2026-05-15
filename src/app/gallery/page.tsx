import type { Metadata } from "next";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { GallerySection } from "../components/GallerySection";
import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Bimini Tours & Adventures — island beaches, snorkeling, fishing, and unforgettable moments in the Bahamas.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <PageHero
        title="Gallery"
        subtitle="Turquoise water, golden sunsets, and the moments that make Bimini unforgettable."
        imageSrc="/images/new48.jpg"
        imageAlt="Bimini ocean and tour boat"
        minHeightClass="min-h-[55svh] sm:min-h-[65svh] lg:min-h-[70svh]"
        showWave
      />

      <GallerySection variant="masonry" showHeading={false} />

      <BiminiDayCta />
    </main>
  );
}

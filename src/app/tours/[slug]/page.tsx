import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TourDetailView } from "../../components/TourDetailView";
import { SiteHeader } from "../../components/SiteHeader";
import { getTourBySlug, tourPackages } from "../../data/tour-packages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tourPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour" };
  return {
    title: `${tour.title} | Bimini Tours & Adventures`,
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <main className="min-h-[100svh] w-full bg-slate-100 text-slate-900">
      <SiteHeader bookNowHref={`/contact?package=${encodeURIComponent(tour.slug)}`} />

      <nav className="sr-only" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#tours">Tours</Link>
          </li>
          <li aria-current="page">{tour.title}</li>
        </ol>
      </nav>

      <TourDetailView tour={tour} />
    </main>
  );
}

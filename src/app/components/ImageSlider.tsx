"use client";

const tourismImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  "https://images.unsplash.com/photo-1520454974749-611b7248ffdb",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126",
];

export default function ImageSlider() {
  return (
    <section className="w-full overflow-hidden bg-white py-8">
      <div className="flex w-max animate-marquee items-center gap-4">
        {/* Repeat many times for smooth infinite loop */}
        {[...tourismImages, ...tourismImages, ...tourismImages].map(
          (image, index) => (
            <div
              key={index}
              className="h-28 w-28 shrink-0 overflow-hidden rounded-full"
            >
              <img
                src={image}
                alt={`Tourism ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ),
        )}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}

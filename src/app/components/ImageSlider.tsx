"use client";

import { motion } from "framer-motion";

const tourismImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  "https://images.unsplash.com/photo-1520454974749-611b7248ffdb",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126",
];

const loopImages = [...tourismImages, ...tourismImages, ...tourismImages];

export default function ImageSlider() {
  return (
    <section className="w-full overflow-hidden bg-white py-8">
      <motion.div
        className="flex w-max items-center gap-4"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 22,
          ease: "linear",
        }}
      >
        {loopImages.map((image, index) => (
          <motion.div
            key={index}
            className="h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={image}
              alt={`Tourism ${(index % tourismImages.length) + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

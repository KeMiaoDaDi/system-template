"use client";

import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function Gallery() {
  const images = BUSINESS_CONFIG.galleryImages.slice(0, 6);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Gallery</h2>
        <p className="text-stone-500 text-sm">A glimpse inside the studio</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl bg-stone-100 ${
              i === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""
            }`}
            style={{ aspectRatio: i === 0 ? "1 / 1.5" : "1 / 1" }}
          >
            <Image
              src={src}
              alt={`Studio photo ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function Gallery() {
  const images = BUSINESS_CONFIG.galleryImages;
  const total = images.length;

  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);

  function goTo(next: number) {
    if (next === page) return;
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setVisible(true);
    }, 200);
  }

  return (
    <section id="gallery" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Main image */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-stone-100 transition-opacity duration-200"
        style={{
          aspectRatio: "16 / 9",
          opacity: visible ? 1 : 0,
        }}
      >
        <Image
          key={page}
          src={images[page]}
          alt={`Catpro nail art ${page + 1}`}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />

        {/* Prev arrow */}
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="h-4 w-4 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo(page + 1)}
          disabled={page === total - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="h-4 w-4 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full tabular-nums">
          {page + 1} / {total}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 ${
              i === page
                ? "w-5 h-2 bg-stone-900"
                : "w-2 h-2 bg-stone-300 hover:bg-stone-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

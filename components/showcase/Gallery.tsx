"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function Gallery() {
  const images = BUSINESS_CONFIG.galleryImages;
  const total = images.length;

  // `base`  — image always visible underneath (no animation)
  // `top`   — incoming image fading in on top; null when idle
  const [base, setBase] = useState(0);
  const [top, setTop] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (next === base || transitioning) return;
      setTop(next);
      setTransitioning(true);
    },
    [base, transitioning]
  );

  // Called when the crossfade animation finishes — swap layers silently
  function handleAnimEnd() {
    if (top === null) return;
    setBase(top);
    setTop(null);
    setTransitioning(false);
  }

  const activePage = top ?? base;

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Image stage */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-stone-100"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/* Bottom layer — stays fully opaque throughout */}
        <Image
          src={images[base]}
          alt={`Catpro nail art ${base + 1}`}
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
        />

        {/* Top layer — fades in on top; removed once animation ends */}
        {top !== null && (
          <Image
            key={top}
            src={images[top]}
            alt={`Catpro nail art ${top + 1}`}
            fill
            unoptimized
            priority
            className="object-cover"
            style={{ animation: "fadeIn 0.35s ease-in-out forwards" }}
            sizes="(max-width: 768px) 100vw, 90vw"
            onAnimationEnd={handleAnimEnd}
          />
        )}

        {/* Prev arrow */}
        <button
          onClick={() => goTo(activePage - 1)}
          disabled={activePage === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="h-4 w-4 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo(activePage + 1)}
          disabled={activePage === total - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="h-4 w-4 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full tabular-nums">
          {activePage + 1} / {total}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 ${
              i === activePage
                ? "w-5 h-2 bg-stone-900"
                : "w-2 h-2 bg-stone-300 hover:bg-stone-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

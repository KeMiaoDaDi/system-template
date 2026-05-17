"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

const PER_PAGE = 4;

export function Gallery() {
  const images = BUSINESS_CONFIG.galleryImages;
  const totalPages = Math.ceil(images.length / PER_PAGE);

  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true); // controls opacity for fade

  function goTo(next: number) {
    if (next === page) return;
    // Fade out → swap → fade in
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setVisible(true);
    }, 220);
  }

  const pageImages = images.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Gallery</h2>
          <p className="text-stone-500 text-sm">Our work, captured</p>
        </div>
        {/* Page indicators */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
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
        )}
      </div>

      {/* Image grid with fade transition */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {pageImages.map((src, i) => (
          <div
            key={`${page}-${i}`}
            className="relative overflow-hidden rounded-2xl bg-stone-100"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={src}
              alt={`Catpro nail art ${page * PER_PAGE + i + 1}`}
              fill
              unoptimized
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="h-10 w-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
          >
            <svg className="h-4 w-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-stone-400 tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages - 1}
            className="h-10 w-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
          >
            <svg className="h-4 w-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

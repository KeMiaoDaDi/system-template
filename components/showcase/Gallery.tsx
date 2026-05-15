"use client";

import { useState } from "react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function Gallery() {
  const images = BUSINESS_CONFIG.galleryImages;
  const [expanded, setExpanded] = useState(false);

  // extra images beyond the first 4
  const extraCount = images.length - 4;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Gallery</h2>
        <p className="text-stone-500 text-sm">Our work, captured</p>
      </div>

      {/* ── Collapsed view: 1 tall + 3 squares ─────────────────────────── */}
      {!expanded && (
        <div className="flex gap-3 h-[480px] md:h-[540px]">
          {/* Featured tall image */}
          <div className="relative flex-[2] overflow-hidden rounded-2xl bg-stone-100 min-w-0">
            <Image
              src={images[0]}
              alt="Catpro nail art"
              fill
              unoptimized
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="40vw"
            />
          </div>

          {/* Right column: 2 squares + "see more" tile */}
          <div className="flex flex-col gap-3 flex-[1] min-w-0">
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={images[1]}
                alt="Catpro nail art 2"
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="20vw"
              />
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={images[2]}
                alt="Catpro nail art 3"
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="20vw"
              />
            </div>
            {/* "See more" tile or 4th image */}
            {extraCount > 0 ? (
              <button
                onClick={() => setExpanded(true)}
                className="relative flex-1 overflow-hidden rounded-2xl bg-stone-100 group"
              >
                <Image
                  src={images[3]}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover scale-105 blur-[2px] brightness-50"
                  sizes="20vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-white font-bold text-2xl leading-none">+{extraCount}</span>
                  <span className="text-white/80 text-xs font-medium tracking-wide">View more</span>
                </div>
              </button>
            ) : (
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-stone-100">
                <Image
                  src={images[3]}
                  alt="Catpro nail art 4"
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="20vw"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Expanded view: all images in uniform grid ───────────────────── */}
      {expanded && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-stone-100"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={src}
                  alt={`Catpro nail art ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => setExpanded(false)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              Show less
            </button>
          </div>
        </>
      )}
    </section>
  );
}

"use client";

import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function HeroSection() {
  const { name, tagline, heroImage, rating, reviewCount } = BUSINESS_CONFIG;

  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-6 pb-14 md:px-12 lg:px-20 max-w-5xl">
        {/* Rating chip */}
        <div className="mb-4 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 w-fit">
          <svg className="h-3.5 w-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white text-xs font-medium">
            {rating} · {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none mb-3">
          {name}
        </h1>
        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-md">
          {tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-stone-100 transition-colors text-sm"
          >
            Book Now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href={`tel:${BUSINESS_CONFIG.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}

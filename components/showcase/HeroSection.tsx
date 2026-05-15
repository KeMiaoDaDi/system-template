"use client";

import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function HeroSection() {
  const { name, tagline, address } = BUSINESS_CONFIG;

  return (
    <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80)`,
        }}
      />
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-stone-900/10" />

      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 px-6 py-5 md:px-12 lg:px-20 flex items-center justify-between z-10">
        <span className="text-white font-bold text-lg tracking-tight">{name}</span>
        <Link
          href="/booking"
          className="text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors"
        >
          Book Now
        </Link>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-6 pb-14 md:px-12 lg:px-20 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-3">
          {name}
        </h1>
        <p className="text-white/70 text-lg md:text-xl mb-3 max-w-md font-light">
          {tagline}
        </p>
        <p className="text-white/50 text-sm mb-8 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {address}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-stone-50 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all duration-200 text-sm"
          >
            Book Now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href={`tel:${BUSINESS_CONFIG.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
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

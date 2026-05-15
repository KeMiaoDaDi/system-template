"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/data/services";
import { formatPrice, formatDuration } from "@/lib/utils/format";

export function ServiceShowcase() {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id);
  const activeServices = SERVICES.filter(
    (s) => s.isActive && s.categoryId === activeCategory
  );

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Services</h2>
          <p className="text-stone-500 text-sm">Expert treatments tailored to you</p>
        </div>
        <Link
          href="/booking"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 border border-stone-200 px-4 py-2 rounded-xl hover:bg-stone-50 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 transition-all duration-200"
        >
          Book a service
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat.id
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category description */}
      {SERVICE_CATEGORIES.find((c) => c.id === activeCategory)?.description && (
        <p className="text-stone-500 text-sm mb-5 italic">
          {SERVICE_CATEGORIES.find((c) => c.id === activeCategory)?.description}
        </p>
      )}

      {/* Services list */}
      <div className="space-y-3">
        {activeServices.map((svc) => (
          <div
            key={svc.id}
            className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-stone-900 text-sm leading-snug">{svc.name}</h4>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed mb-2 line-clamp-2">{svc.description}</p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-stone-400 font-medium">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDuration(svc.duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-bold text-stone-900 text-sm">{formatPrice(svc.price)}</span>
              <Link
                href="/booking"
                className="text-xs font-semibold text-stone-900 border border-stone-200 px-3.5 py-1.5 rounded-lg hover:bg-stone-900 hover:text-white hover:border-stone-900 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 transition-all duration-200"
              >
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 sm:hidden pb-20">
        <Link
          href="/booking"
          className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-stone-700 transition-colors text-sm"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}

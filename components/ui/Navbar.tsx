"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

const MAIN_LINKS = [
  { label: "Gallery",     href: "/#gallery"   },
  { label: "Services",    href: "/#services"  },
  { label: "Reviews",     href: "/#reviews"   },
  { label: "Find Us",     href: "/#find-us"   },
];

const MORE_LINKS = [
  { label: "Meet the Team", href: "/#team"    },
  { label: "About Us",      href: "/#about"   },
  { label: "Opening Hours", href: "/#find-us" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    function handler() { if (window.innerWidth >= 768) setMobileOpen(false); }
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="font-bold text-stone-900 text-base tracking-tight shrink-0">
          {BUSINESS_CONFIG.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {MAIN_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-all"
            >
              {l.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-all"
            >
              More
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl border border-stone-100 shadow-lg py-1.5 z-50">
                {MORE_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                  >
                    {l.label === "Meet the Team"  && <TeamIcon />}
                    {l.label === "About Us"        && <InfoIcon />}
                    {l.label === "Opening Hours"   && <ClockIcon />}
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/booking"
          className="hidden md:inline-flex items-center gap-1.5 bg-stone-900 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-stone-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200 shrink-0"
        >
          Book Now
        </Link>

        {/* Mobile: Book Now small + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/booking"
            className="text-xs font-semibold bg-stone-900 text-white px-3.5 py-1.5 rounded-lg"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3">
          <div className="space-y-0.5">
            {MAIN_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-xl transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-stone-100 my-1.5" />
            {MORE_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-stone-500 hover:bg-stone-50 rounded-xl transition-colors"
              >
                {l.label === "Meet the Team"  && <TeamIcon />}
                {l.label === "About Us"        && <InfoIcon />}
                {l.label === "Opening Hours"   && <ClockIcon />}
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-stone-900 text-white text-sm font-semibold px-5 py-3 rounded-xl"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function TeamIcon() {
  return (
    <svg className="h-4 w-4 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-4 w-4 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

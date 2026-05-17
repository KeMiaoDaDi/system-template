"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "catpro-welcome-seen";

export function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setShowPopup(true), 900);
      return () => clearTimeout(t);
    } else {
      setShowBadge(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowPopup(false);
    setShowBadge(true);
  }

  function reopenPopup() {
    setShowPopup(true);
    setShowBadge(false);
  }

  if (!mounted) return null;

  return (
    <>
      {/* ── Welcome popup ──────────────────────────────────────────── */}
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-[fadeInUp_0.3s_ease-out]">
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Decorative top */}
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(135deg, #F5EDE4 0%, #E8C5B8 100%)" }}
            >
              ✨
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Welcome to Catpro
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mb-1">
              New client offer
            </h2>

            {/* Discount badge */}
            <div
              className="inline-block my-4 px-6 py-3 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #2C2825 0%, #4A4440 100%)" }}
            >
              <span className="text-4xl font-black text-white tracking-tight">10% OFF</span>
            </div>

            <p className="text-stone-500 text-sm mb-2">your first booking</p>
            <p className="text-xs text-stone-400 mb-6">
              Use code{" "}
              <span className="font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-lg">
                CATPRO10
              </span>{" "}
              when booking
            </p>

            <Link
              href="/booking"
              onClick={dismiss}
              className="block w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl hover:bg-stone-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200 text-sm"
            >
              Book Now →
            </Link>

            <button
              onClick={dismiss}
              className="mt-3 text-xs text-stone-400 hover:text-stone-600 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* ── Floating badge (after popup dismissed) ─────────────────── */}
      {showBadge && (
        <button
          onClick={reopenPopup}
          className="fixed bottom-24 right-4 z-40 group"
          aria-label="New client 10% off offer"
        >
          <div
            className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl shadow-lg text-white font-black text-sm leading-tight group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #2C2825 0%, #5A504A 100%)" }}
          >
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wide leading-none mb-0.5">New</span>
            <span className="text-lg font-black leading-none">10%</span>
            <span className="text-[10px] font-semibold text-white/70 leading-none mt-0.5">OFF</span>
          </div>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl ring-2 ring-stone-900/20 animate-ping" />
        </button>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { SERVICES } from "@/lib/data/services";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";
import { formatPrice, formatDuration, formatDate } from "@/lib/utils/format";
import { calculateTotalDuration } from "@/lib/utils/slots";
import { BookingDraft } from "@/lib/types";

interface Props {
  draft: BookingDraft;
}

// ── Desktop sidebar ────────────────────────────────────────────────────────────
export function BookingSummary({ draft }: Props) {
  const selectedServices = SERVICES.filter((s) => draft.selectedServiceIds.includes(s.id));
  const staff = STAFF_MEMBERS.find((s) => s.id === draft.staffId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = calculateTotalDuration(draft.selectedServiceIds);

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm sticky top-[89px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Your Booking</p>
      </div>

      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-100">
        <div className="relative h-10 w-10 rounded-xl bg-stone-100 overflow-hidden shrink-0">
          <Image src={BUSINESS_CONFIG.heroImage} alt={BUSINESS_CONFIG.name} fill unoptimized className="object-cover" sizes="40px" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-stone-900 text-sm">{BUSINESS_CONFIG.name}</p>
          <p className="text-stone-400 text-xs truncate">{BUSINESS_CONFIG.address}</p>
        </div>
      </div>

      {selectedServices.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-2">Services</p>
          <div className="space-y-1.5">
            {selectedServices.map((svc) => (
              <div key={svc.id} className="flex justify-between items-baseline gap-2">
                <p className="text-sm text-stone-700 leading-tight">{svc.name}</p>
                <p className="text-sm font-semibold text-stone-900 shrink-0">{formatPrice(svc.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-stone-100 flex justify-between">
            <span className="text-xs text-stone-400">{formatDuration(totalDuration)}</span>
            <span className="text-sm font-bold text-stone-900">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      {staff && (
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-2">Specialist</p>
          <p className="text-sm text-stone-700">{staff.name}</p>
        </div>
      )}

      {draft.date && (
        <div className="mb-2">
          <p className="text-xs font-medium text-stone-400 mb-1">Date & Time</p>
          <p className="text-sm text-stone-700">{formatDate(draft.date)}</p>
          {draft.time && <p className="text-xs text-stone-500">at {draft.time}</p>}
        </div>
      )}
    </div>
  );
}

// ── Mobile sticky bottom bar ───────────────────────────────────────────────────
export function MobileBookingSummary({ draft }: Props) {
  const [expanded, setExpanded] = useState(false);
  const selectedServices = SERVICES.filter((s) => draft.selectedServiceIds.includes(s.id));
  const staff = STAFF_MEMBERS.find((s) => s.id === draft.staffId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = calculateTotalDuration(draft.selectedServiceIds);

  if (selectedServices.length === 0) return null;

  return (
    <div className="bg-white border-t border-stone-100 shadow-lg">
      {/* Expanded panel */}
      {expanded && (
        <div className="px-4 py-4 border-b border-stone-100 space-y-2">
          {selectedServices.map((svc) => (
            <div key={svc.id} className="flex justify-between items-baseline">
              <p className="text-sm text-stone-700">{svc.name}</p>
              <p className="text-sm font-semibold text-stone-900 shrink-0 ml-4">{formatPrice(svc.price)}</p>
            </div>
          ))}
          {staff && (
            <p className="text-xs text-stone-500 pt-1 border-t border-stone-100">
              with {staff.name} · {formatDuration(totalDuration)}
            </p>
          )}
          {draft.date && draft.time && (
            <p className="text-xs text-stone-500">{formatDate(draft.date)} at {draft.time}</p>
          )}
        </div>
      )}

      {/* Collapsed bar */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-stone-700">
            {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""}
            {staff ? ` · ${staff.name}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-900">{formatPrice(totalPrice)}</span>
          <svg
            className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
}

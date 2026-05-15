/**
 * BUSINESS CONFIGURATION — Catpro Nail Salon
 *
 * This file is the single source of truth for all business-specific settings.
 * To adapt this template for a different studio, update the values below.
 */

import type { BusinessConfig, WeeklyHours, BlockedDate } from "@/lib/types";

// ─── Business Profile ─────────────────────────────────────────────────────────

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Catpro",
  tagline: "Premium nail artistry in the heart of London",
  description:
    "At Catpro, we transform every manicure into a statement of elegance and individuality. Using premium Japanese gels, BIAB, and high-fidelity techniques, our expert technicians craft flawless nails that are both durable and beautiful. From timeless French classics to bold, creative designs, each set is meticulously designed to reflect your personal style. Step into Catpro and experience nail artistry like never before – where precision meets creativity, and every detail matters.",
  address: "65 Whitechapel Road, Room 222, WorkspaceEast London Works, London, E1 1DU",
  phone: "+44 20 7946 0865",
  email: "hello@catpronails.co",
  website: "https://catpronails.co",
  rating: 5.0,
  reviewCount: 54,
  heroImage: "/gallery-5.avif",
  galleryImages: [
    "/gallery-1.avif",
    "/gallery-2.avif",
    "/gallery-3.avif",
    "/gallery-4.avif",
    "/gallery-5.avif",
    "/gallery-6.avif",
    "/gallery-7.avif",
    "/gallery-8.avif",
  ],
  amenities: [],
};

// ─── Booking Settings ─────────────────────────────────────────────────────────

export const BOOKING_CONFIG = {
  /** Minutes added after each service to prevent back-to-back bookings */
  bufferMinutes: 10,
  /** Interval between bookable time slots (minutes) */
  slotIntervalMinutes: 15,
  /** How many days in advance customers can book */
  maxAdvanceBookingDays: 60,
  /** Currency symbol for display */
  currencySymbol: "£",
};

// ─── Opening Hours ────────────────────────────────────────────────────────────

export const WEEKLY_HOURS: WeeklyHours = {
  monday:    { isOpen: true,  open: "11:00", close: "19:30" },
  tuesday:   { isOpen: true,  open: "11:00", close: "19:30" },
  wednesday: { isOpen: true,  open: "11:00", close: "19:30" },
  thursday:  { isOpen: true,  open: "11:00", close: "19:30" },
  friday:    { isOpen: true,  open: "11:00", close: "19:30" },
  saturday:  { isOpen: true,  open: "11:00", close: "19:30" },
  sunday:    { isOpen: true,  open: "12:00", close: "17:00" },
};

// ─── Blocked / Closed Dates ───────────────────────────────────────────────────

export const BLOCKED_DATES: BlockedDate[] = [
  { date: "2026-12-25", reason: "Christmas Day" },
  { date: "2026-12-26", reason: "Boxing Day" },
  { date: "2027-01-01", reason: "New Year's Day" },
];

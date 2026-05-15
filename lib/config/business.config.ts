/**
 * BUSINESS CONFIGURATION
 *
 * This file is the single source of truth for all business-specific settings.
 * To adapt this template for a different studio, update the values below.
 * No changes to components or logic should be required for basic rebranding.
 */

import type { BusinessConfig, WeeklyHours, BlockedDate } from "@/lib/types";

// ─── Business Profile ─────────────────────────────────────────────────────────

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Studio Noir",
  tagline: "Luxury nail & beauty studio",
  description:
    "An elevated studio experience where artistry meets self-care. We specialize in nail art, lash extensions, and brow design — crafted for those who appreciate the finest details.",
  address: "12 Bloom Street, Soho, London W1D 3AP",
  phone: "+44 20 7946 0321",
  email: "hello@studionoir.co",
  website: "https://studionoir.co",
  rating: 4.9,
  reviewCount: 248,
  heroImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    "https://images.unsplash.com/photo-1604655852853-1d2a9b3e2e73?w=800&q=80",
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&q=80",
    "https://images.unsplash.com/photo-1560177112-fbfd5fde9566?w=800&q=80",
    "https://images.unsplash.com/photo-1614159689047-63ed37a3c78d?w=800&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
  ],
  amenities: ["Free WiFi", "Card Payment", "Private Studio", "Premium Products", "Parking Nearby"],
};

// ─── Booking Settings ─────────────────────────────────────────────────────────

export const BOOKING_CONFIG = {
  /** Minutes added after each service to prevent back-to-back bookings */
  bufferMinutes: 10,
  /** Interval between bookable time slots (minutes) */
  slotIntervalMinutes: 30,
  /** How many days in advance customers can book */
  maxAdvanceBookingDays: 60,
  /** Currency symbol for display */
  currencySymbol: "£",
};

// ─── Opening Hours ────────────────────────────────────────────────────────────

export const WEEKLY_HOURS: WeeklyHours = {
  monday:    { isOpen: true,  open: "10:00", close: "19:00" },
  tuesday:   { isOpen: true,  open: "10:00", close: "19:00" },
  wednesday: { isOpen: true,  open: "10:00", close: "19:00" },
  thursday:  { isOpen: true,  open: "10:00", close: "20:00" },
  friday:    { isOpen: true,  open: "10:00", close: "20:00" },
  saturday:  { isOpen: true,  open: "09:00", close: "18:00" },
  sunday:    { isOpen: false, open: "10:00", close: "16:00" },
};

// ─── Blocked / Closed Dates ───────────────────────────────────────────────────

export const BLOCKED_DATES: BlockedDate[] = [
  { date: "2025-12-25", reason: "Christmas Day" },
  { date: "2025-12-26", reason: "Boxing Day" },
  { date: "2026-01-01", reason: "New Year's Day" },
];

/**
 * FORMATTING UTILITIES
 */

import { BOOKING_CONFIG } from "@/lib/config/business.config";

/** Format price with currency symbol */
export function formatPrice(price: number): string {
  return `${BOOKING_CONFIG.currencySymbol}${price.toFixed(2).replace(/\.00$/, "")}`;
}

/** Format duration in minutes to human-readable string */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/** Format a YYYY-MM-DD date string to a readable date */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Capitalise first letter of a string */
export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

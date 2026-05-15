/**
 * TIME SLOT GENERATION UTILITY
 *
 * Generates available time slots based on:
 *   - Business opening hours
 *   - Service duration + buffer
 *   - Existing bookings (blocked times)
 *   - Blocked dates
 *
 * Designed to be later replaced by a Supabase-backed availability check.
 */

import type { DayOfWeek, TimeSlot, WeeklyHours, BlockedDate } from "@/lib/types";
import { BOOKING_CONFIG, BLOCKED_DATES, WEEKLY_HOURS } from "@/lib/config/business.config";
import { getBookingsByDate } from "@/lib/data/bookings";
import { SERVICES } from "@/lib/data/services";

/** Convert "HH:MM" to minutes since midnight */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Convert minutes since midnight to "HH:MM" */
function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Get the day-of-week key from a date string (YYYY-MM-DD) */
function getDayKey(dateStr: string): DayOfWeek {
  const days: DayOfWeek[] = [
    "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",
  ];
  const d = new Date(dateStr);
  return days[d.getDay()];
}

/** Check whether a date is a blocked/closed date */
export function isDateBlocked(date: string, blockedDates: BlockedDate[] = BLOCKED_DATES): boolean {
  return blockedDates.some((b) => b.date === date);
}

/** Check whether a date is within the bookable window */
export function isDateBookable(date: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + BOOKING_CONFIG.maxAdvanceBookingDays);

  if (target < today) return false;
  if (target > maxDate) return false;
  if (isDateBlocked(date)) return false;

  const dayKey = getDayKey(date);
  return WEEKLY_HOURS[dayKey].isOpen;
}

/**
 * Generate available time slots for a given date and total service duration.
 * Slots occupied by existing bookings (+ buffer) are marked unavailable.
 */
export function generateSlots(
  date: string,
  totalDurationMinutes: number,
  weeklyHours: WeeklyHours = WEEKLY_HOURS
): TimeSlot[] {
  const dayKey = getDayKey(date);
  const dayHours = weeklyHours[dayKey];

  if (!dayHours.isOpen || isDateBlocked(date)) return [];

  const openMins  = timeToMinutes(dayHours.open);
  const closeMins = timeToMinutes(dayHours.close);
  const interval  = BOOKING_CONFIG.slotIntervalMinutes;
  const buffer    = BOOKING_CONFIG.bufferMinutes;

  const existingBookings = getBookingsByDate(date);

  // Build a set of blocked minute ranges from existing bookings
  const blockedRanges: Array<{ start: number; end: number }> = existingBookings.map((bk) => {
    const svcDuration = bk.serviceIds.reduce((acc, sid) => {
      const svc = SERVICES.find((s) => s.id === sid);
      return acc + (svc?.duration ?? 60);
    }, 0);
    const start = timeToMinutes(bk.time);
    return { start, end: start + svcDuration + buffer };
  });

  const slots: TimeSlot[] = [];
  let current = openMins;

  while (current + totalDurationMinutes <= closeMins) {
    const slotEnd = current + totalDurationMinutes;
    const overlaps = blockedRanges.some(
      (r) => current < r.end && slotEnd > r.start
    );
    slots.push({ time: minutesToTime(current), available: !overlaps });
    current += interval;
  }

  return slots;
}

/** Total duration (sum of selected service durations + buffer between services) */
export function calculateTotalDuration(serviceIds: string[]): number {
  return serviceIds.reduce((acc, sid) => {
    const svc = SERVICES.find((s) => s.id === sid);
    return acc + (svc?.duration ?? 0);
  }, 0);
}

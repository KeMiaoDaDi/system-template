/**
 * MOCK BOOKING DATA
 *
 * In production, replace with Supabase real-time queries.
 * This mock store simulates a simple in-memory booking registry.
 */

import type { Booking, BookingStatus } from "@/lib/types";

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "bk-001",
    serviceIds: ["svc-gel-mani"],
    staffId: "staff-1",
    date: "2026-05-20",
    time: "10:00",
    customerName: "Emma Wilson",
    customerEmail: "emma@example.com",
    customerPhone: "+44 7700 900001",
    notes: "Please use no-fragrance products.",
    status: "confirmed",
    createdAt: "2026-05-14T09:22:00Z",
  },
  {
    id: "bk-002",
    serviceIds: ["svc-lash-classic"],
    staffId: "staff-1",
    date: "2026-05-20",
    time: "12:00",
    customerName: "Maya Patel",
    customerEmail: "maya@example.com",
    customerPhone: "+44 7700 900002",
    status: "pending",
    createdAt: "2026-05-14T11:00:00Z",
  },
  {
    id: "bk-003",
    serviceIds: ["svc-facial-signature"],
    staffId: "staff-3",
    date: "2026-05-21",
    time: "14:00",
    customerName: "Lily Zhang",
    customerEmail: "lily@example.com",
    customerPhone: "+44 7700 900003",
    notes: "Sensitive skin — please avoid retinol.",
    status: "confirmed",
    createdAt: "2026-05-13T15:45:00Z",
  },
  {
    id: "bk-004",
    serviceIds: ["svc-brow-shape"],
    staffId: "staff-2",
    date: "2026-05-19",
    time: "11:30",
    customerName: "Ava Roberts",
    customerEmail: "ava@example.com",
    customerPhone: "+44 7700 900004",
    status: "cancelled",
    createdAt: "2026-05-12T08:10:00Z",
  },
  {
    id: "bk-005",
    serviceIds: ["svc-classic-mani", "svc-brow-shape"],
    staffId: "staff-2",
    date: "2026-05-22",
    time: "15:00",
    customerName: "Jasmine Lee",
    customerEmail: "jasmine@example.com",
    customerPhone: "+44 7700 900005",
    status: "pending",
    createdAt: "2026-05-15T07:30:00Z",
  },
];

// ─── In-memory store for new bookings created during the session ──────────────

let bookingStore: Booking[] = [...MOCK_BOOKINGS];

export function getBookings(): Booking[] {
  return bookingStore;
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const newBooking: Booking = {
    ...booking,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  bookingStore = [newBooking, ...bookingStore];
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus): boolean {
  const index = bookingStore.findIndex((b) => b.id === id);
  if (index === -1) return false;
  bookingStore[index] = { ...bookingStore[index], status };
  return true;
}

export function getBookingsByDate(date: string): Booking[] {
  return bookingStore.filter((b) => b.date === date && b.status !== "cancelled");
}

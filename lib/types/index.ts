// ─── Business ────────────────────────────────────────────────────────────────

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
}

// ─── Hours ───────────────────────────────────────────────────────────────────

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  isOpen: boolean;
  open: string;  // "09:00"
  close: string; // "18:00"
}

export type WeeklyHours = Record<DayOfWeek, DayHours>;

export interface BlockedDate {
  date: string; // YYYY-MM-DD
  reason?: string;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;    // in display currency (e.g. 35 = $35)
  currency: string;
  isActive: boolean;
  staffIds: string[];
}

// ─── Staff ───────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  serviceIds: string[];
  schedule?: WeeklyHours;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "rescheduled";

export interface Booking {
  id: string;
  serviceIds: string[];
  staffId: string;
  date: string;   // YYYY-MM-DD
  time: string;   // "09:00"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingDraft {
  selectedServiceIds: string[];
  staffId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

export type BookingStep =
  | "select-service"
  | "select-staff"
  | "select-date"
  | "select-time"
  | "customer-details"
  | "review"
  | "confirmation";

// ─── Slots ───────────────────────────────────────────────────────────────────

export interface TimeSlot {
  time: string;      // "09:00"
  available: boolean;
}

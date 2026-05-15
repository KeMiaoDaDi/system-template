/**
 * MOCK STAFF DATA
 *
 * In production, replace with Supabase queries.
 */

import type { StaffMember } from "@/lib/types";

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-1",
    name: "Aiko Tanaka",
    role: "Senior Nail Artist & Lash Specialist",
    bio: "With over 8 years in the industry, Aiko is our resident nail art specialist and master lash technician. Known for intricate hand-painted designs and flawless volume sets.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    serviceIds: ["svc-classic-mani", "svc-gel-mani", "svc-nail-art", "svc-lash-classic", "svc-lash-volume"],
  },
  {
    id: "staff-2",
    name: "Priya Sharma",
    role: "Nail Technician & Beauty Therapist",
    bio: "Priya brings precision and warmth to every appointment. Specialising in gel manicures, pedicures, and brow work, she has a loyal clientele who come back time and again.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    serviceIds: ["svc-classic-mani", "svc-gel-mani", "svc-pedicure", "svc-brow-shape", "svc-facial-express"],
  },
  {
    id: "staff-3",
    name: "Sophie Chen",
    role: "Skin & Lash Therapist",
    bio: "Sophie is passionate about skin health and natural beauty enhancement. Her expertise spans facials, brow design, and lash extensions — always with a tailored, personalised approach.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    serviceIds: ["svc-gel-mani", "svc-pedicure", "svc-lash-classic", "svc-brow-shape", "svc-facial-express", "svc-facial-signature"],
  },
];

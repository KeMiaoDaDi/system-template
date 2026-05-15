/**
 * MOCK SERVICE DATA
 *
 * In production, replace with Supabase queries.
 * Structure is intentionally generic to support any appointment-based business.
 */

import type { ServiceCategory, Service } from "@/lib/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "cat-nails",    name: "Nails",         description: "Manicure & pedicure services",       order: 1 },
  { id: "cat-lashes",   name: "Lashes & Brows", description: "Eye enhancement treatments",         order: 2 },
  { id: "cat-skin",     name: "Skin",           description: "Facials and skin care treatments",   order: 3 },
];

export const SERVICES: Service[] = [
  // ── Nails ─────────────────────────────────────────────────────────────────
  {
    id: "svc-classic-mani",
    categoryId: "cat-nails",
    name: "Classic Manicure",
    description: "File, shape, cuticle care, and nail polish of your choice.",
    duration: 45,
    price: 35,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-1", "staff-2"],
  },
  {
    id: "svc-gel-mani",
    categoryId: "cat-nails",
    name: "Gel Manicure",
    description: "Long-lasting gel polish with UV cure. Includes cuticle care and hand massage.",
    duration: 60,
    price: 55,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-1", "staff-2", "staff-3"],
  },
  {
    id: "svc-nail-art",
    categoryId: "cat-nails",
    name: "Nail Art Design",
    description: "Custom hand-painted nail art. Complexity and price vary by design.",
    duration: 90,
    price: 80,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-1"],
  },
  {
    id: "svc-pedicure",
    categoryId: "cat-nails",
    name: "Luxury Pedicure",
    description: "Exfoliation, callus removal, nail shaping, massage, and polish.",
    duration: 75,
    price: 65,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-2", "staff-3"],
  },

  // ── Lashes & Brows ────────────────────────────────────────────────────────
  {
    id: "svc-lash-classic",
    categoryId: "cat-lashes",
    name: "Classic Lash Extensions",
    description: "Natural-looking individual lash extensions for everyday wear.",
    duration: 90,
    price: 85,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-1", "staff-3"],
  },
  {
    id: "svc-lash-volume",
    categoryId: "cat-lashes",
    name: "Volume Lash Extensions",
    description: "Full, dramatic volume lashes using fan technique.",
    duration: 120,
    price: 110,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-1"],
  },
  {
    id: "svc-brow-shape",
    categoryId: "cat-lashes",
    name: "Brow Shape & Tint",
    description: "Brow shaping by threading or waxing, plus tinting for definition.",
    duration: 45,
    price: 40,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-2", "staff-3"],
  },

  // ── Skin ──────────────────────────────────────────────────────────────────
  {
    id: "svc-facial-express",
    categoryId: "cat-skin",
    name: "Express Facial",
    description: "Quick, targeted facial for a refresh and glow on-the-go.",
    duration: 30,
    price: 45,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-2", "staff-3"],
  },
  {
    id: "svc-facial-signature",
    categoryId: "cat-skin",
    name: "Signature Facial",
    description: "Full cleanse, exfoliation, extraction, mask, and moisture treatment.",
    duration: 75,
    price: 95,
    currency: "GBP",
    isActive: true,
    staffIds: ["staff-3"],
  },
];

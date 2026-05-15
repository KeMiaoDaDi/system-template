# Studio Booking Template

A reusable, production-ready booking system template for appointment-based businesses — nail salons, beauty studios, lash bars, tattoo studios, workshops, and more.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- **Business Showcase Page** — hero, gallery, services, hours, contact
- **7-Step Booking Flow** — service → staff → date → time → details → review → confirmation
- **Live Booking Summary** — updates in real time as customer selects
- **Dynamic Time Slots** — generated from hours, duration, and existing bookings
- **Admin Dashboard** — view, confirm, and cancel bookings
- **Service Manager** — add, edit, hide services and update pricing
- **Hours Editor** — set weekly opening hours per day

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data (current) | In-memory mock data |
| Data (future) | Supabase |
| Payments (future) | Stripe |
| Email (future) | Resend |

---

## Project Structure

```
├── app/
│   ├── page.tsx                  # Business showcase
│   ├── booking/page.tsx          # 7-step booking flow
│   └── admin/
│       ├── page.tsx              # Bookings dashboard
│       ├── services/page.tsx     # Service editor
│       └── hours/page.tsx        # Hours editor
├── components/
│   ├── showcase/                 # Public-facing UI
│   ├── booking/                  # Booking flow & steps
│   ├── admin/                    # Admin UI
│   └── ui/                       # Shared UI primitives
├── lib/
│   ├── config/business.config.ts # ← Change this to rebrand
│   ├── data/                     # Mock data (replace with Supabase)
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Slot generation, formatting
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourorg/studio-booking-template.git
cd studio-booking-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in any required values (Supabase, Stripe, Resend are optional for local development).

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Customising for a New Business

All business-specific configuration lives in one file:

```
lib/config/business.config.ts
```

Update `BUSINESS_CONFIG` with:
- Business name, tagline, description
- Address, phone, email
- Hero image and gallery images
- Amenities/tags
- Opening hours (`WEEKLY_HOURS`)
- Blocked dates (`BLOCKED_DATES`)
- Currency and booking buffer settings (`BOOKING_CONFIG`)

No component changes are needed for basic rebranding.

---

## Deploying to Vercel

```bash
npm run build   # verify build passes
npm run lint    # verify linting passes
```

Then connect the repository to Vercel. Set environment variables in the Vercel dashboard.

---

## Future Backend Integration (Supabase)

1. Create Supabase project and run the schema migrations (coming soon)
2. Add Supabase credentials to `.env.local`
3. Replace functions in `lib/data/*.ts` with Supabase client queries
4. Replace `lib/utils/slots.ts` availability logic with a server-side Supabase function

---

## Environment Variables

See `.env.example` for all required variables.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Future | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Future | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Future | Supabase admin key (server only) |
| `STRIPE_SECRET_KEY` | Future | Stripe payment processing |
| `RESEND_API_KEY` | Future | Transactional email |

---

## Licence

MIT — free to use and adapt for client projects.

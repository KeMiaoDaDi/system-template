# Project Requirements

See `template.md` for the full requirements specification.

## Quick Summary

This is a **reusable studio booking system template** built with Next.js, TypeScript, and Tailwind CSS.

### MVP Modules

| Module | Status |
|---|---|
| Business Showcase Page | ✅ |
| Service List System | ✅ |
| 7-Step Booking Flow | ✅ |
| Time Slot Generation | ✅ |
| Customer Booking Submission | ✅ (mock) |
| Admin Booking Dashboard | ✅ |
| Editable Services & Pricing | ✅ |
| Editable Opening Hours | ✅ |
| Email Confirmation System | 🔲 (architecture ready, Resend integration pending) |
| Deployment & Documentation | ✅ |

### Future Integration Points

- **Supabase**: Replace mock data in `lib/data/` with Supabase client queries
- **Stripe**: Add payment step after review in booking flow
- **Resend**: Trigger email on booking confirmation via API route

/**
 * MOCK REVIEWS DATA — Catpro Nail Salon
 *
 * In production, replace with Supabase queries.
 */

export interface Review {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Sophia T",
    initials: "ST",
    avatarColor: "#D4A5A5",
    rating: 5,
    date: "12 May 2026",
    text: "Genuinely the best nail salon I've ever been to. The BIAB lasted nearly 5 weeks without lifting and my nails felt so healthy underneath. Already booked my next appointment!",
  },
  {
    id: "rev-2",
    name: "Aisha K",
    initials: "AK",
    avatarColor: "#A5C4D4",
    rating: 5,
    date: "4 May 2026",
    text: "The studio is calm, clean and so beautifully put together. Crystal took real time to understand exactly what I wanted. My gel extensions are absolutely perfect.",
  },
  {
    id: "rev-3",
    name: "Hannah L",
    initials: "HL",
    avatarColor: "#B5A5D4",
    rating: 5,
    date: "28 Apr 2026",
    text: "I came in for a simple manicure and left completely obsessed. The attention to detail here is unlike anywhere else in London. The finish was so clean and precise.",
  },
  {
    id: "rev-4",
    name: "Mia W",
    initials: "MW",
    avatarColor: "#D4BBA5",
    rating: 5,
    date: "20 Apr 2026",
    text: "Booked online super easily and the whole experience was seamless. The team are incredibly warm and professional. My ombré set turned out exactly as I pictured.",
  },
  {
    id: "rev-5",
    name: "Isabelle F",
    initials: "IF",
    avatarColor: "#A5D4B5",
    rating: 5,
    date: "11 Apr 2026",
    text: "I've been coming to Catpro for over a year and every single visit is consistently excellent. The quality never drops. Truly a gem.",
  },
  {
    id: "rev-6",
    name: "Chloe R",
    initials: "CR",
    avatarColor: "#D4A5C4",
    rating: 5,
    date: "3 Apr 2026",
    text: "Mei did my infill and it looks brand new. Such a skilled technician — you can tell she genuinely cares about the result. Love this place.",
  },
  {
    id: "rev-7",
    name: "Priya S",
    initials: "PS",
    avatarColor: "#C4D4A5",
    rating: 5,
    date: "22 Mar 2026",
    text: "The booking flow is so smooth, the space is lovely, and the results speak for themselves. My cat eye gel lasted almost 4 weeks. Highly recommend.",
  },
  {
    id: "rev-8",
    name: "Natalie B",
    initials: "NB",
    avatarColor: "#A5B5D4",
    rating: 5,
    date: "14 Mar 2026",
    text: "Came for my first BIAB and I'm completely converted. They were so thorough in explaining the process and the end result is beautiful. Won't go anywhere else now.",
  },
  {
    id: "rev-9",
    name: "Zara O",
    initials: "ZO",
    avatarColor: "#D4C4A5",
    rating: 5,
    date: "5 Mar 2026",
    text: "The chrome finish Jade did for me was stunning. Got so many compliments. The whole experience felt very premium without feeling intimidating.",
  },
];

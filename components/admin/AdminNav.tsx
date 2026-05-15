"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Bookings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    href: "/admin/hours",
    label: "Hours",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-stone-100 min-h-screen flex flex-col py-6 px-4">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-0.5">Dashboard</p>
        <p className="font-bold text-stone-900 text-sm">{BUSINESS_CONFIG.name}</p>
      </div>

      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors mt-4"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        View site
      </Link>
    </aside>
  );
}

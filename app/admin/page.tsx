"use client";

import { useState } from "react";
import { getBookings, updateBookingStatus } from "@/lib/data/bookings";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { BookingStatus, Booking } from "@/lib/types";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());

  function handleStatusChange(id: string, status: BookingStatus) {
    updateBookingStatus(id, status);
    setBookings(getBookings());
  }

  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending   = bookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Bookings</h1>
        <p className="text-stone-400 text-sm">Manage and track all appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total" value={bookings.length} color="stone" />
        <StatCard label="Confirmed" value={confirmed} color="emerald" />
        <StatCard label="Pending" value={pending} color="amber" />
      </div>

      <BookingsTable bookings={bookings} onStatusChange={handleStatusChange} />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: "stone" | "emerald" | "amber" }) {
  const colorCls = {
    stone:   "bg-stone-50 text-stone-900",
    emerald: "bg-emerald-50 text-emerald-700",
    amber:   "bg-amber-50 text-amber-700",
  }[color];

  return (
    <div className={`rounded-2xl p-4 ${colorCls}`}>
      <p className="text-xs font-medium opacity-60 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

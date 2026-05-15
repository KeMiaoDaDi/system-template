"use client";

import { useState } from "react";
import { Booking, BookingStatus } from "@/lib/types";
import { SERVICES } from "@/lib/data/services";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const STATUS_VARIANT: Record<BookingStatus, "success" | "warning" | "danger" | "neutral"> = {
  confirmed:   "success",
  pending:     "warning",
  cancelled:   "danger",
  rescheduled: "neutral",
};

interface Props {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
}

export function BookingsTable({ bookings, onStatusChange }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      search === "" ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or ID…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 text-stone-700"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Services</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide hidden sm:table-cell">Specialist</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide hidden md:table-cell">Date & Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-stone-400 text-sm">
                  No bookings found
                </td>
              </tr>
            ) : (
              filtered.map((bk) => {
                const services = SERVICES.filter((s) => bk.serviceIds.includes(s.id));
                const staff = STAFF_MEMBERS.find((s) => s.id === bk.staffId);
                const total = services.reduce((sum, s) => sum + s.price, 0);

                return (
                  <tr key={bk.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900">{bk.customerName}</p>
                      <p className="text-xs text-stone-400">{bk.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-stone-700">{services.map((s) => s.name).join(", ")}</p>
                      <p className="text-xs text-stone-400 font-medium">{formatPrice(total)}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-stone-700">{staff?.name ?? "—"}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-stone-700">{formatDate(bk.date)}</p>
                      <p className="text-xs text-stone-400">at {bk.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[bk.status]}>
                        {bk.status.charAt(0).toUpperCase() + bk.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {bk.status === "pending" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onStatusChange(bk.id, "confirmed")}
                          >
                            Confirm
                          </Button>
                        )}
                        {bk.status !== "cancelled" && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => onStatusChange(bk.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-stone-400">{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}

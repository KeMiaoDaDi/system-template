import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { BookingDraft } from "@/lib/types";

interface Props {
  draft: BookingDraft;
  bookingId: string;
}

export function StepConfirmation({ draft, bookingId }: Props) {
  const selectedServices = SERVICES.filter((s) => draft.selectedServiceIds.includes(s.id));
  const staff = STAFF_MEMBERS.find((s) => s.id === draft.staffId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="text-center py-4">
      {/* Success icon */}
      <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-stone-900 mb-2">Booking Requested!</h2>
      <p className="text-stone-500 text-sm mb-1">
        Thanks, <span className="font-medium text-stone-700">{draft.customerName}</span>. Your booking has been received.
      </p>
      <p className="text-stone-400 text-xs mb-8">
        We&apos;ll confirm your appointment via email at <span className="text-stone-600">{draft.customerEmail}</span>
      </p>

      {/* Booking summary card */}
      <div className="text-left bg-stone-50 rounded-2xl p-5 mb-6 border border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Booking Summary</p>
          <p className="text-xs text-stone-400 font-mono">#{bookingId}</p>
        </div>

        <div className="space-y-2">
          <SummaryRow label="Services" value={selectedServices.map((s) => s.name).join(", ")} />
          <SummaryRow label="Specialist" value={staff?.name ?? "Any available"} />
          <SummaryRow label="Date" value={formatDate(draft.date)} />
          <SummaryRow label="Time" value={draft.time} />
          <SummaryRow label="Total" value={formatPrice(totalPrice)} bold />
        </div>
      </div>

      <p className="text-stone-500 text-sm mb-6">
        Questions? Contact us at{" "}
        <a href={`mailto:${BUSINESS_CONFIG.email}`} className="underline text-stone-700">
          {BUSINESS_CONFIG.email}
        </a>
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 border border-stone-200 px-6 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to {BUSINESS_CONFIG.name}
      </Link>
    </div>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <p className="text-xs text-stone-400 shrink-0">{label}</p>
      <p className={`text-sm text-right ${bold ? "font-bold text-stone-900" : "text-stone-700"}`}>{value}</p>
    </div>
  );
}

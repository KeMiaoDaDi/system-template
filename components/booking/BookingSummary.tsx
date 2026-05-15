import Image from "next/image";
import { SERVICES } from "@/lib/data/services";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";
import { formatPrice, formatDuration, formatDate } from "@/lib/utils/format";
import { calculateTotalDuration } from "@/lib/utils/slots";
import { BookingDraft } from "@/lib/types";

interface Props {
  draft: BookingDraft;
}

export function BookingSummary({ draft }: Props) {
  const selectedServices = SERVICES.filter((s) => draft.selectedServiceIds.includes(s.id));
  const staff = STAFF_MEMBERS.find((s) => s.id === draft.staffId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = calculateTotalDuration(draft.selectedServiceIds);

  const hasAnything =
    selectedServices.length > 0 || draft.staffId || draft.date || draft.time;

  return (
    <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-1 rounded-full bg-emerald-500" />
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Your Booking</p>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative h-10 w-10 rounded-xl bg-stone-200 overflow-hidden shrink-0">
          <Image
            src={BUSINESS_CONFIG.heroImage}
            alt={BUSINESS_CONFIG.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-semibold text-stone-900 text-sm">{BUSINESS_CONFIG.name}</p>
          <p className="text-stone-400 text-xs">{BUSINESS_CONFIG.address}</p>
        </div>
      </div>

      {!hasAnything && (
        <p className="text-stone-400 text-xs">Your selection will appear here.</p>
      )}

      {selectedServices.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-2">Services</p>
          <div className="space-y-1.5">
            {selectedServices.map((svc) => (
              <div key={svc.id} className="flex justify-between items-baseline gap-2">
                <p className="text-sm text-stone-700 leading-tight">{svc.name}</p>
                <p className="text-sm font-semibold text-stone-900 shrink-0">{formatPrice(svc.price)}</p>
              </div>
            ))}
          </div>
          {selectedServices.length > 0 && (
            <div className="mt-2 pt-2 border-t border-stone-200 flex justify-between">
              <span className="text-xs text-stone-400">{formatDuration(totalDuration)}</span>
              <span className="text-sm font-bold text-stone-900">{formatPrice(totalPrice)}</span>
            </div>
          )}
        </div>
      )}

      {staff && (
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-2">Specialist</p>
          <div className="flex items-center gap-2">
            <Image src={staff.avatar} alt={staff.name} width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
            <p className="text-sm text-stone-700">{staff.name}</p>
          </div>
        </div>
      )}

      {draft.date && (
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-1">Date & Time</p>
          <p className="text-sm text-stone-700">{formatDate(draft.date)}</p>
          {draft.time && <p className="text-xs text-stone-500">at {draft.time}</p>}
        </div>
      )}

      {draft.customerName && (
        <div className="pt-3 border-t border-stone-200">
          <p className="text-xs text-stone-400">{draft.customerName}</p>
          {draft.customerEmail && <p className="text-xs text-stone-400">{draft.customerEmail}</p>}
        </div>
      )}
    </div>
  );
}

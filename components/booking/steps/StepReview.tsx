"use client";

import Image from "next/image";
import { SERVICES } from "@/lib/data/services";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { formatPrice, formatDuration, formatDate } from "@/lib/utils/format";
import { calculateTotalDuration } from "@/lib/utils/slots";
import { Button } from "@/components/ui/Button";
import { BookingDraft } from "@/lib/types";

interface Props {
  draft: BookingDraft;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepReview({ draft, onConfirm, onBack, isSubmitting }: Props) {
  const selectedServices = SERVICES.filter((s) => draft.selectedServiceIds.includes(s.id));
  const staff = STAFF_MEMBERS.find((s) => s.id === draft.staffId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = calculateTotalDuration(draft.selectedServiceIds);

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Review your booking</h2>
      <p className="text-stone-500 text-sm mb-6">Everything looks right? Confirm below.</p>

      <div className="space-y-4">
        {/* Services */}
        <ReviewCard title="Services">
          <div className="space-y-2">
            {selectedServices.map((svc) => (
              <div key={svc.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-800">{svc.name}</p>
                  <p className="text-xs text-stone-400">{formatDuration(svc.duration)}</p>
                </div>
                <p className="text-sm font-semibold text-stone-900">{formatPrice(svc.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between">
            <span className="text-sm text-stone-500">Total ({formatDuration(totalDuration)})</span>
            <span className="text-sm font-bold text-stone-900">{formatPrice(totalPrice)}</span>
          </div>
        </ReviewCard>

        {/* Specialist */}
        <ReviewCard title="Specialist">
          {staff ? (
            <div className="flex items-center gap-3">
              <Image src={staff.avatar} alt={staff.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-stone-800">{staff.name}</p>
                <p className="text-xs text-stone-400">{staff.role}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-stone-500">Any available specialist</p>
          )}
        </ReviewCard>

        {/* Date & Time */}
        <ReviewCard title="Date & Time">
          <p className="text-sm font-medium text-stone-800">{formatDate(draft.date)}</p>
          <p className="text-xs text-stone-400 mt-0.5">at {draft.time}</p>
        </ReviewCard>

        {/* Customer */}
        <ReviewCard title="Your Details">
          <p className="text-sm font-medium text-stone-800">{draft.customerName}</p>
          <p className="text-xs text-stone-500 mt-0.5">{draft.customerEmail}</p>
          <p className="text-xs text-stone-500">{draft.customerPhone}</p>
          {draft.notes && <p className="text-xs text-stone-400 mt-1 italic">&ldquo;{draft.notes}&rdquo;</p>}
        </ReviewCard>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">Back</Button>
        <Button onClick={onConfirm} size="lg" className="flex-1" isLoading={isSubmitting}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

function ReviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl border border-stone-100 bg-white">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">{title}</p>
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingDraft, BookingStep } from "@/lib/types";
import { addBooking } from "@/lib/data/bookings";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { MobileBookingSummary } from "@/components/booking/BookingSummary";
import { StepSelectService } from "@/components/booking/steps/StepSelectService";
import { StepSelectStaff } from "@/components/booking/steps/StepSelectStaff";
import { StepSelectDate } from "@/components/booking/steps/StepSelectDate";
import { StepSelectTime } from "@/components/booking/steps/StepSelectTime";
import { StepCustomerDetails } from "@/components/booking/steps/StepCustomerDetails";
import { StepReview } from "@/components/booking/steps/StepReview";
import { StepConfirmation } from "@/components/booking/steps/StepConfirmation";

const STEPS: { id: BookingStep; label: string }[] = [
  { id: "select-service",   label: "Service" },
  { id: "select-staff",     label: "Staff"   },
  { id: "select-date",      label: "Date"    },
  { id: "select-time",      label: "Time"    },
  { id: "customer-details", label: "Details" },
  { id: "review",           label: "Review"  },
  { id: "confirmation",     label: "Done"    },
];

const INITIAL_DRAFT: BookingDraft = {
  selectedServiceIds: [],
  staffId: "",
  date: "",
  time: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  notes: "",
};

export function BookingFlow() {
  const [step, setStep] = useState<BookingStep>("select-service");
  const [draft, setDraft] = useState<BookingDraft>(INITIAL_DRAFT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");

  function updateDraft<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function goTo(next: BookingStep) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleConfirm() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const booking = addBooking({
      serviceIds: draft.selectedServiceIds,
      staffId: draft.staffId || "any",
      date: draft.date,
      time: draft.time,
      customerName: draft.customerName,
      customerEmail: draft.customerEmail,
      customerPhone: draft.customerPhone,
      notes: draft.notes,
      status: "pending",
    });
    setBookingId(booking.id);
    setIsSubmitting(false);
    goTo("confirmation");
  }

  const isConfirmation = step === "confirmation";
  const showSummary = !isConfirmation && step !== "select-service";
  const displaySteps = STEPS.filter((s) => s.id !== "confirmation");

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Step indicator + cancel */}
      {!isConfirmation && (
        <div className="bg-white border-b border-stone-100 py-3 px-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="flex-1">
              <StepIndicator steps={displaySteps} currentStep={step} />
            </div>
            <Link
              href="/"
              className="shrink-0 text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-32 sm:pb-10">
        <div className={`grid gap-6 ${showSummary ? "lg:grid-cols-[1fr_300px]" : "max-w-lg mx-auto w-full"}`}>
          {/* Step content */}
          <div className="min-w-0">
            {step === "select-service" && (
              <StepSelectService
                selectedIds={draft.selectedServiceIds}
                onChange={(ids) => updateDraft("selectedServiceIds", ids)}
                onNext={() => goTo("select-staff")}
              />
            )}
            {step === "select-staff" && (
              <StepSelectStaff
                selectedServiceIds={draft.selectedServiceIds}
                staffId={draft.staffId}
                onChange={(id) => updateDraft("staffId", id)}
                onNext={() => goTo("select-date")}
                onBack={() => goTo("select-service")}
              />
            )}
            {step === "select-date" && (
              <StepSelectDate
                date={draft.date}
                onChange={(d) => { updateDraft("date", d); updateDraft("time", ""); }}
                onNext={() => goTo("select-time")}
                onBack={() => goTo("select-staff")}
              />
            )}
            {step === "select-time" && (
              <StepSelectTime
                selectedServiceIds={draft.selectedServiceIds}
                date={draft.date}
                time={draft.time}
                onChange={(t) => updateDraft("time", t)}
                onNext={() => goTo("customer-details")}
                onBack={() => goTo("select-date")}
              />
            )}
            {step === "customer-details" && (
              <StepCustomerDetails
                customerName={draft.customerName}
                customerEmail={draft.customerEmail}
                customerPhone={draft.customerPhone}
                notes={draft.notes}
                onChange={(field, val) => updateDraft(field, val)}
                onNext={() => goTo("review")}
                onBack={() => goTo("select-time")}
              />
            )}
            {step === "review" && (
              <StepReview
                draft={draft}
                onConfirm={handleConfirm}
                onBack={() => goTo("customer-details")}
                isSubmitting={isSubmitting}
              />
            )}
            {step === "confirmation" && (
              <StepConfirmation draft={draft} bookingId={bookingId} />
            )}
          </div>

          {/* Desktop sidebar summary */}
          {showSummary && (
            <aside className="hidden lg:block">
              <BookingSummary draft={draft} />
            </aside>
          )}
        </div>
      </main>

      {/* Mobile sticky summary bar (shown after service selected) */}
      {showSummary && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
          <MobileBookingSummary draft={draft} />
        </div>
      )}
    </div>
  );
}

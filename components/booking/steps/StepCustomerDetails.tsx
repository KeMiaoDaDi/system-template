"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface CustomerDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

interface Props extends CustomerDetails {
  onChange: (field: keyof CustomerDetails, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function validate(name: string, email: string, phone: string) {
  return {
    name:  name.trim().length < 2      ? "Please enter your full name"          : "",
    email: !/\S+@\S+\.\S+/.test(email) ? "Please enter a valid email address"   : "",
    phone: phone.trim().length < 7     ? "Please enter a valid phone number"    : "",
  };
}

export function StepCustomerDetails({ customerName, customerEmail, customerPhone, notes, onChange, onNext, onBack }: Props) {
  // Only show errors after the field has been touched (blurred)
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  const errors = validate(customerName, customerEmail, customerPhone);
  const isValid = !errors.name && !errors.email && !errors.phone;

  function touch(field: keyof typeof touched) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleNext() {
    // Mark all touched so errors show if user tries to skip ahead
    setTouched({ name: true, email: true, phone: true });
    if (isValid) onNext();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Your details</h2>
      <p className="text-stone-500 text-sm mb-6">We&apos;ll use this to confirm your booking</p>

      <div className="space-y-4">
        {/* Full Name */}
        <Field label="Full Name" required error={touched.name ? errors.name : ""}>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onChange("customerName", e.target.value)}
            onBlur={() => touch("name")}
            placeholder="Jane Doe"
            className={cn(inputCls, touched.name && errors.name && errorBorder)}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required error={touched.email ? errors.email : ""}>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => onChange("customerEmail", e.target.value)}
            onBlur={() => touch("email")}
            placeholder="jane@example.com"
            className={cn(inputCls, touched.email && errors.email && errorBorder)}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" required error={touched.phone ? errors.phone : ""}>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => onChange("customerPhone", e.target.value)}
            onBlur={() => touch("phone")}
            placeholder="+44 7700 900000"
            className={cn(inputCls, touched.phone && errors.phone && errorBorder)}
          />
        </Field>

        {/* Notes */}
        <Field label="Notes (optional)">
          <textarea
            value={notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Allergies, preferences, or anything we should know…"
            rows={3}
            className={cn(inputCls, "resize-none")}
          />
        </Field>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">Back</Button>
        <button
          onClick={handleNext}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 px-6 py-3 text-base",
            isValid
              ? "bg-stone-900 text-white hover:bg-stone-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
          )}
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition-colors";

const errorBorder = "border-red-300 focus:border-red-400 focus:ring-red-200";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

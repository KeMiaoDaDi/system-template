"use client";

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

export function StepCustomerDetails({ customerName, customerEmail, customerPhone, notes, onChange, onNext, onBack }: Props) {
  const isValid = customerName.trim().length >= 2 && /\S+@\S+\.\S+/.test(customerEmail) && customerPhone.trim().length >= 7;

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Your details</h2>
      <p className="text-stone-500 text-sm mb-6">We&apos;ll use this to confirm your booking</p>

      <div className="space-y-4">
        <Field label="Full Name" required>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onChange("customerName", e.target.value)}
            placeholder="Jane Doe"
            className={inputCls}
          />
        </Field>

        <Field label="Email Address" required>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => onChange("customerEmail", e.target.value)}
            placeholder="jane@example.com"
            className={inputCls}
          />
        </Field>

        <Field label="Phone Number" required>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => onChange("customerPhone", e.target.value)}
            placeholder="+44 7700 900000"
            className={inputCls}
          />
        </Field>

        <Field label="Notes (optional)">
          <textarea
            value={notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Allergies, preferences, or anything we should know&hellip;"
            rows={3}
            className={cn(inputCls, "resize-none")}
          />
        </Field>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">Back</Button>
        <Button onClick={onNext} disabled={!isValid} size="lg" className="flex-1">Review Booking</Button>
      </div>
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition-colors";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

"use client";

import Image from "next/image";
import { STAFF_MEMBERS } from "@/lib/data/staff";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface Props {
  selectedServiceIds: string[];
  staffId: string;
  onChange: (staffId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepSelectStaff({ selectedServiceIds, staffId, onChange, onNext, onBack }: Props) {
  // Filter staff who can perform ALL selected services
  const eligibleStaff = STAFF_MEMBERS.filter((s) =>
    selectedServiceIds.every((sid) => s.serviceIds.includes(sid))
  );

  // If no staff can do all services, show all staff
  const displayStaff = eligibleStaff.length > 0 ? eligibleStaff : STAFF_MEMBERS;

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Choose your specialist</h2>
      <p className="text-stone-500 text-sm mb-6">Select who you&apos;d like to work with</p>

      <div className="space-y-3">
        {/* Any available option */}
        <button
          onClick={() => onChange("any")}
          className={cn(
            "w-full text-left p-4 rounded-2xl border transition-all duration-150",
            staffId === "any"
              ? "border-stone-900 bg-stone-50"
              : "border-stone-100 hover:border-stone-200 bg-white"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center text-lg bg-stone-100 shrink-0",
              )}
            >
              ✨
            </div>
            <div>
              <p className="font-semibold text-stone-900 text-sm">Any Available Specialist</p>
              <p className="text-stone-500 text-xs mt-0.5">Best available time for your services</p>
            </div>
            {staffId === "any" && (
              <div className="ml-auto h-5 w-5 rounded-full bg-stone-900 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </button>

        {displayStaff.map((member) => {
          const selected = staffId === member.id;
          return (
            <button
              key={member.id}
              onClick={() => onChange(member.id)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all duration-150",
                selected
                  ? "border-stone-900 bg-stone-50"
                  : "border-stone-100 hover:border-stone-200 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm">{member.name}</p>
                  <p className="text-stone-500 text-xs mt-0.5 truncate">{member.role}</p>
                </div>
                {selected && (
                  <div className="ml-auto h-5 w-5 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={!staffId} size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}

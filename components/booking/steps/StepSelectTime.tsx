"use client";

import { useMemo } from "react";
import { generateSlots, calculateTotalDuration } from "@/lib/utils/slots";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { TimeSlot } from "@/lib/types";

interface Props {
  selectedServiceIds: string[];
  date: string;
  time: string;
  onChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function SlotGroup({
  label,
  items,
  selectedTime,
  onSelect,
}: {
  label: string;
  items: TimeSlot[];
  selectedTime: string;
  onSelect: (t: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">{label}</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {items.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            className={cn(
              "py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-150 text-center",
              selectedTime === slot.time && "bg-stone-900 text-white",
              selectedTime !== slot.time && slot.available && "bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-100",
              !slot.available && "bg-stone-50 text-stone-300 cursor-not-allowed line-through"
            )}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StepSelectTime({ selectedServiceIds, date, time, onChange, onNext, onBack }: Props) {
  const totalDuration = useMemo(
    () => calculateTotalDuration(selectedServiceIds),
    [selectedServiceIds]
  );

  const slots = useMemo(
    () => generateSlots(date, totalDuration),
    [date, totalDuration]
  );

  const morningSlots   = slots.filter((s) => parseInt(s.time.split(":")[0]) < 12);
  const afternoonSlots = slots.filter((s) => {
    const h = parseInt(s.time.split(":")[0]);
    return h >= 12 && h < 17;
  });
  const eveningSlots   = slots.filter((s) => parseInt(s.time.split(":")[0]) >= 17);

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Select a time</h2>
      <p className="text-stone-500 text-sm mb-6">
        Available slots for{" "}
        {new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      {slots.length === 0 ? (
        <div className="py-12 text-center text-stone-400">
          <p className="text-sm">No available slots for this date.</p>
          <p className="text-xs mt-1">Please choose a different date.</p>
        </div>
      ) : (
        <>
          <SlotGroup label="Morning"   items={morningSlots}   selectedTime={time} onSelect={onChange} />
          <SlotGroup label="Afternoon" items={afternoonSlots} selectedTime={time} onSelect={onChange} />
          <SlotGroup label="Evening"   items={eveningSlots}   selectedTime={time} onSelect={onChange} />
        </>
      )}

      <div className="mt-4 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">Back</Button>
        <Button onClick={onNext} disabled={!time} size="lg" className="flex-1">Continue</Button>
      </div>
    </div>
  );
}

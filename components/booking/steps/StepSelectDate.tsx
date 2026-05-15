"use client";

import { useState } from "react";
import { isDateBookable } from "@/lib/utils/slots";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface Props {
  date: string;
  onChange: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function StepSelectDate({ date, onChange, onNext, onBack }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function formatDateStr(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Pick a date</h2>
      <p className="text-stone-500 text-sm mb-6">Available dates are shown below</p>

      <div className="bg-white border border-stone-100 rounded-2xl p-4 sm:p-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg className="h-4 w-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-stone-900 text-sm">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg className="h-4 w-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs text-stone-400 font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;

            const dateStr = formatDateStr(viewYear, viewMonth, day);
            const bookable = isDateBookable(dateStr);
            const selected = dateStr === date;

            return (
              <button
                key={day}
                onClick={() => bookable && onChange(dateStr)}
                disabled={!bookable}
                className={cn(
                  "aspect-square rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center",
                  selected && "bg-stone-900 text-white",
                  !selected && bookable && "hover:bg-stone-100 text-stone-800",
                  !bookable && "text-stone-300 cursor-not-allowed"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {date && (
        <p className="mt-3 text-sm text-stone-600 font-medium text-center">
          Selected:{" "}
          {new Date(date).toLocaleDateString("en-GB", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={onBack} size="lg" className="flex-1">Back</Button>
        <Button onClick={onNext} disabled={!date} size="lg" className="flex-1">Continue</Button>
      </div>
    </div>
  );
}

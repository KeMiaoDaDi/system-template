"use client";

import { useState } from "react";
import { WeeklyHours, DayOfWeek } from "@/lib/types";
import { capitalise } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

const DAY_ORDER: DayOfWeek[] = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

interface Props {
  hours: WeeklyHours;
  onSave: (hours: WeeklyHours) => void;
}

export function HoursEditor({ hours: initialHours, onSave }: Props) {
  const [hours, setHours] = useState<WeeklyHours>(initialHours);
  const [saved, setSaved] = useState(false);

  function update(day: DayOfWeek, field: "isOpen" | "open" | "close", value: string | boolean) {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
    setSaved(false);
  }

  function handleSave() {
    onSave(hours);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-stone-900">Opening Hours</h2>
          <p className="text-stone-400 text-sm">Set your weekly schedule</p>
        </div>
        <Button onClick={handleSave} size="sm">
          {saved ? (
            <>
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Day</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Open</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Opening Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide">Closing Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {DAY_ORDER.map((day) => {
              const dayHours = hours[day];
              return (
                <tr key={day} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-stone-800">{capitalise(day)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => update(day, "isOpen", !dayHours.isOpen)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        dayHours.isOpen ? "bg-stone-900" : "bg-stone-200"
                      }`}
                      role="switch"
                      aria-checked={dayHours.isOpen}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                          dayHours.isOpen ? "translate-x-4.5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="time"
                      value={dayHours.open}
                      disabled={!dayHours.isOpen}
                      onChange={(e) => update(day, "open", e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="time"
                      value={dayHours.close}
                      disabled={!dayHours.isOpen}
                      onChange={(e) => update(day, "close", e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-stone-400">
        Changes are saved in the session. In production, these will persist via Supabase.
      </p>
    </div>
  );
}

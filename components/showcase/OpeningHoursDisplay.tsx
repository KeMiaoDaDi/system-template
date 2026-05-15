import { WEEKLY_HOURS } from "@/lib/config/business.config";
import { DayOfWeek } from "@/lib/types";
import { capitalise } from "@/lib/utils/format";

const DAY_ORDER: DayOfWeek[] = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

export function OpeningHoursBlock() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase() as DayOfWeek;

  return (
    <div>
      {/* Section label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Schedule</p>
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Opening Hours</h2>

      {/* Hours card */}
      <div
        className="rounded-2xl overflow-hidden border border-stone-100"
        style={{ background: "linear-gradient(160deg, #FAF8F5 0%, #F5EDE4 100%)" }}
      >
        {DAY_ORDER.map((day, i) => {
          const hours = WEEKLY_HOURS[day];
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`flex items-center justify-between px-4 py-3 ${
                i < DAY_ORDER.length - 1 ? "border-b border-stone-100/80" : ""
              } ${isToday ? "bg-stone-900" : "hover:bg-white/60 transition-colors"}`}
            >
              <div className="flex items-center gap-2">
                {/* Open/closed dot */}
                <span
                  className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                    isToday
                      ? "bg-emerald-400"
                      : hours.isOpen
                      ? "bg-stone-300"
                      : "bg-stone-200"
                  }`}
                />
                <span className={`text-sm font-medium ${isToday ? "text-white" : "text-stone-700"}`}>
                  {capitalise(day)}
                </span>
                {isToday && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/15 text-white px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>
              <span className={`text-sm tabular-nums ${
                isToday ? "text-white/80" : hours.isOpen ? "text-stone-600" : "text-stone-300"
              }`}>
                {hours.isOpen ? `${hours.open} – ${hours.close}` : "Closed"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

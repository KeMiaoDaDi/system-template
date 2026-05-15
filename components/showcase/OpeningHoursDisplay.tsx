import { WEEKLY_HOURS, BUSINESS_CONFIG } from "@/lib/config/business.config";
import { DayOfWeek } from "@/lib/types";
import { capitalise } from "@/lib/utils/format";

const DAY_ORDER: DayOfWeek[] = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

export function OpeningHoursDisplay() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase() as DayOfWeek;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="max-w-sm">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">Opening Hours</h2>

        <div className="space-y-2">
          {DAY_ORDER.map((day) => {
            const hours = WEEKLY_HOURS[day];
            const isToday = day === today;

            return (
              <div
                key={day}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl ${
                  isToday ? "bg-stone-900 text-white" : "hover:bg-stone-50"
                }`}
              >
                <span className={`text-sm font-medium ${isToday ? "text-white" : "text-stone-700"}`}>
                  {capitalise(day)}
                  {isToday && (
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">Today</span>
                  )}
                </span>
                <span className={`text-sm ${isToday ? "text-white/80" : hours.isOpen ? "text-stone-600" : "text-stone-400"}`}>
                  {hours.isOpen ? `${hours.open} – ${hours.close}` : "Closed"}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-stone-400">
          Located at {BUSINESS_CONFIG.address}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { WeeklyHours } from "@/lib/types";
import { WEEKLY_HOURS } from "@/lib/config/business.config";
import { HoursEditor } from "@/components/admin/HoursEditor";

export default function AdminHoursPage() {
  const [hours, setHours] = useState<WeeklyHours>(WEEKLY_HOURS);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Opening Hours</h1>
        <p className="text-stone-400 text-sm">Set your weekly availability</p>
      </div>

      <div className="max-w-2xl">
        <HoursEditor
          hours={hours}
          onSave={(updated) => setHours(updated)}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/data/services";
import { formatPrice, formatDuration } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface Props {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onNext: () => void;
}

export function StepSelectService({ selectedIds, onChange, onNext }: Props) {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id);
  const activeServices = SERVICES.filter(
    (s) => s.isActive && s.categoryId === activeCategory
  );

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Select services</h2>
      <p className="text-stone-500 text-sm mb-5">You can select multiple services</p>

      {/* Selected count badge */}
      {selectedIds.length > 0 && (
        <div className="mb-4 inline-flex items-center gap-1.5 bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {selectedIds.length} service{selectedIds.length > 1 ? "s" : ""} selected
        </div>
      )}

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat.id
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services */}
      <div className="space-y-2">
        {activeServices.map((svc) => {
          const selected = selectedIds.includes(svc.id);
          return (
            <button
              key={svc.id}
              onClick={() => toggle(svc.id)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all duration-150",
                selected
                  ? "border-stone-900 bg-stone-50"
                  : "border-stone-100 hover:border-stone-200 bg-white"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center",
                    selected ? "border-stone-900 bg-stone-900" : "border-stone-200"
                  )}
                >
                  {selected && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-stone-900 text-sm leading-snug">{svc.name}</p>
                    <p className="font-bold text-stone-900 text-sm shrink-0">{formatPrice(svc.price)}</p>
                  </div>
                  <p className="text-stone-500 text-xs mt-1 leading-relaxed line-clamp-2">{svc.description}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs text-stone-400 font-medium">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(svc.duration)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <Button
          onClick={onNext}
          disabled={selectedIds.length === 0}
          fullWidth
          size="lg"
        >
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

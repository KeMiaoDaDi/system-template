"use client";

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
  const activeServices = SERVICES.filter((s) => s.isActive);

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-stone-900 mb-1">Choose a service</h2>
      <p className="text-stone-500 text-sm mb-6">You can select multiple services</p>

      <div className="space-y-6">
        {SERVICE_CATEGORIES.map((cat) => {
          const catServices = activeServices.filter((s) => s.categoryId === cat.id);
          if (catServices.length === 0) return null;

          return (
            <div key={cat.id}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
                {cat.name}
              </h3>
              <div className="space-y-2">
                {catServices.map((svc) => {
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
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center",
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
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-stone-900 text-sm">{svc.name}</p>
                            <p className="font-bold text-stone-900 text-sm shrink-0">{formatPrice(svc.price)}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <p className="text-stone-500 text-xs truncate">{svc.description}</p>
                            <span className="shrink-0 text-xs text-stone-400">{formatDuration(svc.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
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

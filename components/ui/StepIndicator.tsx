import { cn } from "@/lib/utils/cn";

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);
  const total = steps.length;
  const progressPct = total > 1 ? (currentIndex / (total - 1)) * 100 : 0;

  return (
    <>
      {/* ── Mobile: progress bar + "Step X of Y" ─────────────────── */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-900">
            {steps[currentIndex]?.label}
          </span>
          <span className="text-xs text-stone-400">
            {currentIndex + 1} / {total}
          </span>
        </div>
        <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ── Desktop: circles + connectors ─────────────────────────── */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200",
                    isCompleted && "bg-stone-900 text-white",
                    isActive && "bg-stone-900 text-white ring-2 ring-stone-900 ring-offset-2",
                    !isCompleted && !isActive && "bg-stone-100 text-stone-400"
                  )}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    isActive ? "text-stone-900" : "text-stone-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-10 mb-5",
                    index < currentIndex ? "bg-stone-900" : "bg-stone-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

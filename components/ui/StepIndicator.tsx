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

  return (
    <div className="flex items-center justify-center gap-0">
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
                  "hidden sm:block text-xs font-medium whitespace-nowrap",
                  isActive ? "text-stone-900" : "text-stone-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 sm:w-12 mb-5",
                  index < currentIndex ? "bg-stone-900" : "bg-stone-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

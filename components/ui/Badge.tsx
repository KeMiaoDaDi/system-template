import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-stone-100 text-stone-700",
  success:  "bg-emerald-50 text-emerald-700",
  warning:  "bg-amber-50 text-amber-700",
  danger:   "bg-red-50 text-red-600",
  neutral:  "bg-stone-50 text-stone-500",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

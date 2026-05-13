import { cn } from "@/lib/utils/cn";
import type { BadgeProps } from "@/types/components";

const variantStyles = {
  default: "bg-border-light text-secondary",
  success: "bg-green-50 text-success border-success/20",
  warning: "bg-amber-50 text-warning border-warning/20",
  danger: "bg-red-50 text-danger border-danger/20",
  info: "bg-blue-50 text-accent-light border-accent-light/20",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

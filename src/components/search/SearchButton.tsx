import { cn } from "@/lib/utils/cn";

interface SearchButtonProps {
  disabled?: boolean;
  className?: string;
}

export function SearchButton({ disabled, className }: SearchButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "bg-border-light text-secondary px-6 py-3 rounded-xl transition-colors font-medium",
        "hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      Enter
    </button>
  );
}

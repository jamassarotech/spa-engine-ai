import { Badge } from "@/components/ui/Badge";
import type { WarningsListProps } from "@/types/components";

const severityConfig = {
  low: { variant: "info" as const, label: "Note" },
  medium: { variant: "warning" as const, label: "Warning" },
  high: { variant: "danger" as const, label: "Important" },
};

export function WarningsList({ warnings }: WarningsListProps) {
  if (warnings.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-warning text-xl">⚠</span>
        <h2 className="text-section-title font-semibold text-primary">
          Warnings
        </h2>
      </div>

      {/* Warnings List */}
      <ul className="space-y-4">
        {warnings.map((warning, index) => {
          const config = severityConfig[warning.severity];
          return (
            <li key={index} className="flex gap-3">
              {/* Bullet */}
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-warning mt-2.5" />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-2 flex-wrap">
                  <Badge variant={config.variant}>{config.label}</Badge>
                  <p className="text-base text-primary leading-relaxed flex-1">
                    {warning.warning}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import type { ConsListProps } from "@/types/components";

export function ConsList({ cons }: ConsListProps) {
  if (cons.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-danger text-xl">✗</span>
        <h2 className="text-section-title font-semibold text-primary">Cons</h2>
      </div>

      {/* Cons List */}
      <ul className="space-y-4">
        {cons.map((con, index) => (
          <li key={index} className="flex gap-3">
            {/* Bullet */}
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-danger mt-2.5" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-base text-primary leading-relaxed">
                {con.point}
              </p>
              {con.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {con.sources.slice(0, 3).map((source, idx) => (
                    <a
                      key={idx}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-hover underline"
                    >
                      Source {idx + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

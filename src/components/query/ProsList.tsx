import type { ProsListProps } from '@/types/components'

export function ProsList({ pros }: ProsListProps) {
  if (pros.length === 0) return null

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-success text-xl">✓</span>
        <h2 className="text-section-title font-semibold text-primary">Pros</h2>
      </div>

      {/* Pros List */}
      <ul className="space-y-4">
        {pros.map((pro, index) => (
          <li key={index} className="flex gap-3">
            {/* Bullet */}
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-base text-primary leading-relaxed">{pro.point}</p>
              {pro.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {pro.sources.slice(0, 3).map((source, idx) => (
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
  )
}

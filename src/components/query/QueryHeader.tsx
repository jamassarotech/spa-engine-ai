import { formatLastUpdated } from '@/lib/utils/formatDate'
import { TrustIndicator } from '@/components/shared/TrustIndicator'
import type { QueryHeaderProps } from '@/types/components'

export function QueryHeader({
  title,
  lastUpdated,
  confidence,
  sourceCount,
}: QueryHeaderProps) {
  return (
    <div className="mb-8">
      {/* Query Title */}
      <h1 className="text-page-title font-bold text-primary mb-4 leading-tight">
        {title}
      </h1>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
        {/* Last Updated */}
        <span>{formatLastUpdated(lastUpdated)}</span>

        {/* Separator */}
        <span className="text-border">•</span>

        {/* Trust Indicator */}
        <TrustIndicator confidence={confidence} />

        {/* Separator */}
        <span className="text-border">•</span>

        {/* Source Count */}
        <span>{sourceCount} sources analyzed</span>
      </div>
    </div>
  )
}

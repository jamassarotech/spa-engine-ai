import { getConfidenceBadge } from '@/lib/utils/confidence'
import type { TrustIndicatorProps } from '@/types/components'

export function TrustIndicator({ confidence }: TrustIndicatorProps) {
  const badge = getConfidenceBadge(confidence)

  return (
    <div className="inline-flex items-center gap-2" title={badge.tooltip}>
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
        style={{
          backgroundColor: badge.bgColor,
          color: badge.color,
        }}
      >
        {badge.icon}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: badge.color }}
      >
        {badge.label}
      </span>
    </div>
  )
}

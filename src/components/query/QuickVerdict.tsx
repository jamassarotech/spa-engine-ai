import type { QuickVerdictProps } from '@/types/components'

export function QuickVerdict({ verdict }: QuickVerdictProps) {
  return (
    <div className="bg-subtle border-2 border-border rounded-xl p-8 mb-12 shadow-soft">
      {/* Label */}
      <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
        Quick Verdict
      </div>

      {/* Verdict Text */}
      <p className="text-body-large text-primary leading-relaxed">{verdict}</p>
    </div>
  )
}

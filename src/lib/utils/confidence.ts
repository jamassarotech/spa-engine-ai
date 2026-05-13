/**
 * Confidence level utilities
 * Map confidence to UI elements
 */

export type ConfidenceLevel = 'low' | 'medium' | 'high'

export interface ConfidenceBadge {
  label: string
  color: string
  bgColor: string
  icon: string
  tooltip: string
}

/**
 * Get confidence badge configuration
 */
export function getConfidenceBadge(confidence: ConfidenceLevel): ConfidenceBadge {
  const badges: Record<ConfidenceLevel, ConfidenceBadge> = {
    high: {
      label: 'Verified',
      color: '#10B981',
      bgColor: '#D1FAE5',
      icon: '✓',
      tooltip: 'High confidence based on multiple reliable sources',
    },
    medium: {
      label: 'Analyzed',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      icon: 'i',
      tooltip: 'Medium confidence, may benefit from additional sources',
    },
    low: {
      label: 'Limited Data',
      color: '#9CA3AF',
      bgColor: '#F3F4F6',
      icon: '!',
      tooltip: 'Low confidence due to limited source availability',
    },
  }

  return badges[confidence]
}

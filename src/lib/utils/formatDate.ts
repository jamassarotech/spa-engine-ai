/**
 * Date formatting utilities
 */

/**
 * Format ISO date to readable format
 * Example: "2026-05-13T00:38:42.347Z" → "May 13, 2026"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date to relative time
 * Example: "2 days ago", "3 months ago"
 */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`
  if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`
  if (diffDay < 30) return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`
  return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`
}

/**
 * Format last updated timestamp
 * Example: "Updated May 13, 2026"
 */
export function formatLastUpdated(isoDate: string): string {
  return `Updated ${formatDate(isoDate)}`
}

/**
 * Get freshness indicator
 * Returns color and label based on date age
 */
export function getFreshness(isoDate: string): {
  label: string
  color: 'green' | 'blue' | 'gray' | 'red'
} {
  const date = new Date(isoDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return { label: 'Updated today', color: 'green' }
  if (diffDays <= 7) return { label: 'Updated this week', color: 'green' }
  if (diffDays <= 30) return { label: 'Updated recently', color: 'blue' }
  if (diffDays <= 90) return { label: 'Updated this quarter', color: 'gray' }
  return { label: 'Outdated', color: 'red' }
}

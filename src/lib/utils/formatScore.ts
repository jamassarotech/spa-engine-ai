/**
 * Score formatting utilities
 * Format engagement scores for display
 */

/**
 * Format large numbers to readable format
 * Example: 43284 → "43.3K", 1500000 → "1.5M"
 */
export function formatScore(score: number): string {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`
  }
  return score.toString()
}

/**
 * Format YouTube score (views/engagement)
 */
export function formatYouTubeScore(score: number): string {
  return `${formatScore(score)} views`
}

/**
 * Format Reddit score (upvotes)
 */
export function formatRedditScore(score: number): string {
  return `${formatScore(score)} upvotes`
}

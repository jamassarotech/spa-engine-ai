/**
 * Example queries for homepage
 */

export const EXAMPLE_QUERIES = [
  'is lg c4 worth it',
  'best monitor for coding',
  'sony xm6 vs bose qc ultra',
] as const

export type ExampleQuery = (typeof EXAMPLE_QUERIES)[number]

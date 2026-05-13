/**
 * API Response Types
 * Based on the backend API structure
 */

/**
 * Main API Response Structure
 */
export interface QueryResult {
  query: string;
  metadata: QueryMetadata;
  summary: QuerySummary;
  pros: ProPoint[];
  cons: ConPoint[];
  warnings: Warning[];
  quotes: Quote[];
  sources: Sources;
}

/**
 * Metadata about the query execution
 */
export interface QueryMetadata {
  sourceCount: number;
  lastUpdated: string; // ISO 8601 timestamp
  cached: boolean;
  confidence: "low" | "medium" | "high";
}

/**
 * Summary section with title and verdict
 */
export interface QuerySummary {
  title: string;
  verdict: string;
}

/**
 * Pro point with supporting sources
 */
export interface ProPoint {
  point: string;
  sources: string[];
}

/**
 * Con point with supporting sources
 */
export interface ConPoint {
  point: string;
  sources: string[];
}

/**
 * Warning with severity level
 */
export interface Warning {
  warning: string;
  severity: "low" | "medium" | "high";
}

/**
 * Quote from a source
 */
export interface Quote {
  text: string;
  author: string;
  source: string;
  url: string;
}

/**
 * All sources organized by platform
 */
export interface Sources {
  youtube: YouTubeSource[];
  reddit: RedditSource[];
}

/**
 * YouTube video source
 */
export interface YouTubeSource {
  type: "youtube";
  title: string;
  url: string;
  author: string;
  publishedAt: string; // ISO 8601 timestamp
  score: number;
}

/**
 * Reddit post/comment source
 */
export interface RedditSource {
  type: "reddit";
  title: string;
  url: string;
  author: string | null;
  publishedAt: string; // ISO 8601 timestamp
  score: number;
}

/**
 * API Error Response
 */
export interface APIError {
  error: string;
  message: string;
  statusCode: number;
}

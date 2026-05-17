/**
 * Query API Functions
 * Server-side data fetching for query results
 */

import { apiGet, apiPost } from "./client";
import type { QueryResult } from "@/types/api";

/**
 * Get query result by slug
 * Used in: app/q/[slug]/page.tsx (Server Component)
 */
export async function getQueryBySlug(
  slug: string,
): Promise<QueryResult | null> {
  try {
    const result = await apiGet<QueryResult>(`/api/search/${slug}`);
    return result;
  } catch (error) {
    // Return null for 404s (query not found)
    if (
      error instanceof Error &&
      "statusCode" in error &&
      error.statusCode === 404
    ) {
      return null;
    }
    // Re-throw other errors to be caught by error boundary
    throw error;
  }
}

/**
 * Create a new query search
 * Used in: Search form submission
 *
 * @param query - The search query text
 * @param userId - Optional user ID for search history tracking
 */
export async function createQuery(
  query: string,
  userId?: string,
): Promise<QueryResult> {
  const payload = userId ? { query, userId } : { query };
  return apiPost<QueryResult>("/api/search", payload);
}

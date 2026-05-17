/**
 * Search History API Functions
 * Client-side data fetching for user search history
 */

import { apiGet, apiPost } from "./client";
import type {
  SearchHistoryResponse,
  SearchHistoryResponseRaw,
  SearchHistoryItem,
  SearchHistoryItemRaw,
  CreateSearchRequest,
  CreateSearchResponse,
} from "@/types/api";

/**
 * Transform search history item from snake_case to camelCase
 */
function transformSearchHistoryItem(
  item: SearchHistoryItemRaw,
): SearchHistoryItem {
  return {
    id: item.id.toString(),
    query: item.original_query,
    slug: item.slug,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

/**
 * Transform search history response from backend format to frontend format
 */
function transformSearchHistoryResponse(
  raw: SearchHistoryResponseRaw,
  page: number,
): SearchHistoryResponse {
  return {
    searches: raw.searches.map(transformSearchHistoryItem),
    total: raw.total,
    page: page,
    limit: raw.limit,
    hasMore: raw.offset + raw.searches.length < raw.total,
  };
}

/**
 * Create a new search history entry
 * Used in: Search form submission and QueryPageClient
 *
 * @param query - The search query text
 * @param slug - The URL slug for the query
 * @param userId - Optional user ID (backend generates if not provided)
 */
export async function createSearch(
  query: string,
  slug: string,
  userId?: string,
): Promise<CreateSearchResponse> {
  const payload: CreateSearchRequest = {
    query,
    slug,
    ...(userId && { userId }),
  };

  return apiPost<CreateSearchResponse>("/api/search", payload);
}

/**
 * Get search history for a user
 * Used in: HistorySidebar component
 *
 * @param userId - The user ID to fetch history for
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of items per page (default: 10)
 */
export async function getUserSearchHistory(
  userId: string,
  page: number = 1,
  limit: number = 10,
): Promise<SearchHistoryResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const raw = await apiGet<SearchHistoryResponseRaw>(
    `/api/users/${userId}/searches?${params.toString()}`,
  );

  return transformSearchHistoryResponse(raw, page);
}

/**
 * Get recent search history (limited to 5 items)
 * Convenience function for sidebar display
 *
 * @param userId - The user ID to fetch history for
 */
export async function getRecentSearchHistory(
  userId: string,
): Promise<SearchHistoryResponse> {
  return getUserSearchHistory(userId, 1, 5);
}

/**
 * API Constants
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || "10000", 10);
export const DEBUG_API = process.env.DEBUG_API === "true";

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  SEARCH: "/api/search",
  SEARCH_BY_SLUG: (slug: string) => `/api/search/${slug}`,
} as const;

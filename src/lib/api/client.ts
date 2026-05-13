/**
 * API Client
 * Base fetch wrapper with error handling and type safety
 */

import type { APIError } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || "10000", 10);

/**
 * Custom API Error class
 */
export class APIClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "APIClientError";
    this.statusCode = statusCode;
  }
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new APIClientError("Request timeout", 408);
    }
    throw error;
  }
}

/**
 * Base API client
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData: APIError = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If parsing error response fails, use default message
      }

      throw new APIClientError(errorMessage, response.status);
    }

    // Parse and return JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    // Re-throw API client errors
    if (error instanceof APIClientError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new APIClientError("Network error: Unable to reach the server", 0);
    }

    // Handle unknown errors
    throw new APIClientError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}

/**
 * GET request
 */
export async function apiGet<T>(
  endpoint: string,
  cache?: RequestCache,
): Promise<T> {
  return apiClient<T>(endpoint, {
    method: "GET",
    cache: cache || "no-store",
  });
}

/**
 * POST request
 */
export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  return apiClient<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

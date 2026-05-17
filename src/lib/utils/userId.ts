/**
 * User ID Management Utility
 * Handles persistent user identification using localStorage and UUID v4
 */

const USER_ID_KEY = "spa_user_id";

/**
 * Check if we're running in a browser environment
 */
function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

/**
 * Generate a UUID v4
 * Uses crypto.randomUUID() if available, otherwise falls back to manual generation
 */
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a persistent user ID
 * Returns the existing user ID from localStorage, or generates a new one if none exists
 */
export function getUserId(): string {
  if (!isBrowser()) {
    // Server-side: return a temporary ID (will be replaced on client)
    return "server-temp-id";
  }

  try {
    // Try to get existing user ID
    const existingId = localStorage.getItem(USER_ID_KEY);

    if (existingId) {
      return existingId;
    }

    // Generate new user ID
    const newId = generateUUID();
    localStorage.setItem(USER_ID_KEY, newId);
    return newId;
  } catch (error) {
    console.error("Failed to access localStorage:", error);
    // Return a session-based ID if localStorage fails
    return `session-${generateUUID()}`;
  }
}

/**
 * Clear the stored user ID (for testing or logout scenarios)
 */
export function clearUserId(): void {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("Failed to clear user ID:", error);
  }
}

/**
 * Check if a user ID exists in localStorage
 */
export function hasUserId(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    return localStorage.getItem(USER_ID_KEY) !== null;
  } catch (error) {
    return false;
  }
}

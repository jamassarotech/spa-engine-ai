"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserId } from "@/lib/utils/userId";
import {
  getRecentSearchHistory,
  getUserSearchHistory,
} from "@/lib/api/searches";
import type { SearchHistoryItem } from "@/types/api";

/**
 * Format relative time from ISO timestamp
 */
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60)
    return `${diffMins} ${diffMins === 1 ? "min" : "mins"} ago`;
  if (diffHours < 24)
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function HistorySidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Fetch search history on mount
  useEffect(() => {
    async function fetchHistory() {
      try {
        setIsLoading(true);
        setError(null);

        const userId = getUserId();
        const response = await getRecentSearchHistory(userId);
        setHistory(response.searches);
        setHasMore(response.hasMore);
      } catch (err) {
        console.error("Failed to fetch search history:", err);
        setError("Failed to load history");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  // Load more search history
  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const userId = getUserId();
      const nextPage = page + 1;
      const response = await getUserSearchHistory(userId, nextPage, 5);

      setHistory((prev) => [...prev, ...response.searches]);
      setPage(nextPage);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error("Failed to load more history:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasHistory = history.length > 0;

  // Loading state
  if (isLoading) {
    return (
      <aside className="hidden lg:block w-64 border-r border-border bg-background/50 p-6">
        <div className="mb-4">
          <div className="h-4 w-32 bg-border rounded animate-pulse" />
        </div>
        <ul className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="space-y-2">
              <div className="h-4 bg-border rounded animate-pulse" />
              <div className="h-3 w-20 bg-border rounded animate-pulse" />
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  // Error state
  if (error) {
    return (
      <aside className="hidden lg:block w-64 border-r border-border bg-background/50 p-6">
        <div className="text-center text-secondary text-sm">
          <div className="text-4xl mb-2">⚠️</div>
          <p>{error}</p>
        </div>
      </aside>
    );
  }

  // Empty state
  if (!hasHistory) {
    return (
      <aside className="hidden lg:block w-64 border-r border-border bg-background/50 p-6">
        <div className="text-center text-secondary text-sm">
          <div className="text-4xl mb-2">🔍</div>
          <p>No searches yet</p>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition-colors"
        aria-label="Toggle history"
      >
        📋
      </button>

      {/* Sidebar - Hidden on mobile by default */}
      <aside
        className={`
          w-64 border-r border-border bg-background p-6 overflow-y-auto
          
          /* Mobile: Fixed overlay */
          fixed lg:static inset-0 z-40 lg:z-auto
          transform lg:transform-none transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          
          /* Desktop: Always visible */
          lg:block
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-secondary hover:text-primary"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">
            Recent Searches
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-secondary hover:text-primary transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "−" : "+"}
          </button>
        </div>

        {/* History List */}
        {isExpanded && (
          <>
            <ul className="space-y-2 mb-4">
              {history.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/q/${item.slug}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="block p-2 rounded-lg hover:bg-subtle transition-colors group"
                  >
                    <div className="text-sm text-primary font-medium group-hover:text-accent truncate">
                      {item.query}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      {formatRelativeTime(item.createdAt)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Show More Button */}
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="w-full text-center text-sm text-accent hover:text-accent/80 font-medium transition-colors py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? "Loading..." : "Show More →"}
              </button>
            )}
          </>
        )}
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

/**
 * Error Boundary for Query Page
 * Handles errors during data fetching or rendering
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error("Query page error:", error);
  }, [error]);

  return (
    <>
      <Header minimal />
      <main
        id="main-content"
        className="min-h-screen bg-background flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-danger bg-opacity-10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-danger"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-primary mb-3">
            Something went wrong
          </h1>
          <p className="text-base text-secondary mb-8">
            We encountered an error while loading this query. Please try again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-hover transition-colors"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-3 bg-border text-primary rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Go Home
            </a>
          </div>

          {/* Error Details (dev only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-xs text-secondary font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

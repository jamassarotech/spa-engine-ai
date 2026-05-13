import { Header } from "@/components/layout/Header";
import Link from "next/link";

/**
 * 404 Not Found Page
 * Displayed when query slug doesn't exist
 */
export default function NotFound() {
  return (
    <>
      <Header minimal />
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-primary mb-3">
            Query Not Found
          </h1>
          <p className="text-base text-secondary mb-8">
            We couldn't find results for this query. Try searching for something
            else.
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-hover transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </main>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils/slugify";
import { createQuery } from "@/lib/api/queries";
import { EXAMPLE_QUERIES } from "@/lib/constants/exampleQueries";

export function ExampleQueries() {
  const router = useRouter();
  const [loadingQuery, setLoadingQuery] = useState<string | null>(null);

  const handleQueryClick = async (query: string) => {
    if (loadingQuery) return; // Prevent multiple clicks

    setLoadingQuery(query);

    try {
      // Create the query in the backend
      await createQuery(query);

      // Navigate to the results page
      const slug = slugify(query);
      router.push(`/q/${slug}`);
    } catch (error) {
      console.error("Failed to create query:", error);
      setLoadingQuery(null);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <span className="text-secondary text-sm sm:text-base">Try:</span>
      {EXAMPLE_QUERIES.map((query) => (
        <button
          key={query}
          onClick={() => handleQueryClick(query)}
          disabled={loadingQuery !== null}
          className="bg-transparent border border-border text-primary px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base hover:border-accent hover:bg-subtle transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingQuery === query ? "Loading..." : query}
        </button>
      ))}
    </div>
  );
}

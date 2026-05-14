"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQuery } from "@/lib/api/queries";
import { deslugify } from "@/lib/utils/slugify";
import { SearchProgressAnimation } from "./SearchProgressAnimation";
import { QueryHeader } from "./QueryHeader";
import { QuickVerdict } from "./QuickVerdict";
import { ProsList } from "./ProsList";
import { ConsList } from "./ConsList";
import { WarningsList } from "./WarningsList";
import { QuotesSection } from "./QuotesSection";
import { SourcesSection } from "./SourcesSection";
import type { QueryResult } from "@/types/api";

interface QueryPageClientProps {
  slug: string;
  initialData?: QueryResult | null;
}

export function QueryPageClient({ slug, initialData }: QueryPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFreshSearch = searchParams.get("fresh") === "true";

  const [data, setData] = useState<QueryResult | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(isFreshSearch && !initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If it's a fresh search and we don't have data, fetch it
    if (isFreshSearch && !data) {
      const fetchData = async () => {
        try {
          const queryText = deslugify(slug);
          const result = await createQuery(queryText);
          setData(result);
          setIsLoading(false);

          // Remove the 'fresh' param from URL after data is loaded
          router.replace(`/q/${slug}`, { scroll: false });
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to fetch search results",
          );
          setIsLoading(false);
        }
      };

      // Add a minimum delay to show the animation (at least 5 seconds for all stages)
      const minDelay = setTimeout(() => {
        fetchData();
      }, 5000);

      return () => clearTimeout(minDelay);
    }
  }, [isFreshSearch, data, slug, router]);

  // Show loading animation for fresh searches
  if (isLoading) {
    return <SearchProgressAnimation />;
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
        <div className="max-w-md w-full space-y-4 text-center">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-primary">
            Something went wrong
          </h2>
          <p className="text-secondary">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors font-medium"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Show results
  if (!data) {
    return null;
  }

  const { summary, metadata, pros, cons, warnings, quotes, sources } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Query Header */}
      <QueryHeader
        title={summary.title}
        lastUpdated={metadata.lastUpdated}
        confidence={metadata.confidence}
        sourceCount={metadata.sourceCount}
      />

      {/* Quick Verdict */}
      <QuickVerdict verdict={summary.verdict} />

      {/* Pros */}
      <ProsList pros={pros} />

      {/* Cons */}
      <ConsList cons={cons} />

      {/* Warnings */}
      <WarningsList warnings={warnings} />

      {/* Quotes */}
      <QuotesSection quotes={quotes} />

      {/* Sources */}
      <SourcesSection
        youtubeData={sources.youtube}
        redditData={sources.reddit}
      />
    </div>
  );
}

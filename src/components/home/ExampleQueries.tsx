"use client";

import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils/slugify";
import { EXAMPLE_QUERIES } from "@/lib/constants/exampleQueries";

export function ExampleQueries() {
  const router = useRouter();

  const handleQueryClick = (query: string) => {
    const slug = slugify(query);
    router.push(`/q/${slug}`);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <span className="text-secondary text-base">Try:</span>
      {EXAMPLE_QUERIES.map((query) => (
        <button
          key={query}
          onClick={() => handleQueryClick(query)}
          className="bg-transparent border border-border text-primary px-5 py-2.5 rounded-full text-base hover:border-accent hover:bg-subtle transition-all cursor-pointer"
        >
          {query}
        </button>
      ))}
    </div>
  );
}

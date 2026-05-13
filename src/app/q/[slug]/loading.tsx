import { Header } from "@/components/layout/Header";
import {
  QueryHeaderSkeleton,
  VerdictSkeleton,
  ListItemSkeleton,
  SourceCardSkeleton,
} from "@/components/ui/Skeleton";

/**
 * Loading State for Query Page
 * Displayed while fetching query data
 */
export default function Loading() {
  return (
    <>
      <Header minimal />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Query Header Skeleton */}
          <QueryHeaderSkeleton />

          {/* Verdict Skeleton */}
          <VerdictSkeleton />

          {/* Pros Skeleton */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-border rounded animate-pulse" />
              <div className="w-20 h-7 bg-border rounded animate-pulse" />
            </div>
            <ListItemSkeleton count={3} />
          </section>

          {/* Cons Skeleton */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-border rounded animate-pulse" />
              <div className="w-20 h-7 bg-border rounded animate-pulse" />
            </div>
            <ListItemSkeleton count={3} />
          </section>

          {/* Sources Skeleton */}
          <section className="mb-12">
            <div className="w-32 h-7 bg-border rounded animate-pulse mb-6" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SourceCardSkeleton />
              <SourceCardSkeleton />
              <SourceCardSkeleton />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

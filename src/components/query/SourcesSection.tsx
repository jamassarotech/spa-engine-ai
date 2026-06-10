import { YouTubeSource } from "./YouTubeSource";
import { RedditSource } from "./RedditSource";
import type { SourcesSectionProps } from "@/types/components";

export function SourcesSection({
  youtubeData,
  redditData,
}: SourcesSectionProps) {
  const hasYouTube = youtubeData.length > 0;
  const hasReddit = redditData.length > 0;

  if (!hasYouTube && !hasReddit) return null;

  return (
    <section className="mb-12">
      {/* Section Header */}
      <h2 className="text-section-title font-semibold text-primary mb-6">
        Sources
      </h2>

      {/* YouTube Sources */}
      {hasYouTube && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center gap-2">
            <span className="text-red-600">▶</span>
            YouTube Videos
            <span className="text-sm font-normal text-secondary">
              ({youtubeData.length})
            </span>
          </h3>
          <div className="relative group/carousel">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 scrollbar-hide md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none">
              {youtubeData.map((source, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-[300px] md:w-auto snap-start"
                >
                  <YouTubeSource source={source} />
                </div>
              ))}
            </div>
            {/* Visual Indicator for Scrolling */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          </div>
        </div>
      )}

      {/* Reddit Sources */}
      {hasReddit && (
        <div>
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center gap-2">
            <span className="text-orange-500">●</span>
            Reddit Discussions
            <span className="text-sm font-normal text-secondary">
              ({redditData.length})
            </span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {redditData.map((source, index) => (
              <RedditSource key={index} source={source} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

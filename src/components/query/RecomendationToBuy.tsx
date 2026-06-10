"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { RecommendationToBuyProps } from "@/types/components";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function RecommendationToBuy({
  recommendations,
}: RecommendationToBuyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Don't render if no recommendations
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const sortedRecommendations = [...recommendations].sort(
    (a, b) => b.score - a.score,
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth * 0.85; // Roughly 85vw
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-12">
      <h2 className="text-2xl font-bold text-green-900 mb-4">
        🔎 Find These Products on Amazon
      </h2>
      <p className="text-green-800 mb-4">
        We identified products that match your search. Use the links below to
        view available listings and customer reviews on Amazon.
      </p>
      <div className="relative group/carousel">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-5 px-5 scrollbar-hide md:mx-0 md:px-0 md:flex-col md:space-y-4 md:overflow-x-visible md:snap-none"
        >
          {sortedRecommendations.map((rec, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-full snap-start bg-white rounded-lg p-5 border border-green-200 hover:border-green-300 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-green-900 text-lg flex-1 line-clamp-2">
                  {rec.name}
                </h3>
                <Badge variant="success" className="ml-2 whitespace-nowrap">
                  Score: {rec.score}/100
                </Badge>
              </div>

              <p className="text-green-800 mb-4">{rec.summary}</p>

              {rec.amazonUrl && (
                <a
                  href={rec.amazonUrl}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Amazon
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Visual Cues for Mobile */}
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-green-50/80 to-transparent pointer-events-none md:hidden animate-pulse" />

        {/* Swipe Hint */}
        <div className="flex justify-center gap-1.5 mt-2 md:hidden">
          {sortedRecommendations.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                activeIndex === i ? "w-4 bg-green-500" : "w-1 bg-green-200",
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-green-900 text-xs mt-4">
        Engagement score from the source platform (Reddit upvotes or YouTube
        views/likes) - this is not an Amazon product rating.
      </p>
    </Card>
  );
}

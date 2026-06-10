import { Card } from "@/components/ui/Card";
import { RecommendationToBuyProps } from "@/types/components";
import { Badge } from "@/components/ui/Badge";

export function RecommendationToBuy({
  recommendations,
}: RecommendationToBuyProps) {
  // Don't render if no recommendations
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const sortedRecommendations = [...recommendations].sort(
    (a, b) => b.score - a.score,
  );

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-12">
      <h2 className="text-2xl font-bold text-green-900 mb-4">
        🔎 Find These Products on Amazon
      </h2>
      <p className="text-green-800 mb-4">
        We identified products that match your search. Use the links below to
        view available listings and customer reviews on Amazon.
      </p>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-5 px-5 scrollbar-hide md:mx-0 md:px-0 md:flex-col md:space-y-4 md:overflow-x-visible md:snap-none">
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
      <p className="text-green-900 text-xs mt-4">
        Engagement score from the source platform (Reddit upvotes or YouTube
        views/likes) - this is not an Amazon product rating.
      </p>
    </Card>
  );
}

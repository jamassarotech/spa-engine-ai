import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQueryBySlug } from "@/lib/api/queries";
import { deslugify } from "@/lib/utils/slugify";
import { Header } from "@/components/layout/Header";
import { QueryHeader } from "@/components/query/QueryHeader";
import { QuickVerdict } from "@/components/query/QuickVerdict";
import { ProsList } from "@/components/query/ProsList";
import { ConsList } from "@/components/query/ConsList";
import { WarningsList } from "@/components/query/WarningsList";
import { QuotesSection } from "@/components/query/QuotesSection";
import { SourcesSection } from "@/components/query/SourcesSection";
import {
  JsonLd,
  generateArticleSchema,
  generateReviewSchema,
  generateBreadcrumbSchema,
} from "@/lib/utils/jsonLd";

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const data = await getQueryBySlug(slug);

  if (!data) {
    return {
      title: "Query Not Found",
      description: "The requested query could not be found.",
    };
  }

  const { summary, metadata } = data;
  const description = `${summary.verdict.slice(0, 155)}...`;

  return {
    title: `${summary.title} | AI Research`,
    description,
    keywords: [
      summary.title,
      "product research",
      "buying guide",
      "AI analysis",
      "reviews",
    ],
    openGraph: {
      title: summary.title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: summary.title,
      description,
    },
  };
}

/**
 * Dynamic Query Results Page (Server Component)
 */
export default async function QueryPage({ params }: PageProps) {
  const { slug } = params;
  const data = await getQueryBySlug(slug);

  // Handle 404
  if (!data) {
    notFound();
  }

  const { summary, metadata, pros, cons, warnings, quotes, sources } = data;

  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd data={generateArticleSchema(data, slug)} />
      <JsonLd data={generateReviewSchema(data)} />
      <JsonLd data={generateBreadcrumbSchema(summary.title, slug)} />

      <Header minimal />
      <main id="main-content" className="min-h-screen bg-background py-8">
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
      </main>
    </>
  );
}

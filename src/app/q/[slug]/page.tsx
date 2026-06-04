import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getQueryBySlug } from "@/lib/api/queries";
import { Header } from "@/components/layout/Header";
import { QueryPageClient } from "@/components/query/QueryPageClient";
import { DataLogger } from "@/components/shared/DataLogger";
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
  searchParams: {
    fresh?: string;
  };
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const isFreshSearch = searchParams.fresh === "true";

  // Get base URL for canonical links
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://spa-engine-ai.vercel.app";
  const canonicalUrl = `${baseUrl}/q/${slug}`;

  // For fresh searches, return default metadata since data doesn't exist yet
  if (isFreshSearch) {
    const queryText = slug.replace(/-/g, " ");
    return {
      title: `${queryText} | AI Research`,
      description: `Analyzing ${queryText} with AI-powered research from YouTube and Reddit sources.`,
      keywords: [queryText, "product research", "buying guide", "AI analysis"],
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  // For existing queries, fetch full metadata
  try {
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
      alternates: {
        canonical: canonicalUrl,
      },
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
  } catch (error) {
    // Handle API errors gracefully
    const queryText = slug.replace(/-/g, " ");
    return {
      title: `${queryText} | AI Research`,
      description: "AI-powered product research and analysis.",
    };
  }
}

/**
 * Dynamic Query Results Page (Server Component)
 */
export default async function QueryPage({ params, searchParams }: PageProps) {
  const { slug } = params;
  const isFreshSearch = searchParams.fresh === "true";

  // For fresh searches, client will fetch the data
  if (isFreshSearch) {
    return (
      <>
        <Header minimal />
        <main id="main-content" className="min-h-screen bg-background py-8">
          <QueryPageClient slug={slug} />
        </main>
      </>
    );
  }

  // For cached/existing queries, pre-fetch on server for SEO and performance
  try {
    const data = await getQueryBySlug(slug);

    // Handle 404
    if (!data) {
      // Redirect to fresh search if query doesn't exist
      redirect(`/q/${slug}?fresh=true`);
    }

    return (
      <>
        {/* Structured Data for SEO */}
        <JsonLd data={generateArticleSchema(data, slug)} />
        <JsonLd data={generateReviewSchema(data)} />
        <JsonLd data={generateBreadcrumbSchema(data.summary.title, slug)} />

        {/* Log data to browser console */}
        <DataLogger data={data} label="Query result data" />

        <Header minimal />
        <main id="main-content" className="min-h-screen bg-background py-8">
          {/* Use QueryPageClient for all rendering - single source of truth */}
          <QueryPageClient slug={slug} initialData={data} />
        </main>
      </>
    );
  } catch (error) {
    // If query doesn't exist, redirect to create it as a fresh search
    redirect(`/q/${slug}?fresh=true`);
  }
}

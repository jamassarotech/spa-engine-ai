/**
 * JSON-LD Structured Data Utilities
 * Generate structured data for better SEO
 */

import type { QueryResult } from "@/types/api";

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Deal Advisor",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "AI-powered buying research assistant for honest product reviews",
    sameAs: [
      // Add social media links when available
      // 'https://twitter.com/airesearch',
      // 'https://facebook.com/airesearch',
    ],
  };
}

/**
 * Generate WebSite JSON-LD with SearchAction
 */
export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deal Advisor",
    url: baseUrl,
    description:
      "AI-powered buying research assistant for honest product reviews",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/q/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Article JSON-LD for Query Pages
 */
export function generateArticleSchema(data: QueryResult, slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(data.summary.title)}&type=query`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.summary.title,
    description: data.summary.verdict.slice(0, 200),
    image: [ogImageUrl],
    url: `${baseUrl}/q/${slug}`,
    datePublished: data.metadata.lastUpdated,
    dateModified: data.metadata.lastUpdated,
    author: {
      "@type": "Organization",
      name: "Deal Advisor",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Deal Advisor",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/q/${slug}`,
    },
  };
}

/**
 * Generate Review JSON-LD for Query Pages
 */
export function generateReviewSchema(data: QueryResult) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(data.summary.title)}&type=query`;
  const ratingValue =
    data.metadata.confidence === "high"
      ? "5"
      : data.metadata.confidence === "medium"
        ? "4"
        : "3";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.summary.title,
    image: [ogImageUrl],
    description: data.summary.verdict.slice(0, 200),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: ratingValue,
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "Deal Advisor",
        url: baseUrl,
      },
      reviewBody: data.summary.verdict,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(title: string, slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}/q/${slug}`,
      },
    ],
  };
}

/**
 * Render JSON-LD script tag
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

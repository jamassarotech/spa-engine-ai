/**
 * JSON-LD Structured Data Utilities
 * Generate structured data for better SEO
 */

import type { QueryResult } from "@/types/api";

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Research",
    url: "http://localhost:3001",
    logo: "http://localhost:3001/logo.png",
    description:
      "AI-powered buying research search engine for honest product reviews",
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
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Research",
    url: "http://localhost:3001",
    description:
      "AI-powered buying research search engine for honest product reviews",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "http://localhost:3001/q/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Article JSON-LD for Query Pages
 */
export function generateArticleSchema(data: QueryResult, slug: string) {
  const baseUrl = "http://localhost:3001";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.summary.title,
    description: data.summary.verdict.slice(0, 200),
    url: `${baseUrl}/q/${slug}`,
    datePublished: data.metadata.lastUpdated,
    dateModified: data.metadata.lastUpdated,
    author: {
      "@type": "Organization",
      name: "AI Research",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Research",
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
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: data.summary.title,
    },
    reviewBody: data.summary.verdict,
    reviewRating: {
      "@type": "Rating",
      ratingValue:
        data.metadata.confidence === "high"
          ? "5"
          : data.metadata.confidence === "medium"
            ? "4"
            : "3",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "AI Research",
    },
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: data.pros.map((pro, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pro.point,
      })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: data.cons.map((con, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: con.point,
      })),
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(title: string, slug: string) {
  const baseUrl = "http://localhost:3001";

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

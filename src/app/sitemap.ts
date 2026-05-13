import { MetadataRoute } from "next";

/**
 * Generate sitemap.xml
 * Note: In production, you would fetch actual query slugs from database
 * For now, this returns the homepage and example routes
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Example query pages (in production, generate from database)
    {
      url: `${baseUrl}/q/is-lg-c4-worth-it`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/q/best-monitor-for-coding`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/q/sony-xm6-vs-bose-qc-ultra`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}

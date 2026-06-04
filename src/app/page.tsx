import { Metadata } from "next";
import { SearchHero } from "@/components/home/SearchHero";
import { Header } from "@/components/layout/Header";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/utils/jsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL || "https://spa-engine-ai.vercel.app",
  },
  openGraph: {
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://spa-engine-ai.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deal Advisor - AI-powered buying research",
      },
    ],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateWebsiteSchema()} />

      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex flex-1">
          {/* Left Sidebar - History */}
          <HistorySidebar />

          {/* Center Content - Search Hero */}
          <main
            id="main-content"
            className="flex-1 flex flex-col items-center justify-center"
          >
            <SearchHero />
          </main>
        </div>
      </div>
    </>
  );
}

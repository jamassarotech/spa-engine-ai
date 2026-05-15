import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { inter } from "@/styles/fonts";
import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "Deal Advisor | AI-powered buying research",
    template: "%s | Deal Advisor",
  },
  description:
    "AI-powered buying research assistant. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
  keywords: [
    "product research",
    "buying guide",
    "product reviews",
    "AI search",
    "product comparisons",
    "unbiased reviews",
    "YouTube reviews",
    "Reddit discussions",
  ],
  authors: [{ name: "Deal Advisor" }],
  creator: "Deal Advisor",
  publisher: "Deal Advisor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
    siteName: "Deal Advisor",
    title: "Deal Advisor | AI-powered buying research",
    description:
      "AI-powered buying research assistant. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Advisor | AI-powered buying research",
    description:
      "AI-powered buying research assistant. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
    creator: "@airesearch",
  },
  verification: {
    // Add verification codes when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}

        {/* Analytics Tracker - tracks client-side navigation */}
        {GA_ID && (
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        )}

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

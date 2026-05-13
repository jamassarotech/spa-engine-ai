import type { Metadata } from "next";
import { inter } from "@/styles/fonts";
import { SkipToContent } from "@/lib/utils/accessibility";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Research | Honest research for informed decisions",
    template: "%s | AI Research",
  },
  description:
    "AI-powered buying research search engine. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
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
  authors: [{ name: "AI Research" }],
  creator: "AI Research",
  publisher: "AI Research",
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
    url: "http://localhost:3001",
    siteName: "AI Research",
    title: "AI Research | Honest research for informed decisions",
    description:
      "AI-powered buying research search engine. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research | Honest research for informed decisions",
    description:
      "AI-powered buying research search engine. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
    creator: "@airesearch",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Add verification codes when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}

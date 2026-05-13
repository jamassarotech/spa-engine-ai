import type { Metadata, Viewport } from "next";
import { inter } from "@/styles/fonts";
import "./globals.css";

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
    url: "http://localhost:3001",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}

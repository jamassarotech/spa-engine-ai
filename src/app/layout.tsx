import type { Metadata } from "next";
import { inter } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Honest research for informed decisions",
  description:
    "AI-powered buying research search engine. Get unbiased product reviews, comparisons, and recommendations from YouTube and Reddit.",
  keywords: [
    "product research",
    "buying guide",
    "product reviews",
    "AI search",
  ],
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

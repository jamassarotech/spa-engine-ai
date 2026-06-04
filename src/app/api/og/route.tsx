import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic Open Graph Image Generation
 * 
 * Usage:
 * - Default: /api/og
 * - Custom title: /api/og?title=Your+Custom+Title
 * - Query page: /api/og?title=Best+Headphones+2024&type=query
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Deal Advisor";
    const type = searchParams.get("type") || "default";

    // For query pages, show the query title
    const displayTitle = type === "query" ? title : "Deal Advisor";
    const subtitle =
      type === "query"
        ? "AI-powered product research"
        : "AI-powered buying research";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            padding: "80px",
          }}
        >
          {/* Main Title */}
          <div
            style={{
              fontSize: displayTitle.length > 30 ? 56 : 72,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "1000px",
              marginBottom: "20px",
            }}
          >
            {displayTitle}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {subtitle}
          </div>

          {/* Footer Badge */}
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.8)",
              marginTop: 60,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "8px",
              }}
            >
              YouTube + Reddit insights
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

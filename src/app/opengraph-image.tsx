import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Deal Advisor - AI-powered buying research";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "96px",
            fontWeight: "bold",
            color: "white",
            margin: 0,
            padding: 0,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Deal Advisor
        </h1>
        <p
          style={{
            fontSize: "42px",
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            padding: 0,
            textAlign: "center",
          }}
        >
          AI-powered buying research
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

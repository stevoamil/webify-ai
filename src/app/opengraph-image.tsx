import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg,#030406 0%,#0c0f14 100%)",
          color: "#e9eef4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#a9dcff", letterSpacing: 4, textTransform: "uppercase" }}>
          AI-powered web studio
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 600, marginTop: 24, letterSpacing: -3, lineHeight: 1.02 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "#8b95a3", maxWidth: 900 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}

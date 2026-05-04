import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, #431407 0%, #0a0a0a 60%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            color: "#fb923c",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#f97316",
            }}
          />
          {site.author.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fafafa",
              display: "flex",
            }}
          >
            一個
            <span style={{ color: "#fb923c" }}>工程師</span>
            的作品集
          </div>
          <div style={{ fontSize: 32, color: "#a1a1aa", display: "flex" }}>
            {site.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex" }}>{new URL(site.url).host}</div>
          <div style={{ display: "flex", color: "#fb923c" }}>
            github.com/Haooo517
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

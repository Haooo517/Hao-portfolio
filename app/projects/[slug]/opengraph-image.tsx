import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = "Project cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const itemCount = project.items?.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 15% 15%, #7c2d12 0%, #1a0a04 45%, #0a0a0a 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 90%, rgba(249,115,22,0.18), transparent 50%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 24,
            color: "#fb923c",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#f97316",
            }}
          />
          {site.name} · Project
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#fb923c",
              fontWeight: 600,
            }}
          >
            {project.year}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fafafa",
              maxWidth: "80%",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: "85%",
              lineHeight: 1.35,
            }}
          >
            {project.summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {project.tech.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.35)",
                  color: "#fdba74",
                  padding: "8px 16px",
                  borderRadius: 8,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          {itemCount > 0 && (
            <div style={{ display: "flex", color: "#fb923c" }}>
              {itemCount} 件作品
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}

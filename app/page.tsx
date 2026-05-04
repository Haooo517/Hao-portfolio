import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Avatar } from "@/components/avatar";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <section className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-center sm:gap-12 sm:text-left">
        <div className="anim-fade-zoom shrink-0">
          <div className="anim-float rounded-full">
            <Avatar name={site.author.name} size={176} glow />
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <p
            className="anim-fade-up font-display text-xs font-medium uppercase tracking-[0.4em] text-orange-500"
            style={{ animationDelay: "150ms" }}
          >
            Portfolio · 2026
          </p>

          <h1
            className="anim-fade-up mt-4 font-display text-6xl font-black tracking-tight text-zinc-50 sm:text-7xl"
            style={{ animationDelay: "300ms" }}
          >
            <span className="bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent anim-text-glow">
              {site.author.name}
            </span>
          </h1>

          <p
            className="anim-fade-up mt-3 font-display text-sm uppercase tracking-[0.3em] text-zinc-500"
            style={{ animationDelay: "450ms" }}
          >
            Howard Chang · Engineer
          </p>

          <p
            className="anim-fade-up mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            style={{ animationDelay: "600ms" }}
          >
            {site.description}。這裡放我做過的東西、寫過的字，還有可以下載的檔案。
          </p>

          <div
            className="anim-fade-up mt-8 flex items-center gap-3"
            style={{ animationDelay: "750ms" }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.03] hover:bg-orange-400 hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.7)]"
            >
              看作品 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-orange-500/40 px-4 py-2 text-sm font-medium text-orange-300 transition hover:scale-[1.03] hover:border-orange-400 hover:text-orange-200"
            >
              關於我
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section
          className="anim-fade-up mt-24"
          style={{ animationDelay: "900ms" }}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-wider text-zinc-50">
              <span className="text-orange-400">FEATURED</span> PROJECTS
            </h2>
            <Link
              href="/projects"
              className="text-sm text-zinc-400 transition hover:text-orange-400"
            >
              所有作品 →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, idx) => (
              <div
                key={p.slug}
                className="anim-fade-up"
                style={{ animationDelay: `${1000 + idx * 120}ms` }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

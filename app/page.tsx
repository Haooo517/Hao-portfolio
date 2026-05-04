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
      <section className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Avatar name={site.author.name} size={112} className="shrink-0" />
        <div>
        <p className="font-display text-sm font-medium uppercase tracking-[0.25em] text-orange-500">
          Hi, I&apos;m <span className="text-orange-300">{site.author.name}</span>
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          一個
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            工程師
          </span>
          的作品集與個人空間
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-400">
          這裡放我做過的東西、寫過的字，還有可以下載的檔案。
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-orange-400"
          >
            看作品 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md border border-orange-500/40 px-4 py-2 text-sm font-medium text-orange-300 transition hover:border-orange-400 hover:text-orange-200"
          >
            關於我
          </Link>
        </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-24">
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
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <section className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Hi, I&apos;m {site.author.name}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {site.description}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          這裡放我做過的東西、寫過的字，還有可以下載的檔案。
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            看作品 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            關於我
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-24">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
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

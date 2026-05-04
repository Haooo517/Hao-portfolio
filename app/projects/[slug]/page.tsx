import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GithubIcon } from "@/components/brand-icons";
import { projects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="anim-fade inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-orange-400 hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> 回到作品列表
      </Link>

      <header className="mt-8 border-b border-orange-500/20 pb-8">
        <p
          className="anim-fade-up font-display text-sm font-medium uppercase tracking-[0.25em] text-orange-500"
          style={{ animationDelay: "100ms" }}
        >
          {project.year}
        </p>
        <h1
          className="anim-fade-up mt-2 font-display text-4xl font-bold tracking-wider text-zinc-50 sm:text-5xl"
          style={{ animationDelay: "200ms" }}
        >
          {project.name}
        </h1>
        <p
          className="anim-fade-up mt-4 text-lg leading-8 text-zinc-300"
          style={{ animationDelay: "350ms" }}
        >
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-sm text-orange-300"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/20"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/20"
              >
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            )}
          </div>
        )}
      </header>

      {project.items && project.items.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold tracking-wider text-orange-400">
            作品列表 · {project.items.length} 件
          </h2>
          <ul className="mt-6 grid gap-3">
            {project.items.map((item, idx) => (
              <li
                key={item.url}
                className="anim-fade-up"
                style={{ animationDelay: `${500 + idx * 80}ms` }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 backdrop-blur-md transition hover:border-orange-500/60 hover:bg-orange-500/5"
                >
                  <span className="w-12 shrink-0 font-mono text-sm text-orange-500/80">
                    {item.year}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-zinc-100 transition group-hover:text-orange-300">
                      {item.title}
                    </p>
                    {item.note && (
                      <p className="mt-1 text-sm text-zinc-500">{item.note}</p>
                    )}
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-orange-400" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

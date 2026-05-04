import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const itemCount = project.items?.length ?? 0;
  const detailHint =
    itemCount > 0
      ? `查看全部 ${itemCount} 個作品`
      : project.github || project.demo
        ? "查看詳細與連結"
        : "查看詳細";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-md transition hover:border-orange-500/60 hover:shadow-[0_0_30px_-12px_rgba(249,115,22,0.45)]"
    >
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-orange-500/15 bg-zinc-950">
        <Image
          src={`/projects/${project.slug}/opengraph-image`}
          alt={`${project.name} 封面`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold text-orange-400 transition group-hover:text-orange-300">
            {project.name}
          </h3>
          <span className="text-xs text-zinc-500">{project.year}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-xs text-orange-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-3 text-xs text-zinc-500 transition group-hover:text-orange-400/80">
          <span>{detailHint}</span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" />
        </div>
      </div>
    </Link>
  );
}

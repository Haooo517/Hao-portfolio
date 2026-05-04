import { ChevronDown, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md transition hover:border-orange-500/60 hover:shadow-[0_0_30px_-12px_rgba(249,115,22,0.45)]">
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

      {project.items && project.items.length > 0 && (
        <details className="group/details mt-4 rounded-lg border border-orange-500/20 bg-black/30">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-orange-300 transition hover:bg-orange-500/5">
            <span>查看全部 {project.items.length} 個作品</span>
            <ChevronDown className="h-4 w-4 transition group-open/details:rotate-180" />
          </summary>
          <ul className="divide-y divide-orange-500/10 px-2 pb-2">
            {project.items.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-3 rounded-md px-2 py-2 transition hover:bg-orange-500/5"
                >
                  <span className="w-10 shrink-0 font-mono text-xs text-zinc-500">
                    {item.year}
                  </span>
                  <span className="flex-1 text-sm text-zinc-200">
                    <span className="transition hover:text-orange-300">
                      {item.title}
                    </span>
                    {item.note && (
                      <span className="ml-2 text-xs text-zinc-500">
                        — {item.note}
                      </span>
                    )}
                  </span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-zinc-600" />
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      {(project.github || project.demo) && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 transition hover:text-orange-400"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 transition hover:text-orange-400"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-zinc-200/80 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {project.name}
        </h3>
        <span className="text-xs text-zinc-500">{project.year}</span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
      {(project.github || project.demo) && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

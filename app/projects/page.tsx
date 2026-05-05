import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Tilt } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="anim-fade-up font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">PROJECTS</span>
      </h1>
      <p
        className="anim-fade-up mt-3 text-lg text-zinc-400"
        style={{ animationDelay: "120ms" }}
      >
        一些我做過 / 正在做的東西。
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <Reveal key={p.slug} delay={idx * 90} className="h-full">
            <Tilt className="h-full">
              <ProjectCard project={p} />
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

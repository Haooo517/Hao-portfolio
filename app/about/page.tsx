import { Briefcase, Download, GraduationCap, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { Avatar } from "@/components/avatar";
import { timeline, type TimelineEntry } from "@/lib/timeline";

export const metadata = { title: "About" };

const typeIcon: Record<TimelineEntry["type"], React.ComponentType<{ className?: string }>> =
  {
    edu: GraduationCap,
    work: Briefcase,
    project: Sparkles,
  };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="anim-fade-up flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Avatar name={site.author.name} size={96} className="shrink-0" glow />
        <div>
          <h1 className="font-display text-4xl font-bold tracking-wider text-zinc-50">
            <span className="text-orange-400">ABOUT</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            嗨，我是 <span className="font-semibold text-orange-300">{site.author.name}</span>，朋友都叫我{" "}
            <span className="font-display font-semibold uppercase tracking-wider text-orange-400">
              {site.author.nickname}
            </span>
            。
          </p>
        </div>
      </div>

      <div
        className="anim-fade-up mt-10 space-y-4 text-lg leading-8 text-zinc-300"
        style={{ animationDelay: "150ms" }}
      >
        <p>{site.description}</p>
        <p>
          這個區塊可以介紹你的背景、興趣、現在在做什麼、想做什麼。 直接編輯{" "}
          <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-base text-orange-300">
            app/about/page.tsx
          </code>
          。
        </p>
      </div>

      <h2
        className="anim-fade-up mt-12 font-display text-xl font-bold tracking-wider text-orange-400"
        style={{ animationDelay: "200ms" }}
      >
        SKILLS · 技能
      </h2>
      <div className="mt-4 space-y-4">
        {site.skills.map((category, idx) => (
          <div
            key={category.group}
            className="anim-fade-up"
            style={{ animationDelay: `${250 + idx * 80}ms` }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              {category.group}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-sm text-orange-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2
        className="anim-fade-up mt-12 font-display text-xl font-bold tracking-wider text-orange-400"
        style={{ animationDelay: "350ms" }}
      >
        TIMELINE · 經歷
      </h2>
      <ol className="mt-6 relative border-l border-orange-500/30 pl-8">
        {timeline.map((entry, idx) => {
          const Icon = typeIcon[entry.type];
          return (
            <li
              key={`${entry.period}-${entry.title}`}
              className="anim-fade-up relative pb-8 last:pb-0"
              style={{ animationDelay: `${450 + idx * 100}ms` }}
            >
              <span className="absolute -left-[2.05rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-orange-500/40 bg-zinc-950 text-orange-400">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-orange-500/80">
                {entry.period}
              </p>
              <p className="mt-1 font-semibold text-zinc-100">
                {entry.title}
                {entry.org && (
                  <span className="ml-2 text-sm font-normal text-zinc-500">
                    · {entry.org}
                  </span>
                )}
              </p>
              {entry.description && (
                <p className="mt-1 text-sm text-zinc-400">{entry.description}</p>
              )}
            </li>
          );
        })}
      </ol>

      <h2
        className="anim-fade-up mt-12 font-display text-xl font-bold tracking-wider text-orange-400"
        style={{ animationDelay: "550ms" }}
      >
        RESUME · 履歷
      </h2>
      <p className="mt-2 text-zinc-400">想了解更多細節，可以下載我的履歷 PDF。</p>
      <a
        href="/resume.pdf"
        download
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/20 hover:text-orange-200"
      >
        <Download className="h-4 w-4" /> Download Resume (PDF)
      </a>
      <p className="mt-2 text-xs text-zinc-500">
        提示：把履歷檔放到{" "}
        <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-orange-300">
          public/resume.pdf
        </code>{" "}
        就會自動有這個下載連結。
      </p>
    </div>
  );
}

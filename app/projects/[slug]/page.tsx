import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import Image from "next/image";
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

function youtubeEmbedUrl(input: string): string | null {
  try {
    const url = new URL(input);
    const list = url.searchParams.get("list");

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1);
      if (!id) return null;
      return list
        ? `https://www.youtube.com/embed/${id}?list=${list}`
        : `https://www.youtube.com/embed/${id}`;
    }

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) {
        return list
          ? `https://www.youtube.com/embed/${id}?list=${list}`
          : `https://www.youtube.com/embed/${id}`;
      }
      if (list) {
        return `https://www.youtube.com/embed/videoseries?list=${list}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

const isAnimated = (src: string) => /\.(gif|webp|apng)$/i.test(src);

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const coverSrc = project.cover ?? `/projects/${project.slug}/opengraph-image`;
  const coverAspect = project.coverAspect ?? "1200/630";

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="anim-fade inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-orange-400 hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> 回到作品列表
      </Link>

      <div
        className="anim-fade-zoom relative mt-8 overflow-hidden rounded-xl border border-orange-500/25 bg-zinc-950"
        style={{ animationDelay: "100ms", aspectRatio: coverAspect }}
      >
        <Image
          src={coverSrc}
          alt={`${project.name} 封面`}
          fill
          priority
          unoptimized={isAnimated(coverSrc)}
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <header className="mt-10 border-b border-orange-500/20 pb-8">
        <p
          className="anim-fade-up font-display text-sm font-medium uppercase tracking-[0.25em] text-orange-500"
          style={{ animationDelay: "200ms" }}
        >
          {project.year}
        </p>
        <h1
          className="anim-fade-up mt-2 font-display text-4xl font-bold tracking-wider text-zinc-50 sm:text-5xl"
          style={{ animationDelay: "300ms" }}
        >
          {project.name}
        </h1>
        <p
          className="anim-fade-up mt-4 text-lg leading-8 text-zinc-300"
          style={{ animationDelay: "400ms" }}
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

      {project.videos && project.videos.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold tracking-wider text-orange-400">
            VIDEOS · 影片 / 播放清單
          </h2>
          <div className="mt-6 grid gap-6">
            {project.videos.map((video, idx) => {
              const embed = youtubeEmbedUrl(video.url);
              return (
                <article
                  key={video.url}
                  className="anim-fade-up overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-md"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <header className="flex items-center justify-between gap-3 border-b border-orange-500/15 px-4 py-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-orange-300">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="mt-1 text-xs text-zinc-500">
                          {video.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-md border border-orange-500/30 bg-orange-500/5 px-2.5 py-1 text-xs text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/15"
                    >
                      YouTube <ExternalLink className="h-3 w-3" />
                    </a>
                  </header>
                  {embed ? (
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={embed}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <p className="p-4 text-sm text-zinc-500">
                      無法解析這個 YouTube 連結。
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {project.items && project.items.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold tracking-wider text-orange-400">
            作品列表 · {project.items.length} 件
          </h2>
          <ul className="mt-6 grid gap-3">
            {project.items.map((item, idx) => {
              const embed = item.videoUrl ? youtubeEmbedUrl(item.videoUrl) : null;
              return (
                <li
                  key={item.url}
                  className="anim-fade-up overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/60 backdrop-blur-md transition hover:border-orange-500/60"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-stretch gap-4 p-3 transition hover:bg-orange-500/5"
                  >
                    {item.cover && (
                      <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md border border-orange-500/20 bg-zinc-950 sm:w-44">
                        <Image
                          src={item.cover}
                          alt={`${item.title} 縮圖`}
                          fill
                          sizes="(min-width: 640px) 176px, 128px"
                          className="object-cover transition duration-500 group-hover:scale-[1.06]"
                        />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-orange-500/80">
                          {item.year}
                        </span>
                        <p className="truncate font-medium text-zinc-100 transition group-hover:text-orange-300">
                          {item.title}
                        </p>
                      </div>
                      {item.note && (
                        <p className="mt-1 line-clamp-3 text-sm text-zinc-400">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end justify-between py-1">
                      <ExternalLink className="h-4 w-4 text-zinc-600 transition group-hover:text-orange-400" />
                      {item.videoUrl && (
                        <PlayCircle className="h-4 w-4 text-orange-400/80" />
                      )}
                    </div>
                  </a>
                  {embed && (
                    <div className="border-t border-orange-500/20 bg-black/40 p-3">
                      <div className="aspect-video w-full overflow-hidden rounded-md">
                        <iframe
                          src={embed}
                          title={`${item.title} 試玩影片`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

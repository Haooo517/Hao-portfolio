import { Download } from "lucide-react";
import { site } from "@/lib/site";
import { Avatar } from "@/components/avatar";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Avatar name={site.author.name} size={96} className="shrink-0" />
        <div>
          <h1 className="font-display text-4xl font-bold tracking-wider text-zinc-50">
            <span className="text-orange-400">ABOUT</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            嗨，我是 <span className="font-semibold text-orange-300">{site.author.name}</span>。
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4 text-lg leading-8 text-zinc-300">
        <p>{site.description}</p>
        <p>
          這個區塊可以介紹你的背景、興趣、現在在做什麼、想做什麼。 直接編輯{" "}
          <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-base text-orange-300">
            app/about/page.tsx
          </code>
          。
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold text-orange-400">技能</h2>
      <div className="mt-4 space-y-4">
        {site.skills.map((category) => (
          <div key={category.group}>
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

      <h2 className="mt-12 text-xl font-semibold text-orange-400">履歷</h2>
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
        就會自動有這個下載連結。要換頭像就把照片放到{" "}
        <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-orange-300">
          public/avatar.jpg
        </code>{" "}
        。
      </p>
    </div>
  );
}

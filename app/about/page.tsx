import { Download } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        About
      </h1>
      <div className="mt-8 space-y-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        <p>嗨，我是 {site.author.name}。</p>
        <p>{site.description}</p>
        <p>
          這個區塊可以介紹你的背景、興趣、現在在做什麼、想做什麼。 直接編輯{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-base dark:bg-zinc-800">
            app/about/page.tsx
          </code>
          。
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        履歷
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        想了解更多細節，可以下載我的履歷 PDF。
      </p>
      <a
        href="/resume.pdf"
        download
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        <Download className="h-4 w-4" /> Download Resume (PDF)
      </a>
      <p className="mt-2 text-xs text-zinc-500">
        提示：把履歷檔放到{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          public/resume.pdf
        </code>{" "}
        就會自動有這個下載連結。
      </p>
    </div>
  );
}

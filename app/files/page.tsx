import { Send } from "lucide-react";
import Link from "next/link";
import { FileBrowserStandalone } from "@/components/file-browser";

export const metadata = { title: "Files" };

export default function FilesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="anim-fade-up font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">FILES</span>
      </h1>
      <p
        className="anim-fade-up mt-3 text-lg text-zinc-400"
        style={{ animationDelay: "120ms" }}
      >
        公開下載區。我放上來給大家拿的東西都在這裡，順手點一下就能下載。
      </p>

      <div
        className="anim-fade-up mt-10"
        style={{ animationDelay: "200ms" }}
      >
        <FileBrowserStandalone area="public" />
      </div>

      <div
        className="anim-fade-up mt-10 flex flex-col items-center gap-3 rounded-xl border border-orange-500/25 bg-zinc-950/40 px-6 py-8 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:text-left"
        style={{ animationDelay: "300ms" }}
      >
        <div>
          <p className="font-display text-sm uppercase tracking-[0.25em] text-orange-400/80">
            想傳檔案給我？
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            有暗號就能丟檔案進我的收件夾。
          </p>
        </div>
        <Link
          href="/files/send"
          className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.03] hover:bg-orange-400 hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.7)]"
        >
          <Send className="h-4 w-4" /> 傳給我
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { CatanTerminalLoader } from "@/components/catan-terminal-loader";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Catan Terminal",
  description:
    "Single-player Catan compiled from C to WebAssembly, running in your browser via xterm.js.",
};

export default function CatanProjectPage() {
  const description = projects.find((p) => p.slug === "catan-online")?.description;
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-orange-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Projects
      </Link>

      <h1 className="mt-6 font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">Catan</span> Terminal
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-400">
        單機版卡坦島，用 C 寫，編譯成 WebAssembly 在你的瀏覽器跑。
        終端機介面，直接點擊終端機區域後輸入數字操作。
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <a
          href="https://github.com/Haooo517/catan-online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-zinc-300 transition-colors hover:border-orange-500 hover:text-orange-400"
        >
          <GithubIcon className="h-4 w-4" />
          Source
        </a>
        <span className="rounded-full border border-zinc-800 px-3 py-1.5 text-zinc-500">
          C · Emscripten · WebAssembly · xterm.js
        </span>
      </div>

      {description && description.length > 0 && (
        <section className="mt-8 max-w-3xl space-y-4 text-base leading-8 text-zinc-300 sm:text-lg">
          {description.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>
      )}

      <div className="mt-8 lg:hidden rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-sm text-amber-400/90">
        提醒：地圖約 100 字寬，建議在桌機 / 平板瀏覽。手機可以橫螢幕，但會比較擠。
      </div>

      <div className="mt-6">
        <CatanTerminalLoader />
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wider text-zinc-100">
            玩法
          </h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-zinc-400">
            <li>主選單選 <span className="text-zinc-200">1</span> 開始遊戲。</li>
            <li>
              準備階段每人放 2 個村莊 + 2 條路 (蛇行順序)，第二個村莊立刻拿到
              鄰格資源。村莊頂點編號 1–54，邊編號 1–72。
            </li>
            <li>
              每回合：擲骰 → 鄰格產資源 (城市 ×2)、骰 7 觸發強盜 → 建造 / 買賣 /
              發展卡 → 結束回合。
            </li>
            <li>第一個拿到 <span className="text-orange-400">10 分</span> 的人獲勝。</li>
          </ol>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold tracking-wider text-zinc-100">
            技術細節
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-zinc-400">
            <li>純 C11 寫的遊戲引擎，跨平台編譯 (Linux / macOS / Windows)。</li>
            <li>
              用 <span className="text-zinc-200">Emscripten Asyncify</span> 把
              C 的同步 <code className="rounded bg-zinc-800/60 px-1">getch</code> /
              <code className="rounded bg-zinc-800/60 px-1">fgets</code> 接到
              JS 的 Promise，所以 C 程式不用改架構就能在瀏覽器跑。
            </li>
            <li>
              ANSI escape codes 直接交給 xterm.js 渲染顏色，地圖配色完整保留。
            </li>
            <li>
              發展卡、最長路 (DFS)、最大騎士團、港口交易、玩家對玩家交易 全部實作。
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

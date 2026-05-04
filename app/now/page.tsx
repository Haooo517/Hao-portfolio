import { Code2, GraduationCap, Gamepad2, Music, Sparkles } from "lucide-react";

export const metadata = { title: "Now" };

// 編輯這裡更新「我現在在做什麼」。每次有新進度就改一次。
const lastUpdated = "2026-05-04";

const sections = [
  {
    icon: Code2,
    title: "正在做",
    items: [
      "持續打磨這個個人網站，加入更多互動效果",
      "[填入你正在做的專案 / 工作 / side project]",
    ],
  },
  {
    icon: GraduationCap,
    title: "正在學",
    items: [
      "[填入正在學的技術、課程、新框架]",
      "Next.js 16、React Server Components",
    ],
  },
  {
    icon: Gamepad2,
    title: "正在玩",
    items: [
      "[填入最近在玩的遊戲]",
    ],
  },
  {
    icon: Music,
    title: "正在聽",
    items: [
      "[填入最近在聽的音樂、歌單、Podcast]",
    ],
  },
] as const;

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="anim-fade-up flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-orange-400" />
        <h1 className="font-display text-4xl font-bold tracking-wider text-zinc-50">
          <span className="text-orange-400">NOW</span>
        </h1>
      </div>

      <p
        className="anim-fade-up mt-3 text-lg text-zinc-400"
        style={{ animationDelay: "120ms" }}
      >
        這頁紀錄我「現在」在忙什麼、學什麼、玩什麼。
        參考自{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-300 underline-offset-4 hover:underline"
        >
          /now movement
        </a>
        ，是個比社群動態更慢、比履歷更近的空間。
      </p>

      <p
        className="anim-fade-up mt-2 font-mono text-xs text-zinc-500"
        style={{ animationDelay: "180ms" }}
      >
        最後更新：{lastUpdated}
      </p>

      <div className="mt-12 space-y-8">
        {sections.map(({ icon: Icon, title, items }, idx) => (
          <section
            key={title}
            className="anim-fade-up rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md"
            style={{ animationDelay: `${300 + idx * 120}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400">
                <Icon className="h-4 w-4" />
              </span>
              <h2 className="font-display text-lg font-bold tracking-wider text-orange-400">
                {title.toUpperCase()}
              </h2>
              <span className="font-display text-base text-zinc-300">
                · {title}
              </span>
            </div>
            <ul className="mt-4 space-y-2 pl-12">
              {items.map((item) => (
                <li
                  key={item}
                  className="relative text-zinc-300 before:absolute before:-left-5 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-orange-500/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

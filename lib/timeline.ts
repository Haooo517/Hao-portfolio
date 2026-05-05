export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  description?: string;
  type: "edu" | "work" | "project";
};

// 編輯這個陣列來增減時間軸條目，新的放在最前面（最上方）。
export const timeline: TimelineEntry[] = [
  {
    period: "2026 –",
    title: "個人作品集網站",
    org: "side project",
    description: "Next.js 16 + Tailwind v4，把作品和個人空間整理成一個地方。",
    type: "project",
  },
  {
    period: "2023",
    title: "Catan Terminal",
    org: "side project",
    description:
      "用 C 寫的單機版卡坦島，後來再用 Emscripten 編譯成 WebAssembly + xterm.js 在瀏覽器裡可玩。",
    type: "project",
  },
  {
    period: "2019 – 2022",
    title: "Minecraft 地圖系列",
    org: "巴哈姆特",
    description: "陸續發表 9 張整人 / 解謎 / 跑酷 / 密室地圖。",
    type: "project",
  },
  {
    period: "[年份]",
    title: "[填入學歷 / 工作 / 重要里程碑]",
    org: "[學校 / 公司]",
    description: "[一句話描述]",
    type: "edu",
  },
];

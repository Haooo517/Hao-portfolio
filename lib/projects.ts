export type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
  year: number;
};

// 把下面的範例換成你真的做過的專案。
// 排序會按照陣列順序顯示，最新的放最前面。
export const projects: Project[] = [
  {
    slug: "hao-portfolio",
    name: "個人作品集網站",
    summary: "你正在看的這個網站。Next.js 16 + Tailwind v4，橘黑配色。",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/Haooo517/Hao-portfolio",
    year: 2026,
  },
  {
    slug: "example-project",
    name: "範例專案（待替換）",
    summary: "把這裡換成你的專案介紹。一兩句話講做了什麼、解決了什麼問題。",
    tech: ["TypeScript", "React"],
    github: "https://github.com/Haooo517",
    year: 2025,
  },
];

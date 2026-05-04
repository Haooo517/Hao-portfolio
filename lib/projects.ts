export type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
  year: number;
};

export const projects: Project[] = [
  {
    slug: "example-project",
    name: "範例專案一",
    summary: "把這裡換成你的專案介紹。一兩句話講做了什麼、解決了什麼問題。",
    tech: ["TypeScript", "React", "Next.js"],
    github: "https://github.com/Haooo517",
    year: 2026,
  },
  {
    slug: "another-project",
    name: "範例專案二",
    summary: "再寫一個專案。可以加上 demo 連結讓訪客直接體驗。",
    tech: ["Python", "FastAPI"],
    github: "https://github.com/Haooo517",
    demo: "https://example.com",
    year: 2025,
  },
];

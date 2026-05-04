export const site = {
  name: "張訓豪",
  title: "張訓豪 — 個人作品集",
  description: "一個工程師的作品集與個人空間",
  url: "https://hao-portfolio.vercel.app",
  author: {
    name: "張訓豪",
    email: "howard940517@gmail.com",
    github: "https://github.com/Haooo517",
    linkedin: "",
  },
  nav: [
    { href: "/", label: "首頁" },
    { href: "/projects", label: "作品" },
    { href: "/about", label: "關於我" },
    { href: "/files", label: "檔案" },
    { href: "/contact", label: "聯絡" },
  ],
  skills: [
    {
      group: "語言",
      items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
    },
    {
      group: "前端",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      group: "後端 / 工具",
      items: ["Node.js", "Git", "REST API"],
    },
  ],
} as const;

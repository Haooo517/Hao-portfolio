export const site = {
  name: "Hao",
  title: "Hao — 個人作品集",
  description: "一個工程師的作品集與個人空間",
  url: "https://hao-portfolio-xi.vercel.app",
  author: {
    name: "張訓豪",
    nickname: "Hao",
    email: "howard940517@gmail.com",
    github: "https://github.com/Haooo517",
    instagram: "https://www.instagram.com/haooo.517_/",
    linkedin: "",
  },
  nav: [
    { href: "/", label: "首頁" },
    { href: "/projects", label: "作品" },
    { href: "/about", label: "關於我" },
    { href: "/now", label: "Now" },
    { href: "/files", label: "檔案" },
    { href: "/contact", label: "聯絡" },
  ],
  skills: [
    {
      group: "語言",
      items: ["C", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      group: "框架 / 函式庫",
      items: ["Vue", "React", "Next.js", "Tailwind CSS"],
    },
    {
      group: "工具 / 平台",
      items: ["WebAssembly", "Emscripten", "xterm.js", "WebGL", "Git"],
    },
  ],
} as const;

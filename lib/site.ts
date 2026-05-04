export const site = {
  name: "Hao",
  title: "Hao — 個人作品集",
  description: "一個工程師的作品集與個人空間",
  url: "https://hao-portfolio.vercel.app",
  author: {
    name: "Hao",
    email: "howard940517@gmail.com",
    github: "https://github.com/howard940517",
    linkedin: "",
  },
  nav: [
    { href: "/", label: "首頁" },
    { href: "/projects", label: "作品" },
    { href: "/about", label: "關於我" },
    { href: "/files", label: "檔案" },
    { href: "/contact", label: "聯絡" },
  ],
} as const;

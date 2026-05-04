export type ProjectItem = {
  title: string;
  url: string;
  year: number;
  note?: string;
  videoUrl?: string; // YouTube watch URL — auto-converted to embed
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
  year: number;
  items?: ProjectItem[];
};

// 把下面的範例換成你真的做過的專案。陣列順序就是顯示順序，最新的放最前面。
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
    slug: "minecraft-maps",
    name: "Minecraft 地圖系列",
    summary:
      "2019–2022 年在巴哈姆特發表的整人、解謎、密室、跑酷地圖，共 9 張作品。",
    tech: ["Minecraft", "Map Design", "巴哈姆特"],
    year: 2022,
    items: [
      {
        title: "思想囚牢 (Mind Prison)",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=196775",
        year: 2022,
        note: "密室逃脫 / 邏輯推理",
      },
      {
        title: "坑爹直直走 Ver. FINAL",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=189336",
        year: 2021,
        note: "解謎 + 跑酷，含計時挑戰",
      },
      {
        title: "到不了的終點",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=183760",
        year: 2020,
        note: "愚人節單場景冒險",
      },
      {
        title: "坑爹直直走 第三代",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=175722",
        year: 2019,
        note: "劇情向整人地圖",
      },
      {
        title: "坑爹直直走 Ver.4",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=178659",
        year: 2019,
        note: "雙人雙路線跑酷",
      },
      {
        title: "消失的第二十關",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=174739",
        year: 2019,
        note: "拼圖解謎",
      },
      {
        title: "整人手法記事簿",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=174188",
        year: 2019,
        note: "愚人節十關陷阱集",
      },
      {
        title: "坑爹直直走 Ver.2",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=173319",
        year: 2019,
        note: "單人惡作劇關卡",
      },
      {
        title: "坑爹直直走 Ver.1",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=172933",
        year: 2019,
        note: "系列首作",
      },
    ],
  },
];

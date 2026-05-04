export type ProjectItem = {
  title: string;
  url: string;
  year: number;
  note?: string;
  videoUrl?: string; // YouTube watch / short / playlist URL — auto-converted to embed
};

export type ProjectVideo = {
  title: string;
  url: string; // YouTube watch / playlist URL
  description?: string;
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
  videos?: ProjectVideo[]; // dedicated section showing one or more playlists / videos
  cover?: string; // optional path under /public; falls back to dynamic OG
  coverAspect?: string; // CSS aspect-ratio (e.g. "1250/375"); defaults to "1200/630"
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
    cover: "/preview/minecraft.gif",
    coverAspect: "1250/375",
    videos: [
      {
        title: "全系列實況播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR_3Bum7Aa4ucGkRA9CAR2Ml",
        description:
          "[填入這個播放清單的描述，例如：完整收錄各張地圖的實況影片]",
      },
    ],
    items: [
      {
        title: "思想囚牢",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=196775",
        year: 2022,
        note: "仿真密室逃脫，快來挑戰你能在多久以內逃離這裡吧！",
      },
      {
        title: "坑爹直直走 Ver.FINAL",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=189336",
        year: 2021,
        note: "結合作者所有坑爹技巧的終極版本，挑戰你的忍受力和反應力！",
      },
      {
        title: "到不了的終點",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=183760",
        year: 2020,
        note: "明明終點就近在眼前，到底要怎麼做才能抵達呢？",
      },
      {
        title: "坑爹直直走 Ver.4",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=178659",
        year: 2019,
        note: "做給某知名實況主的雙人坑爹地圖，不考驗默契也不考驗合作，只考驗你們能忍受多久！",
      },
      {
        title: "坑爹直直走 Ver.3",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=175722",
        year: 2019,
        note: "一場心碎的故事引出的系列第三作，儘管以劇情為主軸，坑爹元素卻依然滿滿！",
      },
      {
        title: "消失的第二十關",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=174739",
        year: 2019,
        note: "還記得上一張地圖裡消失的關卡嗎？來看看他的內容到底是什麼吧！",
      },
      {
        title: "整人手法記事簿",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=174188",
        year: 2019,
        note: "愚人節特製的整人地圖，裡面收錄了各種不同類型的坑爹手法，只要玩過就不會再被坑了...嗎？",
      },
      {
        title: "坑爹直直走 Ver.2",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=173319",
        year: 2019,
        note: "緊接著推出的系列第二彈，似乎隱藏著要給某人的小小驚喜？",
      },
      {
        title: "坑爹直直走 Ver.1",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=172933",
        year: 2019,
        note: "坑爹直直走的問世之作，一起來體驗想要一拳砸爆螢幕的感覺吧！",
      },
    ],
  },
];

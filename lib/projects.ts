export type ProjectItem = {
  title: string;
  url: string;
  year: number;
  note?: string;
  videoUrl?: string; // YouTube watch / short / playlist URL — auto-converted to embed
  cover?: string; // optional thumbnail path under /public (16:9 looks best)
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
  externalUrl?: string; // if set, the card links here in a new tab instead of /projects/[slug]
};

// 把下面的範例換成你真的做過的專案。陣列順序就是顯示順序，最新的放最前面。
export const projects: Project[] = [
  {
    slug: "snake-game-3d",
    name: "3D 貪食蛇",
    summary: "用 WebGL 從零寫的 3D 貪食蛇，可以在瀏覽器裡直接玩。",
    tech: ["JavaScript", "WebGL"],
    github: "https://github.com/Haooo517/snake-game-3d",
    demo: "https://haooo517.github.io/snake-game-3d/",
    cover: "/home-page/preview/snake.png",
    coverAspect: "1082/777",
    year: 2025,
  },
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
    cover: "/home-page/preview/minecraft.gif",
    coverAspect: "1250/375",
    items: [
      {
        title: "【坑爹直直走 Ver.1】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=172933",
        year: 2019,
        note: "坑爹直直走的問世之作，一起來體驗想要一拳砸爆螢幕的感覺吧！",
        cover: "/project-page/minecraft/walkthrough1.jpg",
      },
      {
        title: "【坑爹直直走 Ver.2】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=173319",
        year: 2019,
        note: "緊接著推出的系列第二彈，似乎隱藏著要給某人的小小驚喜？",
        cover: "/project-page/minecraft/walkthrough2.jpg",
      },
      {
        title: "【坑爹直直走 Ver.3】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=175722",
        year: 2019,
        note: "一場心碎的故事引出的系列第三作，儘管以劇情為主軸，坑爹元素卻依然滿滿！",
        cover: "/project-page/minecraft/walkthrough3.jpg",
      },
      {
        title: "【坑爹直直走 Ver.4】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=178659",
        year: 2019,
        note: "做給某知名實況主的雙人坑爹地圖，不考驗默契也不考驗合作，只考驗你們能忍受多久！",
        cover: "/project-page/minecraft/walkthrough4.jpg",
      },
      {
        title: "【坑爹直直走 Ver.FINAL】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=189336",
        year: 2021,
        note: "結合作者所有坑爹技巧的終極版本，挑戰你的忍受力和反應力！",
        cover: "/project-page/minecraft/walkthrough5.jpg",
      },
      {
        title: "【整人手法記事簿】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=174188",
        year: 2019,
        note: "愚人節特製的整人地圖，裡面收錄了各種不同類型的坑爹手法，只要玩過就不會再被坑了...嗎？",
        cover: "/project-page/minecraft/trollingways.jpg",
      },
      {
        title: "【思想囚牢】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=196775",
        year: 2022,
        note: "仿真密室逃脫，快來挑戰你能在多久以內逃離這裡吧！",
        cover: "/project-page/minecraft/mindprison.jpg",
      },
      {
        title: "【到不了的終點】",
        url: "https://forum.gamer.com.tw/C.php?bsn=18673&snA=183760",
        year: 2020,
        note: "明明終點就近在眼前，到底要怎麼做才能抵達呢？",
        cover: "/project-page/minecraft/unreachable.jpg",
      },
    ],
    videos: [
      {
        title: "【坑爹直直走 Ver.1】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR_3Bum7Aa4ucGkRA9CAR2Ml&si=H2PTX2VcA2W29cNW",
        description:
          "作為第一張坑爹直直走地圖，許多陷阱都尚且不夠成熟，但也因此充滿了各種天馬行空的創意，歡迎來看看這個系列的起點！",
      },
      {
        title: "【坑爹直直走 Ver.2】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR932-JkIBdmqVzYzCQfA2n4&si=Qr0kujP7eUsgwfLV",
        description:
          "第二張地圖除了單純的指令設計，也加入了劇情和材質包的變量，讓整體的體驗更加豐富多元，一起來看看各個實況主的反應吧！",
      },
      {
        title: "【坑爹直直走 Ver.3】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR_TRKEX4pDxSg3p2zN6eSOc&si=gGk4epoXtYjS1-Pf",
        description:
          "第三張地圖融入了我的心碎故事，並將其與坑爹元素結合，創造出一個充滿情感起伏的遊戲體驗，歡迎來看看這個系列中最具故事性的作品！",
      },
      {
        title: "【坑爹直直走 Ver.4】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR8oc6C9CA78_UX46EjU4itL&si=Ilio37mSXozr6JVg",
        description:
          "第四張地圖是為了慶祝某知名實況主突破一百萬訂閱，因而量身打造的雙人坑爹地圖，可以來看看該實況主和他朋友的反應唷！",
      },
      {
        title: "【坑爹直直走 Ver.FINAL】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR9_OcdNnDRwLI4fuDdBuLQs&si=D2enTxUJKqtiO5du",
        description:
          "作為坑爹直直走系列的終極版本，這張地圖結合了我已知的所有坑爹技巧，是我最滿意也最困難的作品，一起來看看各個實況主在痛苦中掙扎吧！",
      },
      {
        title: "【整人手法記事簿】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR_j6jpMTZMNHnnaXn5xEUz2&si=PlKcbmZ7BChkmNjo",
        description:
          "為了慶祝愚人節而製作的整人地圖，不乏各個實況主在四月一號當天被坑的影片，此地圖甚至被收錄進了阿神的書裡，歡迎來看看這個充滿各種坑爹手法的地圖吧！",
      },
      {
        title: "【思想囚牢】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR_K-tcprQ6JEqFrtH62sUvA&si=CnfDC9vrGUVT4x8w",
        description:
          "第一次嘗試製作密室逃脫類型的地圖，裡面有許多仿真的機關設計，一起跟著這些實況主來看看，如果是你有沒有辦法破解每一道謎題吧！",
      },
      {
        title: "【到不了的終點】 播放清單",
        url: "https://youtube.com/playlist?list=PL1ooxyQKbtR8YMx28EEXwSEI5DQZ1-Z_J&si=7ZQyq24HpTysQNMA",
        description:
          "一個簡單輕鬆的小品，明明終點就在眼前，但卻總是無法抵達，歡迎來看看我怎麼在相同的場景設計出各種別出心裁的陷阱吧！",
      },
    ],
  },
];

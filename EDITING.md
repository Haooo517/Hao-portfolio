# 怎麼改內容

這個網站把所有「常常會改的東西」集中在幾個檔案，不需要動到頁面 JSX。

## 1. 個人資訊 / 導航列 / 網址

[lib/site.ts](lib/site.ts) — 改你的名字、簡介、GitHub、Email、導航列項目、網站網址。

```ts
export const site = {
  name: "Hao",
  title: "Hao — 個人作品集",
  description: "...",
  url: "https://hao-portfolio.vercel.app",
  author: { name, email, github, linkedin },
  nav: [...],
};
```

## 2. 作品集

[lib/projects.ts](lib/projects.ts) — 在陣列裡新增 / 刪除專案。最上面的 3 個會自動出現在首頁的 Featured Projects。

```ts
{
  slug: "my-cool-app",
  name: "My Cool App",
  summary: "一句話說明這個專案。",
  tech: ["TypeScript", "Next.js"],
  github: "https://github.com/.../...",
  demo: "https://...",   // 可選
  year: 2026,
}
```

## 3. 公開檔案下載

把檔案丟到 [public/](public/) 資料夾（例如 `public/resume.pdf`），然後編輯 [app/files/page.tsx](app/files/page.tsx) 最上面的 `files` 陣列：

```ts
const files: DownloadFile[] = [
  { name: "Resume.pdf", description: "我的履歷", href: "/resume.pdf", size: "150 KB" },
];
```

履歷 PDF 同時也會被 [app/about/page.tsx](app/about/page.tsx) 的「下載履歷」按鈕引用，所以建議命名 `public/resume.pdf`。

## 4. About 頁面文字

直接編輯 [app/about/page.tsx](app/about/page.tsx) 裡面的段落文字。

## 5. 樣式 / 顏色

[app/globals.css](app/globals.css) 控制全站的背景色、字體。元件的顏色用 Tailwind class 直接寫在 JSX 裡。

## 開發指令

```powershell
npm run dev      # 本地開發 (http://localhost:3000)
npm run build    # 產出生產版本
npm run lint     # 檢查語法
```

## 部署到 Vercel

1. 把專案推到 GitHub（私人或公開都可以）
2. 到 [vercel.com](https://vercel.com)，用 GitHub 登入
3. Import 這個 repo，Vercel 會自動偵測 Next.js
4. 按 Deploy，幾秒後就有一個 `xxx.vercel.app` 網址
5. 之後每次 `git push`，Vercel 會自動重新部署

## 之後想加的東西

計畫檔在 `C:\Users\user\.claude\plans\github-golden-castle.md`，列了未來可以加的功能（深色模式切換、GitHub API 自動同步作品、blog、Contact 表單寄信等）。需要時叫我加就好。

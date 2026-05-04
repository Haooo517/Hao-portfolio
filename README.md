# 張訓豪 — 個人作品集

橘黑配色的個人網站，用 Next.js 16 + Tailwind v4 寫的。

> 線上版：<https://hao-portfolio.vercel.app>（部署完再更新成你自己的網址）

## 本機開發

```bash
npm install
npm run dev
```

打開 <http://localhost:3000>。

## 自訂內容

| 想改什麼      | 編輯這個檔案                   |
| ------------- | ------------------------------ |
| 名字 / 連結   | `lib/site.ts`                  |
| 技能          | `lib/site.ts` 的 `skills` 欄位 |
| 作品集        | `lib/projects.ts`              |
| 首頁文案      | `app/page.tsx`                 |
| 自我介紹      | `app/about/page.tsx`           |
| 履歷 PDF      | 把檔案放到 `public/resume.pdf` |
| 頭像照片      | 把檔案放到 `public/avatar.jpg` |
| OG 分享圖     | `app/opengraph-image.tsx`      |

## 部署到 Vercel

最快路徑：

1. 進入 <https://vercel.com/new>，用 GitHub 帳號登入
2. 選 `Haooo517/Hao-portfolio` 這個 repo
3. 全部用預設值，按 **Deploy**
4. 一分鐘後拿到 `xxx.vercel.app` 的網址，自動 HTTPS、自動 CDN

之後每次 `git push` 到 `main` 都會自動重新部署。

### 自訂網域（選配）

買好網域後在 Vercel Dashboard → Project → **Settings → Domains** 加上去，
按指示去網域商那邊改 DNS。Vercel 會自動發 SSL 憑證。

部署完記得回來改 `lib/site.ts` 的 `url` 欄位，OG 分享圖才會用對的網址。

## 技術棧

- [Next.js 16](https://nextjs.org/) — React 框架，App Router
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) — 樣式
- [lucide-react](https://lucide.dev/) — 圖示
- [next/og](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) — 動態生成 OG 分享圖

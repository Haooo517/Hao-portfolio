import { Download, FileText } from "lucide-react";

type DownloadFile = {
  name: string;
  description: string;
  href: string;
  size?: string;
};

const files: DownloadFile[] = [
  // 編輯這個陣列來新增 / 移除檔案。把檔案放到 public/ 資料夾下，這裡的 href 寫 "/檔名"。
  // 範例：
  // { name: "Resume.pdf", description: "我的履歷", href: "/resume.pdf", size: "150 KB" },
];

export const metadata = { title: "Files" };

export default function FilesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Files
      </h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">公開下載區。</p>

      {files.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-12 text-center text-zinc-500 dark:border-zinc-700">
          <FileText className="mx-auto h-8 w-8 opacity-50" />
          <p className="mt-3">
            還沒有檔案。把檔案放到{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              public/
            </code>
            ，並編輯{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              app/files/page.tsx
            </code>{" "}
            的 files 陣列。
          </p>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {files.map((file) => (
            <li key={file.href} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{file.name}</p>
                <p className="text-sm text-zinc-500">
                  {file.description}
                  {file.size && ` · ${file.size}`}
                </p>
              </div>
              <a
                href={file.href}
                download
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                <Download className="h-4 w-4" /> 下載
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
      <h1 className="font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">FILES</span>
      </h1>
      <p className="mt-3 text-lg text-zinc-400">公開下載區。</p>

      {files.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-orange-500/30 p-12 text-center text-zinc-500">
          <FileText className="mx-auto h-8 w-8 text-orange-400/60" />
          <p className="mt-3">
            還沒有檔案。把檔案放到{" "}
            <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-sm text-orange-300">
              public/
            </code>
            ，並編輯{" "}
            <code className="rounded bg-orange-500/10 px-1.5 py-0.5 text-sm text-orange-300">
              app/files/page.tsx
            </code>{" "}
            的 files 陣列。
          </p>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-zinc-800 rounded-lg border border-zinc-800">
          {files.map((file) => (
            <li key={file.href} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium text-zinc-100">{file.name}</p>
                <p className="text-sm text-zinc-500">
                  {file.description}
                  {file.size && ` · ${file.size}`}
                </p>
              </div>
              <a
                href={file.href}
                download
                className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-300 transition hover:border-orange-400 hover:bg-orange-500/20 hover:text-orange-200"
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

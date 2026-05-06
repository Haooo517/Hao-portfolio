"use client";

import { CheckCircle2, Loader2, Upload, XCircle } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { ADMIN_HEADER, FRIEND_HEADER } from "@/lib/auth";
import { MAX_UPLOAD_BYTES, buildInboxKey, sanitizeFilename } from "@/lib/storage";

type Props = {
  /** Where the upload should land. */
  target: "public" | "inbox";
  /** For target="public": relative folder under public/ (e.g. "shared/photos"). Empty = root */
  publicFolder?: string;
  /** Credentials sent inside clientPayload to the upload API */
  credentials: { friendCode?: string; adminPassword?: string };
  onUploaded?: () => void;
};

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number; filename: string }
  | { kind: "success"; filename: string }
  | { kind: "error"; message: string };

export function UploadZone({ target, publicFolder = "", credentials, onUploaded }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (list.length === 0) return;

    for (const file of list) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setStatus({
          kind: "error",
          message: `「${file.name}」超過 50MB 上限`,
        });
        return;
      }

      const pathname =
        target === "inbox"
          ? buildInboxKey(file.name)
          : `public/${
              publicFolder
                ? sanitizeFilename(publicFolder).replace(/^\/|\/$/g, "") + "/"
                : ""
            }${sanitizeFilename(file.name)}`;

      setStatus({ kind: "uploading", progress: 0, filename: file.name });

      try {
        await upload(pathname, file, {
          access: "public",
          handleUploadUrl: "/api/files/upload",
          clientPayload: JSON.stringify(credentials),
          onUploadProgress: (event) => {
            setStatus({
              kind: "uploading",
              progress: event.percentage,
              filename: file.name,
            });
          },
        });

        setStatus({ kind: "success", filename: file.name });
        onUploaded?.();
      } catch (err) {
        setStatus({
          kind: "error",
          message: err instanceof Error ? err.message : "上傳失敗",
        });
      }
    }
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition ${
          dragOver
            ? "border-orange-400 bg-orange-500/10"
            : "border-orange-500/30 bg-zinc-950/40 hover:border-orange-400/60 hover:bg-orange-500/5"
        }`}
      >
        <Upload className="h-7 w-7 text-orange-400/80" />
        <p className="text-sm text-zinc-300">
          把檔案拖進這個框，或
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="ml-1.5 text-orange-300 underline-offset-4 hover:underline"
          >
            點此選檔
          </button>
        </p>
        <p className="text-xs text-zinc-500">單檔上限 50MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {status.kind === "uploading" && (
        <div className="flex items-center gap-3 rounded-lg border border-orange-500/30 bg-orange-500/5 px-4 py-3 text-sm">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-orange-400" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-zinc-200">{status.filename}</p>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-orange-400 transition-all"
                style={{ width: `${status.progress}%` }}
              />
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs text-orange-300">
            {status.progress.toFixed(0)}%
          </span>
        </div>
      )}

      {status.kind === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>「{status.filename}」上傳完成。</span>
        </div>
      )}

      {status.kind === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <XCircle className="h-4 w-4 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}

export function buildAuthHeaders(opts: {
  friendCode?: string;
  adminPassword?: string;
}): Record<string, string> {
  const headers: Record<string, string> = {};
  if (opts.friendCode) headers[FRIEND_HEADER] = opts.friendCode;
  if (opts.adminPassword) headers[ADMIN_HEADER] = opts.adminPassword;
  return headers;
}

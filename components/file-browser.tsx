"use client";

import {
  ArrowLeft,
  Download,
  FileText,
  Folder,
  Loader2,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { humanSize } from "@/lib/storage";

export type FileRow = {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
  pathname: string;
};

export type FolderRow = {
  name: string;
  path: string;
};

type Props = {
  area: "public" | "inbox";
  /** Current sub-path under the area, no leading slash, no area prefix */
  path: string;
  /** Pass undefined for unauthenticated calls */
  authHeaders?: HeadersInit;
  /** Called when path changes (clicking a folder / breadcrumb) */
  onNavigate: (newPath: string) => void;
  /** Show admin-only actions like delete */
  adminControls?: boolean;
  /** Called after successful delete so caller can refresh / toast */
  onDeleted?: (file: FileRow) => void;
  /** Called after admin "promote" to public */
  onPromoted?: (file: FileRow) => void;
  /** Refresh trigger — bump this number to refetch */
  refreshKey?: number;
};

export function FileBrowser({
  area,
  path,
  authHeaders,
  onNavigate,
  adminControls = false,
  onDeleted,
  onPromoted,
  refreshKey = 0,
}: Props) {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [folders, setFolders] = useState<FolderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actingOn, setActingOn] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ area });
    if (path) params.set("path", path);

    fetch(`/api/files/list?${params.toString()}`, { headers: authHeaders })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        if (cancelled) return;
        setFolders(json.folders ?? []);
        setFiles(json.files ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [area, path, refreshKey, authHeaders]);

  const segments = path ? path.split("/").filter(Boolean) : [];
  const empty = !loading && folders.length === 0 && files.length === 0;

  async function handleDelete(file: FileRow) {
    if (!confirm(`刪除「${file.name}」？此操作無法復原。`)) return;
    setActingOn(file.pathname);
    try {
      const res = await fetch("/api/files/delete", {
        method: "POST",
        headers: { ...authHeaders, "content-type": "application/json" },
        body: JSON.stringify({ url: file.url }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Delete failed");
      }
      onDeleted?.(file);
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setActingOn(null);
    }
  }

  async function handlePromote(file: FileRow) {
    const targetPath = prompt(
      `把「${file.name}」搬到 public/ 底下哪個路徑？\n` +
        "範例：shared/photos/foo.jpg",
      `shared/${file.name}`,
    );
    if (!targetPath) return;
    setActingOn(file.pathname);
    try {
      const res = await fetch("/api/files/promote", {
        method: "POST",
        headers: { ...authHeaders, "content-type": "application/json" },
        body: JSON.stringify({ sourceUrl: file.url, targetPath }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Promote failed");
      }
      onPromoted?.(file);
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setActingOn(null);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-md">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-orange-500/15 px-4 py-3 text-sm">
        {segments.length > 0 ? (
          <button
            type="button"
            onClick={() =>
              onNavigate(segments.slice(0, -1).join("/"))
            }
            className="inline-flex items-center gap-1 text-zinc-400 transition hover:text-orange-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> 上一層
          </button>
        ) : (
          <span className="text-zinc-500">/</span>
        )}
        <span className="text-zinc-600">·</span>
        <code className="font-mono text-xs text-orange-300/80">
          {area}/{segments.join("/") || ""}
        </code>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 px-4 py-12 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" /> 載入中…
        </div>
      )}

      {error && !loading && (
        <div className="px-4 py-12 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && empty && (
        <div className="px-4 py-12 text-center text-sm text-zinc-500">
          這個資料夾是空的。
        </div>
      )}

      <ul className="divide-y divide-zinc-800/60">
        {folders.map((f) => (
          <li key={f.path}>
            <button
              type="button"
              onClick={() => onNavigate(f.path)}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-orange-500/5"
            >
              <Folder className="h-5 w-5 shrink-0 text-orange-400/80" />
              <span className="flex-1 truncate font-medium text-zinc-200 transition group-hover:text-orange-300">
                {f.name}
              </span>
              <span className="text-xs text-zinc-600">資料夾</span>
            </button>
          </li>
        ))}

        {files.map((file) => {
          const isActing = actingOn === file.pathname;
          return (
            <li
              key={file.url}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-orange-500/5"
            >
              <FileText className="h-5 w-5 shrink-0 text-zinc-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-zinc-100">
                  {file.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {humanSize(file.size)} ·{" "}
                  {new Date(file.uploadedAt).toLocaleString("zh-TW", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <a
                  href={file.url}
                  download={file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-orange-500/25 text-orange-400/80 transition hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                  aria-label="下載"
                  title="下載"
                >
                  <Download className="h-3.5 w-3.5" />
                </a>
                {adminControls && area === "inbox" && (
                  <button
                    type="button"
                    onClick={() => handlePromote(file)}
                    disabled={isActing}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-orange-500/25 text-orange-400/80 transition hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-300 disabled:opacity-50"
                    aria-label="搬到 public"
                    title="搬到 public/"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
                {adminControls && (
                  <button
                    type="button"
                    onClick={() => handleDelete(file)}
                    disabled={isActing}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-500/25 text-red-400/80 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                    aria-label="刪除"
                    title="刪除"
                  >
                    {isActing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Convenience wrapper that owns the path state (most pages just need this).
 */
export function FileBrowserStandalone(
  props: Omit<Props, "path" | "onNavigate"> & { initialPath?: string },
) {
  const { initialPath = "", refreshKey, ...rest } = props;
  const [path, setPath] = useState(initialPath);
  const [internalRefresh, setInternalRefresh] = useState(0);

  return (
    <div className="space-y-3">
      <FileBrowser
        {...rest}
        path={path}
        refreshKey={(refreshKey ?? 0) + internalRefresh}
        onNavigate={setPath}
        onDeleted={(f) => {
          setInternalRefresh((n) => n + 1);
          rest.onDeleted?.(f);
        }}
        onPromoted={(f) => {
          setInternalRefresh((n) => n + 1);
          rest.onPromoted?.(f);
        }}
      />
      {/* Hidden link kept so this stays a sole-child page when used directly */}
      <Link href="" className="sr-only" aria-hidden>
        .
      </Link>
    </div>
  );
}

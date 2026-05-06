"use client";

import { ArrowLeft, KeyRound, Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileBrowser } from "@/components/file-browser";
import { UploadZone, buildAuthHeaders } from "@/components/upload-zone";

const STORAGE_KEY = "hao_admin_password";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [tab, setTab] = useState<"public" | "inbox">("inbox");
  const [path, setPath] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPassword(stored);
      verify(stored);
    }
  }, []);

  async function verify(value: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/files/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ adminPassword: value }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok || json.role !== "admin") {
        setVerified(false);
        setError(json.error ?? "密碼不對");
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      setVerified(true);
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      setError(err instanceof Error ? err.message : "驗證失敗");
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    setVerified(false);
    setPassword("");
    sessionStorage.removeItem(STORAGE_KEY);
  }

  if (!verified) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <Link
          href="/files"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-orange-400 hover:-translate-x-0.5"
        >
          <ArrowLeft className="h-4 w-4" /> 回到 Files
        </Link>

        <h1 className="mt-8 font-display text-4xl font-bold tracking-wider text-zinc-50">
          <span className="text-orange-400">ADMIN</span>
        </h1>
        <p className="mt-3 text-lg text-zinc-400">這頁只有我自己會用。</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim()) verify(password.trim());
          }}
          className="mt-10 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md"
        >
          <label className="flex items-center gap-2 text-sm font-medium text-orange-300">
            <KeyRound className="h-4 w-4" /> 管理員密碼
          </label>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-700 bg-black/40 px-3 py-2 text-zinc-100 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> 驗證中
              </>
            ) : (
              "進入管理"
            )}
          </button>
        </form>
      </div>
    );
  }

  const authHeaders = buildAuthHeaders({ adminPassword: password });

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/files"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-orange-400 hover:-translate-x-0.5"
        >
          <ArrowLeft className="h-4 w-4" /> 回到 Files
        </Link>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-orange-400"
        >
          <LogOut className="h-3.5 w-3.5" /> 登出
        </button>
      </div>

      <h1 className="mt-8 font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">ADMIN</span>
      </h1>
      <p className="mt-3 text-zinc-400">
        管理 Vercel Blob 上的檔案。Inbox 是朋友傳給你的，Public 是公開下載。
      </p>

      <div className="mt-8 inline-flex gap-1 rounded-lg border border-zinc-800 bg-zinc-950/60 p-1 backdrop-blur-md">
        {(["inbox", "public"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setPath("");
            }}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              tab === t
                ? "bg-orange-500/20 text-orange-300"
                : "text-zinc-400 hover:text-orange-300"
            }`}
          >
            {t === "inbox" ? "INBOX · 收件夾" : "PUBLIC · 公開"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <FileBrowser
          area={tab}
          path={path}
          onNavigate={setPath}
          authHeaders={authHeaders}
          adminControls
          refreshKey={refresh}
          onDeleted={() => setRefresh((n) => n + 1)}
          onPromoted={() => setRefresh((n) => n + 1)}
        />
      </div>

      <h2 className="mt-12 font-display text-xl font-bold tracking-wider text-orange-400">
        UPLOAD · 上傳到 {tab === "public" ? "公開" : "收件夾"}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        {tab === "public"
          ? `會上傳到 public/${path ? path + "/" : ""}<檔名>。`
          : "會上傳到 inbox/<時間戳>__<檔名>。"}
      </p>
      <div className="mt-4">
        <UploadZone
          key={tab + path}
          target={tab}
          publicFolder={tab === "public" ? path : ""}
          credentials={{ adminPassword: password }}
          onUploaded={() => setRefresh((n) => n + 1)}
        />
      </div>
    </div>
  );
}

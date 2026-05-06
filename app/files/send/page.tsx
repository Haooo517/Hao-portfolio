"use client";

import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UploadZone } from "@/components/upload-zone";

const STORAGE_KEY = "hao_friend_code";

export default function SendPage() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Restore previously verified code so returning friends skip the prompt.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCode(stored);
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
        body: JSON.stringify({ friendCode: value }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setVerified(false);
        setError(json.error ?? "暗號不對");
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      setVerified(true);
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      setError(err instanceof Error ? err.message : "驗證失敗");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setVerified(false);
    setCode("");
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/files"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-orange-400 hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-4 w-4" /> 回到 Files
      </Link>

      <h1 className="mt-8 font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">SEND</span>
      </h1>
      <p className="mt-3 text-lg text-zinc-400">
        傳檔案給我。檔案會直接進我的私密收件夾，只有我看得到。
      </p>

      {!verified ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim()) verify(code.trim());
          }}
          className="mt-10 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md"
        >
          <label className="flex items-center gap-2 text-sm font-medium text-orange-300">
            <KeyRound className="h-4 w-4" /> 暗號
          </label>
          <input
            type="password"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="跟 Hao 拿到的那串字"
            className="mt-2 w-full rounded-md border border-zinc-700 bg-black/40 px-3 py-2 text-zinc-100 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={busy || !code.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> 驗證中
              </>
            ) : (
              "進入上傳"
            )}
          </button>
          <p className="mt-3 text-xs text-zinc-500">
            沒有暗號？私訊我或寄信到{" "}
            <a
              href="mailto:howard940517@gmail.com"
              className="text-orange-300 underline-offset-4 hover:underline"
            >
              howard940517@gmail.com
            </a>
            。
          </p>
        </form>
      ) : (
        <div className="mt-10 space-y-4">
          <UploadZone
            target="inbox"
            credentials={{ friendCode: code }}
            onUploaded={() => {}}
          />
          <button
            type="button"
            onClick={reset}
            className="text-xs text-zinc-500 underline-offset-4 hover:text-orange-400 hover:underline"
          >
            登出 / 換暗號
          </button>
        </div>
      )}
    </div>
  );
}

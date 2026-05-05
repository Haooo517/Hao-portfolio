"use client";

import dynamic from "next/dynamic";

export const CatanTerminalLoader = dynamic(
  () => import("./catan-terminal").then((m) => m.CatanTerminal),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-2xl">
        <div className="pb-3 text-sm text-zinc-400">載入終端機元件中…</div>
        <div className="h-[640px] w-full rounded-lg bg-zinc-900/40" />
      </div>
    ),
  }
);

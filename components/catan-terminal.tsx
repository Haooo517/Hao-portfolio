"use client";

import { useEffect, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";

type CatanModuleConfig = {
  locateFile: (name: string) => string;
  jsWrite: (s: string) => void;
  jsReadLine: () => Promise<string>;
  jsGetChar: () => Promise<number>;
  print?: (s: string) => void;
  printErr?: (s: string) => void;
};

declare global {
  interface Window {
    createCatanModule?: (config: CatanModuleConfig) => Promise<unknown>;
  }
}

type InputMode = "idle" | "char" | "line";

export function CatanTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;
    let terminal: import("@xterm/xterm").Terminal | null = null;

    (async () => {
      try {
        const [{ Terminal }, { FitAddon }] = await Promise.all([
          import("@xterm/xterm"),
          import("@xterm/addon-fit"),
        ]);
        if (disposed) return;

        const term = new Terminal({
          cols: 120,
          rows: 60,
          convertEol: true,
          fontFamily:
            "var(--font-geist-mono), 'JetBrains Mono', Menlo, monospace",
          fontSize: 13,
          lineHeight: 1.1,
          cursorBlink: true,
          theme: {
            background: "#0a0a0a",
            foreground: "#d4d4d4",
            cursor: "#fb923c",
            cursorAccent: "#0a0a0a",
            selectionBackground: "#7c2d12",
            black: "#0a0a0a",
            red: "#a33d44",
            green: "#5a8a4f",
            yellow: "#a78343",
            blue: "#4a6f9c",
            magenta: "#8a4a92",
            cyan: "#4a8593",
            white: "#bcbcbc",
            brightBlack: "#52525b",
            brightRed: "#c95159",
            brightGreen: "#7aac6c",
            brightYellow: "#c9a05d",
            brightBlue: "#6a8db8",
            brightMagenta: "#a467ad",
            brightCyan: "#65a3b1",
            brightWhite: "#d4d4d4",
          },
        });
        terminal = term;
        const fit = new FitAddon();
        term.loadAddon(fit);
        term.open(containerRef.current!);
        try {
          fit.fit();
        } catch {
          /* ignore initial fit failures */
        }
        const onResize = () => {
          try {
            fit.fit();
          } catch {
            /* ignore */
          }
        };
        window.addEventListener("resize", onResize);

        // ----- input plumbing -----
        let mode: InputMode = "idle";
        let charResolver: ((c: number) => void) | null = null;
        let lineResolver: ((s: string) => void) | null = null;
        let lineBuf = "";

        term.onData((data: string) => {
          for (const ch of data) {
            const code = ch.charCodeAt(0);
            if (mode === "char") {
              term.write("\r\n");
              const r = charResolver;
              charResolver = null;
              mode = "idle";
              r?.(code);
              return;
            }
            if (mode === "line") {
              if (ch === "\r" || ch === "\n") {
                term.write("\r\n");
                const line = lineBuf;
                lineBuf = "";
                const r = lineResolver;
                lineResolver = null;
                mode = "idle";
                r?.(line);
              } else if (code === 127 || code === 8) {
                if (lineBuf.length > 0) {
                  lineBuf = lineBuf.slice(0, -1);
                  term.write("\b \b");
                }
              } else if (code >= 32 && code < 127) {
                lineBuf += ch;
                term.write(ch);
              }
            }
          }
        });

        const jsGetChar = (): Promise<number> => {
          mode = "char";
          return new Promise((resolve) => {
            charResolver = resolve;
          });
        };
        const jsReadLine = (): Promise<string> => {
          mode = "line";
          return new Promise((resolve) => {
            lineResolver = resolve;
          });
        };

        // ----- load the wasm loader script -----
        if (!window.createCatanModule) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/catan/catan.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error("Failed to load /catan/catan.js"));
            document.head.appendChild(script);
          });
        }
        if (disposed) return;

        // jsWrite gets raw stdout/stderr bytes directly from our overridden
        // fd_write (in catan_emlib.js) — no per-line buffering, so prompts
        // without trailing \n appear immediately and \n bytes are forwarded
        // for xterm's convertEol to render as line breaks.
        const jsWrite = (s: string) => term.write(s);
        await window.createCatanModule!({
          locateFile: (name) => `/catan/${name}`,
          jsWrite,
          jsReadLine,
          jsGetChar,
        });
        if (disposed) return;

        setStatus("ready");
        term.focus();

        return () => {
          window.removeEventListener("resize", onResize);
        };
      } catch (e) {
        console.error("[catan-terminal]", e);
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        terminal?.dispose();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-2xl">
      {status === "loading" && (
        <div className="pb-3 text-sm text-zinc-400">載入 WebAssembly 中…</div>
      )}
      {status === "error" && (
        <div className="pb-3 text-sm text-red-400">
          載入失敗，請重新整理頁面再試一次。
        </div>
      )}
      <div
        ref={containerRef}
        className="h-[820px] w-full overflow-hidden rounded-lg"
      />
    </div>
  );
}

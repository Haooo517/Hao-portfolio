"use client";

import { useEffect, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";

type CatanModuleConfig = {
  print: (s: string) => void;
  printErr: (s: string) => void;
  locateFile: (name: string) => string;
  jsReadLine: () => Promise<string>;
  jsGetChar: () => Promise<number>;
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
          rows: 44,
          convertEol: true,
          fontFamily:
            "var(--font-geist-mono), 'JetBrains Mono', Menlo, monospace",
          fontSize: 13,
          lineHeight: 1.1,
          cursorBlink: true,
          theme: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            cursor: "#fb923c",
            cursorAccent: "#0a0a0a",
            selectionBackground: "#f97316",
            black: "#0a0a0a",
            red: "#f87171",
            green: "#4ade80",
            yellow: "#facc15",
            blue: "#60a5fa",
            magenta: "#e879f9",
            cyan: "#22d3ee",
            white: "#e5e5e5",
            brightBlack: "#52525b",
            brightRed: "#fb7185",
            brightGreen: "#86efac",
            brightYellow: "#fde047",
            brightBlue: "#93c5fd",
            brightMagenta: "#f0abfc",
            brightCyan: "#67e8f9",
            brightWhite: "#fafafa",
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

        const write = (s: string) => term.write(s);
        // main() runs automatically once createCatanModule resolves and yields
        // back via Asyncify on the first jsReadLine call.
        await window.createCatanModule!({
          print: write,
          printErr: write,
          locateFile: (name) => `/catan/${name}`,
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
        className="h-[640px] w-full overflow-hidden rounded-lg"
      />
    </div>
  );
}

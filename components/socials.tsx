"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { GithubIcon, InstagramIcon } from "./brand-icons";

type Author = {
  email: string;
  github: string;
  instagram: string;
};

const COPIED_LABEL = "✓ 已複製到剪貼簿";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard may be unavailable (older browsers / insecure context)
    }
  };
  return { copied, copy };
}

const buttonBase =
  "group/btn relative flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/25 bg-zinc-950/50 text-zinc-400 transition hover:scale-110 hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-400";

const tooltipTop =
  "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-500/30 bg-zinc-950/95 px-2.5 py-1 text-xs text-orange-300 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover/btn:opacity-100";

export function FooterSocials({ author }: { author: Author }) {
  const { copied, copy } = useCopy();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`複製 email：${author.email}`}
        className={buttonBase}
        onClick={() => copy(author.email)}
      >
        <Mail className="h-4 w-4" />
        <span role="tooltip" className={tooltipTop}>
          {copied ? COPIED_LABEL : `${author.email} · 點擊複製`}
        </span>
      </button>

      <a
        href={author.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={buttonBase}
      >
        <GithubIcon className="h-4 w-4" />
        <span role="tooltip" className={tooltipTop}>
          GitHub · @Haooo517
        </span>
      </a>

      <a
        href={author.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={buttonBase}
      >
        <InstagramIcon className="h-4 w-4" />
        <span role="tooltip" className={tooltipTop}>
          Instagram · @haooo.517_
        </span>
      </a>
    </div>
  );
}

const cardBase =
  "group/card relative flex w-full items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 backdrop-blur-md transition hover:border-orange-500/60 hover:bg-orange-500/5";

const iconBadge =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 transition group-hover/card:scale-110 group-hover/card:border-orange-400 group-hover/card:bg-orange-500/20";

const cardLabel =
  "flex-1 text-left font-medium text-zinc-100 transition group-hover/card:text-orange-300";

const tooltipRight =
  "pointer-events-none absolute right-4 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md border border-orange-500/30 bg-zinc-950/95 px-2.5 py-1 text-xs text-orange-300 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover/card:opacity-100";

export function ContactSocials({ author }: { author: Author }) {
  const { copied, copy } = useCopy();

  return (
    <ul className="space-y-3">
      <li className="anim-fade-up" style={{ animationDelay: "250ms" }}>
        <button
          type="button"
          aria-label={`複製 email：${author.email}`}
          className={cardBase}
          onClick={() => copy(author.email)}
        >
          <span className={iconBadge}>
            <Mail className="h-5 w-5" />
          </span>
          <span className={cardLabel}>{author.email}</span>
          <span role="tooltip" className={tooltipRight}>
            {copied ? COPIED_LABEL : "點擊複製"}
          </span>
        </button>
      </li>

      <li className="anim-fade-up" style={{ animationDelay: "350ms" }}>
        <a
          href={author.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub @Haooo517"
          className={cardBase}
        >
          <span className={iconBadge}>
            <GithubIcon className="h-5 w-5" />
          </span>
          <span className={cardLabel}>GitHub · @Haooo517</span>
          <span role="tooltip" className={tooltipRight}>
            前往 GitHub ↗
          </span>
        </a>
      </li>

      <li className="anim-fade-up" style={{ animationDelay: "450ms" }}>
        <a
          href={author.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @haooo.517_"
          className={cardBase}
        >
          <span className={iconBadge}>
            <InstagramIcon className="h-5 w-5" />
          </span>
          <span className={cardLabel}>Instagram · @haooo.517_</span>
          <span role="tooltip" className={tooltipRight}>
            前往 Instagram ↗
          </span>
        </a>
      </li>
    </ul>
  );
}

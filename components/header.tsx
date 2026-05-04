"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 ${
        scrolled
          ? "border-orange-500/30 bg-black/85 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)]"
          : "border-orange-500/20 bg-black/60"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          href="/"
          className={`font-display font-bold uppercase tracking-[0.25em] text-orange-400 transition-all duration-300 hover:text-orange-300 ${
            scrolled ? "text-base" : "text-lg"
          }`}
        >
          {site.name}
        </Link>
        <nav className="flex gap-1 text-sm">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-zinc-400 transition-colors hover:bg-orange-500/10 hover:text-orange-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

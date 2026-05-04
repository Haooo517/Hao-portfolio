import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-500/20 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold uppercase tracking-[0.25em] text-orange-400 transition hover:text-orange-300"
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

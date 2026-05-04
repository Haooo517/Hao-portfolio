import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-4">
          <a
            href={site.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.author.email}`}
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

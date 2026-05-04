import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/brand-icons";
import { site } from "@/lib/site";

type SocialLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const iconClass =
  "group flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/25 bg-zinc-950/50 text-zinc-400 transition hover:scale-110 hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-400";

export function Footer() {
  const socials: SocialLink[] = [];
  if (site.author.email) {
    socials.push({
      href: `mailto:${site.author.email}`,
      label: "Email",
      icon: Mail,
    });
  }
  if (site.author.github) {
    socials.push({
      href: site.author.github,
      label: "GitHub",
      icon: GithubIcon,
    });
  }
  if (site.author.instagram) {
    socials.push({
      href: site.author.instagram,
      label: "Instagram",
      icon: InstagramIcon,
    });
  }

  return (
    <footer className="border-t border-orange-500/20">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p className="font-display tracking-widest">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={iconClass}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

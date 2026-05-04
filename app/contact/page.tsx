import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

type ContactItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

export default function ContactPage() {
  const items: ContactItem[] = [];
  if (site.author.email) {
    items.push({
      icon: Mail,
      label: site.author.email,
      href: `mailto:${site.author.email}`,
    });
  }
  if (site.author.github) {
    items.push({
      icon: GithubIcon,
      label: "GitHub",
      href: site.author.github,
    });
  }
  if (site.author.linkedin) {
    items.push({
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: site.author.linkedin,
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">CONTACT</span>
      </h1>
      <p className="mt-3 text-lg text-zinc-400">有什麼想聊的，這些都找得到我。</p>
      <ul className="mt-10 space-y-3">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={href}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition hover:border-orange-500/60 hover:bg-orange-500/5"
            >
              <Icon className="h-5 w-5 text-zinc-500 transition group-hover:text-orange-400" />
              <span className="font-medium text-zinc-100 transition group-hover:text-orange-300">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

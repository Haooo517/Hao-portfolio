import { site } from "@/lib/site";
import { FooterSocials } from "./socials";

export function Footer() {
  return (
    <footer className="border-t border-orange-500/20">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p className="font-display tracking-widest">
          © {new Date().getFullYear()} {site.name}
        </p>
        <FooterSocials
          author={{
            email: site.author.email,
            github: site.author.github,
            instagram: site.author.instagram,
          }}
        />
      </div>
    </footer>
  );
}

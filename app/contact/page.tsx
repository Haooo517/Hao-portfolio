import { ContactSocials } from "@/components/socials";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="anim-fade-up font-display text-4xl font-bold tracking-wider text-zinc-50">
        <span className="text-orange-400">CONTACT</span>
      </h1>
      <p
        className="anim-fade-up mt-3 text-lg text-zinc-400"
        style={{ animationDelay: "120ms" }}
      >
        有什麼想聊的，這些都找得到我。Email 點一下就會複製。
      </p>
      <div className="mt-10">
        <ContactSocials
          author={{
            email: site.author.email,
            github: site.author.github,
            instagram: site.author.instagram,
          }}
        />
      </div>
    </div>
  );
}

import Image from "next/image";
import { footerLinks, site, type PublicContact } from "@/lib/site";

export default function Footer({ contact }: { contact: PublicContact }) {
  const SOCIALS = [
    { label: "Instagram", href: contact.instagram },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "WhatsApp", href: contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "" },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-line bg-void px-5 pb-8 pt-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/icon.png" alt="" width={32} height={32} className="rounded-[8px]" />
              <p className="font-serif text-2xl italic text-text">{site.name}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{site.tagline}</p>
          </div>

          <div>
            <p className="eyebrow mb-4 text-[10px]">Navigate</p>
            <ul className="space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-[10px]">Connect</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className="text-sm text-muted transition-colors hover:text-text">
                  {contact.email}
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-text">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">Designed &amp; built by Webify.ai</p>
        </div>
      </div>
    </footer>
  );
}

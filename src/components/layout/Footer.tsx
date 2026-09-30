import Image from "next/image";
import { footerLinks, site, type PublicContact } from "@/lib/site";
import NewsletterForm from "@/components/layout/NewsletterForm";

const SOCIAL_ICONS = {
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="7.5" cy="8" r="1.2" fill="currentColor" stroke="none"/><path d="M7.5 11v6M11.5 17v-3.5c0-1.5 1-2.5 2.25-2.5S16 12 16 13.5V17M11.5 11v6" />',
  whatsapp:
    '<path d="M12.04 3C7.3 3 3.45 6.85 3.45 11.6c0 1.6.44 3.1 1.2 4.4L3 21l5.2-1.36a8.5 8.5 0 003.84.9h.01c4.75 0 8.6-3.85 8.6-8.6C20.65 6.85 16.8 3 12.04 3z" fill="none" /><path d="M8.8 8.3c.2-.45.4-.46.6-.47h.5c.16 0 .38-.06.6.46.2.55.77 1.9.84 2.04.07.14.11.3.02.48-.1.18-.15.28-.29.44-.15.16-.3.36-.42.48-.14.15-.29.3-.13.58.17.28.75 1.24 1.62 2.01 1.11 1 2.05 1.3 2.33 1.45.29.15.45.12.62-.08.17-.2.71-.82.9-1.1.19-.28.38-.24.63-.14.26.1 1.66.79 1.95.93.29.14.47.21.54.32.08.13.08.71-.16 1.38-.24.67-1.4 1.28-1.92 1.36-.5.08-1.06.11-1.7-.1-.4-.13-.9-.3-1.55-.57-2.7-1.18-4.47-3.94-4.6-4.13-.14-.19-1.1-1.46-1.1-2.79 0-1.32.68-1.97.93-2.24z" fill="currentColor" stroke="none" />',
} as const;

function SocialIcon({ icon }: { icon: keyof typeof SOCIAL_ICONS }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-width:1.6]" dangerouslySetInnerHTML={{ __html: SOCIAL_ICONS[icon] }} />
  );
}

export default function Footer({ contact }: { contact: PublicContact }) {
  const SOCIALS = [
    { label: "Instagram", href: contact.instagram, icon: "instagram" as const },
    { label: "LinkedIn", href: contact.linkedin, icon: "linkedin" as const },
    { label: "WhatsApp", href: contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "", icon: "whatsapp" as const },
  ].filter((s) => s.href);

  return (
    <footer className="relative bg-void pb-8 pt-16">
      <div
        className="mb-16 h-1 w-full"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-halo), transparent)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/icon.png" alt="" width={32} height={32} className="rounded-[8px]" />
              <p className="font-serif text-2xl italic text-text">{site.name}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{site.description}</p>
            {SOCIALS.length > 0 && (
              <div className="mt-5 flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ice/40 hover:text-text"
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow mb-4 text-[10px]">Quick Links</p>
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
            <p className="eyebrow mb-4 text-[10px]">Newsletter</p>
            <p className="mb-4 text-sm leading-6 text-muted">
              Occasional updates on new work and what we’re building — no spam.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <p className="eyebrow mb-4 text-[10px]">Get In Touch</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className="text-sm text-muted transition-colors hover:text-text">
                  {contact.email}
                </a>
              </li>
              {contact.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <p className="eyebrow mb-3 mt-6 text-[10px]">Studio Access</p>
            <a href="/admin" className="text-sm text-muted transition-colors hover:text-text">
              Dashboard Login →
            </a>
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

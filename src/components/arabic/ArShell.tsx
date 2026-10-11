import Link from "next/link";
import { arServices, arWhatsappMessage } from "@/lib/arabic";
import { whatsappLink } from "@/lib/site";
import { getSettings } from "@/lib/store/settings";

/** Right-to-left header and footer for the Arabic pages. */
export default async function ArShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const wa = whatsappLink(settings.whatsapp, arWhatsappMessage);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
          <Link href="/ar" dir="ltr" className="logo-shine font-serif text-[28px] italic leading-none md:text-[32px]">
            Webify.ai
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <Link href="/ar#services" className="transition-colors hover:text-text">
              الخدمات
            </Link>
            <Link href="/ar#process" className="transition-colors hover:text-text">
              كيف نعمل
            </Link>
            <Link href="/ar#contact" className="transition-colors hover:text-text">
              تواصل معنا
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/" lang="en" dir="ltr" className="text-sm text-muted transition-colors hover:text-text">
              English
            </Link>
            <a
              href={wa}
              target={settings.whatsapp ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-b from-white to-[#cfd8e2] px-5 py-2.5 text-sm font-semibold text-[#05070a]"
            >
              واتساب
            </a>
          </div>
        </div>
      </header>

      <main className="relative bg-void">{children}</main>

      <footer className="border-t border-line bg-void px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <nav aria-label="الخدمات" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="text-dim">الخدمات</span>
            {Object.entries(arServices).map(([id, s]) => (
              <Link key={id} href={`/ar/services/${id}`} className="transition-colors hover:text-text">
                {s.title}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-dim">
            <p>
              <span dir="ltr">© {new Date().getFullYear()} Webify.ai</span> — جميع الحقوق محفوظة.
            </p>
            <Link href="/" lang="en" dir="ltr" className="transition-colors hover:text-text">
              View the English site
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

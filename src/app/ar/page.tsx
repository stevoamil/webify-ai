import type { Metadata } from "next";
import Link from "next/link";
import ArShell from "@/components/arabic/ArShell";
import { JsonLd } from "@/components/sections/PageParts";
import { MagneticLink } from "@/components/ui/primitives";
import { arHome, arProcess, arServices, arWhatsappMessage, arWhy } from "@/lib/arabic";
import { site, whatsappLink } from "@/lib/site";
import { getSettings } from "@/lib/store/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: arHome.title },
  description: arHome.description,
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar", "x-default": "/" } },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: `${site.url}/ar`,
    siteName: site.name,
    title: arHome.title,
    description: arHome.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const heading = "text-chrome text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.3]";

export default async function ArabicHome() {
  const settings = await getSettings();
  const wa = whatsappLink(settings.whatsapp, arWhatsappMessage);
  const waProps = settings.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <ArShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebPage",
              inLanguage: "ar",
              name: arHome.title,
              description: arHome.description,
              url: `${site.url}/ar`,
              isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            },
          ],
        }}
      />

      <section className="px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 flex items-center gap-3 text-sm text-ice">
            <span className="h-px w-8 bg-ice/60" />
            استوديو مواقع مدعوم بالذكاء الاصطناعي
          </p>
          <h1 className="text-chrome max-w-4xl text-[clamp(2.4rem,6.4vw,5rem)] font-bold leading-[1.25]">
            مواقع إلكترونية تفكّر، وتبيع، وتحجز.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-9 text-muted md:text-lg">
            مواقع إلكترونية متميزة، ومساعدون بالذكاء الاصطناعي، وأتمتة وأنظمة حجز — مصممة كنظام رقمي ذكي واحد لنشاطك التجاري.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticLink href={wa} {...waProps}>
              اطلب عرض سعر
            </MagneticLink>
            <MagneticLink href="/ar#services" variant="ghost">
              تصفّح خدماتنا
            </MagneticLink>
          </div>
        </div>
      </section>

      <section id="services" aria-labelledby="ar-services-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="ar-services-title" className={heading}>
            خدماتنا
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">ما نبنيه لتنمية نشاطك التجاري.</p>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(arServices).map(([id, s]) => (
              <li key={id}>
                <Link
                  href={`/ar/services/${id}`}
                  className="glass group block h-full rounded-2xl p-6 transition-colors hover:border-ice/40"
                >
                  <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
                  <p className="text-sm leading-7 text-muted">{s.text}</p>
                  <span className="mt-4 inline-block text-sm text-ice">اعرف المزيد ←</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ar-why-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="ar-why-title" className={heading}>
            ثمانية أسباب يبقى بسببها عملاؤنا
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {arWhy.map((w, i) => (
              <li key={w.title} className="bg-void p-7">
                <span className="mb-4 block text-xs text-dim" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-base font-bold">{w.title}</h3>
                <p className="text-sm leading-7 text-muted">{w.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" aria-labelledby="ar-process-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="ar-process-title" className={heading}>
            من أول محادثة إلى يوم الإطلاق
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {arProcess.map((step) => (
              <li key={step.number} className="bg-void p-6">
                <span className="mb-4 block text-xs text-dim" dir="ltr">
                  {step.number}
                </span>
                <h3 className="mb-2 text-base font-bold">{step.title}</h3>
                <p className="text-sm leading-7 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ar-work-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="ar-work-title" className={heading}>
            أعمالنا
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            مشاريع حقيقية في مجالات متعددة، منها خدمات السيارات والعقارات والفعاليات والتعليم والمتاجر الإلكترونية. تفاصيل
            المشاريع متوفرة بالإنجليزية.
          </p>
          <div className="mt-8">
            <MagneticLink href="/#work" variant="ghost">
              شاهد أعمالنا
            </MagneticLink>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="ar-contact-title" className="px-5 pb-28 pt-12 md:px-10 md:pb-40">
        <div className="glass-strong mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 id="ar-contact-title" className="text-chrome text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.35]">
              جاهز لبدء مشروعك؟
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
              أخبرنا عن نشاطك وأهدافك، وسنعود إليك بخطة واضحة وعرض سعر مخصص.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticLink href={wa} {...waProps}>
              تواصل عبر واتساب
            </MagneticLink>
            <MagneticLink href={`mailto:${settings.email}`} variant="ghost">
              راسلنا بالبريد
            </MagneticLink>
          </div>
        </div>
      </section>
    </ArShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArShell from "@/components/arabic/ArShell";
import { JsonLd } from "@/components/sections/PageParts";
import { MagneticLink } from "@/components/ui/primitives";
import { arProcess, arServices, arWhatsappMessage } from "@/lib/arabic";
import { site, whatsappLink } from "@/lib/site";
import { getSettings } from "@/lib/store/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/ar/services/[id]">): Promise<Metadata> {
  const { id } = await params;
  const service = arServices[id];
  if (!service) return { title: "الصفحة غير موجودة", robots: { index: false, follow: false } };

  const title = `${service.title} — Webify.ai`;
  return {
    title: { absolute: title },
    description: service.lead,
    alternates: {
      canonical: `/ar/services/${id}`,
      languages: { ar: `/ar/services/${id}`, en: `/services/${id}`, "x-default": `/services/${id}` },
    },
    openGraph: {
      type: "website",
      locale: "ar_AR",
      url: `${site.url}/ar/services/${id}`,
      siteName: site.name,
      title,
      description: service.lead,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function ArabicServicePage({ params }: PageProps<"/ar/services/[id]">) {
  const { id } = await params;
  const service = arServices[id];
  if (!service) notFound();

  const settings = await getSettings();
  const wa = whatsappLink(settings.whatsapp, arWhatsappMessage);
  const waProps = settings.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const others = Object.entries(arServices).filter(([sid]) => sid !== id);

  return (
    <ArShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Service",
              inLanguage: "ar",
              name: service.title,
              description: service.lead,
              url: `${site.url}/ar/services/${id}`,
              areaServed: "Worldwide",
              provider: { "@type": "Organization", name: site.name, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${site.url}/ar` },
                { "@type": "ListItem", position: 2, name: "الخدمات", item: `${site.url}/ar#services` },
                { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/ar/services/${id}` },
              ],
            },
          ],
        }}
      />

      <section className="px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="مسار التنقل" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-dim">
            <Link href="/ar" className="transition-colors hover:text-text">
              الرئيسية
            </Link>
            <span aria-hidden>/</span>
            <Link href="/ar#services" className="transition-colors hover:text-text">
              الخدمات
            </Link>
            <span aria-hidden>/</span>
            <span className="text-muted" aria-current="page">
              {service.title}
            </span>
          </nav>
          <h1 className="text-chrome max-w-4xl text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-[1.3]">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-9 text-muted md:text-lg">{service.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticLink href={wa} {...waProps}>
              اطلب عرض سعر
            </MagneticLink>
            <MagneticLink href="/ar#services" variant="ghost">
              جميع الخدمات
            </MagneticLink>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="ar-included-title">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="glass rounded-3xl p-8">
            <h2 id="ar-included-title" className="mb-6 text-sm font-bold text-ice">
              ما يشمله
            </h2>
            <ul className="space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-7 text-text/90">
                  <svg viewBox="0 0 20 20" className="mt-2 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                    <path d="M4 10.5l3.5 3.5L16 6" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8">
            <h2 className="mb-6 text-sm font-bold text-ice">لمن هذه الخدمة</h2>
            <p className="text-[15px] leading-8 text-text/85">{service.ideal}</p>
            <p className="mt-6 text-[13px] leading-7 text-muted">
              كل مشروع يُحدَّد وفق النشاط الذي يقف خلفه — تواصل معنا وسنعود إليك بخطة واضحة وعرض سعر مخصص.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="ar-deliver-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="ar-deliver-title" className="text-chrome mb-10 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.35]">
            كيف ننفّذها
          </h2>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
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

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="ar-more-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="ar-more-title" className="text-chrome mb-10 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.35]">
            خدمات أخرى
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(([sid, s]) => (
              <li key={sid}>
                <Link
                  href={`/ar/services/${sid}`}
                  className="glass block h-full rounded-2xl p-6 transition-colors hover:border-ice/40"
                >
                  <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
                  <p className="text-sm leading-7 text-muted">{s.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="glass-strong mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-chrome text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.35]">
              هل تريد التحدث عن {service.title}؟
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
              أخبرنا عن نشاطك وأهدافك، وسنعود إليك بخطة واضحة وعرض سعر مخصص.
            </p>
          </div>
          <MagneticLink href={wa} {...waProps}>
            تواصل عبر واتساب
          </MagneticLink>
        </div>
      </section>
    </ArShell>
  );
}

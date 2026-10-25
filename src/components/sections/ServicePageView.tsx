import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import { Arrow, MagneticLink } from "@/components/ui/primitives";
import Faq from "@/components/sections/Faq";
import { serviceFaqs } from "@/lib/faq";
import { guides } from "@/lib/guides";
import { industries } from "@/lib/industries";
import { processSteps } from "@/lib/process";
import { serviceDetails } from "@/lib/service-details";
import { site, type PublicContact } from "@/lib/site";
import type { ServiceCard } from "@/lib/services-data";

export default function ServicePageView({
  service,
  services,
  contact,
}: {
  service: ServiceCard;
  services: ServiceCard[];
  contact: PublicContact;
}) {
  const others = services.filter((s) => s.id !== service.id);
  const detail = serviceDetails[service.id];
  const relatedGuides = guides.filter((g) => g.services.includes(service.id));
  const relatedIndustries = industries.filter((i) => i.services.includes(service.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}/services/${service.id}#service`,
        name: service.title,
        description: service.lead,
        url: `${site.url}/services/${service.id}`,
        areaServed: "Worldwide",
        provider: { "@type": "Organization", name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.id}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="relative bg-void">
        <section className="relative px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-5xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim"
            >
              <Link href="/" className="transition-colors hover:text-text">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/#services" className="transition-colors hover:text-text">
                Services
              </Link>
              <span aria-hidden>/</span>
              <span className="text-muted" aria-current="page">
                {service.title}
              </span>
            </nav>

            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-6 bg-ice/60" />
              Service
            </p>
            <h1 className="text-chrome max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">{service.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticLink href="/#contact">
                Request a quote <Arrow />
              </MagneticLink>
              <MagneticLink href="/#work" variant="ghost">
                See our work
              </MagneticLink>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="included-title">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.3fr_1fr]">
            <div className="glass rounded-3xl p-8">
              <h2 id="included-title" className="eyebrow mb-6">
                What&apos;s included
              </h2>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                      <path d="M4 10.5l3.5 3.5L16 6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-8">
              <h2 className="eyebrow mb-6">Who it&apos;s for</h2>
              <p className="text-[15px] leading-7 text-text/85">{service.ideal}</p>
              <p className="mt-6 text-[13px] leading-6 text-muted">
                Every project is scoped to the business behind it — get in touch and we&apos;ll come back with a clear plan and a custom quote.
              </p>
            </div>
          </div>
        </section>

        {detail && (
          <>
            <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="how-title">
              <div className="mx-auto max-w-5xl">
                <h2 id="how-title" className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
                  How {service.title} works
                </h2>
                <ol className="grid gap-4 md:grid-cols-2">
                  {detail.howItWorks.map((step, i) => (
                    <li key={step.title} className="glass rounded-2xl p-6">
                      <span className="mb-3 block font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mb-2 text-[16px] font-medium text-text">{step.title}</h3>
                      <p className="text-[14px] leading-7 text-muted">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="px-5 pb-20 md:px-10 md:pb-28" aria-label="Use cases and good to know">
              <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                <div className="glass rounded-3xl p-8">
                  <h2 className="eyebrow mb-6">Where it helps</h2>
                  <ul className="space-y-4">
                    {detail.useCases.map((u) => (
                      <li key={u} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                        <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                          <path d="M4 10.5l3.5 3.5L16 6" />
                        </svg>
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-3xl p-8">
                  <h2 className="eyebrow mb-6">Good to know</h2>
                  <ul className="space-y-4">
                    {detail.goodToKnow.map((g) => (
                      <li key={g} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                        <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                          <path d="M10 6v5M10 14h.01" />
                          <circle cx="10" cy="10" r="7.5" />
                        </svg>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="deliver-title">
          <div className="mx-auto max-w-5xl">
            <h2 id="deliver-title" className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
              How we deliver it
            </h2>
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step) => (
                <li key={step.number} className="bg-void p-6">
                  <span className="mb-4 block font-mono text-xs text-dim">{step.number}</span>
                  <h3 className="mb-2 text-[15px] font-medium text-text">{step.title}</h3>
                  <p className="text-[13px] leading-6 text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Faq

          items={serviceFaqs[service.id] ?? []}

          id="faq"

          heading={["Common", "questions."]}

          className="relative px-5 pb-20 md:px-10 md:pb-28"

        />

        {(relatedGuides.length > 0 || relatedIndustries.length > 0) && (
          <section className="px-5 pb-20 md:px-10 md:pb-28" aria-label="Related guides and industries">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {relatedGuides.length > 0 && (
                <div className="glass rounded-3xl p-8">
                  <h2 className="eyebrow mb-6">Guides about this</h2>
                  <ul className="space-y-3">
                    {relatedGuides.map((g) => (
                      <li key={g.slug}>
                        <Link href={`/guides/${g.slug}`} className="text-[15px] leading-6 text-ice underline-offset-2 hover:underline">
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedIndustries.length > 0 && (
                <div className="glass rounded-3xl p-8">
                  <h2 className="eyebrow mb-6">Industries that use it</h2>
                  <ul className="space-y-3">
                    {relatedIndustries.map((i) => (
                      <li key={i.slug}>
                        <Link href={`/industries/${i.slug}`} className="text-[15px] leading-6 text-ice underline-offset-2 hover:underline">
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="more-title">
            <div className="mx-auto max-w-5xl">
              <h2 id="more-title" className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
                More from Webify.ai
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.id}`}
                      className="glass group block h-full rounded-2xl p-6 transition-colors hover:border-ice/40"
                    >
                      <h3 className="mb-2 font-serif text-xl italic">{s.title}</h3>
                      <p className="text-[13px] leading-6 text-muted">{s.text}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-5 pb-28 md:px-10 md:pb-40">
          <div className="glass-strong mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="text-chrome text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium tracking-[-0.03em]">
                Ready to talk about {service.title}?
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                Tell us about your business and goals — we&apos;ll reply with a clear plan, not a sales pitch.
              </p>
            </div>
            <MagneticLink href="/#contact">
              Start my project <Arrow />
            </MagneticLink>
          </div>
        </section>
      </main>
      <Footer contact={contact} services={services.map(({ id: sid, title }) => ({ id: sid, title }))} />
      <FloatingWidgets contact={contact} />
    </>
  );
}
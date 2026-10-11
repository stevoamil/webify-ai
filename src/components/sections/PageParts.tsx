import Link from "next/link";
import { Arrow, MagneticLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim"
    >
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {c.href ? (
            <Link href={c.href} className="transition-colors hover:text-text">
              {c.label}
            </Link>
          ) : (
            <span className="text-muted" aria-current="page">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }}
    />
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="px-5 pb-28 md:px-10 md:pb-40">
      <div className="glass-strong mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-12">
        <div>
          <h2 className="text-chrome text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium tracking-[-0.03em]">{title}</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{text}</p>
        </div>
        <MagneticLink href="/#contact">
          Start my project <Arrow />
        </MagneticLink>
      </div>
    </section>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <Crumbs items={crumbs} />
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="h-px w-6 bg-ice/60" />
          {eyebrow}
        </p>
        <h1 className="text-chrome max-w-4xl text-[clamp(2.2rem,5.4vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.035em]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">{lead}</p>
      </div>
    </section>
  );
}

export function RelatedServices({ services }: { services: { id: string; title: string; text: string }[] }) {
  if (services.length === 0) return null;
  return (
    <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="related-services-title">
      <div className="mx-auto max-w-5xl">
        <h2
          id="related-services-title"
          className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]"
        >
          Related services
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id}>
              <Link href={`/services/${s.id}`} className="glass group block h-full rounded-2xl p-6 transition-colors hover:border-ice/40">
                <h3 className="mb-2 font-serif text-xl italic">{s.title}</h3>
                <p className="text-[13px] leading-6 text-muted">{s.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

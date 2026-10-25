import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, RelatedServices, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { getIndustry, industrySeoTitles } from "@/lib/industries";
import { site } from "@/lib/site";
import { listProjects } from "@/lib/store/portfolio";
import { listServices } from "@/lib/store/services";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found", robots: { index: false, follow: false } };
  const seoTitle = industrySeoTitles[industry.slug] ?? industry.title;
  return {
    title: seoTitle,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      type: "website",
      url: `${site.url}/industries/${industry.slug}`,
      siteName: site.name,
      title: `${seoTitle} — ${site.name}`,
      description: industry.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `${seoTitle} — ${site.name}`, description: industry.description },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const [allProjects, allServices] = await Promise.all([listProjects(), listServices()]);
  const projects = industry.projects
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const related = industry.services
    .map((id) => allServices.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <PageShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebPage",
              name: industry.title,
              description: industry.description,
              url: `${site.url}/industries/${industry.slug}`,
              isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            },
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "Industries", path: "/industries" },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]),
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.name }]}
        eyebrow={industry.name}
        title={industry.title}
        lead={industry.intro}
      />

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="needs-title">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <h2 id="needs-title" className="eyebrow mb-6">
              What your customers need
            </h2>
            <ul className="space-y-4">
              {industry.needs.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                    <path d="M4 10.5l3.5 3.5L16 6" />
                  </svg>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8">
            <h2 className="eyebrow mb-6">{projects.length > 0 ? "What we have built" : "What we can build"}</h2>
            <ul className="space-y-4">
              {industry.build.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                    <path d="M4 10.5l3.5 3.5L16 6" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="proof-title">
          <div className="mx-auto max-w-5xl">
            <h2
              id="proof-title"
              className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]"
            >
              Projects in this industry
            </h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="glass group block h-full overflow-hidden rounded-3xl transition-colors hover:border-ice/40"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 330px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 font-serif text-xl italic">{p.name}</h3>
                      <p className="mb-3 text-[12px] text-dim">{p.industry}</p>
                      <p className="text-[13px] leading-6 text-muted">{p.summary}</p>
                      <span className="mt-4 inline-block text-sm text-ice">Read the case study →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RelatedServices services={related} />

      <CtaBand
        title={`Let's talk about your ${industry.name} project`}
        text="Tell us about your business and goals — we'll reply with a clear plan and a custom quote."
      />
    </PageShell>
  );
}

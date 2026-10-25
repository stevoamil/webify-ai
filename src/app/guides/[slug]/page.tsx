import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, RelatedServices, breadcrumbJsonLd } from "@/components/sections/PageParts";
import Faq from "@/components/sections/Faq";
import { guideExtras, guideSeoTitles } from "@/lib/guide-extras";
import { getGuide, guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { listServices } from "@/lib/store/services";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found", robots: { index: false, follow: false } };
  const seoTitle = guideSeoTitles[guide.slug] ?? guide.title;
  return {
    title: seoTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/guides/${guide.slug}`,
      siteName: site.name,
      title: seoTitle,
      description: guide.description,
      publishedTime: guide.published,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: guide.description },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const allServices = await listServices();
  const related = guide.services
    .map((id) => allServices.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const otherGuides = guides.filter((g) => g.slug !== guide.slug);
  const extras = guideExtras[guide.slug];

  return (
    <PageShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Article",
              headline: guide.title,
              description: guide.description,
              datePublished: guide.published,
              dateModified: guide.published,
              inLanguage: "en",
              mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
              author: { "@type": "Organization", name: site.name, url: site.url },
              publisher: {
                "@type": "Organization",
                name: site.name,
                logo: { "@type": "ImageObject", url: `${site.url}/icon.png` },
              },
            },
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "Guides", path: "/guides" },
              { name: guide.title, path: `/guides/${guide.slug}` },
            ]),
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "Guide" }]}
        eyebrow={`${guide.readMinutes} min read`}
        title={guide.title}
        lead={guide.intro[0]}
      />

      <article className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-3xl">
          {extras && (
            <aside className="glass-strong mb-10 rounded-2xl p-6 md:p-8" aria-label="Quick answer">
              <p className="eyebrow mb-3 text-[10px]">Quick answer</p>
              <p className="text-[16px] leading-8 text-text">{extras.quickAnswer}</p>
            </aside>
          )}
          {guide.intro.slice(1).map((p) => (
            <p key={p} className="mb-6 text-[16px] leading-8 text-text/85">
              {p}
            </p>
          ))}

          {guide.sections.map((s) => (
            <section key={s.heading} className="mt-14">
              <h2 className="text-chrome mb-5 text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.03em]">
                {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-5 text-[16px] leading-8 text-text/85">
                  {p}
                </p>
              ))}
              {s.table && (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
                    <thead>
                      <tr className="bg-white/[0.04]">
                        {s.table.headers.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-3 font-medium text-text">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r) => (
                        <tr key={r[0]} className="border-t border-line">
                          {r.map((c, i) =>
                            i === 0 ? (
                              <th key={i} scope="row" className="px-4 py-3 font-medium text-text">
                                {c}
                              </th>
                            ) : (
                              <td key={i} className="px-4 py-3 text-muted">
                                {c}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.bullets && (
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15.5px] leading-7 text-text/85">
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-1.5 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]"
                        aria-hidden
                      >
                        <path d="M4 10.5l3.5 3.5L16 6" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      {extras && (
        <Faq
          items={extras.faqs}
          id="guide-faq"
          heading={["Common", "questions."]}
          className="relative px-5 pb-20 md:px-10 md:pb-28"
        />
      )}

      <RelatedServices services={related} />

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="more-guides-title">
        <div className="mx-auto max-w-5xl">
          <h2
            id="more-guides-title"
            className="text-chrome mb-8 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]"
          >
            More guides
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="glass block h-full rounded-2xl p-6 transition-colors hover:border-ice/40"
                >
                  <h3 className="mb-2 font-serif text-lg italic leading-snug">{g.title}</h3>
                  <p className="text-[13px] leading-6 text-muted">{g.readMinutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want help putting this into practice?"
        text="Tell us about your business and goals — we'll reply with a clear plan and a custom quote."
      />
    </PageShell>
  );
}

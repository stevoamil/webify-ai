import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, RelatedServices, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { industryForProject } from "@/lib/industries";
import { site } from "@/lib/site";
import { listProjects } from "@/lib/store/portfolio";
import { listServices } from "@/lib/store/services";

export const dynamic = "force-dynamic";

function shorten(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = (await listProjects()).find((p) => p.slug === slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };

  const longTitle = `${project.name} — ${project.industry} website case study`;
  // Keep the full result title (with the site name added) under about 60 characters.
  const title = longTitle.length <= 47 ? longTitle : `${project.name} website case study`;
  const description = shorten(`${project.summary} ${project.description}`);
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${project.slug}`,
      siteName: site.name,
      title,
      description,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const [projects, services] = await Promise.all([listProjects(), listServices()]);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const industry = industryForProject(project.slug);
  const relatedIds = industry?.services ?? ["business-websites", "ai-integration", "seo-performance"];
  const related = relatedIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  // Preview/sandbox hosts don't last, so the outbound link is only shown for real domains.
  const showLiveLink = project.domain !== "e2b.app";

  return (
    <PageShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "CreativeWork",
              name: `${project.name} — ${project.industry} website`,
              description: project.description,
              image: `${site.url}${project.image}`,
              url: `${site.url}/work/${project.slug}`,
              creator: { "@type": "Organization", name: site.name, url: site.url },
            },
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "Work", path: "/#work" },
              { name: project.name, path: `/work/${project.slug}` },
            ]),
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/#work" }, { label: project.name }]}
        eyebrow={`Case study · ${project.industry}`}
        title={project.name}
        lead={project.summary}
      />

      <section className="px-5 pb-16 md:px-10 md:pb-24" aria-label="Project screenshots">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {[
            { src: project.image, alt: project.imageAlt },
            { src: project.altImage, alt: project.altImageAlt },
          ].map((img) => (
            <div key={img.src} className="glass relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="brief-title">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="glass rounded-3xl p-8">
            <h2 id="brief-title" className="eyebrow mb-6">
              The project
            </h2>
            <p className="text-[16px] leading-8 text-text/90">{project.description}</p>
            <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Client</dt>
                <dd className="mt-1 text-text/90">{project.client}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Industry</dt>
                <dd className="mt-1 text-text/90">{project.industry}</dd>
              </div>
              {project.tech && project.tech.length > 0 && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Built with</dt>
                  <dd className="mt-1 text-text/90">{project.tech.join(", ")}</dd>
                </div>
              )}
              {project.status && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Status</dt>
                  <dd className="mt-1 text-text/90">{project.status}</dd>
                </div>
              )}
            </dl>
            {showLiveLink && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm text-ice underline-offset-4 hover:underline"
              >
                Visit {project.domain} →
              </a>
            )}
          </div>

          <div className="glass rounded-3xl p-8">
            <h2 className="eyebrow mb-6">What we built</h2>
            <ul className="space-y-4">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                    <path d="M4 10.5l3.5 3.5L16 6" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {project.ai.length > 0 && (
        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="ai-title">
          <div className="mx-auto max-w-5xl">
            <h2 id="ai-title" className="text-chrome mb-8 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
              AI and automation
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {project.ai.map((a) => (
                <li key={a} className="rounded-2xl border border-signal/25 bg-signal/[0.06] p-6 text-[15px] leading-7 text-signal">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.lesson && (
        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="lesson-title">
          <div className="glass mx-auto max-w-5xl rounded-3xl p-8">
            <h2 id="lesson-title" className="eyebrow mb-4">
              What we learned
            </h2>
            <p className="text-[16px] leading-8 text-text/90">{project.lesson}</p>
          </div>
        </section>
      )}

      <RelatedServices services={related} />

      {industry && (
        <section className="px-5 pb-16 md:px-10 md:pb-20">
          <p className="mx-auto max-w-5xl text-[15px] leading-7 text-muted">
            This project is part of our work for{" "}
            <Link href={`/industries/${industry.slug}`} className="text-ice underline-offset-4 hover:underline">
              {industry.name.toLowerCase()}
            </Link>
            . See what else we have built in this area.
          </p>
        </section>
      )}

      {more.length > 0 && (
        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="more-work-title">
          <div className="mx-auto max-w-5xl">
            <h2
              id="more-work-title"
              className="text-chrome mb-8 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]"
            >
              More work
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="glass block h-full rounded-2xl p-6 transition-colors hover:border-ice/40">
                    <h3 className="mb-1 font-serif text-xl italic">{p.name}</h3>
                    <p className="mb-3 text-[12px] text-dim">{p.industry}</p>
                    <p className="text-[13px] leading-6 text-muted">{p.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Want a website like this for your business?"
        text="Tell us about your business and goals — we'll reply with a clear plan and a custom quote."
      />
    </PageShell>
  );
}

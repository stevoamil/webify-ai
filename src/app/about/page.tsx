import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { processSteps } from "@/lib/process";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store/settings";
import { listProjects } from "@/lib/store/portfolio";

export const dynamic = "force-dynamic";

const description =
  "Webify.ai is a website agency that builds AI websites: custom design, AI chatbots, 24/7 booking and automation. How we work, what we have built and how to reach us.";

export const metadata: Metadata = {
  title: "About Our AI Website Agency",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    siteName: site.name,
    title: "About Our AI Website Agency",
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const principles = [
  "We show real projects instead of invented numbers.",
  "We scope every project to the business behind it, so there is no public price list. You get a clear plan and a custom quote.",
  "We never promise rankings or lead numbers. Nobody can honestly guarantee them.",
  "AI handles routine questions and bookings. Real decisions stay with a person.",
];

export default async function AboutPage() {
  const [projects, settings] = await Promise.all([listProjects(), getSettings()]);
  return (
    <PageShell>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "AboutPage",
              name: "About Webify.ai",
              url: `${site.url}/about`,
              description,
              about: { "@id": `${site.url}/#organization` },
            },
            breadcrumbJsonLd([{ name: "Home", path: "" }, { name: "About", path: "/about" }]),
          ],
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About"
        title="A website agency built around AI and your business"
        lead="Webify.ai designs and builds websites for businesses, with AI chat assistants, 24/7 booking and automation built in where they genuinely help."
      />

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <h2 className="eyebrow mb-6">Who we are</h2>
            <p className="mb-4 text-[15px] leading-7 text-text/90">
              Webify.ai is a website agency. We design and build custom business websites, online stores, AI chat
              assistants, booking systems and automation, and we support the sites after launch.
            </p>
            <p className="text-[15px] leading-7 text-text/90">
              We work remotely with businesses worldwide, and have built websites in English and Arabic.
            </p>
          </div>
          <div className="glass rounded-3xl p-8">
            <h2 className="eyebrow mb-6">How we work</h2>
            <ul className="space-y-4">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-6 text-text/90">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]" aria-hidden>
                    <path d="M4 10.5l3.5 3.5L16 6" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="process-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="process-title" className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
            Our process
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

      {projects.length > 0 && (
        <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="work-title">
          <div className="mx-auto max-w-5xl">
            <h2 id="work-title" className="text-chrome mb-10 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
              What we have built
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="glass group block h-full rounded-2xl p-6 transition-colors hover:border-ice/40"
                  >
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

      <section className="px-5 pb-20 md:px-10 md:pb-28" aria-labelledby="contact-title">
        <div className="glass mx-auto max-w-5xl rounded-3xl p-8">
          <h2 id="contact-title" className="eyebrow mb-6">
            Get in touch
          </h2>
          <p className="text-[15px] leading-7 text-text/90">
            Email{" "}
            <a href={`mailto:${settings.email}`} className="text-ice underline-offset-2 hover:underline">
              {settings.email}
            </a>
            , message us on WhatsApp, or use the project form on the home page. Tell us about your business and we will
            reply with a clear plan and a custom quote.
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to talk about your project?"
        text="Tell us about your business and goals — we'll reply with a clear plan and a custom quote."
      />
    </PageShell>
  );
}

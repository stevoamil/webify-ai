import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { guides } from "@/lib/guides";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website & AI Guides for Business Owners",
  description:
    "Plain-language guides on website costs, AI booking systems, AI chatbots and redesigning a website without losing your Google rankings.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <PageShell>
      <JsonLd data={{ "@graph": [breadcrumbJsonLd([{ name: "Home", path: "" }, { name: "Guides", path: "/guides" }])] }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        eyebrow="Guides"
        title="Practical guides for businesses going digital"
        lead="Straight answers on websites, AI assistants and booking systems — written for business owners, not developers."
      />
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="glass group flex h-full flex-col rounded-3xl p-8 transition-colors hover:border-ice/40"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{g.readMinutes} min read</p>
                <h2 className="mb-3 font-serif text-2xl italic leading-snug">{g.title}</h2>
                <p className="flex-1 text-[14px] leading-7 text-muted">{g.description}</p>
                <span className="mt-6 text-sm text-ice">Read the guide →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand
        title="Have a question these guides don't answer?"
        text="Tell us about your business and what you're trying to do — we'll reply with a clear plan, not a sales pitch."
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { CtaBand, JsonLd, PageHero, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { industries } from "@/lib/industries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites with AI, booking and automation for garages, real estate, restaurants, clinics, salons, law firms, gyms, hotels, contractors and more.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <JsonLd data={{ "@graph": [breadcrumbJsonLd([{ name: "Home", path: "" }, { name: "Industries", path: "/industries" }])] }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Industries"
        title="Built for the way your industry works"
        lead="Every business sells differently. Here is what each industry needs from its website, with real projects where we have them."
      />
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="glass group flex h-full flex-col rounded-3xl p-8 transition-colors hover:border-ice/40"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{i.name}</p>
                <h2 className="mb-3 font-serif text-2xl italic leading-snug">{i.title}</h2>
                <p className="flex-1 text-[14px] leading-7 text-muted">{i.description}</p>
                <span className="mt-6 text-sm text-ice">See how we help →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand
        title="Don't see your industry?"
        text="The same approach works for any business that takes bookings, enquiries or orders. Tell us about yours."
      />
    </PageShell>
  );
}

"use client";

import { Accent, Arrow, MagneticLink, Reveal, SectionHeading, Tag } from "@/components/ui/primitives";

type Plan = {
  name: string;
  desc: string;
  features: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Landing Page",
    desc: "A focused, high-converting single page for a launch, offer or campaign.",
    features: ["Custom one-page design", "Mobile-first build", "Contact / lead form", "Basic SEO setup"],
  },
  {
    name: "Landing Page + AI",
    desc: "The same focused page, with an AI layer that engages and qualifies visitors.",
    features: ["Everything in Landing Page", "AI chat assistant", "Lead qualification", "Instant lead alerts"],
  },
  {
    name: "Website",
    desc: "A complete multi-page website built around how your business works.",
    features: ["Custom multi-page design", "CMS for easy content edits", "Booking or contact flows", "SEO & performance setup"],
  },
  {
    name: "Website + AI",
    desc: "A full website with AI assistants, search and automation built in.",
    features: ["Everything in Website", "AI assistant across the site", "AI booking or lead capture", "Ongoing AI tuning"],
  },
  {
    name: "Website + AI Agent",
    desc: "Our complete package — a full site with a custom AI agent handling real workflows.",
    features: ["Everything in Website + AI", "Custom AI agent for your business", "Automation across tools", "Priority support"],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="light relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          align="center"
          title={["Premium packages,", <Accent key="e">honest pricing.</Accent>]}
          lead="Every project is scoped to the business behind it. Get in touch for a quote built around your goals."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5 ${
                  p.featured
                    ? "glass-strong ring-1 ring-ice/30 shadow-[0_0_70px_-20px_rgba(240,87,158,0.55)] lg:scale-[1.04]"
                    : "glass"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-5 top-5">
                    <Tag tone="signal">Special package</Tag>
                  </span>
                )}
                <h3 className="mb-2 font-serif text-2xl italic">{p.name}</h3>
                <p className="mb-6 text-[13px] leading-6 text-muted">{p.desc}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-5 text-text/85">
                      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 flex-none fill-none stroke-ice [stroke-width:2]">
                        <path d="M4 10.5l3.5 3.5L16 6" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-dim">Get a Custom Quote →</div>
                <MagneticLink href="#contact" variant={p.featured ? "primary" : "ghost"} className="w-full">
                  Start My Project <Arrow />
                </MagneticLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-dim">
          Prices are scoped per project and shared directly with you — we never publish invented figures.
        </p>
      </div>
    </section>
  );
}

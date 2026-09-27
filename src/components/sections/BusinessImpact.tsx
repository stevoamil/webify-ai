"use client";

import { Accent, Reveal, SectionHeading } from "@/components/ui/primitives";

const TRADITIONAL = [
  "Manual inquiries",
  "Missed messages after hours",
  "Manual bookings by phone",
  "Slow responses to customers",
  "Repetitive support questions",
];

const AI_POWERED = [
  "24/7 AI responses",
  "Automated bookings",
  "Lead collection while you sleep",
  "Faster customer support",
  "Automated repetitive workflows",
];

export default function BusinessImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="impact-title"
          eyebrow="Business Impact"
          align="center"
          title={["Built to do more", <Accent key="e">than look good.</Accent>]}
          lead="A website is infrastructure. Here’s the practical difference automation makes to how a business runs day to day."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-white/[0.02] p-8">
              <p className="eyebrow mb-6 text-dim">Traditional website</p>
              <ul className="space-y-4">
                {TRADITIONAL.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] text-muted">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-none stroke-dim [stroke-width:1.8]">
                      <path d="M6 6l8 8M14 6l-8 8" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass-strong h-full rounded-3xl p-8">
              <p className="eyebrow mb-6 text-signal">AI-powered website</p>
              <ul className="space-y-4">
                {AI_POWERED.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] text-text">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-none stroke-signal [stroke-width:2]">
                      <path d="M4 10.5l3.5 3.5L16 6" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-dim">
          Illustrative comparison. Actual results depend on your business, traffic and how automation is configured — we never guarantee specific outcomes.
        </p>
      </div>
    </section>
  );
}

"use client";

import { Accent, Reveal, SectionHeading } from "@/components/ui/primitives";

const WHY = [
  { title: "Custom Design", desc: "No templates — every interface is designed around your brand." },
  { title: "AI Integration", desc: "Assistants and automation woven into the experience, not bolted on." },
  { title: "Modern Technology", desc: "Next.js, TypeScript and production-grade tooling throughout." },
  { title: "Fast Performance", desc: "Built and measured against real Core Web Vitals." },
  { title: "Mobile First", desc: "Designed for the device most visitors actually use." },
  { title: "Scalable Architecture", desc: "Systems that grow with your business instead of needing a rebuild." },
  { title: "Automation", desc: "Repetitive work handled quietly in the background." },
  { title: "Ongoing Support", desc: "A team on hand after launch, not just at delivery." },
];

export default function WhyAndHuman() {
  return (
    <section id="why" aria-labelledby="why-title" className="light relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="why-title"
          eyebrow="Why Webify.ai"
          align="center"
          title={["Eight reasons", <Accent key="e">clients stay.</Accent>]}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="group h-full bg-ink p-7 transition-colors duration-300 hover:bg-panel-2">
                <span className="mb-4 block font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 text-[15px] font-medium text-text">{w.title}</h3>
                <p className="text-[13px] leading-6 text-muted">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="why" aria-labelledby="why-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
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

      {/* AI + Human support flow */}
      <div className="mx-auto mt-28 max-w-5xl md:mt-36">
        <SectionHeading
          eyebrow="AI + Human Support"
          align="center"
          title={["AI handles the repeat work.", <span key="e">We handle what matters.</span>]}
          lead="AI can automate the repetitive parts of running a website — you still get a real team for anything that needs a human."
        />
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
            {["AI", "Automation", "Webify.ai Team", "Client"].map((n, i, a) => (
              <div key={n} className="flex items-center gap-3 sm:gap-0">
                <div className="glass flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-2xl px-3 text-center">
                  <span className="font-serif text-lg italic text-ice">{n}</span>
                </div>
                {i < a.length - 1 && (
                  <span aria-hidden className="mx-2 hidden text-2xl text-dim sm:inline sm:mx-4">→</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

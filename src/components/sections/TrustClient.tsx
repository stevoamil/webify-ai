"use client";

import { Accent, Reveal, SectionHeading, Tag } from "@/components/ui/primitives";
import type { Project } from "@/lib/projects";
import type { Testimonial } from "@/lib/types";

export default function TrustClient({ projects, testimonials }: { projects: Project[]; testimonials: Testimonial[] }) {
  const stats = [
    { value: String(projects.length), label: "Live projects shipped" },
    { value: String(new Set(projects.map((p) => p.industry)).size), label: "Industries served" },
    { value: "100%", label: "Custom-built, no templates" },
  ];

  return (
    <section id="trust" aria-labelledby="trust-title" className="relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="trust-title"
          eyebrow="Trust"
          align="center"
          title={["Grounded in what", <Accent key="e">we’ve actually built.</Accent>]}
          lead="We’d rather show you real, verifiable work than invent numbers to sound bigger than we are."
        />

        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="rounded-2xl border border-line bg-white/[0.02] px-2 py-6 text-center sm:py-10">
                <p className="text-chrome text-3xl font-medium tracking-[-0.03em] sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs text-muted sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="eyebrow">Kind words</h3>
            {testimonials.length === 0 && <Tag tone="amber">Testimonials coming soon</Tag>}
          </div>
          {testimonials.length === 0 ? (
            <Reveal>
              <div className="glass mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl p-10 text-center">
                <svg viewBox="0 0 32 24" className="h-7 w-9 fill-ice/25">
                  <path d="M0 24V14.5C0 6.5 5 1 12 0l1.5 4.5C8 6 5.5 9 5.5 13H12v11H0zm18 0V14.5C18 6.5 23 1 30 0l1.5 4.5c-5.5 1.5-8 4.5-8 8.5h6.5v11H18z" />
                </svg>
                <p className="text-sm leading-6 text-muted">
                  We’re currently collecting quotes from recent clients — real testimonials will
                  appear here soon.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08}>
                  <div className="glass h-full rounded-2xl p-7">
                    <svg viewBox="0 0 32 24" className="mb-4 h-6 w-8 fill-ice/25">
                      <path d="M0 24V14.5C0 6.5 5 1 12 0l1.5 4.5C8 6 5.5 9 5.5 13H12v11H0zm18 0V14.5C18 6.5 23 1 30 0l1.5 4.5c-5.5 1.5-8 4.5-8 8.5h6.5v11H18z" />
                    </svg>
                    <p className="mb-6 text-sm italic leading-6 text-text/80">“{t.quote}”</p>
                    <p className="text-sm font-medium text-text">{t.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

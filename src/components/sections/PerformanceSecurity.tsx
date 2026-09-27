"use client";

import { Accent, Reveal, SectionHeading, Tag } from "@/components/ui/primitives";

const CATEGORIES = ["Performance", "Mobile", "SEO", "Accessibility"];

const SECURITY = [
  { title: "HTTPS everywhere", desc: "Every site is served over encrypted HTTPS by default." },
  { title: "Secure deployment", desc: "Builds are deployed through modern, isolated hosting pipelines." },
  { title: "Authentication", desc: "Secure sign-in flows for dashboards, portals and gated content." },
  { title: "Database security", desc: "Access-controlled, encrypted-at-rest data storage where applicable." },
  { title: "Automated backups", desc: "Regular backups so content and data can be recovered quickly." },
  { title: "Uptime monitoring", desc: "Automated checks flag downtime before it affects visitors." },
];

export default function PerformanceSecurity() {
  return (
    <section id="performance" aria-labelledby="performance-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="performance-title"
          eyebrow="Performance"
          align="center"
          title={["Built fast.", <Accent key="e">Designed to perform.</Accent>]}
          lead="Every build is measured against the categories that actually affect visitors and search rankings."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c} delay={i * 0.06}>
              <div className="glass flex h-full flex-col items-center gap-4 rounded-2xl p-7 text-center">
                <Gauge label={c} />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{c}</p>
                <Tag tone="amber">Measured per project</Tag>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-xs text-dim">
          We don’t publish invented scores. Real Core Web Vitals and Lighthouse results are shared with each client from their own live site.
        </p>
      </div>

      {/* Security */}
      <div className="mx-auto mt-28 max-w-7xl md:mt-36">
        <SectionHeading
          eyebrow="Security & Reliability"
          align="center"
          title={["Trust, built into", <Accent key="e">the foundation.</Accent>]}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <svg viewBox="0 0 24 24" className="mb-4 h-6 w-6 fill-none stroke-signal [stroke-width:1.5]">
                  <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h3 className="mb-1.5 text-[15px] font-medium">{s.title}</h3>
                <p className="text-[13px] leading-6 text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gauge({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 100 60" className="h-16 w-28" role="img" aria-label={`${label} gauge`}>
      <path d="M8 55A42 42 0 0192 55" stroke="rgba(255,255,255,.12)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M8 55A42 42 0 0192 55" stroke="url(#g)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="132" strokeDashoffset="30" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#a9dcff" />
          <stop offset="1" stopColor="#7cf2c8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

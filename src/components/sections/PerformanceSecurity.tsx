"use client";

import { Accent, Reveal, SectionHeading } from "@/components/ui/primitives";

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
    <section id="security" aria-labelledby="security-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="security-title"
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

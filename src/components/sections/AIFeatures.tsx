"use client";

import { Accent, Reveal, SectionHeading, SpotlightCard } from "@/components/ui/primitives";

const FEATURES = [
  { title: "AI Customer Support", desc: "Answers common questions instantly, day or night." },
  { title: "AI Lead Generation", desc: "Captures and qualifies visitors before they leave." },
  { title: "AI Appointment Booking", desc: "Books, confirms and reminds — no back-and-forth." },
  { title: "AI FAQ Assistant", desc: "Trained on your business, always on-brand." },
  { title: "AI Sales Automation", desc: "Follows up and nudges leads toward a decision." },
  { title: "AI Website Search", desc: "Finds the right page or product in one query." },
  { title: "AI Content Generation", desc: "Drafts updates, descriptions and replies fast." },
  { title: "Business Automation", desc: "Connects forms, inboxes and tools into one flow." },
];

const FLOW = ["Visitor", "AI", "Automation", "Business", "Customer"];

export default function AIFeatures() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-signal/[0.05] blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          id="ai-title"
          eyebrow="AI Capabilities"
          align="center"
          title={["A living system,", <Accent key="e">not a brochure.</Accent>]}
          lead="Every Webify.ai build can carry the same intelligence layer that runs underneath a great customer experience."
        />

        {/* Data-flow diagram */}
        <Reveal delay={0.1} className="mt-16">
          <FlowDiagram />
        </Reveal>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <SpotlightCard className="h-full p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-signal/25 bg-signal/[0.07] font-mono text-[11px] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-[15px] font-medium text-text">{f.title}</h3>
                <p className="text-[13px] leading-6 text-muted">{f.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  return (
    <div className="glass overflow-hidden rounded-3xl p-6 md:p-10">
      <svg viewBox="0 0 1000 160" className="h-auto w-full" role="img" aria-label="Visitor to AI to Automation to Business to Customer flow">
        <defs>
          <linearGradient id="flow-line" x1="0" x2="1">
            <stop offset="0" stopColor="#a9dcff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#a9dcff" />
            <stop offset="1" stopColor="#7cf2c8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="90" y1="80" x2="910" y2="80" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" />
        <line
          x1="90" y1="80" x2="910" y2="80"
          stroke="url(#flow-line)"
          strokeWidth="1.5"
          strokeDasharray="20 180"
          className="animate-flow"
        />
        {FLOW.map((label, i) => {
          const x = 90 + i * ((910 - 90) / (FLOW.length - 1));
          return (
            <g key={label} transform={`translate(${x} 80)`}>
              <circle r="26" fill="#0c0f14" stroke={i === 1 || i === 2 ? "#7cf2c8" : "rgba(255,255,255,.25)"} strokeWidth="1.5" />
              <circle r="26" fill="none" stroke="#7cf2c8" strokeOpacity="0.35" className={i === 1 ? "animate-pulse-soft" : ""} />
              <text y="5" textAnchor="middle" fontSize="11" fill="#e9eef4" fontFamily="var(--font-mono)">
                {label === "AI" ? "AI" : label[0]}
              </text>
              <text y="52" textAnchor="middle" fontSize="12" fill="#8b95a3" fontFamily="var(--font-mono)" letterSpacing="0.05em">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

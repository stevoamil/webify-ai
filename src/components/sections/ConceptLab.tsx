"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Accent, SectionHeading, Tag } from "@/components/ui/primitives";

const INDUSTRIES = {
  "Real Estate": { noun: "homes", hero: "Find the home that fits your life", sections: ["Property search", "Featured listings", "Valuation", "Agents"] },
  Restaurant: { noun: "tables", hero: "An evening worth remembering", sections: ["Menu", "Reservations", "Private dining", "Gallery"] },
  Clinic: { noun: "appointments", hero: "Care that starts before you arrive", sections: ["Treatments", "Book a visit", "Our doctors", "FAQ"] },
  Beauty: { noun: "sessions", hero: "Your ritual, reimagined", sections: ["Services", "Book online", "Lookbook", "Gift cards"] },
  Events: { noun: "celebrations", hero: "Moments designed to be remembered", sections: ["Packages", "Portfolio", "Process", "Inquiry"] },
  Automotive: { noun: "vehicles", hero: "Drive what moves you", sections: ["Inventory", "Test drive", "Finance", "Service"] },
} as const;

const GOALS = {
  "Get bookings": { cta: "Book now", ai: ["AI booking assistant", "Automatic reminders", "Calendar sync"] },
  "Generate leads": { cta: "Get a quote", ai: ["AI lead qualification", "Instant lead alerts", "CRM hand-off"] },
  "Sell online": { cta: "Shop the collection", ai: ["AI product finder", "Abandoned-cart follow-up", "Order updates"] },
  "Build trust": { cta: "Talk to us", ai: ["AI FAQ assistant", "Review requests", "WhatsApp hand-off"] },
} as const;

const STYLES = {
  "Minimal Luxe": { bg: "#0d0d0f", fg: "#f1ede6", accent: "#c9a36a", font: "font-serif italic", radius: "rounded-none" },
  "Bold Tech": { bg: "#05070b", fg: "#e9f3ff", accent: "#6fb6ff", font: "font-sans font-semibold tracking-tight", radius: "rounded-xl" },
  "Warm Editorial": { bg: "#1a1512", fg: "#f6ece1", accent: "#e39b6b", font: "font-serif", radius: "rounded-2xl" },
} as const;

type I = keyof typeof INDUSTRIES;
type G = keyof typeof GOALS;
type S = keyof typeof STYLES;

function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-[10px]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 ${
              value === o
                ? "border-ice/50 bg-ice/10 text-text shadow-[0_0_24px_-6px_rgba(169,220,255,.5)]"
                : "border-line text-muted hover:border-line-strong hover:text-text"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function ConceptLab() {
  const [industry, setIndustry] = useState<I>("Restaurant");
  const [goal, setGoal] = useState<G>("Get bookings");
  const [style, setStyle] = useState<S>("Minimal Luxe");
  const [seed, setSeed] = useState(0);
  const [generating, setGenerating] = useState(false);

  const concept = useMemo(() => {
    const ind = INDUSTRIES[industry];
    const g = GOALS[goal];
    const st = STYLES[style];
    return { ind, g, st, key: `${industry}-${goal}-${style}-${seed}` };
  }, [industry, goal, style, seed]);

  const regenerate = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setGenerating(true);
    setSeed((s) => s + 1);
    window.setTimeout(() => setGenerating(false), 650);
  };

  const { ind, g, st } = concept;

  return (
    <section id="concept" aria-labelledby="concept-title" className="relative overflow-hidden bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-halo/[0.05] blur-[140px]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
            id="concept-title"
            eyebrow="See what we can build"
            title={["Generate a website", <>concept <Accent>in seconds.</Accent></>]}
            lead="Choose an industry, a goal and a style. The preview rebuilds itself live — a small taste of how we turn a brief into a working system."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-10">
          {/* Controls */}
          <div className="glass flex flex-col gap-7 rounded-3xl p-6 md:p-7">
            <Chips label="Industry" options={Object.keys(INDUSTRIES) as I[]} value={industry} onChange={regenerate(setIndustry)} />
            <Chips label="Primary goal" options={Object.keys(GOALS) as G[]} value={goal} onChange={regenerate(setGoal)} />
            <Chips label="Visual style" options={Object.keys(STYLES) as S[]} value={style} onChange={regenerate(setStyle)} />
            <div className="mt-auto border-t border-line pt-5">
              <p className="eyebrow mb-3 text-[10px]">Recommended AI layer</p>
              <ul className="space-y-2">
                {g.ai.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-text/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_#7cf2c8]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preview */}
          <div className="relative">
            <div className="glass-strong overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="mx-auto flex items-center gap-2 rounded-full border border-line bg-black/30 px-4 py-1 font-mono text-[11px] text-muted">
                  <span className="text-signal">●</span> yourbrand.com
                </div>
                <Tag>Concept preview</Tag>
              </div>

              <div className="relative aspect-[16/11] md:aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={concept.key}
                    initial={{ opacity: 0, scale: 0.985, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col overflow-hidden"
                    style={{ background: st.bg, color: st.fg }}
                  >
                    {/* mock nav */}
                    <div className="flex items-center justify-between px-[5%] py-[3%] text-[clamp(8px,1.1vw,12px)] opacity-80">
                      <span className={`${st.font} text-[1.3em]`}>Your Brand</span>
                      <span className="hidden gap-[2vw] sm:flex">
                        {ind.sections.slice(0, 3).map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </span>
                      <span className={`px-[1em] py-[.4em] ${st.radius}`} style={{ background: st.accent, color: st.bg }}>
                        {g.cta}
                      </span>
                    </div>
                    {/* mock hero */}
                    <div className="relative flex flex-1 flex-col justify-center px-[5%]">
                      <div
                        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[80%] w-[55%] rounded-full blur-3xl"
                        style={{ background: st.accent, opacity: 0.18 }}
                      />
                      <p className="mb-[1.5%] font-mono text-[clamp(7px,.9vw,10px)] uppercase tracking-[0.3em] opacity-60">
                        {industry} · {goal}
                      </p>
                      <h3 className={`${st.font} max-w-[70%] text-[clamp(18px,4vw,46px)] leading-[1.02]`}>{ind.hero}</h3>
                      <p className="mt-[2%] max-w-[50%] text-[clamp(8px,1.1vw,13px)] leading-relaxed opacity-60">
                        Discover our {ind.noun} and {g.cta.toLowerCase()} in under a minute — our assistant is available day and night.
                      </p>
                      <div className="mt-[3%] flex gap-[1.5%] text-[clamp(8px,1vw,12px)]">
                        <span className={`px-[1.4em] py-[.7em] ${st.radius}`} style={{ background: st.accent, color: st.bg }}>
                          {g.cta} →
                        </span>
                        <span className={`border px-[1.4em] py-[.7em] ${st.radius}`} style={{ borderColor: `${st.fg}33` }}>
                          Ask our assistant
                        </span>
                      </div>
                    </div>
                    {/* mock section strip */}
                    <div className="grid grid-cols-4 gap-[1.5%] px-[5%] pb-[4%]">
                      {ind.sections.map((s, i) => (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }}
                          className={`border p-[8%] text-[clamp(7px,.95vw,11px)] ${st.radius}`}
                          style={{ borderColor: `${st.fg}1f`, background: `${st.fg}08` }}
                        >
                          <div className="mb-[10%] h-[3px] w-[30%]" style={{ background: st.accent }} />
                          {s}
                        </motion.div>
                      ))}
                    </div>
                    {/* AI bubble */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute bottom-[5%] right-[3%] hidden max-w-[34%] rounded-2xl border p-[1.4%] text-[clamp(7px,.9vw,11px)] backdrop-blur md:block"
                      style={{ borderColor: `${st.fg}22`, background: `${st.bg}cc` }}
                    >
                      <span className="opacity-60">Assistant</span>
                      <br />
                      Hi! Want me to {g.cta.toLowerCase()} for you?
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {generating && (
                  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-ice/20 to-transparent [animation-duration:.7s]" />
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs text-dim">
              Instant, rule-based concept for illustration. Real projects start with a discovery call and fully custom design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

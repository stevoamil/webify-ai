"use client";

import { useRef, useState } from "react";
import { Accent, SectionHeading, Tag } from "@/components/ui/primitives";

const CHECKS = [
  "Modern navigation",
  "AI assistant, live 24/7",
  "Online booking system",
  "Premium typography",
  "Fully mobile responsive",
  "Smooth, modern animation",
];

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (x: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  return (
    <section id="transform" aria-labelledby="transform-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="transform-title"
          eyebrow="Before → After"
          align="center"
          title={["From ordinary to", <Accent key="e">extraordinary.</Accent>]}
          lead="Drag the divider. This is the difference between a website that sits there, and one that works."
        />

        <div
          ref={trackRef}
          className="relative mx-auto mt-14 aspect-[16/10] max-w-4xl touch-none overflow-hidden rounded-3xl border border-line-strong select-none md:aspect-[16/9]"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as Element).setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
        >
          {/* AFTER (base layer) */}
          <div className="absolute inset-0 bg-[#05070a]">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-ice/10 blur-[100px]" />
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6">
              <span className="font-serif text-lg italic text-text md:text-xl">Aurora & Co.</span>
              <div className="hidden gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:flex">
                <span>Menu</span><span>Reserve</span><span>Gallery</span>
              </div>
              <span className="rounded-full bg-gradient-to-b from-white to-[#cfd8e2] px-4 py-1.5 text-[11px] font-medium text-[#05070a]">Book a table</span>
            </div>
            <div className="px-6 pt-4 md:px-10">
              <p className="eyebrow mb-3 text-[9px]">Now with AI &amp; automation</p>
              <h3 className="max-w-md text-[clamp(1.4rem,4vw,2.6rem)] font-medium leading-[1.05] text-chrome">
                Reservations, answered instantly.
              </h3>
              <div className="mt-6 grid max-w-sm grid-cols-2 gap-3">
                {CHECKS.map((c) => (
                  <div key={c} className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-[11px] text-text/85">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none fill-none stroke-signal [stroke-width:2]">
                      <path d="M4 10.5l3.5 3.5L16 6" />
                    </svg>
                    {c}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex max-w-[220px] items-center gap-2 rounded-2xl border border-ice/20 bg-ice/[0.06] px-4 py-3 text-[12px] text-text/90">
                <span className="h-2 w-2 flex-none animate-pulse-soft rounded-full bg-signal" />
                AI Assistant: “Table for two, Friday 8pm?”
              </div>
            </div>
          </div>

          {/* BEFORE (clipped overlay) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="absolute inset-0 bg-[#e9e6df]" />
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <span className="font-bold text-[#333]">AURORA RESTAURANT</span>
              <div className="hidden gap-4 text-[11px] font-bold uppercase text-[#555] md:flex">
                <span>Home</span><span>Menu</span><span>Contact Us</span>
              </div>
            </div>
            <div className="px-6 pt-8">
              <p className="text-[10px] font-bold uppercase text-[#888]">Welcome To Our Website</p>
              <h3 className="mt-2 max-w-xs font-serif text-2xl text-[#333]">Aurora Restaurant &amp; Bar</h3>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-[#666]">
                Call us to make a reservation. Open Tuesday through Sunday, 5pm to 11pm.
              </p>
              <div className="mt-5 inline-block border-2 border-[#333] px-4 py-2 text-[11px] font-bold uppercase text-[#333]">
                Call (555) 010-0199
              </div>
              <div className="mt-8 h-24 w-full max-w-sm bg-[repeating-linear-gradient(45deg,#d8d4ca,#d8d4ca_10px,#cdc9bd_10px,#cdc9bd_20px)]" />
            </div>
          </div>

          {/* Labels */}
          <span className="pointer-events-none absolute left-4 top-4"><Tag tone="amber">Before</Tag></span>
          <span className="pointer-events-none absolute right-4 top-4"><Tag tone="signal">After — Webify.ai</Tag></span>

          {/* Handle */}
          <div className="absolute inset-y-0 w-px bg-white/70" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,.4)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#05070a] [stroke-width:2] [stroke-linecap:round]">
                <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-dim">Illustrative example — not an actual client site.</p>
      </div>
    </section>
  );
}

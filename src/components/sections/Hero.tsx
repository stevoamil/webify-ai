"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Arrow, MagneticLink } from "@/components/ui/primitives";

/**
 * Scroll-scrubbed hero film.
 * The video is pre-rendered to a WebP frame sequence (public/hero) and drawn to a
 * canvas, which gives frame-accurate scrubbing in every browser. Frames stream in
 * coarse-to-fine so the scrubber is usable almost immediately.
 */
const SETS = {
  desktop: { dir: "/hero/d", count: 240 },
  mobile: { dir: "/hero/m", count: 120 },
};

const CHAPTERS = [
  { label: "Intelligence", from: 0.06 },
  { label: "Design", from: 0.25 },
  { label: "Build", from: 0.43 },
  { label: "Transform", from: 0.8 },
  { label: "What’s next", from: 0.92 },
];

const frameSrc = (dir: string, i: number) => `${dir}/${String(i + 1).padStart(3, "0")}.webp`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Linear remap with clamping — used instead of framer's useTransform for values we
 *  render as plain styles, so the browser can't silently swap in a native ViewTimeline
 *  (Framer Motion's automatic hardware-accelerated scroll optimization). That native path
 *  computes its own view-timeline range for a position:sticky child of an oversized
 *  scroll container, which does not match the ["start start","end end"] progress we
 *  compute in JS — the two disagree, so we keep these fully JS-driven for correctness. */
const mapRange = (p: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const t = clamp01((p - inMin) / (inMax - inMin));
  return outMin + t * (outMax - outMin);
};

/** Coarse-to-fine load order: every 16th frame, then 8th, 4th, 2nd, all. */
function loadOrder(count: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  return order;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const target = useRef(0);
  const [chapter, setChapter] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);

  // Re-checked on resize/rotation, not just at mount, so crossing the
  // breakpoint swaps to the correct frame set instead of sticking with
  // whichever one was current on first load.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setProgress(p);
    target.current = p;
    let c = -1;
    CHAPTERS.forEach((ch, i) => p >= ch.from && (c = i));
    setChapter(c);
  });

  const introOpacity = mapRange(progress, 0, 0.06, 1, 0);
  const introY = mapRange(progress, 0, 0.06, 0, -40);
  const cueOpacity = mapRange(progress, 0, 0.03, 1, 0);
  const outroOpacity = mapRange(progress, 0.93, 0.99, 0, 1);
  const outroY = mapRange(progress, 0.93, 0.99, 30, 0);
  const railOpacity =
    progress < 0.06
      ? mapRange(progress, 0.04, 0.08, 0, 1)
      : mapRange(progress, 0.95, 1, 1, 0);
  const introEvents: "auto" | "none" = progress < 0.045 ? "auto" : "none";
  const outroEvents: "auto" | "none" = progress > 0.95 ? "auto" : "none";

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const set = isMobile ? SETS.mobile : SETS.desktop;
    frames.current = new Array(set.count).fill(null);
    let cancelled = false;
    let current = 0;
    let drawn = -1;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1;
    };

    const nearestLoaded = (i: number) => {
      const f = frames.current;
      for (let d = 0; d < f.length; d++) {
        if (f[i - d]) return i - d;
        if (f[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (i: number) => {
      const idx = nearestLoaded(i);
      if (idx < 0 || idx === drawn) return;
      const img = frames.current[idx]!;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = idx;
    };

    const tick = () => {
      // Ease toward the scroll target for a silky, weighted scrub.
      current += (target.current * (set.count - 1) - current) * 0.2;
      draw(Math.round(current));
      raf = requestAnimationFrame(tick);
    };

    // Stream frames with a small concurrency pool. Only the coarse first pass
    // loads straight away; the finer passes wait until the page has loaded and
    // the browser is idle so they never compete with the first paint. Visitors
    // on Save-Data connections stop at every 4th frame.
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const order = loadOrder(set.count);
    if (saveData) order.length = Math.min(order.length, Math.ceil(set.count / 4) + 1);
    let cursor = 0;
    let loaded = 0;
    let active = 0;
    let fineOpen = false;
    const firstPass = Math.ceil(set.count / 16) + 1;
    const pump = () => {
      while (!cancelled && active < (fineOpen ? 4 : 3) && cursor < order.length && (fineOpen || cursor < firstPass)) {
        const i = order[cursor++];
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(set.dir, i);
        active++;
        img
          .decode()
          .then(() => {
            if (cancelled) return;
            frames.current[i] = img;
            loaded++;
            if (loaded === 1) drawn = -1;
            if (loaded === firstPass) window.dispatchEvent(new Event("hero:ready"));
          })
          .catch(() => {})
          .finally(() => {
            active--;
            pump();
          });
      }
    };

    let idleHandle = 0;
    let idleTimer = 0;
    const openFine = () => {
      fineOpen = true;
      pump();
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const armFine = () => {
      if (hasIdle) idleHandle = window.requestIdleCallback(openFine, { timeout: 2500 });
      else idleTimer = window.setTimeout(openFine, 1500);
    };

    resize();
    window.addEventListener("resize", resize);
    pump();
    if (document.readyState === "complete") armFine();
    else window.addEventListener("load", armFine, { once: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", armFine);
      if (idleHandle) window.cancelIdleCallback(idleHandle);
      window.clearTimeout(idleTimer);
    };
  }, [isMobile]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Webify.ai introduction"
      className="relative h-[460vh] bg-void"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* First frame paints instantly while the sequence streams in */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/poster.jpg"
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        {/* Cinematic grade */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,4,6,.75)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />

        {/* Intro copy */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, pointerEvents: introEvents }}
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice" />
            </span>
            AI-powered web studio
          </motion.p>
          <h1 className="max-w-5xl text-[clamp(2.6rem,7.6vw,6.8rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            <span className="sr-only">Webify.ai — AI-powered websites for modern businesses. </span>
            <span aria-hidden className="block overflow-hidden">
              <motion.span
                className="text-chrome block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                Websites that
              </motion.span>
            </span>
            <span aria-hidden className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              >
                <em className="font-serif font-normal italic text-ice">think</em>
                <span className="text-chrome">, sell &amp; book.</span>
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-7 max-w-xl text-base leading-7 text-[#b7c1cd] md:text-lg"
          >
            Premium websites, AI assistants, automation and booking systems —
            engineered as one smart digital system for your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticLink href="#contact">
              Start a Project <Arrow />
            </MagneticLink>
            <MagneticLink href="#work" variant="ghost">
              See our work
            </MagneticLink>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#how-we-work"
          style={{ opacity: cueOpacity, pointerEvents: introEvents }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted"
        >
          <span className="eyebrow text-[10px]">Scroll to explore ↓</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-ice to-transparent" />
          </span>
        </motion.a>

        {/* Chapter rail synced to the film */}
        <motion.nav
          aria-hidden
          style={{ opacity: railOpacity }}
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex lg:right-10"
        >
          {CHAPTERS.map((c, i) => (
            <div key={c.label} className="flex items-center justify-end gap-3">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
                  chapter === i ? "text-text opacity-100" : "text-dim opacity-60"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  chapter === i ? "w-8 bg-ice" : "w-3 bg-white/25"
                }`}
              />
            </div>
          ))}
        </motion.nav>

        {/* Film progress */}
        <div className="absolute inset-x-5 bottom-5 h-px bg-white/[0.07] md:inset-x-10">
          <div
            style={{ transform: `scaleX(${progress})` }}
            className="h-full origin-left bg-gradient-to-r from-ice/30 via-ice to-halo"
          />
        </div>

        {/* Outro CTA — the film ends on “Build what’s next” */}
        <motion.div
          style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroEvents }}
          className="absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-5 px-5 text-center"
        >
          <p className="max-w-md text-sm leading-6 text-[#b7c1cd] md:text-base">
            Your next website shouldn’t just look good. It should answer, qualify, book and sell — around the clock.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <MagneticLink href="#contact">
              Build what’s next <Arrow />
            </MagneticLink>
            <MagneticLink href="#how-we-work" variant="ghost">
              How we work
            </MagneticLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

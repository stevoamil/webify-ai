"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accent, SectionHeading } from "@/components/ui/primitives";
import { ICONS, type IconKey, type ServiceCard } from "@/lib/services-data";

const CONTACT_URL = "#contact";

/* =========================================================
   THE 3D LAYOUT
   ========================================================= */
const SPACING = 250; // px from centre to the 1st neighbour
const SQUEEZE = 17.5; // how much each further step shrinks the gap
const SCALE_STEP = 0.14; // each step away gets 14% smaller
const TILT = 20; // degrees the side cards turn
const DARKEN = 0.28; // brightness lost per step
const AUTOPLAY = 3500; // ms between auto-advances (0 = off)

const Icon = ({ k, className = "" }: { k: IconKey; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} dangerouslySetInnerHTML={{ __html: ICONS[k] }} />
);

/* ---------- Card artwork: a real photo per service, tinted with its accent hue ---------- */
function CardArt({ image, hue, priority, full }: { image: string; hue: string; priority?: boolean; full?: boolean }) {
  return (
    <div className={`absolute overflow-hidden ${full ? "inset-0" : "inset-x-0 top-0 h-[66%] w-full"}`} aria-hidden>
      <Image
        src={image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 640px) 288px, 230px"
        className="object-cover"
      />
      <div className="absolute inset-0 mix-blend-multiply" style={{ background: `linear-gradient(160deg, ${hue}55, transparent 60%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 30% 0%, transparent 40%, ${hue}22 100%)` }} />
    </div>
  );
}

export default function ServicesClient({ services: CARDS }: { services: ServiceCard[] }) {
  const N = CARDS.length;

  // Shortest signed distance on a loop, e.g. with 8 cards, 7 → -1
  const wrap = useCallback(
    (d: number) => {
      d = ((d % N) + N) % N;
      return d > N / 2 ? d - N : d;
    },
    [N],
  );

  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const carouselRef = useRef<HTMLElement>(null);
  const dlgRef = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const drag = useRef({ startX: 0, active: false, moved: false });
  const lastFocus = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (step: number) => {
      setCurrent((c) => (c + step + N) % N);
      setDragOffset(0);
    },
    [N],
  );

  /* ---- Autoplay (pauses on hover, while hidden, and for reduced motion) ---- */
  const stopAutoplay = useCallback(() => window.clearInterval(timer.current), []);
  const restartAutoplay = useCallback(() => {
    window.clearInterval(timer.current);
    if (AUTOPLAY && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      timer.current = window.setInterval(() => go(1), AUTOPLAY);
  }, [go]);

  useEffect(() => {
    const el = carouselRef.current!;
    const onResize = () => setNarrow(el.offsetWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    // Only autoplay while the carousel is on screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? restartAutoplay() : stopAutoplay()));
    io.observe(el);
    return () => {
      window.removeEventListener("resize", onResize);
      io.disconnect();
      stopAutoplay();
    };
  }, [restartAutoplay, stopAutoplay]);

  /* ---- Trackpad horizontal swipe ---- */
  useEffect(() => {
    const el = carouselRef.current!;
    let lock = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || lock) return;
      e.preventDefault();
      lock = true;
      go(e.deltaX > 0 ? 1 : -1);
      restartAutoplay();
      window.setTimeout(() => (lock = false), 500);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, restartAutoplay]);

  /* ---- Drag / swipe ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true, moved: false };
    stopAutoplay(); // mouseenter doesn't fire for touch, so pause explicitly on drag start
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5 && !drag.current.moved) {
      drag.current.moved = true;
      setDragging(true);
      carouselRef.current!.setPointerCapture(e.pointerId); // only capture once a real drag starts
    }
    if (drag.current.moved) setDragOffset(dx / SPACING); // 1 card-width of drag = 1 step
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    const steps = -Math.round(dragOffset);
    if (steps) go(steps);
    else setDragOffset(0);
    restartAutoplay(); // resume regardless of whether the drag actually changed the step
    window.setTimeout(() => (drag.current.moved = false), 0);
  };

  /* ---- Details panel ---- */
  const openDetails = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    stopAutoplay();
    setOpen(i);
    dlgRef.current?.showModal(); // traps focus, Esc closes
  };
  const closeDetails = () => dlgRef.current?.close();

  const unit = narrow ? 0.78 : 1; // tighter on phones
  const detail = open !== null ? CARDS[open] : null;

  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(240,87,158,.07),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          align="center"
          title={["Everything your business", <>needs <Accent>online.</Accent></>]}
          lead="Websites, stores, AI and automation — designed and engineered as one system. Drag, swipe or use your arrow keys."
        />
      </div>

      <section
        ref={carouselRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Services"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={stopAutoplay}
        onMouseLeave={restartAutoplay}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            go(-1);
            restartAutoplay();
          }
          if (e.key === "ArrowRight") {
            go(1);
            restartAutoplay();
          }
          if (e.key === "Enter" && e.target === carouselRef.current) openDetails(current);
        }}
        className={`relative mt-12 h-[440px] select-none overflow-hidden outline-none [perspective:1400px] [touch-action:pan-y] sm:h-[504px] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {CARDS.map((c, i) => {
            const d = wrap(i - current) + dragOffset; // signed position
            const a = Math.abs(d);
            const s = Math.sign(d);
            const x = s * (SPACING * a - SQUEEZE * a * Math.max(a - 1, 0)) * unit;
            const scale = Math.max(1 - SCALE_STEP * a, 0.4);
            const rot = -s * Math.min(a, 1.5) * TILT; // minus = side cards face outward
            const z = -a * 60;
            const active = Math.round(d) === 0;
            return (
              <article
                key={c.id}
                aria-hidden={!active}
                onClick={(e) => {
                  if (drag.current.moved) return;
                  if (i !== current) {
                    go(wrap(i - current));
                    restartAutoplay();
                  } else if ((e.target as HTMLElement).closest("[data-explore]")) openDetails(i);
                }}
                className={`absolute left-1/2 top-1/2 -ml-[115px] -mt-[160px] h-[320px] w-[230px] overflow-hidden rounded-[22px] border bg-[#0b0e13] will-change-transform sm:-ml-[144px] sm:-mt-[192px] sm:h-[384px] sm:w-[288px] ${
                  dragging ? "" : "transition-[transform,filter,opacity] duration-[750ms] ease-[cubic-bezier(.22,.8,.2,1)]"
                } ${
                  active
                    ? "border-white/25 shadow-[0_40px_80px_-24px_rgba(0,0,0,.9),0_0_60px_-20px_rgba(240,87,158,.35)]"
                    : "border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)]"
                }`}
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                  filter: `brightness(${Math.max(1 - DARKEN * a, 0.18)})`,
                  opacity: a > 3.4 ? 0 : 1,
                  zIndex: 100 - Math.round(a * 10),
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,.06),transparent_40%)]" />
                <CardArt image={c.image} hue={c.hue} />
                {/* Dark gradient so the text stays readable */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090c] via-[#07090c]/70 via-40% to-transparent to-65%" />

                <span className="absolute left-4 top-4 z-[2] grid h-[38px] w-[38px] place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
                  <Icon k={c.icon} className="h-[18px] w-[18px] fill-none stroke-white [stroke-width:1.6]" />
                </span>
                <span className="absolute right-4 top-5 z-[2] font-mono text-[10px] tracking-[0.2em] text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-6 bottom-6 z-[2]">
                  <h3 className="mb-2.5 font-serif text-[22px] italic leading-[1.1] sm:text-[26px]">{c.title}</h3>
                  <p className="mb-4 text-[13.5px] leading-[1.55] text-white/65">{c.text}</p>
                  <button
                    type="button"
                    data-explore
                    tabIndex={active ? 0 : -1}
                    aria-haspopup="dialog"
                    className={`py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-text transition-colors hover:text-ice ${
                      active ? "" : "pointer-events-none"
                    }`}
                  >
                    Explore service &rarr;
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Controls bar under the cards */}
      <div className="relative mx-auto -mt-4 flex w-[min(1240px,calc(100%-32px))] items-center gap-3 sm:gap-[18px]">
        <button
          onClick={() => (go(-1), restartAutoplay())}
          aria-label="Previous service"
          className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-white/20 transition hover:border-white/50 hover:bg-white/5 sm:h-[42px] sm:w-[42px]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]">
            <path d="M14.5 6l-6 6 6 6" />
          </svg>
        </button>
        <span className="min-w-[52px] flex-none font-mono text-[13px] tracking-[0.08em] text-muted" aria-live="polite">
          {current + 1} / {N}
        </span>
        <div
          className="relative h-[13px] flex-1 cursor-pointer"
          aria-hidden
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const t = Math.min(N - 1, Math.floor(((e.clientX - r.left) / r.width) * N));
            go(t - current);
            restartAutoplay();
          }}
        >
          <span className="absolute inset-x-0 top-[6px] h-px bg-white/15" />
          <span
            className="absolute left-0 top-[6px] h-px bg-gradient-to-r from-ice/50 to-ice transition-[width] duration-[750ms] ease-[cubic-bezier(.22,.8,.2,1)]"
            style={{ width: `${((current + 1) / N) * 100}%` }}
          />
        </div>
        <button
          onClick={() => (go(1), restartAutoplay())}
          aria-label="Next service"
          className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-white/20 transition hover:border-white/50 hover:bg-white/5 sm:h-[42px] sm:w-[42px]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]">
            <path d="M9.5 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Details panel (opens from "Explore service") */}
      <dialog
        ref={dlgRef}
        aria-labelledby="svc-d-title"
        onClick={(e) => e.target === dlgRef.current && closeDetails()}
        onClose={() => {
          lastFocus.current?.focus();
          restartAutoplay();
        }}
        className="m-auto max-h-[calc(100%-48px)] w-[min(560px,calc(100%-32px))] overflow-auto rounded-3xl border border-white/15 bg-panel p-0 text-text shadow-[0_40px_100px_-20px_rgba(0,0,0,.9)] backdrop:bg-black/70 backdrop:backdrop-blur-md open:animate-[pop_.35s_cubic-bezier(.22,.8,.2,1)]"
      >
        {detail && (
          <>
            <button
              onClick={closeDetails}
              aria-label="Close"
              autoFocus
              className="absolute right-[18px] top-[18px] z-[2] h-10 w-10 rounded-full border border-white/20 bg-black/40 text-xl leading-none text-white"
            >
              &times;
            </button>
            <div className="relative overflow-hidden border-b border-white/10 px-8 pb-6 pt-28">
              <div className="absolute inset-0 opacity-80">
                <CardArt image={detail.image} hue={detail.hue} full priority />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/70 to-panel/20" />
              <div className="relative">
                <span className="mb-[18px] grid h-[38px] w-[38px] place-items-center rounded-full border border-white/15 bg-black/40">
                  <Icon k={detail.icon} className="h-[18px] w-[18px] fill-none stroke-white [stroke-width:1.6]" />
                </span>
                <h2 id="svc-d-title" className="mb-2 font-serif text-[34px] italic leading-[1.1]">
                  {detail.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-white/70">{detail.lead}</p>
              </div>
            </div>
            <div className="px-8 pb-8 pt-6">
              <h4 className="mb-3 text-[13px] font-medium tracking-[0.06em] text-ice">What&apos;s included</h4>
              <ul className="mb-6 grid gap-2.5">
                {detail.features.map((f) => (
                  <li key={f} className="relative pl-[26px] text-[14.5px] leading-normal">
                    <span className="absolute left-0 top-[.45em] h-[7px] w-3 -rotate-45 border-b-[1.6px] border-l-[1.6px] border-ice" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mb-7 text-sm leading-relaxed text-white/60">Ideal for: {detail.ideal}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT_URL}
                  onClick={closeDetails}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-gradient-to-b from-white to-[#cfd8e2] px-[22px] text-sm font-medium text-[#05070a]"
                >
                  Request a quote
                </a>
                <button
                  onClick={closeDetails}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 px-[22px] text-sm hover:border-white/50"
                >
                  Back to services
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}

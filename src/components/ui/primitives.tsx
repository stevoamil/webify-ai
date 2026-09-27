"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade + lift on first view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "header";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Line-by-line masked text reveal for headlines. */
export function SplitReveal({
  lines,
  className,
  lineClassName,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease, delay: i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  id,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <header className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <p className={`eyebrow mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-ice/60" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="text-chrome text-[clamp(2.3rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
        <SplitReveal lines={title} />
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8 ${center ? "mx-auto" : ""}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}

/** Serif italic accent used inside headlines. */
export const Accent = ({ children }: { children: ReactNode }) => (
  <em className="font-serif font-normal italic tracking-[-0.01em] text-ice">{children}</em>
);

type MagneticProps = HTMLMotionProps<"a"> & { strength?: number; variant?: "primary" | "ghost" };

/** Button that leans toward the cursor. */
export function MagneticLink({
  children,
  strength = 0.28,
  variant = "primary",
  className = "",
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-white to-[#cfd8e2] text-[#05070a] shadow-[0_0_0_1px_rgba(255,255,255,.4),0_18px_50px_-12px_rgba(169,220,255,.45)] hover:shadow-[0_0_0_1px_rgba(255,255,255,.6),0_22px_60px_-10px_rgba(169,220,255,.65)]"
      : "border border-line-strong bg-soft/[0.03] text-text hover:border-soft/35 hover:bg-soft/[0.06]";

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-[-0.005em] transition-[box-shadow,background-color,border-color] duration-300 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

export const Arrow = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden
    className={`inline-block transition-transform duration-300 group-hover:translate-x-1 ${className}`}
  >
    →
  </span>
);

/** Small status pill, used to label demos and placeholders honestly. */
export function Tag({ children, tone = "ice" }: { children: ReactNode; tone?: "ice" | "amber" | "signal" }) {
  const tones = {
    ice: "border-ice/25 bg-ice/[0.06] text-ice",
    amber: "border-amber-300/30 bg-amber-300/[0.07] text-amber-200",
    signal: "border-signal/25 bg-signal/[0.06] text-signal",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}

/** Card whose highlight follows the pointer. */
export function SpotlightCard({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`group/spot relative overflow-hidden rounded-3xl glass ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(169,220,255,.10), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

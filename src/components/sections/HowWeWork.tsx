"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We listen to how your business actually runs — your customers, your bottlenecks, your goals — and everything that shapes what follows.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "A distinctive direction takes shape: brand mood, structure, user journeys and where AI and automation will genuinely save time.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Interfaces, motion, typography and every interaction are refined down to the smallest detail, on every screen size.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "We engineer the approved vision into a fast, secure build — with AI assistants, bookings and workflows wired in and tested.",
  },
  {
    number: "05",
    title: "Launch Day",
    description:
      "Everything goes live seamlessly while we monitor, optimise and stay on hand — from the first visitor to the next improvement.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = Math.max(0, -rect.top);
      const scrollable = sectionHeight - viewportHeight;

      const progress = Math.min(0.999, Math.max(0, scrolled / scrollable));

      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      setActiveStep(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Clicking a step scrolls to its slice of the section so scroll and state stay in sync.
  const goToStep = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((index + 0.5) / steps.length) * scrollable, behavior: "smooth" });
    setActiveStep(index);
  };

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      aria-label="How we work"
      className="relative h-[500vh] bg-ink text-text"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ambient light */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ice/[0.05] blur-[120px]" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

        {/* CONTENT */}
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-6 md:flex-row md:px-12 lg:px-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-end pb-6 pt-24 md:w-[32%] md:min-w-[280px] md:justify-center md:border-r md:border-white/10 md:py-0 md:pr-10">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
              How We Work
            </div>

            <h2 className="max-w-[360px] font-serif text-4xl italic leading-[1.08] md:text-5xl lg:text-6xl">
              From first
              <br />
              conversation to
              <br />
              <span className="text-ice">launch day</span>
            </h2>

            {/* STEP NAVIGATION */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 md:mt-10 md:block md:space-y-3">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => goToStep(index)}
                  aria-current={activeStep === index ? "step" : undefined}
                  className={`group flex items-center gap-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500 ${
                    activeStep === index ? "text-white" : "text-white/30 hover:text-white/60"
                  }`}
                >
                  <span
                    className={`h-[1px] transition-all duration-500 ${
                      activeStep === index ? "w-5 bg-ice" : "w-2 bg-white/30"
                    }`}
                  />

                  <span>{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative flex flex-1 items-start md:items-center md:pl-16 lg:pl-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                aria-hidden={activeStep !== index}
                className={`absolute left-0 right-0 top-4 transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] md:top-auto md:left-16 md:right-6 lg:left-24 ${
                  activeStep === index
                    ? "translate-y-0 opacity-100"
                    : index < activeStep
                      ? "-translate-y-8 opacity-0"
                      : "translate-y-8 opacity-0"
                }`}
              >
                {/* NUMBER */}
                <div className="font-serif text-[96px] leading-none text-white/[0.07] md:text-[150px] lg:text-[190px]">
                  {step.number}
                </div>

                {/* TITLE */}
                <h3 className="-mt-4 font-serif text-4xl italic md:text-5xl lg:text-6xl">{step.title}</h3>

                {/* DESCRIPTION */}
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 md:text-base">
                  {step.description}
                </p>

                {/* DECORATIVE LINE */}
                <div className="mt-10 h-px w-16 bg-gradient-to-r from-ice/60 to-transparent" />
              </div>
            ))}

            {/* CURSOR / ORB EFFECT */}
            <div className="pointer-events-none absolute right-[15%] top-[45%] hidden h-10 w-10 items-center justify-center rounded-full border border-ice/30 md:flex">
              <div className="absolute inset-0 animate-ping rounded-full border border-ice/20 [animation-duration:2.6s]" />
              <div className="h-1 w-1 rounded-full bg-ice" />
            </div>
          </div>
        </div>

        {/* PROGRESS LINE */}
        <div className="absolute bottom-8 left-6 right-6 h-px bg-white/10 md:left-12 md:right-12">
          <div
            className="h-full bg-gradient-to-r from-ice/40 to-ice transition-all duration-700"
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

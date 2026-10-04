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

const STEP_DURATION = 4000;

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // The first time the section comes into view, freeze page scrolling and
  // auto-advance through the steps like a slideshow; scrolling unfreezes
  // once the last step (Launch Day) has had its full time on screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = sectionRef.current;
    if (!el) return;

    const triggered = { current: false };
    let interval = 0;
    let scrollbarGap = "";

    const lockScroll = () => {
      scrollbarGap = `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollbarGap;
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

    const play = () => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      lockScroll();
      setActiveStep(0);

      let step = 0;
      interval = window.setInterval(() => {
        step += 1;
        if (step >= steps.length) {
          window.clearInterval(interval);
          unlockScroll();
          return;
        }
        setActiveStep(step);
      }, STEP_DURATION);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          play();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      unlockScroll();
    };
  }, []);

  const goToStep = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      aria-label="How we work"
      className="light relative bg-ink text-text"
    >
      <div className="relative min-h-[100svh] overflow-hidden">
        {/* ambient light */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ice/[0.05] blur-[120px]" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

        {/* CONTENT */}
        <div className="relative mx-auto flex h-full min-h-[100svh] max-w-[1600px] flex-col px-6 py-24 md:flex-row md:px-12 md:py-0 lg:px-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-end pb-6 pt-24 md:w-[32%] md:min-w-[280px] md:justify-center md:border-r md:border-line md:py-0 md:pr-10">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
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
            <div className="no-scrollbar mt-8 flex gap-x-6 gap-y-3 overflow-x-auto pb-1 md:mt-10 md:block md:space-y-3 md:overflow-visible">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => goToStep(index)}
                  aria-current={activeStep === index ? "step" : undefined}
                  className={`group flex flex-none items-center gap-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500 ${
                    activeStep === index ? "text-text" : "text-dim hover:text-muted"
                  }`}
                >
                  <span
                    className={`h-[1px] transition-all duration-500 ${
                      activeStep === index ? "w-5 bg-ice" : "w-2 bg-dim"
                    }`}
                  />

                  <span>{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative mt-16 flex flex-1 items-start md:mt-0 md:items-center md:pl-16 lg:pl-24">
            <div className="relative h-[280px] w-full md:h-[260px]">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  aria-hidden={activeStep !== index}
                  className={`absolute left-0 right-0 top-0 transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] md:right-6 lg:right-0 ${
                    activeStep === index
                      ? "translate-y-0 opacity-100"
                      : index < activeStep
                        ? "-translate-y-8 opacity-0"
                        : "translate-y-8 opacity-0"
                  }`}
                >
                  {/* NUMBER */}
                  <div className="font-serif text-[96px] leading-none text-line md:text-[150px] lg:text-[190px]">
                    {step.number}
                  </div>

                  {/* TITLE */}
                  <h3 className="-mt-4 font-serif text-4xl italic md:text-5xl lg:text-6xl">{step.title}</h3>

                  {/* DESCRIPTION */}
                  <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
                    {step.description}
                  </p>

                  {/* DECORATIVE LINE */}
                  <div className="mt-10 h-px w-16 bg-gradient-to-r from-ice/60 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS LINE */}
        <div className="absolute bottom-8 left-6 right-6 h-px bg-line md:left-12 md:right-12">
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

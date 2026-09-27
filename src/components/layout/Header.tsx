"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import { MagneticLink } from "@/components/ui/primitives";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-line bg-void/70 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-serif text-xl italic tracking-tight text-text">
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticLink href="#contact" className="!min-h-10 !px-5 !text-[13px]">
            Start a Project →
          </MagneticLink>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
        >
          <div className="relative h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-4 bg-text transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-px w-4 bg-text transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-line bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-sm text-text/90 hover:bg-white/[0.04]"
                >
                  {l.label}
                </a>
              ))}
              <MagneticLink href="#contact" onClick={() => setOpen(false)} className="mt-2">
                Start a Project →
              </MagneticLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

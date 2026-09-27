"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Accent, SectionHeading } from "@/components/ui/primitives";

const INDUSTRIES = [
  { name: "Real Estate", type: "Listing-driven website with map search", ai: ["AI property matching", "AI valuation estimates"], automation: "Lead routing to agents", layout: "Search hero → Featured listings → Agents → Contact" },
  { name: "Restaurants", type: "Menu-led site with reservations", ai: ["AI booking assistant", "AI FAQ for hours & menu"], automation: "Reservation confirmations", layout: "Hero → Menu → Reserve → Gallery → Contact" },
  { name: "Automotive", type: "Inventory showcase with financing", ai: ["AI vehicle finder", "AI trade-in estimate"], automation: "Test-drive scheduling", layout: "Inventory → Vehicle detail → Finance → Service" },
  { name: "Events", type: "Portfolio-first site with inquiry builder", ai: ["AI concierge for packages", "AI mood-board suggestions"], automation: "Inquiry qualification", layout: "Hero film → Portfolio → Process → Inquiry" },
  { name: "Healthcare", type: "Trust-led site with online booking", ai: ["AI symptom-triage FAQ", "AI appointment booking"], automation: "Reminder & recall messages", layout: "Hero → Treatments → Doctors → Book → FAQ" },
  { name: "E-Commerce", type: "Conversion-focused storefront", ai: ["AI product finder", "AI cart recovery"], automation: "Order & inventory sync", layout: "Hero → Collections → Product → Checkout" },
  { name: "Education", type: "Enrollment-focused site with courses", ai: ["AI course advisor", "AI admissions FAQ"], automation: "Application follow-up", layout: "Hero → Programs → Faculty → Apply" },
  { name: "Construction", type: "Portfolio site with project inquiries", ai: ["AI project scoping assistant"], automation: "Quote request routing", layout: "Hero → Projects → Services → Quote" },
  { name: "Beauty", type: "Booking-first site with lookbook", ai: ["AI booking assistant", "AI style recommendations"], automation: "Appointment reminders", layout: "Hero → Services → Book → Lookbook → Gift cards" },
  { name: "Professional Services", type: "Authority-led site with consultation booking", ai: ["AI FAQ assistant", "AI lead qualification"], automation: "Consultation scheduling", layout: "Hero → Services → Case studies → Book a call" },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <section id="industries" aria-labelledby="industries-title" className="relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          align="center"
          title={["Built around how your", <Accent key="e">industry actually works.</Accent>]}
          lead="Pick an industry to see the kind of site, AI features and layout we’d recommend."
        />

        <div className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((i, idx) => (
            <button
              key={i.name}
              onClick={() => setActive(idx)}
              aria-pressed={active === idx}
              className={`rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-300 ${
                active === idx
                  ? "border-ice/40 bg-ice/[0.08] text-text"
                  : "border-line text-muted hover:border-line-strong hover:text-text"
              }`}
            >
              {i.name}
            </button>
          ))}
        </div>

        <div className="relative mt-6 min-h-[280px] overflow-hidden rounded-3xl glass-strong p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-8 md:grid-cols-2"
            >
              <div>
                <p className="eyebrow mb-3 text-[10px]">Recommended website type</p>
                <h3 className="mb-6 font-serif text-2xl italic md:text-3xl">{ind.type}</h3>
                <p className="eyebrow mb-3 text-[10px]">Example layout</p>
                <p className="font-mono text-[13px] leading-7 text-muted">{ind.layout}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-[10px]">Relevant AI features</p>
                <ul className="mb-6 space-y-2.5">
                  {ind.ai.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-[14px] text-text/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_#7cf2c8]" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mb-3 text-[10px]">Recommended automation</p>
                <p className="text-[14px] text-text/90">{ind.automation}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

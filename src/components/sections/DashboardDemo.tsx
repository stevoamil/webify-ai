"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Accent, SectionHeading, Tag } from "@/components/ui/primitives";

const TABS = ["Content", "Products", "Bookings", "Leads", "Media", "Analytics", "AI Settings"] as const;
type Tab = (typeof TABS)[number];

export default function DashboardDemo() {
  const [tab, setTab] = useState<Tab>("Bookings");

  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="dashboard-title"
          eyebrow="Client Dashboard"
          align="center"
          title={["Your website.", <Accent key="e">Your control.</Accent>]}
          lead="Every site ships with a simple dashboard so you can manage content, bookings and leads without calling us."
        />

        <div className="relative mt-14 overflow-hidden rounded-3xl glass-strong">
          <div className="absolute right-4 top-4 z-10">
            <Tag tone="amber">Interactive demo</Tag>
          </div>
          <div className="flex flex-col md:flex-row">
            <nav className="flex gap-1 overflow-x-auto border-b border-line p-3 md:w-56 md:flex-col md:border-b-0 md:border-r md:p-4">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  aria-current={tab === t ? "page" : undefined}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${
                    tab === t ? "bg-ice/10 text-text" : "text-muted hover:bg-white/[0.04] hover:text-text"
                  }`}
                >
                  {t}
                </button>
              ))}
            </nav>

            <div className="min-h-[380px] flex-1 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <TabBody tab={tab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-dim">
          This is a demonstration with sample data — not a live client account.
        </p>
      </div>
    </section>
  );
}

function StatRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
          <p className="text-2xl font-medium text-text">{s.value}</p>
          <p className="mt-1 text-[11px] text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Row({ cols }: { cols: string[] }) {
  return (
    <div className="grid grid-cols-4 gap-3 border-b border-line px-4 py-3 text-[13px] last:border-0">
      {cols.map((c, i) => (
        <span key={i} className={i === 0 ? "text-text" : "text-muted"}>{c}</span>
      ))}
    </div>
  );
}

function TabBody({ tab }: { tab: Tab }) {
  switch (tab) {
    case "Bookings":
      return (
        <div>
          <StatRow items={[{ label: "Today", value: "6" }, { label: "This week", value: "34" }, { label: "No-shows", value: "1" }, { label: "AI-booked", value: "78%" }]} />
          <div className="rounded-xl border border-line">
            <Row cols={["Client", "Service", "Time", "Status"]} />
            <Row cols={["Sofia M.", "Consultation", "Today · 2:00pm", "Confirmed"]} />
            <Row cols={["David R.", "Design review", "Today · 4:30pm", "Confirmed"]} />
            <Row cols={["Priya A.", "Follow-up", "Tomorrow · 10:00am", "Pending"]} />
          </div>
        </div>
      );
    case "Leads":
      return (
        <div>
          <StatRow items={[{ label: "New leads", value: "12" }, { label: "Qualified", value: "8" }, { label: "This month", value: "47" }, { label: "AI-qualified", value: "65%" }]} />
          <div className="rounded-xl border border-line">
            <Row cols={["Name", "Source", "Interest", "Status"]} />
            <Row cols={["Marcus C.", "AI Chat", "Website + AI", "Hot"]} />
            <Row cols={["Grace W.", "Contact form", "Landing Page", "New"]} />
            <Row cols={["Omar R.", "AI Chat", "E-commerce", "Contacted"]} />
          </div>
        </div>
      );
    case "Content":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {["Homepage", "About", "Services", "Blog", "FAQ", "Contact"].map((p) => (
            <div key={p} className="flex items-center justify-between rounded-xl border border-line bg-white/[0.02] p-4">
              <span className="text-sm">{p}</span>
              <span className="font-mono text-[10px] text-signal">Published</span>
            </div>
          ))}
        </div>
      );
    case "Products":
      return (
        <div className="rounded-xl border border-line">
          <Row cols={["Product", "Stock", "Price", "Status"]} />
          <Row cols={["Signature Package", "—", "Custom quote", "Active"]} />
          <Row cols={["Starter Package", "—", "Custom quote", "Active"]} />
        </div>
      );
    case "Media":
      return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg border border-line bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
          ))}
        </div>
      );
    case "Analytics":
      return (
        <div>
          <StatRow items={[{ label: "Visitors (30d)", value: "—" }, { label: "AI conversations", value: "—" }, { label: "Bookings", value: "—" }, { label: "Conversion", value: "—" }]} />
          <p className="text-xs text-dim">Real analytics populate here once your site is live and connected.</p>
        </div>
      );
    case "AI Settings":
      return (
        <div className="space-y-3">
          {["Assistant tone: Friendly & professional", "Booking automation: Enabled", "Lead alerts: Instant via WhatsApp", "Working hours: Always on"].map((s) => (
            <div key={s} className="flex items-center justify-between rounded-xl border border-line bg-white/[0.02] p-4 text-sm">
              <span>{s}</span>
              <span className="h-5 w-9 rounded-full bg-signal/80" />
            </div>
          ))}
        </div>
      );
  }
}

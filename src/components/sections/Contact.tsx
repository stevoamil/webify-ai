"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Accent, Arrow, MagneticLink, SectionHeading } from "@/components/ui/primitives";
import { formEndpoint, site, whatsappLink } from "@/lib/site";

const NEEDS = ["A new website", "AI integration", "A booking system", "An online store", "A redesign", "Not sure yet"];
const BUDGETS = ["< $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New project brief — ${data.business || data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const body = await res.json().catch(() => null);
      // FormSubmit returns HTTP 200 even before the destination inbox has clicked its
      // one-time activation link — the payload's own `success` field is the real signal.
      if (!res.ok || body?.success !== "true") throw new Error(body?.message || `Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-ice/[0.06] blur-[160px]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          align="center"
          title={["Let’s build something", <Accent key="e">extraordinary.</Accent>]}
          lead="Tell us about your business — we’ll come back with a clear plan, not a sales pitch."
        />

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <MagneticLink href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="ghost">
            Chat on WhatsApp
          </MagneticLink>
          <MagneticLink href={`mailto:${site.contact.email}`} variant="ghost">
            Email us
          </MagneticLink>
        </div>

        <div className="relative mt-12 rounded-3xl glass-strong p-6 md:p-12">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                  className="mb-6 grid h-20 w-20 place-items-center rounded-full border border-signal/40 bg-signal/10"
                >
                  <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-signal [stroke-width:1.8]">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 font-serif text-2xl italic">Your brief is in.</h3>
                <p className="max-w-sm text-sm text-muted">
                  We’ll reply within one business day with a plan tailored to your project.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Business" name="business" required />
                <Field label="Email address" name="email" type="email" required />
                <Field label="Phone number" name="phone" type="tel" />
                <div className="sm:col-span-2">
                  <Label>What does your business do?</Label>
                  <textarea name="business_desc" rows={2} className={inputClass} />
                </div>
                <Select label="What do you need?" name="need" options={NEEDS} />
                <Select label="Budget range" name="budget" options={BUDGETS} />
                <div className="sm:col-span-2">
                  <Label>Additional requirements</Label>
                  <textarea name="requirements" rows={4} className={inputClass} placeholder="Anything else we should know?" />
                </div>
                {status === "error" && (
                  <p className="text-sm text-amber-300 sm:col-span-2">
                    Something went wrong sending that. Please try again, or email us directly at{" "}
                    <a href={`mailto:${site.contact.email}`} className="underline">
                      {site.contact.email}
                    </a>
                    .
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-[#cfd8e2] px-6 text-sm font-medium text-[#05070a] shadow-[0_0_0_1px_rgba(255,255,255,.4),0_18px_50px_-12px_rgba(169,220,255,.45)] transition-shadow disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? "Sending…" : "Start My Project"}
                    {status !== "sending" && <Arrow />}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-dim outline-none transition-colors focus:border-ice/50 focus:bg-white/[0.05]";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{children}</label>;
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} required={required} className={inputClass} />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <select name={name} defaultValue="" className={inputClass}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-panel">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

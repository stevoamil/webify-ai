"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsManager({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [form, setForm] = useState({ quote: "", name: "", role: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const add = async () => {
    if (!form.quote || !form.name || !form.role) {
      setError("Fill in all fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to save.");
      setTestimonials((prev) => [...prev, body.testimonial]);
      setForm({ quote: "", name: "", role: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-4 font-serif text-lg italic text-text">Add Testimonial</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Quote</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Client name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Role / business</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          {error && <p className="text-sm text-amber-600">{error}</p>}
          <button onClick={add} disabled={saving} className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60">
            {saving ? "Saving…" : "Add Testimonial"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {testimonials.length === 0 && (
          <p className="rounded-2xl border border-line bg-white/60 p-6 text-sm text-muted">
            No testimonials yet — the public site shows a &quot;coming soon&quot; placeholder until you add one.
          </p>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-line bg-white/60 p-5">
            <p className="text-sm italic text-text">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
              <button onClick={() => remove(t.id)} className="text-xs text-amber-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

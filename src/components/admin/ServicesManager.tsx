"use client";

import Image from "next/image";
import { useState } from "react";
import { ICON_KEYS, type ServiceCard } from "@/lib/services-data";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ListField from "@/components/admin/ListField";

const EMPTY: ServiceCard = {
  id: "",
  title: "",
  icon: ICON_KEYS[0],
  hue: "#f0579e",
  image: "",
  text: "",
  lead: "",
  features: [],
  ideal: "",
};

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
      />
    </div>
  );
}

export default function ServicesManager({ services: initial }: { services: ServiceCard[] }) {
  const [services, setServices] = useState(initial);
  const [editing, setEditing] = useState<ServiceCard | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startAdd = () => {
    setEditing({ ...EMPTY });
    setIsNew(true);
    setError("");
  };

  const startEdit = (s: ServiceCard) => {
    setEditing({ ...s });
    setIsNew(false);
    setError("");
  };

  const remove = async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" }).catch(() => {});
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Failed to save.");
        setServices((prev) => [...prev, body.service]);
      } else {
        const res = await fetch(`/api/admin/services/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Failed to save.");
        setServices((prev) => prev.map((s) => (s.id === editing.id ? body.service : s)));
      }
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-5 font-serif text-xl italic text-text">{isNew ? "Add Service" : `Edit ${editing.title}`}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {isNew && <Field label="ID (unique, e.g. my-service)" value={editing.id} onChange={(v) => setEditing({ ...editing, id: v })} />}
          <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <div>
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Icon</label>
            <select
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value as ServiceCard["icon"] })}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            >
              {ICON_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <Field label="Accent color (hex)" value={editing.hue} onChange={(v) => setEditing({ ...editing, hue: v })} />
          <div className="sm:col-span-2">
            <ImageUploadField label="Image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Short text (carousel card)</label>
            <textarea
              value={editing.text}
              onChange={(e) => setEditing({ ...editing, text: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Lead paragraph (detail dialog)</label>
            <textarea
              value={editing.lead}
              onChange={(e) => setEditing({ ...editing, lead: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <ListField label="Features" value={editing.features} onChange={(v) => setEditing({ ...editing, features: v })} />
          <Field label="Ideal for" value={editing.ideal} onChange={(v) => setEditing({ ...editing, ideal: v })} />
        </div>
        {error && <p className="mt-4 text-sm text-amber-600">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button onClick={save} disabled={saving} className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={() => setEditing(null)} className="rounded-full border border-line px-6 py-2.5 text-sm text-muted hover:text-text">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button onClick={startAdd} className="rounded-full bg-text px-5 py-2.5 text-sm font-medium text-void">
          + Add Service
        </button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-line bg-white/60">
            <div className="relative h-24 w-full bg-white">
              {s.image && <Image src={s.image} alt="" fill className="object-cover" sizes="240px" />}
            </div>
            <div className="p-4">
              <p className="font-serif text-base italic text-text">{s.title}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => startEdit(s)} className="text-xs text-ice hover:underline">
                  Edit
                </button>
                <button onClick={() => remove(s.id)} className="text-xs text-amber-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

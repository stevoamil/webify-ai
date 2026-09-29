"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ListField from "@/components/admin/ListField";

const EMPTY: Project = {
  slug: "",
  name: "",
  client: "",
  industry: "",
  url: "",
  domain: "",
  image: "",
  imageAlt: "",
  altImage: "",
  altImageAlt: "",
  summary: "",
  description: "",
  features: [],
  ai: [],
  accent: "#f0579e",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
      />
    </div>
  );
}

export default function PortfolioManager({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startAdd = () => {
    setEditing({ ...EMPTY });
    setIsNew(true);
    setError("");
  };

  const startEdit = (p: Project) => {
    setEditing({ ...p });
    setIsNew(false);
    setError("");
  };

  const remove = async (slug: string) => {
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
    await fetch(`/api/admin/portfolio/${slug}`, { method: "DELETE" }).catch(() => {});
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Failed to save.");
        setProjects((prev) => [...prev, body.project]);
      } else {
        const res = await fetch(`/api/admin/portfolio/${editing.slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Failed to save.");
        setProjects((prev) => prev.map((p) => (p.slug === editing.slug ? body.project : p)));
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
        <h2 className="mb-5 font-serif text-xl italic text-text">{isNew ? "Add Project" : `Edit ${editing.name}`}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {isNew && (
            <Field
              label="Slug (unique, e.g. my-project)"
              value={editing.slug}
              onChange={(v) => setEditing({ ...editing, slug: v })}
            />
          )}
          <Field label="Project name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
          <Field label="Client" value={editing.client} onChange={(v) => setEditing({ ...editing, client: v })} />
          <Field label="Industry" value={editing.industry} onChange={(v) => setEditing({ ...editing, industry: v })} />
          <Field label="Live URL" value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} />
          <Field label="Domain (display)" value={editing.domain} onChange={(v) => setEditing({ ...editing, domain: v })} />
          <Field label="Accent color" value={editing.accent} onChange={(v) => setEditing({ ...editing, accent: v })} type="text" />
          <div className="sm:col-span-2">
            <ImageUploadField label="Cover image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
          </div>
          <Field label="Cover image alt text" value={editing.imageAlt} onChange={(v) => setEditing({ ...editing, imageAlt: v })} />
          <div className="sm:col-span-2">
            <ImageUploadField label="Hover / alt image" value={editing.altImage} onChange={(v) => setEditing({ ...editing, altImage: v })} />
          </div>
          <Field label="Alt image alt text" value={editing.altImageAlt} onChange={(v) => setEditing({ ...editing, altImageAlt: v })} />
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Summary</label>
            <textarea
              value={editing.summary}
              onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
            />
          </div>
          <ListField label="Features" value={editing.features} onChange={(v) => setEditing({ ...editing, features: v })} />
          <ListField label="AI capabilities" value={editing.ai} onChange={(v) => setEditing({ ...editing, ai: v })} rows={2} />
        </div>
        {error && <p className="mt-4 text-sm text-amber-600">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60"
          >
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
          + Add Project
        </button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.slug} className="overflow-hidden rounded-2xl border border-line bg-white/60">
            <div className="relative h-32 w-full bg-white">
              {p.image && <Image src={p.image} alt="" fill className="object-cover" sizes="360px" />}
            </div>
            <div className="p-4">
              <p className="font-serif text-lg italic text-text">{p.name}</p>
              <p className="mb-3 text-xs text-muted">{p.client}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="text-xs text-ice hover:underline">
                  Edit
                </button>
                <button onClick={() => remove(p.slug)} className="text-xs text-amber-600 hover:underline">
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

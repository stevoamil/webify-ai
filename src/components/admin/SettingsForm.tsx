"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/types";

type PublicSettings = Omit<SiteSettings, "adminPasswordHash">;

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
      />
    </div>
  );
}

export default function SettingsForm({ settings: initial }: { settings: PublicSettings }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMessage, setPwMessage] = useState("");
  const [pwError, setPwError] = useState("");

  const saveContact = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: settings.email,
          whatsapp: settings.whatsapp,
          instagram: settings.instagram,
          linkedin: settings.linkedin,
          aiKnowledgeBase: settings.aiKnowledgeBase,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to save.");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    setPwSaving(true);
    setPwMessage("");
    setPwError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to change password.");
      setPwMessage("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-5 font-serif text-lg italic text-text">Contact & Socials</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Contact email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} type="email" />
          <Field label="WhatsApp number (digits only)" value={settings.whatsapp} onChange={(v) => setSettings({ ...settings, whatsapp: v })} />
          <Field label="Instagram URL" value={settings.instagram} onChange={(v) => setSettings({ ...settings, instagram: v })} />
          <Field label="LinkedIn URL" value={settings.linkedin} onChange={(v) => setSettings({ ...settings, linkedin: v })} />
        </div>
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">
            AI Assistant Knowledge Base
          </label>
          <textarea
            value={settings.aiKnowledgeBase}
            onChange={(e) => setSettings({ ...settings, aiKnowledgeBase: e.target.value })}
            rows={4}
            placeholder="e.g. We are fully booked for new projects starting in June."
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
          />
        </div>
        {error && <p className="mt-4 text-sm text-amber-600">{error}</p>}
        {saved && !error && <p className="mt-4 text-sm text-emerald-600">Saved.</p>}
        <button
          onClick={saveContact}
          disabled={saving}
          className="mt-5 rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-5 font-serif text-lg italic text-text">Change Password</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Current password" value={currentPassword} onChange={setCurrentPassword} type="password" />
          <Field label="New password (min 8 characters)" value={newPassword} onChange={setNewPassword} type="password" />
        </div>
        {pwError && <p className="mt-4 text-sm text-amber-600">{pwError}</p>}
        {pwMessage && <p className="mt-4 text-sm text-emerald-600">{pwMessage}</p>}
        <button
          onClick={changePassword}
          disabled={pwSaving || !currentPassword || newPassword.length < 8}
          className="mt-5 rounded-full border border-line px-6 py-2.5 text-sm font-medium text-text disabled:opacity-60"
        >
          {pwSaving ? "Updating…" : "Update password"}
        </button>
      </div>
    </div>
  );
}

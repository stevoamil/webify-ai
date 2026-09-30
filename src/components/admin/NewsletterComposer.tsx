"use client";

import { useState } from "react";

function toHtml(message: string) {
  return message
    .split(/\n{2,}/)
    .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}

export default function NewsletterComposer({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const send = async () => {
    if (!subject.trim() || !message.trim()) {
      setError("Add a subject and a message.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, html: toHtml(message) }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to send.");
      setStatus("sent");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-lg italic text-text">Compose Broadcast</h2>
        <p className="text-xs text-muted">
          Sending to <span className="font-medium text-text">{subscriberCount}</span> subscriber{subscriberCount === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            placeholder="Separate paragraphs with a blank line."
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
          />
        </div>
        {status === "sent" && <p className="text-sm text-emerald-600">Broadcast sent.</p>}
        {error && <p className="text-sm text-amber-600">{error}</p>}
        <button
          onClick={send}
          disabled={status === "sending" || subscriberCount === 0}
          className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send to all subscribers"}
        </button>
        {subscriberCount === 0 && <p className="text-xs text-dim">No subscribers yet — nothing to send to.</p>}
      </div>
    </div>
  );
}

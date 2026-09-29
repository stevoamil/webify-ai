"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Failed to subscribe.");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p className="text-sm text-signal">You’re subscribed — thanks!</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-sm text-text placeholder:text-dim outline-none transition-colors focus:border-ice/50"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-gradient-to-b from-white to-[#cfd8e2] px-4 py-2.5 text-sm font-medium text-[#05070a] transition-opacity disabled:opacity-60"
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-amber-400">Something went wrong. Please try again.</p>}
    </form>
  );
}

"use client";

import { useState } from "react";
import type { AiConversation } from "@/lib/types";

export default function AiLogsViewer({ conversations: initial }: { conversations: AiConversation[] }) {
  const [conversations, setConversations] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[0]?.id ?? null);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const toggleFlag = async (id: string, flagged: boolean) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, flagged } : c)));
    await fetch(`/api/admin/ai-logs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flagged }),
    }).catch(() => {});
  };

  if (conversations.length === 0) {
    return <p className="rounded-2xl border border-line bg-white/60 p-6 text-sm text-muted">No conversations yet.</p>;
  }

  return (
    <div className="grid gap-6 overflow-hidden rounded-2xl border border-line bg-white/60 lg:grid-cols-[280px_1fr]">
      <div className="max-h-[560px] overflow-y-auto border-b border-line lg:border-b-0 lg:border-r">
        <p className="border-b border-line px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted">
          Conversations ({conversations.length})
        </p>
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`block w-full border-b border-line px-4 py-3 text-left text-sm transition-colors ${
              selectedId === c.id ? "bg-white text-text" : "text-muted hover:bg-white/60"
            }`}
          >
            <span className="flex items-center gap-2">
              {c.flagged && <span className="h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />}
              Visitor
            </span>
            <span className="text-xs text-dim">{new Date(c.updatedAt).toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {selected ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-lg italic text-text">Visitor</h3>
              <button
                onClick={() => toggleFlag(selected.id, !selected.flagged)}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-wide ${
                  selected.flagged ? "border-amber-500 bg-amber-50 text-amber-700" : "border-line text-muted hover:border-ice/40"
                }`}
              >
                {selected.flagged ? "Flagged for follow-up" : "Flag for follow-up"}
              </button>
            </div>
            <div className="space-y-3">
              {selected.messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "bot" ? "bg-black/[0.04] text-text" : "ml-auto bg-ice/15 text-text"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">Select a conversation.</p>
        )}
      </div>
    </div>
  );
}

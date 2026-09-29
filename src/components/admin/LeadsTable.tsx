"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

const STATUSES: LeadStatus[] = ["new", "qualified", "contacted", "proposal", "won", "lost"];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-ice/15 text-ice",
  qualified: "bg-halo/15 text-halo",
  contacted: "bg-blue-100 text-blue-700",
  proposal: "bg-amber-100 text-amber-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-black/10 text-muted",
};

export default function LeadsTable({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.business.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.need.toLowerCase().includes(q)
      );
    });
  }, [leads, query, filter]);

  const setStatus = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const remove = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, need…"
          className="w-full max-w-xs rounded-full border border-line bg-white/60 px-4 py-2 text-sm outline-none focus:border-ice/50 sm:w-64"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-wide ${
              filter === "all" ? "border-text bg-text text-void" : "border-line text-muted hover:border-ice/40"
            }`}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-wide ${
                filter === s ? "border-text bg-text text-void" : "border-line text-muted hover:border-ice/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white/60">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Interested In</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  No leads match your filters.
                </td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-text">
                  {l.name}
                  <p className="text-xs font-normal text-muted">{l.business}</p>
                </td>
                <td className="px-4 py-3 text-muted">
                  <a href={`mailto:${l.email}`} className="hover:text-text hover:underline">
                    {l.email}
                  </a>
                  {l.phone && <p className="text-xs">{l.phone}</p>}
                </td>
                <td className="px-4 py-3 text-muted">
                  {l.need || "—"}
                  {l.budget && <p className="text-xs">{l.budget}</p>}
                </td>
                <td className="px-4 py-3 text-muted">{l.source}</td>
                <td className="px-4 py-3">
                  <select
                    value={l.status}
                    onChange={(e) => setStatus(l.id, e.target.value as LeadStatus)}
                    className={`rounded-full border-0 px-3 py-1 text-[11px] font-medium uppercase tracking-wide outline-none ${STATUS_STYLES[l.status]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted">
                  {new Date(l.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(l.id)} aria-label="Delete lead" className="text-dim hover:text-amber-600">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-width:1.6]">
                      <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-8 0v12a2 2 0 002 2h4a2 2 0 002-2V7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

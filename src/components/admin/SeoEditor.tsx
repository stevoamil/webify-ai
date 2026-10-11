"use client";

import { useMemo, useState } from "react";
import type { SeoPage } from "@/lib/seo-pages";
import type { SeoMap, SeoOverride } from "@/lib/store/seo";

const TITLE_MAX = 60;
const DESC_MAX = 160;
const DESC_MIN = 70;
const GROUPS: SeoPage["group"][] = ["Home", "Services", "Industries", "Guides"];

type Draft = { title: string; description: string; keywords: string };

const toDraft = (o?: SeoOverride): Draft => ({
  title: o?.title ?? "",
  description: o?.description ?? "",
  keywords: (o?.keywords ?? []).join("\n"),
});

const parseKeywords = (text: string) =>
  [...new Set(text.split(/[\n,]/).map((k) => k.trim()).filter(Boolean))];

const count = (haystack: string, needle: string) =>
  needle ? haystack.toLowerCase().split(needle.toLowerCase()).length - 1 : 0;

function Counter({ value, max, min }: { value: number; max: number; min?: number }) {
  const bad = value > max || (min !== undefined && value > 0 && value < min);
  return (
    <span className={`text-[11px] ${bad ? "text-amber-600" : "text-muted"}`}>
      {value}/{max}
    </span>
  );
}

function GooglePreview({ title, path, description }: { title: string; path: string; description: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted">How it can look in Google</p>
      <p className="text-[12px] text-emerald-700">webify-ai.com{path === "/" ? "" : path}</p>
      <p className="mt-0.5 text-[17px] leading-snug text-[#1a0dab]">{title}</p>
      <p className="mt-1 text-[13px] leading-5 text-[#4d5156]">{description}</p>
    </div>
  );
}

export default function SeoEditor({ pages, initial }: { pages: SeoPage[]; initial: SeoMap }) {
  const [saved, setSaved] = useState<SeoMap>(initial);
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(pages.map((p) => [p.key, toDraft(initial[p.key])])),
  );
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ key: string; text: string; ok: boolean } | null>(null);

  const byGroup = useMemo(
    () => GROUPS.map((g) => ({ group: g, items: pages.filter((p) => p.group === g) })).filter((g) => g.items.length > 0),
    [pages],
  );

  const setDraft = (key: string, patch: Partial<Draft>) =>
    setDrafts((d) => ({ ...d, [key]: { ...d[key], ...patch } }));

  const save = async (page: SeoPage, draft: Draft) => {
    setBusy(page.key);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: page.key,
          title: draft.title,
          description: draft.description,
          keywords: parseKeywords(draft.keywords),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to save.");
      setSaved((s) => {
        const next = { ...s };
        if (Object.keys(body.override ?? {}).length === 0) delete next[page.key];
        else next[page.key] = body.override;
        return next;
      });
      setMessage({ key: page.key, text: "Saved. The change is live.", ok: true });
    } catch (err) {
      setMessage({ key: page.key, text: err instanceof Error ? err.message : "Failed to save.", ok: false });
    } finally {
      setBusy(null);
    }
  };

  const reset = async (page: SeoPage) => {
    const empty: Draft = { title: "", description: "", keywords: "" };
    setDraft(page.key, empty);
    await save(page, empty);
  };

  return (
    <div className="space-y-10">
      <p className="rounded-2xl border border-line bg-white/60 p-5 text-sm leading-6 text-muted">
        <span className="font-medium text-text">Tips.</span> Put your main keyword near the start of the title, keep titles
        under {TITLE_MAX} characters and descriptions under {DESC_MAX}, and write them for people, not for Google. Repeating
        a keyword many times does not help. The keywords box is for your own planning: Google ignores the keywords tag, but the
        checker below tells you whether each keyword really appears in the title and description.
      </p>

      {byGroup.map(({ group, items }) => (
        <section key={group}>
          <h2 className="mb-4 font-serif text-xl italic text-text">{group}</h2>
          <div className="space-y-3">
            {items.map((page) => {
              const draft = drafts[page.key] ?? toDraft();
              const open = openKey === page.key;
              const custom = Boolean(saved[page.key]);
              const effTitle = draft.title.trim() || page.defaultTitle;
              const effDesc = draft.description.trim() || page.defaultDescription;
              const keywords = parseKeywords(draft.keywords);
              const msg = message?.key === page.key ? message : null;

              return (
                <div key={page.key} className="rounded-2xl border border-line bg-white/60">
                  <button
                    onClick={() => setOpenKey(open ? null : page.key)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span>
                      <span className="block text-sm font-medium text-text">{page.label}</span>
                      <span className="block font-mono text-[11px] text-muted">{page.path}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      {custom && (
                        <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-[11px] text-emerald-700">Custom</span>
                      )}
                      <span className="text-muted">{open ? "−" : "+"}</span>
                    </span>
                  </button>

                  {open && (
                    <div className="space-y-5 border-t border-line px-5 py-5">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-xs font-medium tracking-[0.02em] text-muted">Page title</label>
                          <Counter value={effTitle.length} max={TITLE_MAX} />
                        </div>
                        <input
                          value={draft.title}
                          onChange={(e) => setDraft(page.key, { title: e.target.value })}
                          placeholder={page.defaultTitle}
                          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
                        />
                        <p className="mt-1.5 text-[11px] text-muted">
                          Used exactly as typed, so include the brand yourself, for example “… — Webify.ai”.
                        </p>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-xs font-medium tracking-[0.02em] text-muted">Description</label>
                          <Counter value={effDesc.length} max={DESC_MAX} min={DESC_MIN} />
                        </div>
                        <textarea
                          value={draft.description}
                          onChange={(e) => setDraft(page.key, { description: e.target.value })}
                          rows={3}
                          placeholder={page.defaultDescription}
                          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">
                          Keywords (one per line, or separated by commas)
                        </label>
                        <textarea
                          value={draft.keywords}
                          onChange={(e) => setDraft(page.key, { keywords: e.target.value })}
                          rows={3}
                          placeholder={"ai websites\nwebsite agency"}
                          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
                        />
                        {keywords.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {keywords.map((k) => {
                              const inTitle = count(effTitle, k);
                              const inDesc = count(effDesc, k);
                              return (
                                <li key={k} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
                                  <span className="font-medium text-text">{k}</span>
                                  <span className={inTitle > 0 ? "text-emerald-700" : "text-amber-600"}>
                                    {inTitle > 0 ? "✓ in title" : "✗ not in title"}
                                  </span>
                                  <span className={inDesc > 0 ? "text-emerald-700" : "text-muted"}>
                                    {inDesc > 0 ? "✓ in description" : "– not in description"}
                                  </span>
                                  {(inTitle > 1 || inDesc > 2) && (
                                    <span className="text-amber-600">repeated too often — reads as keyword stuffing</span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      <GooglePreview title={effTitle} path={page.path} description={effDesc} />

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => save(page, draft)}
                          disabled={busy === page.key}
                          className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-void disabled:opacity-60"
                        >
                          {busy === page.key ? "Saving…" : "Save"}
                        </button>
                        {custom && (
                          <button
                            onClick={() => reset(page)}
                            disabled={busy === page.key}
                            className="rounded-full border border-line px-6 py-2.5 text-sm font-medium text-text disabled:opacity-60"
                          >
                            Reset to default
                          </button>
                        )}
                        {msg && (
                          <span className={`text-sm ${msg.ok ? "text-emerald-600" : "text-amber-600"}`}>{msg.text}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

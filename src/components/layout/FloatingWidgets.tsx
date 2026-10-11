"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { whatsappLink, type PublicContact } from "@/lib/site";

const SUGGESTIONS = [
  "What can Webify.ai build?",
  "How much does a website cost?",
  "Can you add AI to my website?",
  "I want to start a project",
];

const REPLIES: Record<string, string> = {
  "What can Webify.ai build?":
    "We build premium websites, AI assistants, booking systems, online stores and business automation — all as one connected system.",
  "How much does a website cost?":
    "It depends on scope. Share a few details in the project form and we’ll come back with a clear, custom quote.",
  "Can you add AI to my website?":
    "Yes — from a simple FAQ assistant to a full AI agent that qualifies leads and books appointments for you.",
  "I want to start a project":
    "Great — let’s open the project brief so we can learn about your business and goals.",
};

type Msg = { from: "bot" | "user"; text: string };

function logConversation(sessionId: string, messages: Msg[]) {
  const now = new Date().toISOString();
  fetch("/api/chat-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, messages: messages.map((m) => ({ ...m, at: now })) }),
  }).catch((err) => console.error("Failed to log conversation", err));
}

export default function FloatingWidgets({ contact }: { contact: PublicContact }) {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi, I’m the Webify.ai assistant. Ask me anything, or pick a question below." },
  ]);
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    const existing = window.sessionStorage.getItem("webify_chat_session");
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.sessionStorage.setItem("webify_chat_session", id);
    return id;
  });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ask = (q: string) => {
    setMessages((m) => {
      const next = [...m, { from: "user" as const, text: q }];
      logConversation(sessionId, next);
      return next;
    });
    window.setTimeout(() => {
      setMessages((m) => {
        const next = [
          ...m,
          { from: "bot" as const, text: REPLIES[q] ?? "Thanks — for anything specific to your project, the fastest way is our project form below." },
        ];
        logConversation(sessionId, next);
        return next;
      });
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
        <AnimatePresence>
          {open && (
            <m.div
              role="dialog"
              aria-label="Webify.ai assistant"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong flex h-[440px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Image src="/icon.png" alt="" width={32} height={32} className="rounded-[8px]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Webify.ai Assistant</p>
                  <p className="text-[11px] text-dim">Usually replies instantly</p>
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-5 ${
                      m.from === "bot" ? "bg-white/[0.06] text-text" : "ml-auto bg-ice/15 text-text"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 border-t border-line p-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-ice/40 hover:text-text"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
          className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-gradient-to-b from-white to-[#cfd8e2] text-[#05070a] shadow-[0_0_0_1px_rgba(255,255,255,.4),0_20px_50px_-12px_rgba(240,87,158,.5)] transition-transform hover:scale-105"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current [stroke-width:2]"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <Image src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-[10px]" />
          )}
        </button>
      </div>

      <a
        href={whatsappLink(contact.whatsapp)}
        target={contact.whatsapp ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 left-5 z-[60] grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,.6)] transition-transform hover:scale-105 md:bottom-8 md:left-8"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.35 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.09.11-1.76-.11-.4-.13-.92-.3-1.58-.58-2.78-1.2-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.02.97-2.3.25-.27.55-.34.73-.34h.53c.17 0 .4-.06.62.48.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.08.13.08.72-.16 1.4z" />
        </svg>
      </a>

      <AnimatePresence>
        {showTop && (
          <m.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-[60] grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-void/80 text-text backdrop-blur-md transition-transform hover:-translate-y-0.5 md:bottom-28 md:right-8"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-width:2]">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}

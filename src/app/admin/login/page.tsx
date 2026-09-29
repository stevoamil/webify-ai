"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrorMsg(body?.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMsg("Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="light grid min-h-screen place-items-center bg-void px-5 text-text">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/icon.png" alt="" width={48} height={48} className="mb-4 rounded-xl" priority />
          <p className="font-serif text-2xl italic text-text">{site.name}</p>
          <p className="eyebrow mt-2 text-[10px]">Admin Dashboard</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-white/60 p-7">
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-text outline-none transition-colors focus:border-ice/50"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-text outline-none transition-colors focus:border-ice/50"
            />
          </div>
          {status === "error" && <p className="mb-4 text-sm text-amber-600">{errorMsg}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-text px-6 py-3 text-sm font-medium text-void transition-opacity disabled:opacity-60"
          >
            {status === "sending" ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

/** Mounts Google Analytics only once the page has loaded and the browser is idle, so it never competes with the first paint. */
export default function LazyAnalytics({ gaId }: { gaId: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const arm = () => {
      if (hasIdle) {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      } else {
        timer = window.setTimeout(() => setReady(true), 2000);
      }
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return ready ? <GoogleAnalytics gaId={gaId} /> : null;
}

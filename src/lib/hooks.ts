"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export type DeviceTier = "full" | "lite" | "minimal";

/**
 * full    — desktop with headroom: WebGL scenes, all effects
 * lite    — phones/tablets or modest hardware: simplified 3D / CSS effects
 * minimal — reduced motion or data saver: static visuals
 */
export function useDeviceTier(): DeviceTier {
  const reduced = usePrefersReducedMotion();
  const [tier, setTier] = useState<DeviceTier>("lite");

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (reduced || nav.connection?.saveData) return setTier("minimal");
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const weak =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    setTier(small || coarse || weak ? "lite" : "full");
  }, [reduced]);

  return tier;
}

/** Fires once when the element nears the viewport — used to lazy-mount heavy pieces. */
export function useNearViewport<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "400px",
) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);
  return near;
}

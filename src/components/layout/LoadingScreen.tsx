"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Brief branded loader. Resolves as soon as the hero's first frames are ready (or quickly, regardless). */
export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      setDone(true);
    };
    window.addEventListener("hero:ready", finish, { once: true });
    const cap = window.setTimeout(finish, 1800); // never block the visitor
    return () => {
      window.removeEventListener("hero:ready", finish);
      window.clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <p className="font-mono text-sm tracking-[0.5em] text-text">WEBIFY.AI</p>
            <div className="relative h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-ice/40 via-ice to-halo"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

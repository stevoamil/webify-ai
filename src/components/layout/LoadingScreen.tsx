"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Brief branded loader. Resolves as soon as the hero's first frames are ready (or quickly, regardless). */
export default function LoadingScreen() {
  // Lazily resolved from the media query so reduced-motion visitors never see
  // a setState-in-effect render pass — the state starts correct on mount.
  const [done, setDone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (done) return;
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
  }, [done]);

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/icon.png" alt="Webify.ai" width={56} height={56} priority className="rounded-xl" />
            </motion.div>
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

"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/** Loads Framer Motion's animation engine on demand instead of bundling it into the startup JavaScript. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

import { Cairo } from "next/font/google";

// Geist (the site's Latin font) has no Arabic letters, so Arabic pages use Cairo.
const cairo = Cairo({ subsets: ["arabic", "latin"], display: "swap" });

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className={`${cairo.className} min-h-screen bg-void text-text`}>
      {children}
    </div>
  );
}

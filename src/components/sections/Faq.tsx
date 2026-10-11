import { Accent, SectionHeading } from "@/components/ui/primitives";
import type { Faq as FaqItem } from "@/lib/faq";

/** Server-rendered accordion (native <details>) with FAQPage markup so search engines and AI assistants can read the answers. */
export default function Faq({
  items,
  id = "faq",
  eyebrow = "FAQ",
  heading = ["Questions we", "get asked most."],
  className = "relative bg-void px-5 py-28 md:px-10 md:py-40",
}: {
  items: FaqItem[];
  id?: string;
  eyebrow?: string;
  heading?: [string, string];
  className?: string;
}) {
  if (items.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          align="center"
          title={[heading[0], <Accent key="a">{heading[1]}</Accent>]}
        />
        <div className="mt-12 space-y-3">
          {items.map((f) => (
            <details key={f.q} className="glass group rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-text">
                {f.q}
                <span aria-hidden className="text-ice transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-[14px] leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

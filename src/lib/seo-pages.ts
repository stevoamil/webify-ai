import { guides } from "@/lib/guides";
import { industries } from "@/lib/industries";
import { serviceSeoTitles, shorten } from "@/lib/seo";
import type { ServiceCard } from "@/lib/services-data";
import { site } from "@/lib/site";

export type SeoPage = {
  key: string;
  group: "Home" | "Services" | "Industries" | "Guides";
  label: string;
  path: string;
  /** What Google shows today, if nothing is typed in Admin → SEO. */
  defaultTitle: string;
  defaultDescription: string;
};

/** Every page whose title/description can be edited in Admin → SEO. */
export function buildSeoPages(services: ServiceCard[]): SeoPage[] {
  return [
    {
      key: "home",
      group: "Home",
      label: "Home page",
      path: "/",
      defaultTitle: site.title,
      defaultDescription: site.description,
    },
    ...services.map((s) => ({
      key: `service:${s.id}`,
      group: "Services" as const,
      label: s.title,
      path: `/services/${s.id}`,
      defaultTitle: `${serviceSeoTitles[s.id] ?? s.title} — ${site.name}`,
      defaultDescription: shorten(s.lead),
    })),
    ...industries.map((i) => ({
      key: `industry:${i.slug}`,
      group: "Industries" as const,
      label: i.name,
      path: `/industries/${i.slug}`,
      defaultTitle: `${i.title} — ${site.name}`,
      defaultDescription: i.description,
    })),
    ...guides.map((g) => ({
      key: `guide:${g.slug}`,
      group: "Guides" as const,
      label: g.title.split(":")[0].split("?")[0],
      path: `/guides/${g.slug}`,
      defaultTitle: `${g.title} — ${site.name}`,
      defaultDescription: g.description,
    })),
  ];
}

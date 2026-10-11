import type { MetadataRoute } from "next";
import { arServices } from "@/lib/arabic";
import { guides } from "@/lib/guides";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";
import { listProjects } from "@/lib/store/portfolio";
import { listServices } from "@/lib/store/services";

// Services and projects come from Blob storage (edited in the admin), which
// isn't available at build time, so the sitemap is generated per request.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([
    listServices().catch(() => []),
    listProjects().catch(() => []),
  ]);
  const monthly = "monthly" as const;
  const entry = (path: string, priority: number, lastModified?: Date) => ({
    url: `${site.url}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: monthly,
    priority,
  });

  return [
    entry("", 1),
    ...services.map((s) => entry(`/services/${s.id}`, 0.8)),
    ...projects.map((p) => entry(`/work/${p.slug}`, 0.7)),
    entry("/industries", 0.7),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    entry("/guides", 0.7),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.7, new Date(g.published))),
    entry("/ar", 0.8),
    ...Object.keys(arServices).map((id) => entry(`/ar/services/${id}`, 0.7)),
  ];
}

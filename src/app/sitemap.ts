import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listServices } from "@/lib/store/services";

// Service pages come from Blob storage (edited in the admin), which isn't
// available at build time, so the sitemap is generated per request.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await listServices().catch(() => []);
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

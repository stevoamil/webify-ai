import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/sections/ServicePageView";
import { serviceSeoTitles, shorten } from "@/lib/seo";
import { site } from "@/lib/site";
import { getSeo } from "@/lib/store/seo";
import { getSettings } from "@/lib/store/settings";
import { listServices } from "@/lib/store/services";

// Services are edited from the admin dashboard and stored in Blob, which isn't
// available at build time, so these pages render per request like the home page.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/services/[id]">): Promise<Metadata> {
  const { id } = await params;
  const service = (await listServices()).find((s) => s.id === id);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };

  const o = await getSeo(`service:${service.id}`);
  const description = o.description ?? shorten(service.lead);
  const title = o.title ?? `${serviceSeoTitles[service.id] ?? service.title} — ${site.name}`;
  return {
    title: { absolute: title },
    description,
    ...(o.keywords?.length ? { keywords: o.keywords } : {}),
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      url: `${site.url}/services/${service.id}`,
      siteName: site.name,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[id]">) {
  const { id } = await params;
  const [settings, services] = await Promise.all([getSettings(), listServices()]);
  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  const contact = {
    email: settings.email,
    whatsapp: settings.whatsapp,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
  };
  return <ServicePageView service={service} services={services} contact={contact} />;
}

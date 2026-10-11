import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/sections/ServicePageView";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store/settings";
import { listServices } from "@/lib/store/services";

// Services are edited from the admin dashboard and stored in Blob, which isn't
// available at build time, so these pages render per request like the home page.
export const dynamic = "force-dynamic";

function shorten(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({ params }: PageProps<"/services/[id]">): Promise<Metadata> {
  const { id } = await params;
  const service = (await listServices()).find((s) => s.id === id);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };

  const description = shorten(service.lead);
  return {
    title: service.title,
    description,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      url: `${site.url}/services/${service.id}`,
      siteName: site.name,
      title: `${service.title} — ${site.name}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `${service.title} — ${site.name}`, description },
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

import type { Metadata } from "next";
import type { SeoOverride } from "@/lib/store/seo";

/** Search-friendly page titles for the default services. The on-page heading stays the admin-managed service name. */
export const serviceSeoTitles: Record<string, string> = {
  "business-websites": "Small Business Website Design",
  "e-commerce": "E-Commerce Website Design & Online Stores",
  "ai-integration": "AI Chatbot & AI Integration for Your Website",
  "ai-booking-systems": "AI Booking System for Small Business",
  "ai-lead-generation": "AI Lead Generation for Small Business",
  "website-redesign": "Website Redesign Services",
  "seo-performance": "SEO & Website Speed Optimization",
  "maintenance-support": "Website Maintenance & Support Services",
};

export function shorten(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** The parts of a page's metadata that Admin → SEO can override. Titles typed there are used exactly as written. */
export function seoOverrideMetadata(o: SeoOverride): Pick<Metadata, "title" | "description" | "keywords"> {
  return {
    ...(o.title ? { title: { absolute: o.title } } : {}),
    ...(o.description ? { description: o.description } : {}),
    ...(o.keywords?.length ? { keywords: o.keywords } : {}),
  };
}

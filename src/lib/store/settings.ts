import { readDoc, writeDoc } from "@/lib/blob";
import type { SiteSettings } from "@/lib/types";
import { site } from "@/lib/site";

function defaultSettings(): SiteSettings {
  return {
    email: site.contact.email,
    whatsapp: site.contact.whatsapp,
    instagram: site.social.instagram,
    linkedin: site.social.linkedin,
    aiKnowledgeBase: "",
    adminEmail: process.env.ADMIN_EMAIL ?? "",
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? "",
  };
}

/** Safe for public pages: falls back to the default contact details if storage is unavailable. */
export async function getSettings(): Promise<SiteSettings> {
  return readDoc<SiteSettings>("settings", defaultSettings(), { safe: true });
}

/** Strict read used before writes, so an outage can never overwrite stored settings. */
async function loadSettings(): Promise<SiteSettings> {
  return readDoc<SiteSettings>("settings", defaultSettings());
}

export async function updateSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await loadSettings();
  const next = { ...current, ...patch };
  await writeDoc("settings", next);
  return next;
}

export function omitPasswordHash(settings: SiteSettings): Omit<SiteSettings, "adminPasswordHash"> {
  return {
    email: settings.email,
    whatsapp: settings.whatsapp,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
    aiKnowledgeBase: settings.aiKnowledgeBase,
    adminEmail: settings.adminEmail,
  };
}

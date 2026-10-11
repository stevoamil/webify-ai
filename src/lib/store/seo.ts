import { readDoc, writeDoc } from "@/lib/blob";

/** Per-page overrides typed in Admin → SEO. Anything left empty falls back to the built-in text. */
export type SeoOverride = {
  title?: string;
  description?: string;
  keywords?: string[];
};

export type SeoMap = Record<string, SeoOverride>;

export async function getSeoMap(): Promise<SeoMap> {
  return readDoc<SeoMap>("seo", {});
}

export async function getSeo(key: string): Promise<SeoOverride> {
  return (await getSeoMap())[key] ?? {};
}

export async function setSeo(key: string, value: SeoOverride): Promise<SeoOverride> {
  const map = await getSeoMap();
  const clean: SeoOverride = {};
  if (value.title?.trim()) clean.title = value.title.trim();
  if (value.description?.trim()) clean.description = value.description.trim();
  if (value.keywords?.length) clean.keywords = value.keywords;

  const next = { ...map };
  if (Object.keys(clean).length === 0) delete next[key];
  else next[key] = clean;
  await writeDoc("seo", next);
  return clean;
}

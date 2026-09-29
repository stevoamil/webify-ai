import { get, put } from "@vercel/blob";

const PREFIX = "data/";

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Reads a collection, seeding it from `fallback` the first time it's requested. */
export async function readCollection<T>(key: string, fallback: T[]): Promise<T[]> {
  const path = `${PREFIX}${key}.json`;
  const existing = await readJson<T[]>(path);
  if (existing) return existing;
  await writeJson(path, fallback);
  return fallback;
}

export async function writeCollection<T>(key: string, data: T[]): Promise<void> {
  await writeJson(`${PREFIX}${key}.json`, data);
}

/** Reads a single-document collection (e.g. settings), seeding it the first time it's requested. */
export async function readDoc<T extends object>(key: string, fallback: T): Promise<T> {
  const path = `${PREFIX}${key}.json`;
  const existing = await readJson<T>(path);
  if (existing) return { ...fallback, ...existing };
  await writeJson(path, fallback);
  return fallback;
}

export async function writeDoc<T>(key: string, data: T): Promise<void> {
  await writeJson(`${PREFIX}${key}.json`, data);
}

/** Uploads a public image (portfolio/service photos) and returns its public URL. */
export async function uploadPublicImage(pathname: string, body: Blob | ArrayBuffer, contentType: string) {
  const result = await put(`images/${pathname}`, body, {
    access: "public",
    contentType,
    addRandomSuffix: true,
  });
  return result.url;
}

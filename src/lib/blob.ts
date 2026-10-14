import { get, put } from "@vercel/blob";

const PREFIX = "data/";

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error(`Blob read failed with status ${result.statusCode}`);
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch (err) {
    // Only a genuinely missing blob counts as "not there yet". Any other failure (outage, suspended
    // store, network) must not look like an empty collection, or it would be overwritten with defaults.
    if (err instanceof Error && err.name === "BlobNotFoundError") return null;
    throw err;
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

type ReadOptions = {
  /** Public pages: on a storage failure return the fallback instead of throwing. Never use before a write. */
  safe?: boolean;
};

/** Reads a collection, seeding it from `fallback` the first time it is requested. */
export async function readCollection<T>(key: string, fallback: T[], opts: ReadOptions = {}): Promise<T[]> {
  const path = `${PREFIX}${key}.json`;
  let existing: T[] | null;
  try {
    existing = await readJson<T[]>(path);
  } catch (err) {
    if (opts.safe) return fallback;
    throw err;
  }
  if (existing) return existing;
  try {
    await writeJson(path, fallback);
  } catch (err) {
    if (!opts.safe) throw err;
  }
  return fallback;
}

export async function writeCollection<T>(key: string, data: T[]): Promise<void> {
  await writeJson(`${PREFIX}${key}.json`, data);
}

/** Reads a single-document collection (e.g. settings), seeding it the first time it is requested. */
export async function readDoc<T extends object>(key: string, fallback: T, opts: ReadOptions = {}): Promise<T> {
  const path = `${PREFIX}${key}.json`;
  let existing: T | null;
  try {
    existing = await readJson<T>(path);
  } catch (err) {
    if (opts.safe) return fallback;
    throw err;
  }
  if (existing) return { ...fallback, ...existing };
  try {
    await writeJson(path, fallback);
  } catch (err) {
    if (!opts.safe) throw err;
  }
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

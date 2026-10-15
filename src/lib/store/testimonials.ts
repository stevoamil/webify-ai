import { revalidateTag, unstable_cache } from "next/cache";
import { readCollection, writeCollection } from "@/lib/blob";
import type { Testimonial } from "@/lib/types";

// Cached for a few minutes (see portfolio.ts); admin edits clear it straight away.
const cachedTestimonials = unstable_cache(() => readCollection<Testimonial>("testimonials", []), ["testimonials"], {
  revalidate: 300,
  tags: ["testimonials"],
});

/** Safe for public pages: shows no testimonials if storage is unavailable. */
export async function listTestimonials(): Promise<Testimonial[]> {
  try {
    return await cachedTestimonials();
  } catch {
    return [];
  }
}

async function saveTestimonials(data: Testimonial[]): Promise<void> {
  await writeCollection("testimonials", data);
  revalidateTag("testimonials", { expire: 0 });
}

/** Strict read used before writes, so an outage can never overwrite stored data. */
async function loadTestimonials(): Promise<Testimonial[]> {
  return readCollection<Testimonial>("testimonials", []);
}

export async function createTestimonial(input: Omit<Testimonial, "id">): Promise<Testimonial> {
  const current = await loadTestimonials();
  const testimonial: Testimonial = { ...input, id: crypto.randomUUID() };
  await saveTestimonials([...current, testimonial]);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await loadTestimonials();
  await saveTestimonials(current.filter((t) => t.id !== id));
}

import { readCollection, writeCollection } from "@/lib/blob";
import type { Testimonial } from "@/lib/types";

/** Safe for public pages: shows no testimonials if storage is unavailable. */
export async function listTestimonials(): Promise<Testimonial[]> {
  return readCollection<Testimonial>("testimonials", [], { safe: true });
}

/** Strict read used before writes, so an outage can never overwrite stored data. */
async function loadTestimonials(): Promise<Testimonial[]> {
  return readCollection<Testimonial>("testimonials", []);
}

export async function createTestimonial(input: Omit<Testimonial, "id">): Promise<Testimonial> {
  const current = await loadTestimonials();
  const testimonial: Testimonial = { ...input, id: crypto.randomUUID() };
  await writeCollection("testimonials", [...current, testimonial]);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await loadTestimonials();
  await writeCollection("testimonials", current.filter((t) => t.id !== id));
}

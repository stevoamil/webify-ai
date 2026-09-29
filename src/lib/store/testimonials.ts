import { readCollection, writeCollection } from "@/lib/blob";
import type { Testimonial } from "@/lib/types";

export async function listTestimonials(): Promise<Testimonial[]> {
  return readCollection<Testimonial>("testimonials", []);
}

export async function createTestimonial(input: Omit<Testimonial, "id">): Promise<Testimonial> {
  const current = await listTestimonials();
  const testimonial: Testimonial = { ...input, id: crypto.randomUUID() };
  await writeCollection("testimonials", [...current, testimonial]);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await listTestimonials();
  await writeCollection("testimonials", current.filter((t) => t.id !== id));
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { createTestimonial, listTestimonials } from "@/lib/store/testimonials";

const schema = z.object({
  quote: z.string().min(1).max(1000),
  name: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
});

export async function GET() {
  const testimonials = await listTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const testimonial = await createTestimonial(parsed.data);
  return NextResponse.json({ testimonial });
}

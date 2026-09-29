import { NextResponse } from "next/server";
import { deleteTestimonial } from "@/lib/store/testimonials";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteTestimonial(id);
  return NextResponse.json({ ok: true });
}

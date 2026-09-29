import { NextResponse } from "next/server";
import { z } from "zod";
import { ICON_KEYS, type IconKey } from "@/lib/services-data";
import { deleteService, updateService } from "@/lib/store/services";

const schema = z
  .object({
    title: z.string().min(1),
    icon: z.enum(ICON_KEYS as [string, ...string[]]),
    hue: z.string().min(1),
    image: z.string().min(1),
    text: z.string().min(1),
    lead: z.string().min(1),
    features: z.array(z.string()),
    ideal: z.string().min(1),
  })
  .partial();

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const patch = { ...parsed.data, icon: parsed.data.icon as IconKey | undefined };
  const service = await updateService(id, patch);
  if (!service) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ service });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteService(id);
  return NextResponse.json({ ok: true });
}

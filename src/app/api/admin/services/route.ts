import { NextResponse } from "next/server";
import { z } from "zod";
import { ICON_KEYS, type IconKey } from "@/lib/services-data";
import { createService, listServices } from "@/lib/store/services";

const schema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only."),
  title: z.string().min(1),
  icon: z.enum(ICON_KEYS as [string, ...string[]]),
  hue: z.string().min(1),
  image: z.string().min(1),
  text: z.string().min(1),
  lead: z.string().min(1),
  features: z.array(z.string()),
  ideal: z.string().min(1),
});

export async function GET() {
  const services = await listServices();
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });

  try {
    const service = await createService({ ...parsed.data, icon: parsed.data.icon as IconKey });
    return NextResponse.json({ service });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create service." }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getSeoMap, setSeo } from "@/lib/store/seo";

const schema = z.object({
  key: z.string().regex(/^(home|service:[a-z0-9-]+|industry:[a-z0-9-]+|guide:[a-z0-9-]+)$/, "Unknown page."),
  title: z.string().max(120).optional().default(""),
  description: z.string().max(320).optional().default(""),
  keywords: z.array(z.string().trim().min(1).max(80)).max(30).optional().default([]),
});

export async function GET() {
  return NextResponse.json({ seo: await getSeoMap() });
}

export async function PUT(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
  }
  const { key, title, description, keywords } = parsed.data;
  const saved = await setSeo(key, { title, description, keywords });
  return NextResponse.json({ key, override: saved });
}

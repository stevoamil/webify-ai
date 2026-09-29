import { NextResponse } from "next/server";
import { z } from "zod";
import { setFlagged } from "@/lib/store/aiLogs";

const schema = z.object({ flagged: z.boolean() });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const conversation = await setFlagged(id, parsed.data.flagged);
  if (!conversation) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ conversation });
}

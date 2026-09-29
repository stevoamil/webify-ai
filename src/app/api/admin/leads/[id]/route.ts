import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteLead, updateLeadStatus } from "@/lib/store/leads";

const schema = z.object({
  status: z.enum(["new", "qualified", "contacted", "proposal", "won", "lost"]),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const lead = await updateLeadStatus(id, parsed.data.status);
  if (!lead) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteLead(id);
  return NextResponse.json({ ok: true });
}

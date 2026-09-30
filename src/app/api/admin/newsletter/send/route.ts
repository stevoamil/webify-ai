import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNewsletterBroadcast } from "@/lib/email";

const schema = z.object({
  subject: z.string().min(1).max(200),
  html: z.string().min(1).max(20000),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const id = await sendNewsletterBroadcast(parsed.data.subject, parsed.data.html);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to send." }, { status: 500 });
  }
}

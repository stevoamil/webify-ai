import { NextResponse } from "next/server";
import { z } from "zod";
import { saveConversation } from "@/lib/store/aiLogs";

const schema = z.object({
  sessionId: z.string().min(1).max(100),
  messages: z
    .array(
      z.object({
        from: z.enum(["bot", "user"]),
        text: z.string().min(1).max(2000),
        at: z.string(),
      }),
    )
    .max(200),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    await saveConversation(parsed.data.sessionId, parsed.data.messages);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save chat log", err);
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}

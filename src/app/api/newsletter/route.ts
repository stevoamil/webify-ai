import { NextResponse, after } from "next/server";
import { z } from "zod";
import { addSubscriber } from "@/lib/store/subscribers";
import { syncNewsletterContact } from "@/lib/email";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });

  try {
    await addSubscriber(parsed.data.email);
    after(() => syncNewsletterContact(parsed.data.email));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save subscriber", err);
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}

import { NextResponse, after } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/store/leads";
import { getSettings } from "@/lib/store/settings";
import { autoReplyToLead, notifyNewLead } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(200),
  business: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional().default(""),
  business_desc: z.string().max(2000).optional().default(""),
  need: z.string().max(200).optional().default(""),
  budget: z.string().max(200).optional().default(""),
  requirements: z.string().max(2000).optional().default(""),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const lead = await createLead({ ...parsed.data, source: "Website form" });

    after(async () => {
      const settings = await getSettings();
      await Promise.all([notifyNewLead(lead, settings.email), autoReplyToLead(lead)]);
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("Failed to save lead", err);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }
}

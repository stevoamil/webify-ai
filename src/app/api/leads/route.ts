import { NextResponse, after } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/store/leads";
import { getSettings } from "@/lib/store/settings";
import { autoReplyToLead, notifyNewLead } from "@/lib/email";
import type { Lead } from "@/lib/types";

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

  // Storage trouble must never cost us the enquiry: if saving fails we still email it.
  let lead: Lead;
  try {
    lead = await createLead({ ...parsed.data, source: "Website form" });
  } catch (err) {
    console.error("Failed to save lead", err);
    lead = { ...parsed.data, source: "Website form", id: crypto.randomUUID(), status: "new", createdAt: new Date().toISOString() };
  }

  after(async () => {
    const settings = await getSettings();
    await Promise.all([notifyNewLead(lead, settings.email), autoReplyToLead(lead)]);
  });

  return NextResponse.json({ ok: true, id: lead.id });
}

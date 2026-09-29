import { NextResponse } from "next/server";
import { z } from "zod";
import { getSettings, omitPasswordHash, updateSettings } from "@/lib/store/settings";
import { checkPassword, hashPassword } from "@/lib/password";

const schema = z.object({
  email: z.string().email().optional(),
  whatsapp: z.string().max(30).optional(),
  instagram: z.string().max(300).optional(),
  linkedin: z.string().max(300).optional(),
  aiKnowledgeBase: z.string().max(4000).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
});

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings: omitPasswordHash(settings) });
}

export async function PATCH(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { currentPassword, newPassword, ...patch } = parsed.data;

  if (newPassword) {
    const settings = await getSettings();
    if (!currentPassword || !(await checkPassword(currentPassword, settings.adminPasswordHash))) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
    }
    (patch as { adminPasswordHash?: string }).adminPasswordHash = await hashPassword(newPassword);
  }

  const updated = await updateSettings(patch);
  return NextResponse.json({ settings: omitPasswordHash(updated) });
}

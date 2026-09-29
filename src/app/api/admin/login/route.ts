import { NextResponse } from "next/server";
import { z } from "zod";
import { COOKIE_NAME, signSession } from "@/lib/auth";
import { checkPassword } from "@/lib/password";
import { getSettings } from "@/lib/store/settings";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const settings = await getSettings();

  if (
    !settings.adminEmail ||
    !settings.adminPasswordHash ||
    email.toLowerCase() !== settings.adminEmail.toLowerCase() ||
    !(await checkPassword(password, settings.adminPasswordHash))
  ) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await signSession(settings.adminEmail);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}

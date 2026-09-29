import { NextResponse } from "next/server";
import { uploadPublicImage } from "@/lib/blob";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 8MB)." }, { status: 400 });
  }

  const ext = file.type.split("/")[1];
  const pathname = `${crypto.randomUUID()}.${ext}`;
  const url = await uploadPublicImage(pathname, await file.arrayBuffer(), file.type);
  return NextResponse.json({ url });
}

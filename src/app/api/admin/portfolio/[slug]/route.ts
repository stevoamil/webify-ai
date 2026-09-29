import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteProject, updateProject } from "@/lib/store/portfolio";

const schema = z
  .object({
    name: z.string().min(1),
    client: z.string().min(1),
    industry: z.string().min(1),
    url: z.string().url(),
    domain: z.string().min(1),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
    altImage: z.string().min(1),
    altImageAlt: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    features: z.array(z.string()),
    ai: z.array(z.string()),
    accent: z.string().min(1),
  })
  .partial();

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const project = await updateProject(slug, parsed.data);
  if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await deleteProject(slug);
  return NextResponse.json({ ok: true });
}

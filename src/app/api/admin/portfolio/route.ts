import { NextResponse } from "next/server";
import { z } from "zod";
import { createProject, listProjects } from "@/lib/store/portfolio";

const schema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only."),
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
});

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });

  try {
    const project = await createProject(parsed.data);
    return NextResponse.json({ project });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create project." }, { status: 400 });
  }
}

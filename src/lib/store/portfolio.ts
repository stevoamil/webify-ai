import { revalidateTag, unstable_cache } from "next/cache";
import { readCollection, writeCollection } from "@/lib/blob";
import { projects, type Project } from "@/lib/projects";

// Public pages read this on every visit, so cache it for a few minutes: it keeps the site fast and
// keeps us well inside Vercel Blob operation limits. Admin edits clear the cache straight away.
const cachedProjects = unstable_cache(() => readCollection<Project>("portfolio", projects), ["portfolio"], {
  revalidate: 300,
  tags: ["portfolio"],
});

/** Safe for public pages: falls back to the built-in projects if storage is unavailable. */
export async function listProjects(): Promise<Project[]> {
  try {
    return await cachedProjects();
  } catch {
    return projects;
  }
}

async function saveProjects(data: Project[]): Promise<void> {
  await writeCollection("portfolio", data);
  revalidateTag("portfolio", { expire: 0 });
}

/** Strict read used before writes, so an outage can never overwrite stored data. */
async function loadProjects(): Promise<Project[]> {
  return readCollection<Project>("portfolio", projects);
}

export async function createProject(project: Project): Promise<Project> {
  const current = await loadProjects();
  if (current.some((p) => p.slug === project.slug)) {
    throw new Error("A project with this slug already exists.");
  }
  await saveProjects([...current, project]);
  return project;
}

export async function updateProject(slug: string, patch: Partial<Project>): Promise<Project | null> {
  const current = await loadProjects();
  const idx = current.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...patch, slug };
  await saveProjects(current);
  return current[idx];
}

export async function deleteProject(slug: string): Promise<void> {
  const current = await loadProjects();
  await saveProjects(current.filter((p) => p.slug !== slug));
}

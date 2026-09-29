import { readCollection, writeCollection } from "@/lib/blob";
import { projects, type Project } from "@/lib/projects";

export async function listProjects(): Promise<Project[]> {
  return readCollection<Project>("portfolio", projects);
}

export async function createProject(project: Project): Promise<Project> {
  const current = await listProjects();
  if (current.some((p) => p.slug === project.slug)) {
    throw new Error("A project with this slug already exists.");
  }
  await writeCollection("portfolio", [...current, project]);
  return project;
}

export async function updateProject(slug: string, patch: Partial<Project>): Promise<Project | null> {
  const current = await listProjects();
  const idx = current.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...patch, slug };
  await writeCollection("portfolio", current);
  return current[idx];
}

export async function deleteProject(slug: string): Promise<void> {
  const current = await listProjects();
  await writeCollection("portfolio", current.filter((p) => p.slug !== slug));
}

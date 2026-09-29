import { readCollection, writeCollection } from "@/lib/blob";
import type { Lead, LeadStatus } from "@/lib/types";

export async function listLeads(): Promise<Lead[]> {
  const leads = await readCollection<Lead>("leads", []);
  return [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(input: Omit<Lead, "id" | "status" | "createdAt">): Promise<Lead> {
  const leads = await readCollection<Lead>("leads", []);
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await writeCollection("leads", [...leads, lead]);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const leads = await readCollection<Lead>("leads", []);
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], status };
  await writeCollection("leads", leads);
  return leads[idx];
}

export async function deleteLead(id: string): Promise<void> {
  const leads = await readCollection<Lead>("leads", []);
  await writeCollection("leads", leads.filter((l) => l.id !== id));
}

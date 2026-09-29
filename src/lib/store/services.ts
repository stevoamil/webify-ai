import { readCollection, writeCollection } from "@/lib/blob";
import { defaultServices, type ServiceCard } from "@/lib/services-data";

export async function listServices(): Promise<ServiceCard[]> {
  return readCollection<ServiceCard>("services", defaultServices);
}

export async function createService(service: ServiceCard): Promise<ServiceCard> {
  const current = await listServices();
  if (current.some((s) => s.id === service.id)) {
    throw new Error("A service with this id already exists.");
  }
  await writeCollection("services", [...current, service]);
  return service;
}

export async function updateService(id: string, patch: Partial<ServiceCard>): Promise<ServiceCard | null> {
  const current = await listServices();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...patch, id };
  await writeCollection("services", current);
  return current[idx];
}

export async function deleteService(id: string): Promise<void> {
  const current = await listServices();
  await writeCollection("services", current.filter((s) => s.id !== id));
}

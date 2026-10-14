import { readCollection, writeCollection } from "@/lib/blob";
import { defaultServices, type ServiceCard } from "@/lib/services-data";

/** Safe for public pages: falls back to the built-in services if storage is unavailable. */
export async function listServices(): Promise<ServiceCard[]> {
  return readCollection<ServiceCard>("services", defaultServices, { safe: true });
}

/** Strict read used before writes, so an outage can never overwrite stored data. */
async function loadServices(): Promise<ServiceCard[]> {
  return readCollection<ServiceCard>("services", defaultServices);
}

export async function createService(service: ServiceCard): Promise<ServiceCard> {
  const current = await loadServices();
  if (current.some((s) => s.id === service.id)) {
    throw new Error("A service with this id already exists.");
  }
  await writeCollection("services", [...current, service]);
  return service;
}

export async function updateService(id: string, patch: Partial<ServiceCard>): Promise<ServiceCard | null> {
  const current = await loadServices();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...patch, id };
  await writeCollection("services", current);
  return current[idx];
}

export async function deleteService(id: string): Promise<void> {
  const current = await loadServices();
  await writeCollection("services", current.filter((s) => s.id !== id));
}

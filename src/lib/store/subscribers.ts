import { readCollection, writeCollection } from "@/lib/blob";
import type { Subscriber } from "@/lib/types";

export async function listSubscribers(): Promise<Subscriber[]> {
  return readCollection<Subscriber>("subscribers", []);
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  const subscribers = await listSubscribers();
  const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const subscriber: Subscriber = { id: crypto.randomUUID(), email, createdAt: new Date().toISOString() };
  await writeCollection("subscribers", [...subscribers, subscriber]);
  return subscriber;
}

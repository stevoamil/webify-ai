import { readCollection, writeCollection } from "@/lib/blob";
import type { AiConversation, ChatMessage } from "@/lib/types";

export async function listConversations(): Promise<AiConversation[]> {
  const conversations = await readCollection<AiConversation>("aiLogs", []);
  return [...conversations].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveConversation(sessionId: string, messages: ChatMessage[]): Promise<AiConversation> {
  const conversations = await readCollection<AiConversation>("aiLogs", []);
  const now = new Date().toISOString();
  const idx = conversations.findIndex((c) => c.id === sessionId);

  let conversation: AiConversation;
  if (idx === -1) {
    conversation = { id: sessionId, messages, flagged: false, createdAt: now, updatedAt: now };
    conversations.push(conversation);
  } else {
    conversation = { ...conversations[idx], messages, updatedAt: now };
    conversations[idx] = conversation;
  }
  await writeCollection("aiLogs", conversations);
  return conversation;
}

export async function setFlagged(id: string, flagged: boolean): Promise<AiConversation | null> {
  const conversations = await readCollection<AiConversation>("aiLogs", []);
  const idx = conversations.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  conversations[idx] = { ...conversations[idx], flagged };
  await writeCollection("aiLogs", conversations);
  return conversations[idx];
}

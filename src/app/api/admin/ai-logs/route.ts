import { NextResponse } from "next/server";
import { listConversations } from "@/lib/store/aiLogs";

export async function GET() {
  const conversations = await listConversations();
  return NextResponse.json({ conversations });
}

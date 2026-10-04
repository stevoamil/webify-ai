import { NextResponse } from "next/server";
import { writeCollection } from "@/lib/blob";

export async function POST() {
  await Promise.all([
    writeCollection("leads", []),
    writeCollection("subscribers", []),
    writeCollection("aiLogs", []),
  ]);
  return NextResponse.json({ ok: true });
}

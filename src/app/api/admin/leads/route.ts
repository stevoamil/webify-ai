import { NextResponse } from "next/server";
import { listLeads } from "@/lib/store/leads";

export async function GET() {
  const leads = await listLeads();
  return NextResponse.json({ leads });
}

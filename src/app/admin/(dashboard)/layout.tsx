import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  return (
    <div className="light flex min-h-screen bg-void text-text">
      <Sidebar adminEmail={session?.email ?? ""} />
      <main className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10">{children}</main>
    </div>
  );
}

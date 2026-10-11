"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/lib/site";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/leads", label: "Leads / Inquiries", icon: "people" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "image" },
  { href: "/admin/services", label: "Services", icon: "layers" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "quote" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
  { href: "/admin/ai-logs", label: "AI Assistant Logs", icon: "chat" },
  { href: "/admin/settings", label: "Settings", icon: "gear" },
] as const;

const ICONS: Record<(typeof NAV)[number]["icon"], string> = {
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15.5 14.2A5 5 0 0121 19"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5"/>',
  quote: '<path d="M8 8.5C5.5 9.5 4 11.7 4 14.5V19h5v-4.5H6.3C6.6 12.5 7.6 11 9.5 10.2L8 8.5z"/><path d="M18 8.5c-2.5 1-4 3.2-4 6V19h5v-4.5h-2.7c.3-2 1.3-3.5 3.2-4.3L18 8.5z"/>',
  chat: '<path d="M4 5.5h16v10.5H8.5L4 20V5.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.2-1.6l2-1.6-2-3.4-2.4.9a7 7 0 00-2.8-1.6L13 2h-2l-.6 2.7a7 7 0 00-2.8 1.6l-2.4-.9-2 3.4 2 1.6A7 7 0 005 12c0 .5.1 1 .2 1.6l-2 1.6 2 3.4 2.4-.9a7 7 0 002.8 1.6L11 22h2l.6-2.7a7 7 0 002.8-1.6l2.4.9 2-3.4-2-1.6c.1-.6.2-1.1.2-1.6z"/>',
};

function NavIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none fill-none stroke-current [stroke-width:1.6]" dangerouslySetInnerHTML={{ __html: icon }} />
  );
}

export default function Sidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-full w-64 flex-none flex-col border-r border-line bg-void px-5 py-6">
      <Link href="/admin" className="mb-8 flex items-center gap-2.5 px-1">
        <Image src="/icon.png" alt="" width={28} height={28} className="rounded-[7px]" />
        <div>
          <p className="font-serif text-lg italic leading-tight text-text">{site.name}</p>
          <p className="eyebrow text-[9px]">Admin</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors ${
                active ? "bg-text text-void" : "text-muted hover:bg-black/[0.04] hover:text-text"
              }`}
            >
              <NavIcon icon={ICONS[item.icon]} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-line pt-4">
        <p className="truncate text-xs font-medium text-text">{adminEmail}</p>
        <button onClick={signOut} className="mt-2 text-xs text-muted underline-offset-2 hover:text-text hover:underline">
          Sign out
        </button>
      </div>
    </aside>
  );
}

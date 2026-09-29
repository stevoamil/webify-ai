import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { BarChart, DonutChart } from "@/components/admin/Charts";
import { listLeads } from "@/lib/store/leads";
import { listSubscribers } from "@/lib/store/subscribers";
import type { Lead, LeadStatus } from "@/lib/types";

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  qualified: "Qualified",
  contacted: "Contacted",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

function buildDashboardStats(leads: Lead[], now: number) {
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = leads.filter((l) => new Date(l.createdAt).getTime() >= sevenDaysAgo).length;
  const contacted = leads.filter((l) => l.status === "contacted" || l.status === "proposal").length;
  const won = leads.filter((l) => l.status === "won").length;

  const statusData = (Object.keys(STATUS_LABELS) as LeadStatus[]).map((status) => ({
    label: STATUS_LABELS[status],
    value: leads.filter((l) => l.status === status).length,
  }));

  const days = Array.from({ length: 14 }, (_, i) => new Date(now - (13 - i) * 24 * 60 * 60 * 1000));
  const newLeadsByDay = days.map((d) => {
    const key = d.toISOString().slice(0, 10);
    const count = leads.filter((l) => l.createdAt.slice(0, 10) === key).length;
    return { label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), value: count };
  });

  const sourceData = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([label, value]) => ({ label, value }));

  return { newThisWeek, contacted, won, statusData, newLeadsByDay, sourceData };
}

export default async function AdminDashboardPage() {
  const [leads, subscribers] = await Promise.all([listLeads(), listSubscribers()]);
  const { newThisWeek, contacted, won, statusData, newLeadsByDay, sourceData } = buildDashboardStats(leads, new Date().getTime());

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of leads and pipeline health." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Leads" value={String(leads.length)} sublabel="All time" />
        <StatCard label="New Leads (7d)" value={String(newThisWeek)} sublabel="Last 7 days" />
        <StatCard label="In Progress" value={String(contacted)} sublabel="Contacted / proposal sent" />
        <StatCard label="Won" value={String(won)} sublabel="Closed-won leads" />
        <StatCard label="Newsletter" value={String(subscribers.length)} sublabel="Subscribers" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <h3 className="mb-4 text-sm font-medium text-text">Leads Pipeline</h3>
          <BarChart data={statusData} />
        </div>
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <h3 className="mb-4 text-sm font-medium text-text">Lead Sources</h3>
          <DonutChart data={sourceData} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white/60 p-6">
        <h3 className="mb-4 text-sm font-medium text-text">New Leads (14 days)</h3>
        <BarChart data={newLeadsByDay} />
      </div>
    </div>
  );
}

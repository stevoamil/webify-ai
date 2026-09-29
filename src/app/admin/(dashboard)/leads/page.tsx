import PageHeader from "@/components/admin/PageHeader";
import LeadsTable from "@/components/admin/LeadsTable";
import { listLeads } from "@/lib/store/leads";

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  return (
    <div>
      <PageHeader title="Leads / Inquiries" description="All leads from the contact form and AI chat." />
      <LeadsTable leads={leads} />
    </div>
  );
}

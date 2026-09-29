import PageHeader from "@/components/admin/PageHeader";
import PortfolioManager from "@/components/admin/PortfolioManager";
import { listProjects } from "@/lib/store/portfolio";

export default async function AdminPortfolioPage() {
  const projects = await listProjects();
  return (
    <div>
      <PageHeader title="Portfolio" description="Projects shown in the Portfolio section of the public site." />
      <PortfolioManager projects={projects} />
    </div>
  );
}

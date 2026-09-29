import PageHeader from "@/components/admin/PageHeader";
import ServicesManager from "@/components/admin/ServicesManager";
import { listServices } from "@/lib/store/services";

export default async function AdminServicesPage() {
  const services = await listServices();
  return (
    <div>
      <PageHeader title="Services" description="Cards shown in the Services carousel on the public site." />
      <ServicesManager services={services} />
    </div>
  );
}

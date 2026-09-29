import { listServices } from "@/lib/store/services";
import ServicesClient from "@/components/sections/ServicesClient";

export default async function Services() {
  const services = await listServices();
  return <ServicesClient services={services} />;
}

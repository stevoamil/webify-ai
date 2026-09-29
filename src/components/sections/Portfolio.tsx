import { listProjects } from "@/lib/store/portfolio";
import PortfolioClient from "@/components/sections/PortfolioClient";

export default async function Portfolio() {
  const projects = await listProjects();
  return <PortfolioClient projects={projects} />;
}

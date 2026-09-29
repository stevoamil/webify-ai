import { listProjects } from "@/lib/store/portfolio";
import { listTestimonials } from "@/lib/store/testimonials";
import TrustClient from "@/components/sections/TrustClient";

export default async function Trust() {
  const [projects, testimonials] = await Promise.all([listProjects(), listTestimonials()]);
  return <TrustClient projects={projects} testimonials={testimonials} />;
}

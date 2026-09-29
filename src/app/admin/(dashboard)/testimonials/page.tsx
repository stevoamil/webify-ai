import PageHeader from "@/components/admin/PageHeader";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import { listTestimonials } from "@/lib/store/testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await listTestimonials();
  return (
    <div>
      <PageHeader title="Testimonials" description="Client quotes shown in the Trust section of the public site." />
      <TestimonialsManager testimonials={testimonials} />
    </div>
  );
}

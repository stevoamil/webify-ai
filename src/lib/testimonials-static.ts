import type { Testimonial } from "@/lib/types";

/**
 * Client quotes kept in code so they show even when the admin dashboard's storage is unavailable.
 * They are shown together with any testimonials added in Admin → Testimonials.
 */
export const staticTestimonials: Testimonial[] = [
  {
    id: "static-prevu",
    quote: "Webify made our digital journey simple, professional, and effective. Great service and outstanding results!",
    name: "Prevu Real Estate",
    role: "Client",
  },
  {
    id: "static-monaart",
    quote: "Webify helped us build a modern online presence with professional design and great results. Highly recommended!",
    name: "Monaart",
    role: "Client",
  },
];

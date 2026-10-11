import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import { getSettings } from "@/lib/store/settings";
import { listServices } from "@/lib/store/services";

/** Header, footer and chat widget around a content page. Reads live contact details and services. */
export default async function PageShell({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), listServices()]);
  const contact = {
    email: settings.email,
    whatsapp: settings.whatsapp,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
  };

  return (
    <>
      <Header />
      <main className="relative bg-void">{children}</main>
      <Footer contact={contact} services={services.map(({ id, title }) => ({ id, title }))} />
      <FloatingWidgets contact={contact} />
    </>
  );
}

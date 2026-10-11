import PageHeader from "@/components/admin/PageHeader";
import SeoEditor from "@/components/admin/SeoEditor";
import { buildSeoPages } from "@/lib/seo-pages";
import { getSeoMap } from "@/lib/store/seo";
import { listServices } from "@/lib/store/services";

export default async function AdminSeoPage() {
  const [services, overrides] = await Promise.all([listServices(), getSeoMap()]);
  return (
    <div>
      <PageHeader
        title="SEO"
        description="Type the title, description and keywords Google should see for each page. Leave a box empty to keep the built-in text."
      />
      <SeoEditor pages={buildSeoPages(services)} initial={overrides} />
    </div>
  );
}

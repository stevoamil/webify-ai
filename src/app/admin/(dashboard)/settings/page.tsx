import PageHeader from "@/components/admin/PageHeader";
import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings, omitPasswordHash } from "@/lib/store/settings";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader title="Settings" description="Contact info, socials, AI knowledge base, and your password." />
      <SettingsForm settings={omitPasswordHash(settings)} />
    </div>
  );
}

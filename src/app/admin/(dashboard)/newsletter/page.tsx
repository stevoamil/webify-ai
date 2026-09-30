import PageHeader from "@/components/admin/PageHeader";
import NewsletterComposer from "@/components/admin/NewsletterComposer";
import { listSubscribers } from "@/lib/store/subscribers";

export default async function AdminNewsletterPage() {
  const subscribers = await listSubscribers();
  return (
    <div>
      <PageHeader title="Newsletter" description="Compose and send an email to everyone subscribed on the public site." />
      <NewsletterComposer subscriberCount={subscribers.length} />
    </div>
  );
}

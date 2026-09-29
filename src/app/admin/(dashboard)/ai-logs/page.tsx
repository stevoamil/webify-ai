import PageHeader from "@/components/admin/PageHeader";
import AiLogsViewer from "@/components/admin/AiLogsViewer";
import { listConversations } from "@/lib/store/aiLogs";

export default async function AdminAiLogsPage() {
  const conversations = await listConversations();
  return (
    <div>
      <PageHeader title="AI Assistant Logs" description="Review conversations from the floating chat widget." />
      <AiLogsViewer conversations={conversations} />
    </div>
  );
}

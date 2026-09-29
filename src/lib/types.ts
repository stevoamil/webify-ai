export type LeadStatus = "new" | "qualified" | "contacted" | "proposal" | "won" | "lost";

export type Lead = {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  business_desc: string;
  need: string;
  budget: string;
  requirements: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
};

export type ChatMessage = { from: "bot" | "user"; text: string; at: string };

export type AiConversation = {
  id: string;
  messages: ChatMessage[];
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type SiteSettings = {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  aiKnowledgeBase: string;
  adminEmail: string;
  adminPasswordHash: string;
};

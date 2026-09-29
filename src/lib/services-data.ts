export const ICONS = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
  cart: '<path d="M3 4h2l2.4 11h11l2-8H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  refresh: '<path d="M20 11a8 8 0 00-14.5-4.5L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0014.5 4.5L20 16"/><path d="M20 20v-4h-4"/>',
  gauge: '<path d="M4 17a8 8 0 1116 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.2"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 005 5L13 18a2.1 2.1 0 01-3-3z"/><path d="M14.5 6.5L11 3l-2 2 3.5 3.5"/>',
} as const;

export type IconKey = keyof typeof ICONS;

export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

export type ServiceCard = {
  id: string;
  title: string;
  icon: IconKey;
  hue: string;
  image: string;
  text: string;
  lead: string;
  features: string[];
  ideal: string;
};

export const defaultServices: ServiceCard[] = [
  { id: "business-websites", title: "Business Websites", icon: "globe", hue: "#f0579e", image: "/services/business-websites.webp",
    text: "Custom websites designed around the business.",
    lead: "A website built around how your business actually works, so visitors quickly understand what you offer and how to reach you.",
    features: ["Custom design that matches your brand", "Mobile-friendly on every screen size", "Contact forms, maps and WhatsApp buttons", "Easy content editing after launch"],
    ideal: "Service businesses, restaurants, clinics, agencies and anyone who needs a credible online presence." },
  { id: "e-commerce", title: "E-Commerce", icon: "cart", hue: "#9b4de0", image: "/services/ecommerce.webp",
    text: "Modern online stores and shopping experiences.",
    lead: "An online store that makes browsing, choosing and paying simple for your customers, and managing orders simple for you.",
    features: ["Product catalogue with categories and filters", "Secure checkout and online payments", "Order, stock and customer management", "Discount codes and promotions"],
    ideal: "Shops and brands that want to sell online, or move beyond selling through social media." },
  { id: "ai-integration", title: "AI Integration", icon: "spark", hue: "#ff8a3d", image: "/services/ai-integration.webp",
    text: "AI assistants, intelligent search, automation, and custom AI systems.",
    lead: "Put AI to work inside your website and daily operations, from a smart assistant for visitors to automations that save your team hours.",
    features: ["AI chat assistant trained on your business", "Intelligent search across your content", "Automated replies, summaries and reports", "Custom AI systems built for your workflow"],
    ideal: "Businesses that answer the same questions every day or want to automate repetitive tasks." },
  { id: "ai-booking-systems", title: "AI Booking Systems", icon: "calendar", hue: "#4c8dff", image: "/services/ai-booking.webp",
    text: "24/7 appointment and reservation automation.",
    lead: "Let customers book appointments and reservations any time of day, with confirmations and reminders sent automatically.",
    features: ["Online booking available 24/7", "Automatic confirmations and reminders", "Calendar sync to avoid double bookings", "Booking via website, WhatsApp or chat"],
    ideal: "Salons, clinics, restaurants, consultants and any business that runs on appointments." },
  { id: "ai-lead-generation", title: "AI Lead Generation", icon: "target", hue: "#f0579e", image: "/services/ai-lead-generation.webp",
    text: "Capture, qualify, and organize potential customers.",
    lead: "Turn visitors into real opportunities. Leads are captured, qualified by AI and organized so you know who to call first.",
    features: ["Smart forms and chat that capture contact details", "AI qualification of each lead", "Organized lead list or CRM integration", "Instant alerts for high-value leads"],
    ideal: "Businesses that want more enquiries and less time wasted on unqualified contacts." },
  { id: "website-redesign", title: "Website Redesign", icon: "refresh", hue: "#9b4de0", image: "/services/website-redesign.webp",
    text: "Transform outdated websites into modern digital experiences.",
    lead: "Give an outdated website a modern look, faster loading and a clearer structure, without losing what already works.",
    features: ["Fresh modern design aligned to your brand", "Improved structure and user journey", "Faster speed and mobile experience", "Content and SEO carried over safely"],
    ideal: "Businesses whose current site looks dated, loads slowly or no longer reflects who they are." },
  { id: "seo-performance", title: "SEO & Performance", icon: "gauge", hue: "#ff8a3d", image: "/services/seo-performance.webp",
    text: "Fast, responsive, search-friendly websites.",
    lead: "Make your website fast and easy for search engines to understand, so more of the right people find you.",
    features: ["Speed and Core Web Vitals optimization", "On-page SEO and meta setup", "Local SEO and Google Business profile", "Search Console and analytics setup"],
    ideal: "Any website that isn't showing up in search results or feels slow to load." },
  { id: "maintenance-support", title: "Maintenance & Support", icon: "wrench", hue: "#4c8dff", image: "/services/maintenance-support.webp",
    text: "Ongoing updates, optimization, and technical support.",
    lead: "Keep your website secure, up to date and running smoothly, with someone to call when you need changes.",
    features: ["Regular updates and security checks", "Backups and uptime monitoring", "Content changes and small improvements", "Priority technical support"],
    ideal: "Businesses that want peace of mind without managing the technical side themselves." },
];

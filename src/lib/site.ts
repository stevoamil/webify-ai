/**
 * Single source of truth for business details.
 * Anything marked TODO must be replaced with real information before launch.
 */
export const site = {
  name: "Webify.ai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://webify.ai",
  title: "Webify.ai — AI-Powered Websites for Modern Businesses",
  description:
    "Webify.ai creates premium websites powered by AI, automation, intelligent booking systems, and modern digital experiences.",
  tagline: "AI-powered websites for modern businesses.",
  contact: {
    // TODO: replace with the real business WhatsApp number (international format, digits only).
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
    // TODO: replace with the real business email.
    email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  },
  social: {
    // TODO: replace with real profile URLs. Empty links are hidden.
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  },
} as const;

export function whatsappLink(message = "Hi Webify.ai, I'd like to talk about a project.") {
  if (!site.contact.whatsapp) return "#contact";
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Portfolio", href: "#work" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

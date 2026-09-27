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
    email: process.env.NEXT_PUBLIC_EMAIL ?? "team.webify@outlook.com",
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

/**
 * Contact-form delivery via FormSubmit (https://formsubmit.co) — a free form-to-email
 * relay that needs no server, API key, or SMTP credentials, just the destination inbox.
 * The FIRST submission triggers a one-time confirmation email to that inbox; click the
 * link in it once to activate delivery, then every future submission is sent straight
 * through. Swap this for a dedicated provider (e.g. Resend) later if you outgrow it.
 */
export const formEndpoint = `https://formsubmit.co/ajax/${site.contact.email}`;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#how-we-work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Process", href: "#how-we-work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

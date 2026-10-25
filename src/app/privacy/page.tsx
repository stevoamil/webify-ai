import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { JsonLd, PageHero, breadcrumbJsonLd } from "@/components/sections/PageParts";
import { getSettings } from "@/lib/store/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Webify.ai collects, uses and protects the information you share through our website, contact form, newsletter and AI assistant.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "October 12, 2026";

const sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    heading: "Information we collect",
    paragraphs: ["We only collect what you choose to send us, plus basic usage data from the website."],
    bullets: [
      "Project enquiry form: your name, business name, email address, phone number, what you need, your budget range, a description of your business and any extra requirements you write.",
      "Newsletter: your email address.",
      "AI assistant chat: the messages you type and the assistant's replies.",
      "Usage data: pages visited, device and browser type and approximate location, collected by Google Analytics.",
    ],
  },
  {
    heading: "How we use it",
    bullets: [
      "To reply to your enquiry and prepare a quote or plan.",
      "To send the newsletter, if you subscribed. You can unsubscribe at any time.",
      "To review and improve the AI assistant and the website.",
      "To understand how the site is used and keep it secure and fast.",
    ],
    paragraphs: ["We do not sell your personal information."],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "We use Google Analytics to measure how visitors use the site. It may set cookies in your browser and sends usage data to Google. You can block or delete cookies in your browser settings, or install Google's opt-out browser add-on, and the website will continue to work.",
      "The administrator login for our dashboard uses a session cookie. Visitors do not have accounts and do not receive this cookie.",
    ],
  },
  {
    heading: "Services that process your information",
    paragraphs: ["We use trusted providers to run the website. Each handles data only to provide its service:"],
    bullets: [
      "Vercel: hosting and file storage for the website and the dashboard data.",
      "Resend and FormSubmit: delivering enquiry and newsletter emails.",
      "Google Analytics: website usage statistics.",
    ],
  },
  {
    heading: "AI assistant",
    paragraphs: [
      "The chat assistant answers general questions about Webify.ai. Conversations are saved so we can review and improve it. Please do not type passwords, payment details or other sensitive information into the chat.",
    ],
  },
  {
    heading: "How long we keep information",
    paragraphs: [
      "We keep enquiries, conversations and newsletter subscriptions for as long as we need them to respond to you, keep business records or send the newsletter. You can ask us to delete your information at any time.",
    ],
  },
  {
    heading: "Your choices",
    bullets: [
      "Ask what information we hold about you.",
      "Ask us to correct or delete it.",
      "Unsubscribe from the newsletter.",
      "Disable cookies in your browser.",
    ],
    paragraphs: ["Contact us using the details below and we will respond as soon as we can."],
  },
  {
    heading: "Security",
    paragraphs: [
      "The website is served over HTTPS and the dashboard is protected by a login. No system is completely secure, so we cannot guarantee absolute security, but we take reasonable steps to protect your information.",
    ],
  },
  {
    heading: "Children",
    paragraphs: ["The website is for businesses and is not directed at children. We do not knowingly collect information from children."],
  },
  {
    heading: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The date at the top shows when it was last changed."],
  },
];

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <PageShell>
      <JsonLd data={{ "@graph": [breadcrumbJsonLd([{ name: "Home", path: "" }, { name: "Privacy Policy", path: "/privacy" }])] }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How Webify.ai handles the information you share with us. Last updated ${UPDATED}.`}
      />
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="mb-4 font-serif text-2xl italic">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-4 text-[15px] leading-7 text-muted">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div>
            <h2 className="mb-4 font-serif text-2xl italic">Contact us</h2>
            <p className="text-[15px] leading-7 text-muted">
              For any privacy question or request, email{" "}
              <a href={`mailto:${settings.email}`} className="text-ice underline-offset-2 hover:underline">
                {settings.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

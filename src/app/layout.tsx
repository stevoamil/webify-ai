import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import LazyAnalytics from "@/components/layout/LazyAnalytics";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Webify.ai USA — AI-Powered Websites, Booking & Automation",
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "AI website design",
    "AI web development agency",
    "AI booking system",
    "business automation",
    "premium website design",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030406",
  colorScheme: "dark",
};

const SERVICES = [
  "Business Websites",
  "E-Commerce",
  "AI Integration",
  "AI Booking Systems",
  "AI Lead Generation",
  "Website Redesign",
  "SEO & Performance",
  "Maintenance & Support",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.png`,
      email: site.contact.email,
      description: site.description,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      areaServed: "Worldwide",
      provider: { "@id": `${site.url}/#organization` },
      serviceType: [
        "Website design",
        "AI integration",
        "Business automation",
        "Booking systems",
        "E-commerce development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Webify.ai services",
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <LazyAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}

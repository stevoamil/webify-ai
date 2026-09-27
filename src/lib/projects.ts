/** Real, shipped projects only. Details are taken from the live sites. */
export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  url: string;
  domain: string;
  image: string;
  imageAlt: string;
  altImage: string;
  altImageAlt: string;
  summary: string;
  description: string;
  features: string[];
  ai: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "monaart",
    name: "Monart Design",
    client: "Mona Malaab — Event Planning & Design",
    industry: "Events & Weddings",
    url: "https://monaartdesign.com/",
    domain: "monaartdesign.com",
    image: "/work/monaart.webp",
    imageAlt: "Monart Design homepage hero reading “Where Moments Become Memories.”",
    altImage: "/work/monaart-alt.webp",
    altImageAlt: "Monart Design services section",
    summary: "An editorial, cinematic home for a Paris-trained event designer.",
    description:
      "A bespoke website for Mona Malaab’s event planning and design atelier, serving Paris, the Côte d’Azur and destination celebrations. The experience leads with atmosphere, then guides couples and families from services to a detailed inquiry.",
    features: [
      "Branded cinematic loading sequence",
      "Service packages for 9+ event types",
      "Filterable portfolio gallery",
      "Scroll-driven “How We Work” story",
      "Detailed inquiry form with budget ranges",
      "WhatsApp, email and call shortcuts",
      "French / English language switch",
    ],
    ai: ["“Ask Mona’s Assistant” AI concierge for visitor questions"],
    accent: "#d8c3a0",
  },
  {
    slug: "prevu",
    name: "Prevu",
    client: "Prevu Real Estate",
    industry: "Luxury Real Estate",
    url: "https://prevu-real-estate.vercel.app/",
    domain: "prevu-real-estate.vercel.app",
    image: "/work/prevu.webp",
    imageAlt: "Prevu luxury real estate platform showing a modern hillside home",
    altImage: "/work/prevu-alt.webp",
    altImageAlt: "Prevu property search section",
    summary: "A luxury real estate platform with AI search and instant valuation.",
    description:
      "A full real estate platform for buyers, sellers and investors: property search across U.S. states, curated listings, agent profiles and an AI valuation flow, wrapped in an architectural, cinematic interface.",
    features: [
      "Property search by state, city, type and budget",
      "Listing carousel with detail pages",
      "Agents, valuation and about sections",
      "Client testimonials",
      "Contact form with budget and date",
      "WhatsApp contact and English / Spanish",
    ],
    ai: [
      "AI valuation flow for sellers",
      "AI-assisted, lifestyle-aware property search",
      "AI assistant for common buyer questions",
    ],
    accent: "#8fd6e8",
  },
  {
    slug: "motormania",
    name: "Motor Mania Club",
    client: "Motor Mania Club",
    industry: "Automotive Marketplace",
    url: "https://www.motormaniaclub.com/",
    domain: "motormaniaclub.com",
    image: "/work/motormania.webp",
    imageAlt: "Motor Mania Club homepage with a car photo contest and live vote counts",
    altImage: "/work/motormania-alt.webp",
    altImageAlt: "Motor Mania Club shop and dealer deals sections",
    summary: "An automotive marketplace and community hub built around cars.",
    description:
      "A community-driven automotive platform: vehicles for sale and rent, a parts and gear marketplace, a directory of garages and services, featured dealers, and a running car photo contest with real cash prizes and a live countdown.",
    features: [
      "Vehicles for sale and rent marketplace",
      "Parts, gear and garage equipment store",
      "Garages & services directory",
      "Featured dealer showcase",
      "Car photo contest with live vote counts and prizes",
      "Multi-language and multi-country support",
    ],
    ai: [],
    accent: "#e0453b",
  },
];

export type Industry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  needs: string[];
  build: string[];
  /** Portfolio project slugs that are real examples for this industry. */
  projects: string[];
  /** Service ids (see services-data). */
  services: string[];
};

export const industries: Industry[] = [
  {
    slug: "automotive-garages-and-car-services",
    name: "Garages & Car Services",
    title: "Websites for Garages, Workshops and Car Businesses",
    description:
      "Websites for repair garages, specialist workshops and car businesses: service menus, online booking, AI diagnosis tools, live repair tracking and WhatsApp.",
    intro:
      "Car owners search when something goes wrong, and they want to know three things quickly: can you fix it, roughly how long will it take, and how do I book. A good garage website answers all three before the phone rings.",
    needs: [
      "A clear service menu that explains each job and how long it usually takes.",
      "Booking that works at 11pm, not only during opening hours.",
      "A way to describe a symptom or a warning light and be pointed in the right direction.",
      "Updates while the car is in the workshop, so customers stop calling to ask.",
      "Easy contact by WhatsApp or phone, in the customer's own language.",
    ],
    build: [
      "Service pages with durations and instant-booking buttons. The Land Rover Specialists site lists twelve services this way.",
      "An AI diagnosis or cost-estimate form that collects the model, year, mileage and symptoms, built for BMW Elite Garage and Land Rover Specialists.",
      "A live repair tracker with technician updates and photos, so customers can follow their job.",
      "An AI service advisor chat with a WhatsApp handoff, in English and Arabic.",
      "Membership and priority-service plans for repeat customers.",
    ],
    projects: ["bmw-elite-garage", "land-rover-specialists", "motormania"],
    services: ["ai-booking-systems", "ai-integration", "business-websites"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    title: "Websites for Real Estate Agencies and Property Platforms",
    description:
      "Websites for agencies and property platforms: fast property search, listings with detail pages, agent profiles, AI valuation and instant contact.",
    intro:
      "Buyers browse on their phones, compare many listings and contact whoever answers first. A property website has to make searching effortless and make the agent feel trustworthy and easy to reach.",
    needs: [
      "Property search by location, type and budget that is quick on a phone.",
      "Listings with strong visuals and a detail page for every property.",
      "Agent profiles that build trust before the first call.",
      "A simple way to ask about a property or book a viewing.",
      "Support for the languages your buyers speak.",
    ],
    build: [
      "Property search by state, city, type and budget, with a listing carousel and detail pages.",
      "Agent, valuation and about sections that present the team clearly.",
      "An AI valuation flow for sellers and an AI-assisted, lifestyle-aware property search.",
      "An AI assistant for common buyer questions.",
      "A contact form with budget and date, a WhatsApp button, and English and Spanish versions. All of these were built for Prevu.",
    ],
    projects: ["prevu"],
    services: ["business-websites", "ai-lead-generation", "ai-integration"],
  },
  {
    slug: "events-and-weddings",
    name: "Events & Weddings",
    title: "Websites for Event Planners, Wedding Designers and Venues",
    description:
      "Websites for event and wedding businesses: atmosphere first, clear packages, a detailed inquiry form, multilingual pages and an AI concierge.",
    intro:
      "People choose an event planner on feeling first and logistics second. The website has to create the right atmosphere in seconds, then make it easy to understand what you offer and to start a detailed conversation.",
    needs: [
      "A look and feel that matches the quality of the events you plan.",
      "Packages that make clear what is included for each type of event.",
      "A gallery that shows real work and can be filtered by event type.",
      "An inquiry form that captures date, guest numbers and budget range.",
      "Pages in the languages of the couples and families you serve.",
    ],
    build: [
      "A cinematic loading sequence and an editorial design that sets the mood.",
      "Service packages for nine or more event types and a filterable portfolio gallery.",
      "A scroll-driven story of how the planning process works.",
      "A detailed inquiry form with budget ranges, plus WhatsApp, email and call shortcuts.",
      "A French and English language switch and an AI concierge that answers visitors' questions. All of these were built for Monart Design.",
    ],
    projects: ["monaart"],
    services: ["business-websites", "ai-lead-generation", "ai-integration"],
  },
  {
    slug: "music-schools-and-education",
    name: "Music Schools & Education",
    title: "Websites for Music Schools, Academies and Tutors",
    description:
      "Websites for music schools and teaching businesses: programs with pricing, class booking by level and time, testimonials and a recital gallery.",
    intro:
      "Parents and students want to see what you teach, who teaches it, what it costs and how to start. A school website should turn that curiosity into a booked first lesson with as few steps as possible.",
    needs: [
      "A clear section for each subject or instrument.",
      "Programs and prices that are easy to compare.",
      "Booking by instrument, level and preferred time of day.",
      "Proof that students progress, through testimonials and performances.",
      "A way to stay in touch with newsletters and updates.",
    ],
    build: [
      "Six instrument sections, from piano to cello, each with its own focus.",
      "Four programs, including private lessons, group classes, online sessions and masterclasses, with pricing.",
      "A class booking form by instrument, skill level and time of day.",
      "Student testimonials, a recital gallery, a newsletter signup and a WhatsApp button. All of these were built for Harmonia Conservatory.",
    ],
    projects: ["harmonia-conservatory"],
    services: ["ai-booking-systems", "business-websites", "seo-performance"],
  },
  {
    slug: "online-stores-and-marketplaces",
    name: "Online Stores & Marketplaces",
    title: "Websites for Online Stores and Marketplaces",
    description:
      "Online stores and marketplaces: curated collections, product grids, seller profiles, cart and wishlist, AI shopping assistance and directories.",
    intro:
      "A store has to do two things well: help people find something they want, and make buying it feel safe and simple. A marketplace has the extra job of making every seller look trustworthy.",
    needs: [
      "Collections and filters that make browsing easy.",
      "Product pages with clear prices, ratings and photos.",
      "Seller or maker profiles that build confidence.",
      "Cart, wishlist and a simple checkout.",
      "Help finding the right product, especially for gifts.",
    ],
    build: [
      "Six curated collections, product grids for new arrivals, best sellers and limited editions, and a flash-sale section.",
      "Artisan profiles with country, rating and sales, plus cart, wishlist, search and account. These were built for Arthreesanat.",
      "An AI shopping assistant that suggests gifts and crafts.",
      "A marketplace for vehicles, parts and garages with a dealer showcase and a community photo contest, built for Motor Mania Club.",
    ],
    projects: ["arthreesanat", "motormania"],
    services: ["e-commerce", "ai-integration", "seo-performance"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function industryForProject(projectSlug: string) {
  return industries.find((i) => i.projects.includes(projectSlug));
}

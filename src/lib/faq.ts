export type Faq = { q: string; a: string };

/** Answers are limited to what Webify.ai actually does and offers. */
export const homeFaqs: Faq[] = [
  {
    q: "What does Webify.ai do?",
    a: "Webify.ai is a website agency that builds AI websites for businesses: custom design, AI chat assistants, 24/7 online booking and automation, plus redesigns, SEO and ongoing support.",
  },
  {
    q: "What is an AI website?",
    a: "An AI website is a well-built business website with smart features added, such as an assistant that answers common questions, booking that works at any hour, and automation that sends you the enquiry with the details already collected.",
  },
  {
    q: "How much does a business website cost?",
    a: "It depends on the number of pages, the design, the features (booking, payments, a store, AI assistants) and any integrations. We don't publish a price list because a single number would be misleading. Tell us about your business and we reply with a clear plan and a custom quote.",
  },
  {
    q: "Which businesses do you build websites for?",
    a: "We build for businesses of any size, including garages and car services, real estate, event and wedding planners, restaurants, clinics, salons, gyms, law firms, hotels, contractors, online stores and education. You can see real projects in our portfolio.",
  },
  {
    q: "Can you add an AI chatbot or booking system to my existing website?",
    a: "Yes. We can add an AI assistant or an online booking flow to an existing site, or include them in a new build, depending on how your current site is made.",
  },
  {
    q: "How does the process work?",
    a: "Five steps: consultation, concept, design, execution and launch day. We start by understanding your business and goals, agree the plan, design and build the site, then launch it and support you afterwards.",
  },
  {
    q: "Do you work with clients outside the United States?",
    a: "Yes. We work with businesses worldwide and work remotely. We have built websites in English and Arabic.",
  },
  {
    q: "How do I get started?",
    a: "Use the project form on this page and tell us about your business, what you need and your budget range. We'll come back with a clear plan and a custom quote.",
  },
];

export const serviceFaqs: Record<string, Faq[]> = {
  "business-websites": [
    {
      q: "Do you use templates or custom design?",
      a: "Every site is custom-built around your brand and goals, not adapted from a template.",
    },
    {
      q: "Will my website work on phones?",
      a: "Yes. Every site is designed to work on phones, tablets and desktops, and to load quickly.",
    },
  ],
  "e-commerce": [
    {
      q: "Can you build an online store for my products?",
      a: "Yes. We build online stores and marketplaces with product pages, a cart and checkout, designed to be easy to browse and to buy from.",
    },
    {
      q: "Can I manage products myself after launch?",
      a: "Yes. We set the store up so you can add and edit products without needing a developer, and we explain how during handover.",
    },
  ],
  "ai-integration": [
    {
      q: "What can an AI assistant on my website do?",
      a: "It can answer common questions about your business, collect a visitor's details and pass the enquiry to you. It handles routine questions and hands real decisions to a person.",
    },
    {
      q: "Can you add AI to a website I already have?",
      a: "In most cases yes. It depends on how your current site is built, and we'll tell you honestly what is possible before you commit.",
    },
  ],
  "ai-booking-systems": [
    {
      q: "What is an AI booking system?",
      a: "It lets customers book or request an appointment at any hour, and can answer questions around the booking. You receive the details and confirmations are sent automatically.",
    },
    {
      q: "Which businesses benefit most?",
      a: "Businesses that run on appointments, such as garages, clinics, salons, gyms, restaurants and consultants.",
    },
  ],
  "ai-lead-generation": [
    {
      q: "How does a website generate leads?",
      a: "By making the next step obvious: clear offers, short forms, fast replies and an assistant that collects details from visitors, so enquiries reach you instead of being lost.",
    },
    {
      q: "Do you guarantee a number of leads?",
      a: "No. Nobody can honestly guarantee that. We build the website and the lead-capture flow so your site converts as many visitors as it can.",
    },
  ],
  "website-redesign": [
    {
      q: "Will I lose my Google rankings if I redesign?",
      a: "Not if it's done carefully. We carry over your content and search settings, keep your important pages and set up redirects where needed.",
    },
    {
      q: "How do I know if I need a redesign?",
      a: "Common signs are an old look on phones, slow loading, visitors who don't contact you and a site you can't update yourself.",
    },
  ],
  "seo-performance": [
    {
      q: "Can you guarantee a number one ranking on Google?",
      a: "No. Nobody can. We build the technical foundations (fast pages, clear titles and descriptions, a sitemap and structured data) so your site is easy for search engines and AI assistants to understand.",
    },
    {
      q: "How long does SEO take to show results?",
      a: "Usually weeks to months, depending on the site and its competition. A new page can take days to be indexed.",
    },
  ],
  "maintenance-support": [
    {
      q: "What does website maintenance include?",
      a: "Updates, security checks, backups, monitoring and help with changes after launch, so your site stays fast, safe and current.",
    },
    {
      q: "Can you maintain a site you didn't build?",
      a: "Often yes. Tell us how your site is built and we'll confirm what we can support.",
    },
  ],
};

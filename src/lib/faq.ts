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
  {
    q: "Do you offer custom website design and development for small businesses?",
    a: "Yes. Webify.ai is a web design agency that designs and develops custom websites for a small business or a local business. Each site is built around your brand and goals, and we quote every project individually.",
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
    {
      q: "Are you a web design agency for a small business?",
      a: "Yes. Webify.ai is a web design agency that builds professional business websites for a small business, with custom website design, development and ongoing support. We quote each project individually, so there is no fixed price list.",
    },
    {
      q: "Can you build a custom website for my company, including a website for a startup or a new business?",
      a: "Yes. We build a custom website for your company or a new business, and we do web design for a new business or a startup company. Each site is designed around your brand and goals, not adapted from a template.",
    },
    {
      q: "Do you offer an affordable business website for a small business?",
      a: "We do not publish a price list, because the cost depends on the pages, the design and the features you need. We scope each project to your business and your budget and send a clear custom quote, so you know what you are paying for before you start.",
    },
    {
      q: "Do you design websites for service businesses and professional services?",
      a: "Yes. We design websites for service businesses, a professional service, a consulting business or a business website designer's own clients: clear services, proof of your work and an easy way to get in touch.",
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
    {
      q: "Do you offer ecommerce website design and online store development?",
      a: "Yes. We offer ecommerce website design and online store development, from the product catalogue and checkout to order management, and we quote each store individually.",
    },
    {
      q: "Can you build an online store for me, set up product pages and add a shopping cart?",
      a: "Yes. We build an online shop for your business, including the product pages, categories, a shopping cart and checkout, so you can start selling products online. We can set up the store for a new brand or move an existing one.",
    },
    {
      q: "Can you add online payments to my website?",
      a: "Yes. Secure checkout and online payments are part of our ecommerce website development. The payment methods available depend on the countries you sell in, and we explain the options before building.",
    },
    {
      q: "Can you help improve my ecommerce website sales?",
      a: "We improve the parts of a store that affect buying: clearer product pages, a simpler checkout, faster loading and easier navigation. We cannot guarantee a sales figure, because sales also depend on your products, prices and traffic.",
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
    {
      q: "Can you add AI to my website and integrate AI into my business website?",
      a: "In most cases, yes. We add an AI assistant to a website, or build it into a new site, depending on how your current website is made. We confirm what is possible before you commit.",
    },
    {
      q: "Do you build an AI chatbot for customer support on my company website?",
      a: "Yes. An AI chatbot for your company website can answer common customer questions at any hour, collect details and hand over to you when a person is needed. It works from information about your business that you provide, so it needs to be kept up to date.",
    },
    {
      q: "What AI tools can a small business use?",
      a: "For a small business, the most useful AI tools are usually a chat assistant for customer questions, automated replies and summaries, smart search across your content, and an AI scheduler for bookings. We start with the one that saves you the most time.",
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
    {
      q: "Can customers book appointments on my website with an automated booking system?",
      a: "Yes. An automated booking system lets customers book appointments on your website at any hour, with confirmations and reminders sent for you. It syncs with your calendar to avoid double bookings.",
    },
    {
      q: "Do you build an online booking system for a service business, a salon or consultants?",
      a: "Yes. We build an online booking system for a service business, an automated booking website for a salon, and online booking for consultants. Customers pick a service and a time, and you see each booking straight away.",
    },
    {
      q: "Can an AI assistant work as a receptionist and booking system?",
      a: "On your website, yes: an AI assistant can act like a receptionist for online visitors, answering common questions and taking bookings. It does not answer telephone calls. A person stays in charge of unusual requests.",
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
    {
      q: "How can I get more leads and customer enquiries from my website?",
      a: "We help you get more leads through your website by making the next step obvious: clear offers, short forms, and an assistant that captures contact details and what the visitor needs. This turns more visitors into enquiries, although the number of leads also depends on your traffic and offer.",
    },
    {
      q: "Can lead capture and follow-up be automated?",
      a: "Yes. We build automated lead capture for your website, with qualification and an AI follow-up for new website leads, so every enquiry gets a prompt reply and the best ones reach you first.",
    },
    {
      q: "Do you provide AI tools to find business leads?",
      a: "We build tools that capture and qualify the enquiries that come to your website, for service businesses and small businesses alike. We do not buy or scrape contact lists.",
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
    {
      q: "Do you offer website redesign for a small business?",
      a: "Yes. We redesign the website of a small business, giving it a modern look, faster loading and a clearer structure while carrying over the content and search settings that already work.",
    },
    {
      q: "Can you redesign my company website and make it look more modern?",
      a: "Yes. We redesign your business website, update an old website and give it a modern look, a clearer structure and a better user journey, while keeping the content and search settings that already work.",
    },
    {
      q: "Can you improve an outdated business website for mobile users and make it easier to use?",
      a: "Yes. We improve an outdated business website for mobile users, make it easier to use and improve its design and speed. A clearer layout often improves the website conversion rate, but we cannot promise a specific figure.",
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
    {
      q: "Can you help my website show up on Google and fix SEO problems?",
      a: "Yes. We fix the technical SEO problems on a business website, such as titles, descriptions, structure, speed and a sitemap, and set up Search Console so you can see how you appear. Nobody can guarantee a ranking, but a clean site helps you show up for the right searches.",
    },
    {
      q: "Can you speed up a slow website, including a slow ecommerce website?",
      a: "Yes. We speed up a business website and improve website loading speed, on phones in particular, and we can do the same for a slow ecommerce website. We measure the speed before and after so you can see the difference.",
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
    {
      q: "Do you offer monthly website maintenance and security updates for a growing business?",
      a: "Yes. Our monthly website maintenance service covers regular updates, security updates, backups and monitoring, plus ongoing support for your company website, so a growing business can focus on the business.",
    },
    {
      q: "Can you fix errors and problems on my business website?",
      a: "Often yes. We help with fixing website errors and issues and with fixing a broken business website. Tell us how your site is built and what is wrong, and we confirm what we can support before you commit.",
    },
  ],
};

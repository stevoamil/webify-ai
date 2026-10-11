export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: string;
  readMinutes: number;
  intro: string[];
  sections: GuideSection[];
  /** Service ids (see services-data) shown as "related services". */
  services: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-much-does-a-business-website-cost",
    title: "How Much Does a Business Website Cost? What Really Drives the Price",
    description:
      "There is no single price for a business website. Here is what drives the cost, how to compare quotes fairly, and what to ask before you hire an agency.",
    published: "2026-10-11",
    readMinutes: 5,
    intro: [
      "Ask five agencies what a website costs and you will get five very different answers. That is not because someone is lying. A one-page landing site and a store with online payments and an AI assistant are completely different projects, even though both are called a website.",
      "This guide explains what actually moves the price, so you can compare quotes properly and spend money on the parts that matter for your business.",
    ],
    sections: [
      {
        heading: "What you are really paying for",
        paragraphs: [
          "A website is more than the pages you see. The price covers the thinking and the work behind them:",
        ],
        bullets: [
          "Planning: understanding your customers, your goals and what the site needs to do.",
          "Design: the look, the layout on phones and desktops, and how visitors move through the pages.",
          "Build: turning the design into a fast, secure website that works on every device.",
          "Content: the words, photos and videos, whether you supply them or someone creates them.",
          "Launch and support: going live, fixing early issues, and being able to ask for changes afterwards.",
        ],
      },
      {
        heading: "The biggest things that change the price",
        bullets: [
          "Size: the number of pages and how many of them need their own unique layout.",
          "Custom design or template: a design made around your brand takes more work than adapting a ready-made one.",
          "Features: online booking, payments, a store, customer accounts and AI assistants each add real build and testing time.",
          "Integrations: connecting a calendar, a payment provider, a CRM, WhatsApp or email marketing.",
          "Content: writing, photography and translation can be a large part of a project, or none of it if you supply everything.",
          "Languages: a second language is not just translation. Every page, form and message has to be built and checked twice.",
          "Timeline: a very tight deadline usually costs more.",
        ],
      },
      {
        heading: "Template or custom design?",
        paragraphs: [
          "Templates are quicker and cheaper to start with. They suit a business that needs a simple, credible presence and is happy to look similar to others who use the same template.",
          "A custom design costs more but fits the way your business actually works. It matters most when your website is a main way customers find you, book you or buy from you, or when you want to stand out from competitors that all look alike.",
        ],
      },
      {
        heading: "Costs that continue after launch",
        paragraphs: [
          "The build is only part of the picture. Plan for the ongoing costs too:",
        ],
        bullets: [
          "Your domain name, renewed every year.",
          "Hosting, which for modern sites is often small but not always zero.",
          "Maintenance: updates, security checks, backups and monitoring.",
          "Changes: new pages, new offers, seasonal updates.",
          "Any paid tools connected to the site, such as email or booking software.",
        ],
      },
      {
        heading: "How to compare quotes fairly",
        paragraphs: [
          "Two quotes with the same total can include very different things. Before you decide, ask each agency:",
        ],
        bullets: [
          "Exactly which pages and features are included, and what costs extra?",
          "Is the site designed for phones first, since most visitors will use one?",
          "Is basic search engine setup included, such as page titles, descriptions and a sitemap?",
          "Can you edit text and images yourself afterwards, or do you need to ask every time?",
          "Who owns the domain, the code and the content when the project ends?",
          "What support do you get after launch, and for how long?",
          "How many rounds of revisions are included?",
        ],
      },
      {
        heading: "How we quote at Webify.ai",
        paragraphs: [
          "Every project is scoped to the business behind it. We do not publish a price list, because a landing page and a full website with AI booking are different jobs and a single number would be misleading.",
          "Tell us about your business, what you need and your budget range through the project form, and we will come back with a clear plan and a custom quote.",
        ],
      },
    ],
    services: ["business-websites", "e-commerce", "website-redesign"],
  },
  {
    slug: "ai-booking-system-for-small-business",
    title: "AI Booking Systems: What They Are and Whether Your Business Needs One",
    description:
      "What an AI booking system does, how it differs from a normal booking form, which businesses benefit most, and what to check before you choose one.",
    published: "2026-10-11",
    readMinutes: 5,
    intro: [
      "If your business runs on appointments or reservations, every missed call and unanswered message is a booking you might have lost. An online booking system lets customers book at any time. An AI booking system goes a step further by handling the conversation around the booking too.",
      "Here is what that means in practice, who it helps, and how to decide whether it is worth it for you.",
    ],
    sections: [
      {
        heading: "What an AI booking system does",
        paragraphs: [
          "At its core it does what a good receptionist does, around the clock:",
        ],
        bullets: [
          "Lets customers book, change or cancel an appointment at any hour.",
          "Sends confirmations and reminders automatically.",
          "Syncs with your calendar so the same slot is never booked twice.",
          "Takes bookings through your website, WhatsApp or a chat window.",
          "Answers common questions before the booking, such as opening hours, services and what to bring.",
        ],
      },
      {
        heading: "How it differs from a normal booking form",
        paragraphs: [
          "A standard form asks the customer to pick a service, a date and a time from fixed lists. That works, but only if the customer already knows exactly what they need.",
          "An AI layer lets people describe what they want in their own words, such as a symptom, an occasion or a rough time of day, and helps them reach the right service and slot. It can also answer a question and then continue to the booking, instead of sending them away to call.",
        ],
      },
      {
        heading: "Which businesses benefit most",
        paragraphs: [
          "Any business that sells time or capacity can benefit. The clearest cases are:",
        ],
        bullets: [
          "Salons, barbers and beauty studios.",
          "Clinics, dentists and therapists.",
          "Restaurants and venues taking reservations.",
          "Consultants, coaches and tutors.",
          "Garages and workshops booking service slots.",
        ],
      },
      {
        heading: "What to check before you choose one",
        bullets: [
          "Calendar sync: does it prevent double bookings with your real calendar?",
          "Reminders: can it send them by email or WhatsApp, and can you change the wording?",
          "Human handover: can a customer easily reach a person when the assistant cannot help?",
          "Language: does it work in the languages your customers use?",
          "Control: can you set working hours, buffers between appointments and holidays?",
          "Privacy: where is customer data stored and who can see it?",
        ],
      },
      {
        heading: "When you probably do not need one",
        paragraphs: [
          "If you take only a handful of bookings a week and they all come from people you already know, a simple contact form or a calendar link may be enough. An AI booking system pays off when volume, after-hours enquiries or repeated questions start costing you time or customers.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "The best starting point is your current booking process. Write down where customers get stuck, where you lose enquiries and which questions you answer every day. That tells you what the system should handle first. If you would like help mapping it, send us a short description through the project form.",
        ],
      },
    ],
    services: ["ai-booking-systems", "ai-integration", "business-websites"],
  },
  {
    slug: "ai-chatbot-for-your-website",
    title: "AI Chatbot for Your Website: What It Can Do, What It Can't, and How to Set It Up Well",
    description:
      "A practical guide to adding an AI chatbot to your website: the jobs it does well, its limits, and the setup choices that keep it accurate and trustworthy.",
    published: "2026-10-11",
    readMinutes: 5,
    intro: [
      "An AI chatbot can answer visitors at any hour, collect enquiries and point people to the right page. Done well it saves your team time and keeps potential customers from leaving. Done badly it gives wrong answers with great confidence.",
      "The difference is almost always in the setup, not the technology. This guide covers what a chatbot is good for, where it falls short, and how to configure one properly.",
    ],
    sections: [
      {
        heading: "What an AI chatbot does well",
        bullets: [
          "Answers the questions you hear every day: opening hours, services, locations, how booking works.",
          "Captures leads by asking for contact details and what the visitor needs, then passes them to you.",
          "Guides visitors to the right page or service instead of leaving them to search.",
          "Takes booking requests and hands them to your calendar.",
          "Works in several languages without extra staff.",
          "Hands over to WhatsApp, email or a person when a human is needed.",
        ],
      },
      {
        heading: "What it cannot do",
        paragraphs: [
          "Knowing the limits is what keeps a chatbot useful and safe:",
        ],
        bullets: [
          "It should not make up prices, promises or policies. If it does not know, it must say so.",
          "It cannot replace human judgement for sensitive, legal, medical or safety-critical questions.",
          "It is only as good as the information you give it. Outdated or missing content leads to weak answers.",
          "It will not fix a confusing website. If visitors cannot find things, the chatbot is covering a deeper problem.",
        ],
      },
      {
        heading: "How to set one up well",
        paragraphs: [
          "These choices matter more than which tool you pick:",
        ],
        bullets: [
          "Build a knowledge base: write down your services, hours, policies, common questions and what you do not offer.",
          "Set clear rules: tell the assistant what it must never do, such as quoting prices that are not published.",
          "Plan the handover: decide when it passes a visitor to a person and make that route easy.",
          "Keep conversation logs and read them: they show what customers really ask and where the assistant struggles.",
          "Be open that it is an AI assistant, and tell visitors how their messages are used.",
        ],
      },
      {
        heading: "Measuring whether it works",
        paragraphs: [
          "Look at practical signals rather than vanity numbers: how many conversations end in an enquiry or booking, how many questions it could not answer, and how many visitors asked to speak to a person. Review these every few weeks and update the knowledge base. A chatbot is not something you set up once and forget.",
        ],
      },
      {
        heading: "Is it right for your business?",
        paragraphs: [
          "A chatbot pays off when you receive the same questions again and again, get enquiries outside working hours, or lose leads because replies are slow. If you only get a few messages a week, a clear contact page and a WhatsApp button may be enough for now.",
          "If you would like to explore it, tell us what your visitors usually ask and we will suggest a sensible starting point.",
        ],
      },
    ],
    services: ["ai-integration", "ai-lead-generation", "ai-booking-systems"],
  },
  {
    slug: "website-redesign-seo-checklist",
    title: "Website Redesign Checklist: How to Refresh Your Site Without Losing Google Rankings",
    description:
      "A step-by-step checklist for redesigning your website without losing search rankings: what to record, what to keep and what to check after launch.",
    published: "2026-10-11",
    readMinutes: 6,
    intro: [
      "A redesign can make your business look better and work better, but it can also quietly erase years of search visibility if it is done carelessly. The usual causes are simple: pages that disappear, web addresses that change without redirects, and content that gets rewritten away.",
      "Use this checklist to refresh your site and keep what is already working.",
    ],
    sections: [
      {
        heading: "Signs it is time to redesign",
        bullets: [
          "The site looks dated or does not reflect your business any more.",
          "It is slow, or hard to use on a phone.",
          "Visitors arrive but few enquire, book or buy.",
          "You cannot update it without help.",
          "You want features it cannot support, such as online booking or a store.",
        ],
      },
      {
        heading: "Before you start: record what you have",
        bullets: [
          "Make a list of every page and its web address.",
          "Note which pages bring the most visitors, using Google Search Console or your analytics.",
          "Save the page titles and descriptions of your best pages.",
          "Record which other websites link to you.",
          "Take a note of your current speed and visitor numbers so you can compare afterwards.",
        ],
      },
      {
        heading: "During the redesign: what to protect",
        bullets: [
          "Keep your web addresses where you can. If an address must change, redirect the old one to the new one with a permanent redirect.",
          "Keep the content that ranks. Improve it, but do not delete the topics that bring visitors.",
          "Keep a clear structure of headings, with one main heading per page.",
          "Keep and improve internal links between related pages.",
          "Make the new site fast and mobile friendly. This is one of the main reasons to redesign.",
          "Keep structured data and descriptive image text where it exists.",
        ],
      },
      {
        heading: "Before you go live",
        bullets: [
          "Test the redirects from every old address to its new one.",
          "Check that no leftover setting tells search engines to ignore the site. Test versions are often set to hidden, and forgetting to switch that off is a common and costly mistake.",
          "Check that your sitemap lists the new pages.",
          "Test forms, booking flows and payment steps on a phone and on a computer.",
        ],
      },
      {
        heading: "After launch",
        bullets: [
          "Submit the new sitemap in Google Search Console.",
          "Watch for pages Google cannot find and fix them quickly.",
          "Compare visitors and rankings with the numbers you recorded. Expect small changes for a few weeks while search engines catch up.",
          "Keep improving: add content, collect reviews and update pages that are not performing.",
        ],
      },
      {
        heading: "Mistakes to avoid",
        bullets: [
          "Changing your domain name without redirects.",
          "Deleting old pages that still bring visitors.",
          "Launching with a test setting that hides the site from search engines.",
          "Rewriting every page at once, so you cannot tell what helped and what hurt.",
        ],
      },
      {
        heading: "Planning a redesign?",
        paragraphs: [
          "We handle redesigns so that content and search settings are carried over safely. Tell us about your current site through the project form and we will suggest what to keep, what to improve and what to replace.",
        ],
      },
    ],
    services: ["website-redesign", "seo-performance", "business-websites"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

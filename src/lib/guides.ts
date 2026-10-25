export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** A small comparison table shown after the paragraphs and bullets. */
  table?: { headers: string[]; rows: string[][] };
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
        heading: "What are you really paying for?",
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
        heading: "What changes the price the most?",
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
        table: {
          headers: ["", "Template", "Custom design"],
          rows: [
            ["Cost to start", "Lower", "Higher"],
            ["Time to launch", "Usually quicker", "Takes longer"],
            ["Fit to your business", "Generic, shared look", "Built around how you work"],
            ["Best for", "A simple, credible presence", "A site customers use to find, book or buy"],
          ],
        },
      },
      {
        heading: "What costs continue after launch?",
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
        heading: "How does Webify.ai quote?",
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
        heading: "What does an AI booking system do?",
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
        heading: "How is it different from a normal booking form?",
        paragraphs: [
          "A standard form asks the customer to pick a service, a date and a time from fixed lists. That works, but only if the customer already knows exactly what they need.",
          "An AI layer lets people describe what they want in their own words, such as a symptom, an occasion or a rough time of day, and helps them reach the right service and slot. It can also answer a question and then continue to the booking, instead of sending them away to call.",
        ],
        table: {
          headers: ["", "Standard booking form", "AI booking layer"],
          rows: [
            ["How the customer chooses", "Picks a service, date and time from fixed lists", "Describes what they want in their own words"],
            ["Questions along the way", "Customer may have to leave and call", "Can answer a question, then continue to the booking"],
            ["Works best when", "The customer already knows exactly what they need", "The customer is not sure which service or slot fits"],
          ],
        },
      },
      {
        heading: "Which businesses benefit most?",
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
        heading: "What should you check before choosing one?",
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
        heading: "When might you not need one?",
        paragraphs: [
          "If you take only a handful of bookings a week and they all come from people you already know, a simple contact form or a calendar link may be enough. An AI booking system pays off when volume, after-hours enquiries or repeated questions start costing you time or customers.",
        ],
      },
      {
        heading: "How do you get started?",
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
        heading: "What does an AI chatbot do well?",
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
        heading: "What can it not do?",
        paragraphs: [
          "Knowing the limits is what keeps a chatbot useful and safe:",
        ],
        bullets: [
          "It should not make up prices, promises or policies. If it does not know, it must say so.",
          "It cannot replace human judgement for sensitive, legal, medical or safety-critical questions.",
          "It is only as good as the information you give it. Outdated or missing content leads to weak answers.",
          "It will not fix a confusing website. If visitors cannot find things, the chatbot is covering a deeper problem.",
        ],
        table: {
          headers: ["Task", "Who should handle it"],
          rows: [
            ["Everyday questions: hours, services, locations, how booking works", "The chatbot"],
            ["Collecting contact details and what the visitor needs", "The chatbot, then passed to you"],
            ["Booking requests", "The chatbot, handed to your calendar"],
            ["Prices, promises or policies it has not been given", "A person"],
            ["Sensitive, legal, medical or safety-critical questions", "A person"],
          ],
        },
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
        heading: "How do you measure whether it works?",
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
        heading: "What are the signs it is time to redesign?",
        bullets: [
          "The site looks dated or does not reflect your business any more.",
          "It is slow, or hard to use on a phone.",
          "Visitors arrive but few enquire, book or buy.",
          "You cannot update it without help.",
          "You want features it cannot support, such as online booking or a store.",
        ],
      },
      {
        heading: "What should you record before you start?",
        bullets: [
          "Make a list of every page and its web address.",
          "Note which pages bring the most visitors, using Google Search Console or your analytics.",
          "Save the page titles and descriptions of your best pages.",
          "Record which other websites link to you.",
          "Take a note of your current speed and visitor numbers so you can compare afterwards.",
        ],
      },
      {
        heading: "What should you protect during the redesign?",
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
        heading: "What should you check before you go live?",
        bullets: [
          "Test the redirects from every old address to its new one.",
          "Check that no leftover setting tells search engines to ignore the site. Test versions are often set to hidden, and forgetting to switch that off is a common and costly mistake.",
          "Check that your sitemap lists the new pages.",
          "Test forms, booking flows and payment steps on a phone and on a computer.",
        ],
      },
      {
        heading: "What should you do after launch?",
        bullets: [
          "Submit the new sitemap in Google Search Console.",
          "Watch for pages Google cannot find and fix them quickly.",
          "Compare visitors and rankings with the numbers you recorded. Expect small changes for a few weeks while search engines catch up.",
          "Keep improving: add content, collect reviews and update pages that are not performing.",
        ],
      },
      {
        heading: "What mistakes should you avoid?",
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
  {
    slug: "get-more-inquiries-from-your-website",
    title: "How to Get More Inquiries From Your Business Website",
    description:
      "Is your website bringing visitors but few enquiries? Seven practical fixes to turn a business website into a steady source of leads.",
    published: "2026-10-12",
    readMinutes: 5,
    intro: [
      "Many business websites look good and still bring in almost no enquiries. The problem is rarely the number of visitors. It is that visitors are not sure what to do next, or the next step feels like too much effort.",
      "These are the changes that most often turn a quiet website into a lead generation tool. None of them needs a full redesign.",
    ],
    sections: [
      {
        heading: "1. How do you show what you do in the first screen?",
        paragraphs: [
          "A visitor decides in a few seconds whether they are in the right place. The top of your home page should answer three questions: what you offer, who it is for, and what to do next.",
        ],
      },
      {
        heading: "2. Why give every page one clear next step?",
        paragraphs: [
          "Pick the one action you want, such as booking a call, requesting a quote or sending a message, and make it obvious on every page. A page with five competing buttons usually gets fewer clicks than a page with one.",
        ],
      },
      {
        heading: "3. How long should your contact form be?",
        paragraphs: [
          "Every extra field loses some people. Ask only for what you need to reply well, usually a name, a way to reach them and a short description of what they want. You can collect the details later in the conversation.",
        ],
      },
      {
        heading: "4. How do you make contacting you easy on a phone?",
        bullets: [
          "A tap-to-call button and a WhatsApp or messaging link for people who prefer them.",
          "Forms that are comfortable to fill in with a thumb.",
          "Pages that load quickly on a mobile connection.",
        ],
      },
      {
        heading: "5. What proof should you show?",
        paragraphs: [
          "People hesitate to contact a business they cannot judge. Real project examples, genuine customer quotes and clear descriptions of how you work all reduce that hesitation. Only show proof that is real and that you have permission to use.",
        ],
      },
      {
        heading: "6. How fast should you reply?",
        paragraphs: [
          "A fast reply often decides who gets the job. If you cannot answer every message instantly, an automatic confirmation or an AI assistant that answers common questions and collects details can keep the conversation going until you are free.",
        ],
      },
      {
        heading: "7. How do you measure what happens?",
        paragraphs: [
          "Set up a free analytics tool and look at which pages visitors leave without acting. Fix the weakest page first and compare the results after a few weeks.",
        ],
      },
      {
        heading: "Want help with this?",
        paragraphs: [
          "We build websites designed to turn visitors into enquiries, including AI assistants and automatic follow-up. Tell us about your business through the project form and we will suggest what to improve first.",
        ],
      },
    ],
    services: ["ai-lead-generation", "business-websites", "ai-integration"],
  },
  {
    slug: "how-ai-websites-help-small-businesses",
    title: "How AI-Powered Websites Help Small Businesses",
    description:
      "What an AI-powered website actually does for a small business, where it helps, where it does not, and how to decide if you need one.",
    published: "2026-10-12",
    readMinutes: 5,
    intro: [
      "\"AI website\" can mean very different things. For a small business it usually means a normal, well-built website with a few smart features added: an assistant that answers questions, booking that works at any hour, and automation that handles repeated tasks.",
      "This guide explains what those features do in plain terms, and when they are worth having.",
    ],
    sections: [
      {
        heading: "What can an AI-powered website do?",
        bullets: [
          "Answer common questions at any time, such as prices, opening hours and how you work.",
          "Collect a visitor's details and pass the enquiry to you.",
          "Let customers book appointments without calling.",
          "Send automatic confirmations and reminders.",
          "Show visitors the most relevant information based on what they ask.",
        ],
      },
      {
        heading: "Who benefits most",
        paragraphs: [
          "Businesses that get the same questions repeatedly, rely on appointments, or receive enquiries outside working hours benefit the most. Clinics, salons, garages, restaurants, consultants and home services are common examples.",
        ],
      },
      {
        heading: "What does it not do?",
        bullets: [
          "It does not replace a good website. Design, speed and clear content still come first.",
          "It does not replace you. It handles routine questions and passes real decisions to a person.",
          "It is only as good as the information it is given, so it must be set up with accurate details about your business and kept up to date.",
        ],
      },
      {
        heading: "How to decide if you need one",
        bullets: [
          "Do you answer the same five questions every week?",
          "Do you lose enquiries because you reply too slowly or outside working hours?",
          "Do customers need to book or request something from you?",
          "Would saving a few hours a week on repeated messages matter to you?",
        ],
        paragraphs: [
          "If you answered yes to two or more, a simple assistant or booking flow is likely worth it. If not, a clear, fast website may be all you need right now.",
        ],
      },
      {
        heading: "Why start small?",
        paragraphs: [
          "The best approach is to begin with one useful feature, see how customers use it, and add more only when it earns its place. We build AI features into websites this way, so you pay for what helps your business.",
        ],
      },
    ],
    services: ["ai-integration", "ai-booking-systems", "business-websites"],
  },
  {
    slug: "business-tasks-you-can-automate",
    title: "10 Business Tasks You Can Automate to Save Time",
    description:
      "Ten repetitive business tasks, from enquiry replies to appointment reminders, that can be automated so you spend your time on the work only you can do.",
    published: "2026-10-12",
    readMinutes: 5,
    intro: [
      "Most small businesses lose hours every week to tasks that follow the same steps each time. Those are the best candidates for automation. This list covers ten common ones and what automating them looks like.",
    ],
    sections: [
      {
        heading: "Which ten tasks can you automate?",
        bullets: [
          "Replying to common questions: an assistant on your website answers prices, hours and how you work.",
          "Confirming new enquiries: an automatic message tells the customer you received their request.",
          "Booking appointments: customers choose a time themselves.",
          "Appointment reminders: automatic messages reduce no-shows.",
          "Collecting customer details: forms send the information straight to where you keep it.",
          "Following up on quotes: a reminder prompts you, or sends a message, a few days after you quote.",
          "Sorting enquiries: messages are tagged by type so urgent ones are not buried.",
          "Sending invoices and payment reminders from your accounting tool.",
          "Posting regular updates to your social channels on a schedule.",
          "Weekly summaries: a report of new enquiries and bookings delivered to your inbox.",
        ],
      },
      {
        heading: "How to choose where to start",
        paragraphs: [
          "Look at the last week and list what you did more than three times. Pick the one that costs the most time or is most often forgotten. Automate that first, check that it works, then move to the next.",
        ],
      },
      {
        heading: "Why keep a human in the loop?",
        paragraphs: [
          "Automation should handle routine steps and hand real decisions to a person. Always give customers an easy way to reach you directly.",
        ],
      },
      {
        heading: "Need help setting it up?",
        paragraphs: [
          "We connect websites, booking, messaging and AI assistants into simple workflows. Tell us which task takes the most of your time and we will suggest where to begin.",
        ],
      },
    ],
    services: ["ai-integration", "ai-booking-systems", "ai-lead-generation"],
  },
  {
    slug: "make-your-business-website-visible-on-google",
    title: "How to Make Your Business Website More Visible on Google",
    description:
      "A beginner-friendly guide to getting a business website found on Google: the basics that matter, how long it takes and what to avoid.",
    published: "2026-10-12",
    readMinutes: 6,
    intro: [
      "Ranking on Google is slow, and no one can guarantee a position. What you can do is make your site easy for Google to understand and genuinely useful to the people searching. These are the foundations.",
    ],
    sections: [
      {
        heading: "1. How do you let Google find your site?",
        bullets: [
          "Add your website to Google Search Console and verify it.",
          "Submit your sitemap, the list of your pages.",
          "Ask Google to index your most important pages.",
        ],
      },
      {
        heading: "2. Why give each page one clear topic?",
        paragraphs: [
          "Each page should be about one thing, with a title and a main heading that say what it is. A page about everything ranks for nothing.",
        ],
      },
      {
        heading: "3. How do you write for the questions people ask?",
        paragraphs: [
          "Think about what your customers would type into Google before they hire you, and answer those questions in plain language on your pages or in guides. Real, helpful answers are what search engines look for.",
        ],
      },
      {
        heading: "4. How fast and mobile-friendly should the site be?",
        paragraphs: [
          "Most searches happen on phones. Pages that load slowly or are hard to use on a small screen lose visitors, and that affects how Google rates them.",
        ],
      },
      {
        heading: "5. How do you build trust?",
        bullets: [
          "Real reviews and examples of your work.",
          "Links from other genuine websites, such as clients or partners.",
          "Consistent business details everywhere you appear online.",
        ],
      },
      {
        heading: "6. How long does it take?",
        paragraphs: [
          "A new page can take days to be indexed, and weeks or months to settle in a position. Check Search Console regularly, see which searches already show your site, and improve those pages first.",
        ],
      },
      {
        heading: "What should you avoid?",
        bullets: [
          "Buying links or using directories that exist only to sell links.",
          "Repeating keywords unnaturally in your text.",
          "Copying content from other sites.",
          "Promises of guaranteed number one rankings.",
        ],
      },
      {
        heading: "Need help?",
        paragraphs: [
          "We build sites with the technical SEO basics in place and help with speed and content afterwards. Tell us about your site through the project form and we will point out the biggest gaps.",
        ],
      },
    ],
    services: ["seo-performance", "business-websites", "website-redesign"],
  },
  {
    slug: "website-features-for-wedding-planners",
    title: "Essential Website Features for Wedding Planners and Event Businesses",
    description:
      "The website features wedding planners and event businesses need: a portfolio that sells, clear packages, an easy enquiry form and automatic replies.",
    published: "2026-10-12",
    readMinutes: 5,
    intro: [
      "Couples and clients often decide who to contact based on one thing: how your website makes them feel. It has to show your style, answer their first questions and make it easy to ask about their date.",
      "These are the features that matter most for wedding planners, designers, venues and event businesses.",
    ],
    sections: [
      {
        heading: "1. What should your portfolio show?",
        paragraphs: [
          "Lead with your best, most recent events. Use large, fast-loading photos and short captions about the event. A few excellent galleries do more than dozens of average ones.",
        ],
      },
      {
        heading: "2. How should you present services and packages?",
        paragraphs: [
          "Explain what you do, from full planning to day-of coordination. You do not have to publish prices, but describing how each package works helps the right clients self-select and saves both sides time.",
        ],
      },
      {
        heading: "3. What should the enquiry form ask?",
        bullets: [
          "Name and a way to reach them.",
          "Event type and date, or a date range.",
          "Location and approximate guest count.",
          "Budget range, if you want to qualify enquiries.",
          "A short message about what they have in mind.",
        ],
      },
      {
        heading: "4. How can you reply fast, even out of hours?",
        paragraphs: [
          "Couples often contact several planners at once and reply to the first one who answers well. An automatic confirmation, or an AI assistant that answers common questions and collects the details, keeps the conversation going until you can respond personally.",
        ],
      },
      {
        heading: "5. Why show testimonials and real events?",
        paragraphs: [
          "Genuine words from past clients build trust quickly. Only show testimonials you have permission to publish.",
        ],
      },
      {
        heading: "6. Does it work well on phones?",
        paragraphs: [
          "Most couples browse on their phones, often while sharing ideas with a partner. Galleries, forms and contact buttons all need to work comfortably on a small screen.",
        ],
      },
      {
        heading: "7. How do people find you?",
        paragraphs: [
          "Give each service and location its own page with a clear title, so people searching for what you offer can find it. Add your real business details and keep them consistent everywhere online.",
        ],
      },
      {
        heading: "Planning a website for your event business?",
        paragraphs: [
          "We design websites for event businesses with portfolios, enquiry flows and automatic replies. Tell us about your business through the project form and we will suggest what to include.",
        ],
      },
    ],
    services: ["business-websites", "ai-lead-generation", "ai-integration"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

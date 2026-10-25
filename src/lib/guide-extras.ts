import type { Faq } from "@/lib/faq";

/** Search-friendly page titles (the on-page heading stays the full guide title). Kept short so they are not cut off in results. */
export const guideSeoTitles: Record<string, string> = {
  "how-much-does-a-business-website-cost": "How Much Does a Business Website Cost?",
  "ai-booking-system-for-small-business": "AI Booking Systems: Does Your Business Need One?",
  "ai-chatbot-for-your-website": "AI Chatbot for Your Website: What It Can Do",
  "website-redesign-seo-checklist": "Website Redesign Checklist Without Losing SEO",
  "get-more-inquiries-from-your-website": "How to Get More Inquiries From Your Website",
  "make-your-business-website-visible-on-google": "Make Your Business Website Visible on Google",
  "website-features-for-wedding-planners": "Website Features for Wedding & Event Planners",
};

export type GuideSource = { label: string; url: string };

/** Authoritative pages that back up what a guide says. Only added where the source genuinely supports the guide. */
export const guideSources: Record<string, GuideSource[]> = {
  "website-redesign-seo-checklist": [
    { label: "Google Search Central: Site moves with URL changes", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" },
    { label: "Google Search Central: Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
    { label: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  ],
  "make-your-business-website-visible-on-google": [
    { label: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { label: "Google Search Central: Creating helpful, reliable, people-first content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    { label: "Google Search Central: Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
    { label: "Google Search Central: Spam policies for Google web search", url: "https://developers.google.com/search/docs/essentials/spam-policies" },
  ],
  "get-more-inquiries-from-your-website": [
    { label: "web.dev: Web Vitals (how page speed is measured)", url: "https://web.dev/articles/vitals" },
    { label: "Google Search Central: Creating helpful, reliable, people-first content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
  ],
  "website-features-for-wedding-planners": [
    { label: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { label: "Google Search Central: Influencing your title links", url: "https://developers.google.com/search/docs/appearance/title-link" },
  ],
};

/** A short direct answer shown at the top of each guide, plus common questions with FAQ markup. */
export const guideExtras: Record<string, { quickAnswer: string; faqs: Faq[] }> = {
  "how-much-does-a-business-website-cost": {
    quickAnswer:
      "There is no single price. A business website costs more or less depending on its size, whether the design is custom or from a template, the features it needs (booking, payments, AI assistants), integrations, content and timeline. Compare quotes by what they include, not just the total.",
    faqs: [
      { q: "What affects the cost of a business website the most?", a: "The number of pages, custom design versus a template, features such as booking or a store, integrations, content creation, extra languages and how tight the deadline is." },
      { q: "Are there costs after the website launches?", a: "Yes. Plan for the domain name, hosting, maintenance and updates, any changes you request later, and paid tools connected to the site, such as email or booking software." },
      { q: "How should I compare quotes from agencies?", a: "Ask what pages and features are included, whether it is designed for phones first, whether basic search setup is included, who owns the domain and code, and what support you get after launch." },
    ],
  },
  "ai-booking-system-for-small-business": {
    quickAnswer:
      "An AI booking system lets customers book or request an appointment at any hour and can answer common questions around the booking. It suits businesses that run on appointments and miss enquiries outside working hours, such as garages, clinics, salons and gyms.",
    faqs: [
      { q: "How is an AI booking system different from a booking form?", a: "A normal form only collects a request. An AI booking system also answers questions, guides the customer to a suitable time and can send confirmations and reminders automatically." },
      { q: "Which businesses benefit most from AI booking?", a: "Businesses that depend on appointments or reservations and lose enquiries when nobody can reply, including garages, clinics, salons, gyms and consultants." },
      { q: "Does AI booking replace my staff?", a: "No. It handles routine questions and scheduling and passes real decisions to a person." },
    ],
  },
  "ai-chatbot-for-your-website": {
    quickAnswer:
      "An AI chatbot on your website answers common questions, collects visitor details and passes enquiries to you at any hour. It works best on accurate, up-to-date information about your business and should always hand real decisions to a person.",
    faqs: [
      { q: "What can an AI chatbot do on a business website?", a: "Answer common questions about your services, prices and hours, collect a visitor's details, and pass the enquiry to you." },
      { q: "What are the limits of an AI chatbot?", a: "It is only as good as the information it is given, so it must be set up with accurate details and kept up to date. It should not make promises or decisions on your behalf." },
      { q: "Can I add a chatbot to an existing website?", a: "In most cases yes, depending on how the current site is built." },
    ],
  },
  "website-redesign-seo-checklist": {
    quickAnswer:
      "To redesign a website without losing Google rankings, record your current traffic and rankings, keep your important URLs or redirect them properly, carry over page titles and descriptions, then check Search Console after launch and fix any pages Google cannot find.",
    faqs: [
      { q: "Will a redesign hurt my Google rankings?", a: "Not if it is done carefully. Rankings drop mainly when URLs change without redirects, old pages are deleted, or search settings are lost during the move." },
      { q: "What should I do before redesigning my website?", a: "Record your current visitors and rankings, list your most important pages, and note their titles, descriptions and URLs so they can be carried over." },
      { q: "What should I check after launch?", a: "Submit the new sitemap in Google Search Console, watch for pages Google cannot find, and compare visitors and rankings with the numbers you recorded." },
    ],
  },
  "get-more-inquiries-from-your-website": {
    quickAnswer:
      "To get more inquiries, say clearly what you do in the first screen, give every page one obvious next step, keep your contact form short, make contacting you easy on a phone, show real proof and reply quickly. None of these needs a full redesign.",
    faqs: [
      { q: "Why does my website get visitors but few enquiries?", a: "Usually visitors are unsure what to do next, or the next step feels like too much effort. Clearer offers, one obvious action per page and a shorter form help most." },
      { q: "How long should a contact form be?", a: "As short as possible: a name, a way to reach them and a short description of what they want. Every extra field loses some people." },
      { q: "Can an AI assistant help get more enquiries?", a: "Yes. It can answer common questions and collect details at any hour, so enquiries are not lost while you are busy or offline." },
    ],
  },
  "how-ai-websites-help-small-businesses": {
    quickAnswer:
      "An AI-powered website is a normal, well-built website with smart features added: an assistant that answers common questions, booking that works at any hour, and automation for repeated tasks. It helps most when you answer the same questions often or lose enquiries out of hours.",
    faqs: [
      { q: "What does an AI-powered website do for a small business?", a: "It answers common questions, takes bookings, collects enquiry details and sends confirmations, so you spend less time on repeated messages." },
      { q: "Do I need an AI website?", a: "If you answer the same questions every week, lose enquiries out of hours or rely on bookings, it is likely worth it. Otherwise a clear, fast website may be all you need for now." },
      { q: "Should I start with every AI feature?", a: "No. Start with one useful feature, see how customers use it, and add more only when it earns its place." },
    ],
  },
  "business-tasks-you-can-automate": {
    quickAnswer:
      "Good tasks to automate are the ones that follow the same steps every time: replying to common questions, confirming enquiries, booking appointments, sending reminders, collecting customer details and following up on quotes. Start with the task that costs the most time.",
    faqs: [
      { q: "Which business tasks are easiest to automate?", a: "Replying to common questions, confirming new enquiries, booking appointments, sending reminders and collecting customer details through forms." },
      { q: "How do I choose what to automate first?", a: "List what you did more than three times last week and pick the one that costs the most time or is most often forgotten." },
      { q: "Will automation replace the human side of my business?", a: "It should handle routine steps and hand real decisions to a person, with an easy way for customers to reach you directly." },
    ],
  },
  "make-your-business-website-visible-on-google": {
    quickAnswer:
      "To make your website visible on Google, add it to Search Console and submit your sitemap, give each page one clear topic, answer the questions your customers ask, keep the site fast on phones and build trust with real reviews and links. Results usually take weeks to months.",
    faqs: [
      { q: "How do I get my website on Google?", a: "Add your site to Google Search Console, submit your sitemap and request indexing for your most important pages." },
      { q: "How long does it take to rank on Google?", a: "A new page can take days to be indexed and weeks or months to settle in a position. Nobody can guarantee a ranking." },
      { q: "What should I avoid in SEO?", a: "Buying links, repeating keywords unnaturally, copying content from other sites and any promise of a guaranteed number one ranking." },
    ],
  },
  "website-features-for-wedding-planners": {
    quickAnswer:
      "A wedding or event planner's website needs a portfolio that shows your style, clear services and packages, an enquiry form that asks for the date, location and guest count, fast replies even out of hours, real testimonials and a layout that works well on phones.",
    faqs: [
      { q: "What should a wedding planner's website include?", a: "A strong portfolio, clear services and packages, an enquiry form, testimonials from real events, and a design that works on phones." },
      { q: "What should an enquiry form ask a couple?", a: "A name and a way to reach them, the event type and date, the location and approximate guest count, and a short message about what they have in mind." },
      { q: "Do I have to publish my prices?", a: "No. Describing how each package works helps the right clients self-select and saves time on both sides." },
    ],
  },
};

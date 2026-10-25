export type ServiceDetail = {
  /** How the service is delivered, in the order it happens. */
  howItWorks: { title: string; text: string }[];
  /** Concrete situations where the service helps. */
  useCases: string[];
  /** Honest limits and things to know before starting. */
  goodToKnow: string[];
};

/** Extra page content for the default services, keyed by service id. Only describes what the service genuinely covers. */
export const serviceDetails: Record<string, ServiceDetail> = {
  "business-websites": {
    howItWorks: [
      { title: "We learn your business", text: "We start with what you sell, who your customers are and what you want a visitor to do, such as call, book or request a quote." },
      { title: "We plan the pages", text: "The structure is built around those goals, so each page has one clear job and one clear next step." },
      { title: "We design and build", text: "A custom design in your brand, built to load quickly and work on phones, tablets and desktops." },
      { title: "We launch and hand over", text: "We connect your forms, WhatsApp and maps, test everything, go live and show you how to edit your own content." },
    ],
    useCases: [
      "A clinic or practice that needs patients to find services, hours and a way to book.",
      "A restaurant or café that needs a menu, photos, location and reservation requests.",
      "A trades or home-services business that needs a gallery of finished work and a quick quote form.",
      "An agency or consultant that needs a credible site to send to prospects.",
    ],
    goodToKnow: [
      "The price depends on the number of pages, the design and any features, so we quote each project individually.",
      "Photos, logos and written content from you make the result more authentic; we can advise on what is needed.",
      "A website works best alongside search setup and a plan to keep it updated.",
    ],
  },
  "e-commerce": {
    howItWorks: [
      { title: "We map your catalogue", text: "We organise your products into categories and the filters shoppers actually use, such as size, price or type." },
      { title: "We design the shopping journey", text: "Product pages, cart and checkout are designed to make choosing and paying as simple as possible on a phone." },
      { title: "We set up payments and orders", text: "Secure checkout, order management, stock and discount codes are configured so you can run the store day to day." },
      { title: "We test and launch", text: "We place test orders from start to finish before going live, then show you how to add products and handle orders." },
    ],
    useCases: [
      "A brand that sells through social media and wants its own store.",
      "A shop with a physical location that wants to sell online as well.",
      "A marketplace or catalogue with many products and several categories.",
      "A seller of handmade or specialist goods that needs strong product presentation.",
    ],
    goodToKnow: [
      "You will need your product photos, descriptions and prices; we can advise on what works best online.",
      "Payment providers and shipping options depend on the countries you sell in.",
      "We quote each store individually because catalogue size and features vary widely.",
    ],
  },
  "ai-integration": {
    howItWorks: [
      { title: "We find where AI saves time", text: "We look at the questions you answer repeatedly and the tasks your team repeats, and choose where AI genuinely helps." },
      { title: "We prepare your information", text: "An assistant is only as good as what it knows, so we organise accurate details about your services, prices and policies for it to use." },
      { title: "We build and connect it", text: "The assistant or automation is built into your website or tools, with a clear handover to WhatsApp, email or a person." },
      { title: "We test and tune it", text: "We try real questions, check the answers and adjust until it is accurate, then show you how to keep it up to date." },
    ],
    useCases: [
      "A chat assistant that answers questions about services, hours and prices at any time of day.",
      "Search across your site's content so visitors find the right page quickly.",
      "Automated replies, summaries or reports that save staff time.",
      "A custom system built for a specific workflow, such as a vehicle diagnosis form for a garage.",
    ],
    goodToKnow: [
      "AI assistants should hand over to a person for sensitive, legal, medical or safety-critical questions.",
      "Answers are only as good as the information provided, and it needs updating when your business changes.",
      "We can add AI to an existing website in many cases; we confirm what is possible before you commit.",
    ],
  },
  "ai-booking-systems": {
    howItWorks: [
      { title: "We list what customers book", text: "Services, durations, staff or rooms, opening hours and any rules, such as buffer time between appointments." },
      { title: "We build the booking flow", text: "Customers choose a service and a time, or describe what they need and are guided to the right slot, on your website, WhatsApp or chat." },
      { title: "We connect your calendar", text: "Bookings sync to your calendar so the same slot is never offered twice." },
      { title: "We automate the follow-up", text: "Confirmations and reminders go out automatically, and you receive each booking straight away." },
    ],
    useCases: [
      "A salon or barber that takes bookings when the shop is closed.",
      "A clinic that wants fewer phone calls for routine appointments.",
      "A restaurant that takes reservation requests with automatic confirmation.",
      "A garage or consultant that needs customers to describe a problem before they book.",
    ],
    goodToKnow: [
      "It works best when your services, durations and availability are clearly defined.",
      "A person should remain reachable for unusual requests and changes.",
      "Reminders reduce no-shows but cannot eliminate them.",
    ],
  },
  "ai-lead-generation": {
    howItWorks: [
      { title: "We define a good lead", text: "We agree what a valuable enquiry looks like for your business, such as the service wanted, budget or timing." },
      { title: "We capture enquiries", text: "Smart forms and a chat assistant collect contact details and the information you need to respond well." },
      { title: "We qualify and organise", text: "Each lead is sorted so you can see who to contact first, in a simple list or your existing CRM." },
      { title: "We alert you quickly", text: "High-value leads trigger an immediate notification, because a fast reply often decides who gets the job." },
    ],
    useCases: [
      "A contractor who wants the best jobs to reach them first.",
      "A real estate agency that wants valuation and viewing requests organised.",
      "A consultant or firm that needs enquiries filtered before a first call.",
      "A recruitment agency that handles both candidate and employer enquiries.",
    ],
    goodToKnow: [
      "We build the capture and qualification system; we do not promise a number of leads, which depends on your traffic and offer.",
      "Lead quality improves when the questions asked match what you really need to know.",
      "Visitors need a reason to come to your site, which is where SEO and content help.",
    ],
  },
  "website-redesign": {
    howItWorks: [
      { title: "We review what you have", text: "We record your current pages, addresses, titles, descriptions and what brings visitors, so nothing valuable is lost." },
      { title: "We rework structure and design", text: "A modern look, a clearer journey and a better mobile experience, keeping what already works." },
      { title: "We carry over content and search settings", text: "Important pages, titles and descriptions are kept, and old addresses are redirected where they change." },
      { title: "We launch and monitor", text: "We submit the new sitemap, check for pages search engines cannot find and compare results with your starting numbers." },
    ],
    useCases: [
      "A site that looks dated or no longer reflects the business.",
      "A site that is slow or hard to use on a phone.",
      "A site that gets visitors but few enquiries, bookings or sales.",
      "A site that cannot support features you now need, such as online booking or a store.",
    ],
    goodToKnow: [
      "Rankings can move for a few weeks after any redesign while search engines catch up.",
      "Keeping your existing addresses where possible reduces risk.",
      "A redesign is the right time to fix speed and structure at the same time.",
    ],
  },
  "seo-performance": {
    howItWorks: [
      { title: "We audit your site", text: "We check how fast pages load, how titles, descriptions and headings are set up, and whether search engines can read your content." },
      { title: "We fix the foundations", text: "Speed, page titles, descriptions, headings, sitemap and structured data are corrected so your pages are easy to understand." },
      { title: "We set up measurement", text: "Google Search Console and analytics are connected so you can see which searches show your site." },
      { title: "We plan what to improve next", text: "You get clear priorities, such as pages to expand, questions to answer and ways to earn trust from other sites." },
    ],
    useCases: [
      "A site that does not appear for the services it offers.",
      "A site that scores poorly on speed, especially on phones.",
      "A new site that needs to be set up correctly from day one.",
      "A local business that wants a complete Google Business profile and local search setup.",
    ],
    goodToKnow: [
      "Nobody can guarantee a ranking. New pages can take days to be indexed and weeks or months to settle.",
      "Technical fixes help, but trust from other sites, real reviews and useful content matter too.",
      "We avoid paid links and shortcuts that can harm a site.",
    ],
  },
  "maintenance-support": {
    howItWorks: [
      { title: "We review your site", text: "We learn how it is built and hosted and note anything that needs attention." },
      { title: "We set up monitoring and backups", text: "Uptime checks and regular backups are in place so problems are caught early and recoverable." },
      { title: "We keep it updated", text: "Software updates and security checks happen regularly, so the site stays safe and fast." },
      { title: "We handle your changes", text: "New pages, offers and content updates are done for you, with priority support when something needs fixing." },
    ],
    useCases: [
      "A business that does not want to manage the technical side.",
      "A site that needs regular content changes, such as new offers or seasonal updates.",
      "A site that needs security updates and backups to stay safe.",
      "An older site that has not been updated in a long time.",
    ],
    goodToKnow: [
      "We confirm whether we can support a site we did not build before agreeing to take it on.",
      "Support covers maintenance and small improvements; larger new features are quoted separately.",
      "Domain and hosting renewals still need to be kept in your name and paid on time.",
    ],
  },
};

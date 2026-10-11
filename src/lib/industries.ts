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
    title: "Website for Garages, Workshops and Car Businesses",
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
    title: "Website for Real Estate Agencies and Property Platforms",
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
    title: "Website for Event Planners, Wedding Designers and Venues",
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
    title: "Website for Music Schools, Academies and Tutors",
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
    title: "Website for Online Stores and Marketplaces",
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
  {
    slug: "restaurants-and-cafes",
    name: "Restaurants & Cafés",
    title: "Website for Restaurants, Cafés and Food Businesses",
    description:
      "A website for restaurants and cafés: a clear mobile menu, online table reservations, opening hours, directions and WhatsApp enquiries.",
    intro:
      "Most people check a restaurant on their phone before they walk in: what is on the menu, are you open, can I book a table. A good restaurant website answers those questions in seconds and makes booking effortless.",
    needs: [
      "A menu that is easy to read on a phone, not a PDF that has to be zoomed.",
      "Table reservations that work at any hour.",
      "Opening hours, location and directions that are always up to date.",
      "Photos that show the food and the atmosphere.",
      "A simple way to ask about events, groups or takeaway.",
    ],
    build: [
      "An online reservation system with automatic confirmations and reminders.",
      "A mobile-first menu with sections, descriptions and photos.",
      "An assistant that answers common questions such as opening hours and where to park.",
      "WhatsApp and phone buttons for quick enquiries.",
      "Event and private-dining pages with an enquiry form.",
    ],
    projects: [],
    services: ["ai-booking-systems", "business-websites", "seo-performance"],
  },
  {
    slug: "clinics-and-dentists",
    name: "Clinics & Dentists",
    title: "Website for Clinics, Dentists and Health Practices",
    description:
      "A website for clinics, dentists and health practices: service pages, doctor profiles, online appointment booking with reminders and clear contact details.",
    intro:
      "Patients want to know who you are, what you treat and how to book, and they want to feel confident before they call. A clinic website should be calm, clear and easy to use on any device.",
    needs: [
      "Clear pages for each treatment or service.",
      "Profiles for doctors and staff that build trust.",
      "Online appointment booking with reminders to reduce missed visits.",
      "Opening hours, location and how to reach you urgently.",
      "Support for the languages your patients speak.",
    ],
    build: [
      "Appointment booking that syncs with your calendar and sends reminders.",
      "Service and doctor pages written in plain language.",
      "An assistant that answers practical questions and hands patients to your team. It does not give medical advice.",
      "Contact forms with a clear privacy notice.",
      "Multilingual pages when you need them.",
    ],
    projects: [],
    services: ["ai-booking-systems", "business-websites", "ai-integration"],
  },
  {
    slug: "salons-and-barbers",
    name: "Salons & Barbers",
    title: "Website for Salons, Barbers and Beauty Studios",
    description:
      "A website for salons, barbers and beauty studios: services and prices, a photo gallery, online booking with reminders and easy messaging.",
    intro:
      "Clients choose a salon on what they see and how easily they can book. A great website shows your work, lists your services and lets people book a slot without calling.",
    needs: [
      "A gallery that shows real results.",
      "A clear service list with durations and prices.",
      "Online booking with reminders to cut no-shows.",
      "Easy messaging through WhatsApp or Instagram.",
      "Information about your team and how to find you.",
    ],
    build: [
      "A booking system by service and stylist, synced to your calendar.",
      "Automatic confirmations and reminders.",
      "A fast photo gallery and service pages.",
      "A chat assistant that answers common questions and takes booking requests.",
      "Links to your Instagram and WhatsApp.",
    ],
    projects: [],
    services: ["ai-booking-systems", "business-websites", "ai-integration"],
  },
  {
    slug: "law-firms-and-consultants",
    name: "Law Firms & Consultants",
    title: "Website for Law Firms, Accountants and Consultants",
    description:
      "A website for law firms, accountants and consultants: clear practice areas, credibility, consultation booking and enquiry forms that qualify leads.",
    intro:
      "People hiring a professional want to see expertise and feel confident before they get in touch. A professional-services website should explain what you do, who you help and how to start, without jargon.",
    needs: [
      "Clear pages for each area of expertise.",
      "Credibility: your background, approach and how you work.",
      "A simple way to book an initial consultation.",
      "Enquiry forms that tell you what the person needs.",
      "Useful articles that answer common questions.",
    ],
    build: [
      "Consultation booking with calendar sync.",
      "Practice-area pages and team profiles.",
      "Enquiry forms with AI qualification, so the right enquiries reach you first.",
      "A guides section to publish helpful content.",
      "Fast, secure pages with clear contact details.",
    ],
    projects: [],
    services: ["ai-lead-generation", "business-websites", "seo-performance"],
  },
  {
    slug: "gyms-and-fitness",
    name: "Gyms & Fitness",
    title: "Website for Gyms, Fitness Studios and Coaches",
    description:
      "A website for gyms, fitness studios and coaches: class schedules, memberships, trial bookings, trainer profiles and WhatsApp contact.",
    intro:
      "People looking for a gym want to see the space, the classes and the price, then try it. A fitness website should make the first step, a trial class or a call, as easy as possible.",
    needs: [
      "A clear class schedule.",
      "Membership options that are easy to compare.",
      "Trainer profiles and photos of the space.",
      "Booking for trial sessions and classes.",
      "Quick contact by WhatsApp.",
    ],
    build: [
      "Online booking for classes and trial sessions.",
      "Schedule and membership pages.",
      "Trainer profiles and a gallery.",
      "Lead capture with instant alerts to your team.",
      "A chat assistant for common questions.",
    ],
    projects: [],
    services: ["ai-booking-systems", "business-websites", "ai-lead-generation"],
  },
  {
    slug: "hotels-and-guesthouses",
    name: "Hotels & Guesthouses",
    title: "Website for Hotels, Guesthouses and Tourism Businesses",
    description:
      "A website for hotels, guesthouses and tourism businesses: rooms with photos, booking enquiries, location, reviews and multilingual pages.",
    intro:
      "Travellers compare many places in a few minutes. A hotel website has to look inviting, show the rooms clearly and make it easy to enquire or book directly with you.",
    needs: [
      "Rooms and facilities with good photography.",
      "A simple way to check availability or send a booking request.",
      "Location, directions and nearby attractions.",
      "Reviews and trust signals.",
      "Pages in the languages your guests speak.",
    ],
    build: [
      "Room pages and a photo gallery.",
      "A booking-request or reservation flow with confirmations.",
      "Multilingual pages.",
      "An assistant that answers common guest questions.",
      "Fast pages with a search-friendly setup.",
    ],
    projects: [],
    services: ["business-websites", "ai-booking-systems", "seo-performance"],
  },
  {
    slug: "contractors-and-home-services",
    name: "Contractors & Home Services",
    title: "Website for Contractors, Builders and Home Services",
    description:
      "A website for contractors, builders and home-service businesses: services, areas covered, project gallery, quote requests and phone or WhatsApp contact.",
    intro:
      "When something needs fixing or building, people search, compare a few companies and call the one that looks reliable. Your website should show what you do, where you work and how to get a quote fast.",
    needs: [
      "A clear list of services and the areas you cover.",
      "A gallery of finished work.",
      "A quote request form that is quick to fill in.",
      "Trust: licences, experience and customer feedback.",
      "One-tap calling and WhatsApp on phones.",
    ],
    build: [
      "Service pages and an area-coverage section.",
      "A project gallery with before-and-after photos.",
      "A quote request form with instant alerts.",
      "Lead qualification so the best jobs reach you first.",
      "Pages built to be found in local searches.",
    ],
    projects: [],
    services: ["business-websites", "ai-lead-generation", "seo-performance"],
  },
  {
    slug: "photographers-and-creatives",
    name: "Photographers & Creatives",
    title: "Website for Photographers, Designers and Creatives",
    description:
      "A website for photographers, designers and creatives: a fast portfolio, clear packages, booking enquiries, testimonials and strong search visibility.",
    intro:
      "For creatives the website is the portfolio. It has to load fast, show your best work beautifully and make it simple for the right clients to enquire.",
    needs: [
      "A fast, beautiful portfolio that works on phones.",
      "Clear packages or a way to explain how you work.",
      "An enquiry or booking form.",
      "Testimonials from past clients.",
      "A site you can update yourself.",
    ],
    build: [
      "An image-focused portfolio with quick loading.",
      "Package and pricing pages, or a custom-quote flow.",
      "Booking and enquiry forms with confirmations.",
      "Easy content editing after launch.",
      "SEO setup so your work can be found.",
    ],
    projects: [],
    services: ["business-websites", "website-redesign", "seo-performance"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function industryForProject(projectSlug: string) {
  return industries.find((i) => i.projects.includes(projectSlug));
}

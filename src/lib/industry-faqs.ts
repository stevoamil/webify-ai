import type { Faq } from "@/lib/faq";

/** Common questions per industry page. Answers describe what we can build; they avoid claims we cannot back up. */
export const industryFaqs: Record<string, Faq[]> = {
  "automotive-garages-and-car-services": [
    { q: "What should a garage website include?", a: "A clear service menu with typical durations, online booking, a way to describe a symptom or warning light, updates while the car is in the workshop, and easy contact by phone or WhatsApp." },
    { q: "Can a garage website take bookings at night?", a: "Yes. Online booking works at any hour, so customers can request a time when your workshop is closed and you see it when you open." },
    { q: "Have you built websites for garages before?", a: "Yes. Our portfolio includes BMW Elite Garage and Land Rover Specialists, both independent workshops, and Motor Mania Club, an automotive marketplace." },
  ],
  "real-estate": [
    { q: "What does a real estate website need?", a: "Property listings with good photography, search and filters, clear agent profiles, a way to request a viewing or valuation, and fast contact options." },
    { q: "Can a real estate website capture leads automatically?", a: "Yes. Enquiry and valuation forms can send the details straight to you, and an assistant can answer common questions and collect contact information at any hour." },
    { q: "Have you built a real estate platform?", a: "Yes. Prevu is a luxury real estate platform in our portfolio, with AI search and an instant valuation tool." },
  ],
  "events-and-weddings": [
    { q: "What should a wedding or event planner's website show?", a: "A portfolio that shows your style, clear services and packages, real testimonials and an enquiry form that asks for the date, location and guest count." },
    { q: "Can I get enquiries outside working hours?", a: "Yes. An enquiry form with an automatic confirmation, or an assistant that answers common questions and collects details, keeps the conversation going until you can reply." },
    { q: "Do you have event-industry examples?", a: "Yes. Monart Design is an editorial, cinematic website we built for a Paris-trained event designer." },
  ],
  "music-schools-and-education": [
    { q: "What does a music school website need?", a: "Course and instrument pages, teacher profiles, a clear way to book a trial lesson or enrol, and the practical details parents and students look for first." },
    { q: "Can students book or enrol online?", a: "Yes. We can build enquiry, trial-lesson and enrolment flows with confirmation messages." },
    { q: "Have you built an education website?", a: "Yes. Harmonia Conservatory is a website we built for a luxury music conservatory." },
  ],
  "online-stores-and-marketplaces": [
    { q: "Can you build an online store or marketplace?", a: "Yes. We build stores and marketplaces with product pages, search, a cart and checkout, designed to be easy to browse and to buy from." },
    { q: "Can I manage products myself?", a: "Yes. We set the site up so you can add and edit products without a developer, and explain how during handover." },
    { q: "Do you have marketplace examples?", a: "Yes. Arthreesanat is a global marketplace for handmade goods from independent artisans, and Motor Mania Club is an automotive marketplace and community hub." },
  ],
  "restaurants-and-cafes": [
    { q: "What should a restaurant website include?", a: "A clear menu, opening hours and location, photos, a way to reserve or order, and contact options that work on a phone." },
    { q: "Can a restaurant website take reservations?", a: "Yes. We can build a reservation or booking-request flow with automatic confirmations." },
    { q: "Can an assistant answer questions about the menu?", a: "Yes. An assistant can answer common questions about the menu, hours and booking, using information you provide and keep up to date." },
  ],
  "clinics-and-dentists": [
    { q: "What does a clinic or dental website need?", a: "Clear services, practitioner profiles, opening hours, location, an easy way to book or request an appointment, and a calm, trustworthy design." },
    { q: "Can patients book online?", a: "Yes. We can build appointment-request or booking flows with confirmations and reminders." },
    { q: "Is it safe to put an AI assistant on a health website?", a: "It can answer routine questions about services and hours and collect contact details. It should not give medical advice, and real decisions should go to your staff." },
  ],
  "salons-and-barbers": [
    { q: "What should a salon or barber website include?", a: "Services with prices or price ranges, photos of your work, team profiles, online booking and easy contact by phone or WhatsApp." },
    { q: "Can clients book at any hour?", a: "Yes. Online booking works around the clock, and automatic confirmations and reminders help reduce no-shows." },
    { q: "Can the website help with repeat bookings?", a: "Yes. Reminder messages and a simple rebooking flow make it easy for regular clients to book their next visit." },
  ],
  "law-firms-and-consultants": [
    { q: "What does a law or consulting website need?", a: "Clear practice areas, partner or consultant profiles, credentials, a professional design and a straightforward way to request a consultation." },
    { q: "Can the site book consultations?", a: "Yes. We can build consultation-booking or enquiry flows that collect the key details before the first conversation." },
    { q: "Can an assistant handle client enquiries?", a: "It can answer routine questions and collect contact details, then pass the enquiry to you. It should not give legal or professional advice." },
  ],
  "gyms-and-fitness": [
    { q: "What should a gym or fitness website include?", a: "A class schedule, membership options, trainer profiles, photos of the space and an easy way to book a trial session." },
    { q: "Can members book classes online?", a: "Yes. We can build class and trial-session booking with confirmations." },
    { q: "Can the website capture new member enquiries?", a: "Yes. Lead forms and a chat assistant can collect details and alert your team straight away." },
  ],
  "hotels-and-guesthouses": [
    { q: "What does a hotel or guesthouse website need?", a: "Rooms and facilities with good photography, a simple way to check availability or send a booking request, location details, reviews and pages in your guests' languages." },
    { q: "Can guests enquire or book directly?", a: "Yes. We can build booking-request or reservation flows so guests can contact you directly." },
    { q: "Can the site be multilingual?", a: "Yes. We have built websites in English and Arabic, and can set up other languages depending on the project." },
  ],
  "contractors-and-home-services": [
    { q: "What should a contractor's website include?", a: "A clear list of services and areas covered, a gallery of finished work, a quick quote request form, proof of experience and one-tap calling on phones." },
    { q: "Can the website help me get better jobs?", a: "A short quote form and lead-qualification questions help the most relevant enquiries reach you first." },
    { q: "Will customers be able to find me locally?", a: "We build pages with a clear structure and search-friendly setup, which helps. No one can guarantee a ranking, and results take weeks to months." },
  ],
  "photographers-and-creatives": [
    { q: "What should a photographer's website look like?", a: "Fast, image-focused galleries that work on phones, clear packages or a quote flow, testimonials and an enquiry form." },
    { q: "Will large images slow the site down?", a: "Not if they are prepared properly. We optimise images so galleries stay sharp and fast." },
    { q: "Can I update the portfolio myself?", a: "Yes. We set the site up so you can add new work without needing a developer." },
  ],
  "recruitment-and-staffing": [
    { q: "What does a recruitment website need?", a: "Job listings that are easy to browse, a simple application flow, a separate route for employers, and proof that you place people." },
    { q: "Can candidates apply online?", a: "Yes. We can build application forms with confirmation messages and instant alerts to your team." },
    { q: "Can an assistant answer candidate questions?", a: "Yes. It can answer common questions about roles and the process and collect details, passing real decisions to your team." },
  ],
};

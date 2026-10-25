export type IndustryJourney = {
  /** One sentence on the daily problem a website in this industry has to solve. */
  challenge: string;
  /** The customer's path from search to a booked job, as a good website supports it. */
  steps: { title: string; text: string }[];
};

/** Industry-specific page content. Describes how a good website should behave for this kind of business, not results we have achieved. */
export const industryJourneys: Record<string, IndustryJourney> = {
  "automotive-garages-and-car-services": {
    challenge: "Car owners search when something is wrong, often urgently, and the workshop loses time answering the same questions by phone.",
    steps: [
      { title: "Owner finds the problem", text: "They search for a specialist for their make or a symptom and land on a service page that explains what is involved." },
      { title: "They describe the issue", text: "A form or assistant asks for the model, year, mileage and symptoms, so the workshop starts with the facts." },
      { title: "They book a slot", text: "Online booking works outside opening hours and confirms the time straight away." },
      { title: "They follow the job", text: "While the car is in the workshop, updates and photos replace the call asking for news." },
    ],
  },
  "real-estate": {
    challenge: "Buyers and sellers compare many agencies quickly and contact the one that feels credible and responds first.",
    steps: [
      { title: "Visitor browses listings", text: "Clear photography, search and filters help them find properties that match, on a phone as well as a desktop." },
      { title: "They ask for a viewing or valuation", text: "A short form collects what the agent needs, such as the property, timing and contact details." },
      { title: "The agent is alerted", text: "An instant notification means the first reply is fast, which often decides who gets the instruction." },
      { title: "The enquiry is organised", text: "Leads are sorted so agents see who to contact first and nothing is lost between inboxes." },
    ],
  },
  "events-and-weddings": {
    challenge: "Clients choose a planner partly on feeling, so the site has to show style and make enquiring effortless.",
    steps: [
      { title: "Couple sees the portfolio", text: "Large, fast galleries show real events and a consistent style." },
      { title: "They compare packages", text: "Clear descriptions of services help the right clients self-select." },
      { title: "They send the key details", text: "The enquiry form asks for event type, date, location and guest count." },
      { title: "They hear back quickly", text: "An automatic confirmation, or an assistant answering common questions, keeps the conversation going until the planner replies." },
    ],
  },
  "music-schools-and-education": {
    challenge: "Parents and students want the practical details first: which instruments, who teaches, what it costs and how to start.",
    steps: [
      { title: "Family finds the right course", text: "Instrument and level pages explain what is offered and who it suits." },
      { title: "They meet the teachers", text: "Short profiles build trust before the first lesson." },
      { title: "They request a trial lesson", text: "A simple form or booking flow replaces a phone call during the school day." },
      { title: "They enrol", text: "Clear next steps and confirmations make joining straightforward." },
    ],
  },
  "online-stores-and-marketplaces": {
    challenge: "Shoppers leave quickly if products are hard to find or checkout is awkward, especially on a phone.",
    steps: [
      { title: "Shopper browses", text: "Categories, search and filters lead them to the right product." },
      { title: "They check the details", text: "Photos, descriptions, prices and availability are clear on the product page." },
      { title: "They check out", text: "A short, secure checkout with the payment methods their market uses." },
      { title: "The seller manages the order", text: "Orders, stock and customer messages are handled from one place." },
    ],
  },
  "restaurants-and-cafes": {
    challenge: "Diners decide quickly from the menu, photos, location and opening hours, usually on a phone.",
    steps: [
      { title: "Diner checks the menu", text: "A clear, current menu with photos and prices loads immediately." },
      { title: "They confirm the basics", text: "Hours, address and directions are one tap away." },
      { title: "They reserve or order", text: "A reservation request or ordering link confirms automatically." },
      { title: "The restaurant is notified", text: "Staff see the booking straight away and can follow up if needed." },
    ],
  },
  "clinics-and-dentists": {
    challenge: "Patients need reassurance and practical information before they book, and staff spend time on routine phone calls.",
    steps: [
      { title: "Patient finds the service", text: "Treatment pages explain what is offered in plain language." },
      { title: "They learn about the practitioners", text: "Profiles and qualifications build trust." },
      { title: "They request an appointment", text: "Online requests are available around the clock, with details collected up front." },
      { title: "They are reminded", text: "Confirmations and reminders reduce missed appointments." },
    ],
  },
  "salons-and-barbers": {
    challenge: "Clients book on impulse, often outside opening hours, and walk away if booking takes effort.",
    steps: [
      { title: "Client sees the work", text: "Photos of cuts, colour and styling show what the salon does best." },
      { title: "They pick a service", text: "Services and prices are clear, with the right stylist if relevant." },
      { title: "They book instantly", text: "Online booking works at any hour and confirms immediately." },
      { title: "They are reminded and return", text: "Reminders cut no-shows, and a simple rebooking flow brings regulars back." },
    ],
  },
  "law-firms-and-consultants": {
    challenge: "Clients want to know the firm is credible and relevant to their problem before they make contact.",
    steps: [
      { title: "Visitor identifies their issue", text: "Practice or service pages describe common situations in plain language." },
      { title: "They check credentials", text: "Profiles and experience establish trust." },
      { title: "They request a consultation", text: "A form collects the key facts before the first conversation." },
      { title: "The firm prepares", text: "Details arrive organised, so the first meeting starts with context." },
    ],
  },
  "gyms-and-fitness": {
    challenge: "People decide whether to try a gym from the schedule, the space and the price, and want to start easily.",
    steps: [
      { title: "Visitor sees the offer", text: "Classes, trainers and facilities are shown clearly with photos." },
      { title: "They compare memberships", text: "Options and prices are easy to compare." },
      { title: "They book a trial", text: "A trial session or class can be booked in a few taps." },
      { title: "The team follows up", text: "An instant alert lets staff reach new enquiries while interest is high." },
    ],
  },
  "hotels-and-guesthouses": {
    challenge: "Travellers compare many places in minutes and prefer to book where the details and photos are clear.",
    steps: [
      { title: "Guest explores the rooms", text: "Good photography and clear room details show what to expect." },
      { title: "They check location and facilities", text: "Directions, nearby attractions and amenities answer common questions." },
      { title: "They enquire or reserve", text: "A booking request goes straight to the hotel, in the guest's language where possible." },
      { title: "They get a prompt answer", text: "Confirmations and an assistant for common questions keep the conversation moving." },
    ],
  },
  "contractors-and-home-services": {
    challenge: "Customers often need a job done soon, compare a few companies and call the one that looks reliable.",
    steps: [
      { title: "Customer finds the service", text: "Pages for each service and area make it clear you do the job and cover their location." },
      { title: "They check the work", text: "A gallery of finished jobs, with before and after photos, builds confidence." },
      { title: "They request a quote", text: "A short form, or a tap to call or WhatsApp, makes contact immediate." },
      { title: "The best jobs reach you first", text: "A few qualifying questions and instant alerts help you respond to the right enquiries fast." },
    ],
  },
  "photographers-and-creatives": {
    challenge: "The portfolio is the product, so it must load fast, look excellent and lead naturally to an enquiry.",
    steps: [
      { title: "Client views the portfolio", text: "Fast, image-focused galleries that work on phones." },
      { title: "They understand how you work", text: "Clear packages or a short explanation of the process." },
      { title: "They enquire", text: "A simple form asks for the date, type of project and budget range." },
      { title: "They see proof", text: "Testimonials from past clients support the decision." },
    ],
  },
  "recruitment-and-staffing": {
    challenge: "The site serves two audiences, candidates and employers, and each needs a clear path.",
    steps: [
      { title: "Candidate browses roles", text: "Listings are easy to search and filter, on a phone as well as a desktop." },
      { title: "They apply", text: "A short application flow confirms receipt straight away." },
      { title: "Employer requests talent", text: "A separate enquiry route captures roles, sector and timing." },
      { title: "The team responds quickly", text: "Instant alerts help both sides get a prompt reply." },
    ],
  },
};

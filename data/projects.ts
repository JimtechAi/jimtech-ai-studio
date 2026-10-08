export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  positioning?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  technologies?: string[];
  outcome?: string;
  images: ProjectImage[];
  website?: string;
  sourceUrl?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

export const projects: Project[] = [
  {
    slug: 'dfabulous-events',
    title: 'D’Fabulous Luxury Yoruba Events',
    category: 'Luxury Events · Booking Platform',
    description: 'A premium digital experience designed to showcase D’Fabulous Luxury Yoruba Events while making event discovery, booking and customer communication easier.',
    positioning: 'Brand Experience + Booking System + Business Automation',
    challenge: 'Present a distinctive luxury event brand online while making it easier for prospective clients to understand the service and begin a booking.',
    solution: 'A video-led event experience paired with a booking journey and management tools for handling enquiries, dates, deposits and client communication.',
    features: ['Premium event-focused design', 'Hero video and audio integration', 'Testimonials and credibility section', 'Booking system and calendar', 'Admin booking management', 'Booking references and deposit/balance calculations', 'Booking confirmation workflow', 'WhatsApp communication', 'SEO and Google visibility preparation'],
    technologies: [],
    outcome: 'A connected brand and booking experience that brings customer enquiries and key booking details into a clearer workflow.',
    website: 'https://www.dfabulous.co.uk/',
    images: [
      { src: '/projects/dfabulous/dfabulous-homepage.webp', alt: 'D’Fabulous Luxury Yoruba Events website homepage', width: 1076, height: 660, label: 'Homepage' },
    ],
  },
  {
    slug: 'curvesnspice',
    title: 'Curvesnspice',
    category: 'Beauty & Wellness · E-commerce',
    description: 'A premium e-commerce experience for a Nigerian botanical body wellness and body-care brand, combining product discovery, commerce and customer engagement.',
    positioning: 'Beauty & Wellness · E-commerce',
    challenge: 'Organize a growing body-care catalogue and make product bundles, delivery options and customer rewards easier to navigate.',
    solution: 'A responsive storefront concept with catalogue, account, delivery and checkout flows structured around the customer journey.',
    features: ['Product catalogue and bundles', 'Multi-currency support', 'Delivery zones', 'Loyalty system', 'Customer account experience', 'Checkout experience', 'Paystack integration architecture', 'SEO structure', 'Responsive design'],
    technologies: ['Paystack integration architecture'],
    outcome: 'A structured storefront experience for browsing body-care products and moving through the purchase journey. Payment processing is not represented as live.',
    website: 'https://curvesnspice-luxury-nigerian-body-wellness-care.ai.studio/',
    images: [
      { src: '/projects/curvesnspice/curvesnspice-live-homepage.webp', alt: 'Curvesnspice e-commerce website homepage', width: 1095, height: 660, label: 'Homepage' },
    ],
  },
  {
    slug: 'beelemahs-cakes',
    title: 'Beelemah’s Cakes',
    category: 'Luxury Cakes · Bakery & Digital Experience',
    description: 'An elegant digital experience for Beelemahs Luxury Cakes, presenting bespoke cakes, services, gallery content, testimonials, training and direct cake-order enquiries.',
    positioning: 'Luxury Cakes · Bakery & Digital Experience',
    features: ['Bespoke luxury cake presentation', 'Services, about, gallery and testimonials', 'Cake training and academy information', 'Direct cake-order enquiries', '24K gold leafing positioning', 'Lagos VIP delivery information'],
    website: 'https://beelemahs-cakes.vercel.app/',
    images: [
      { src: '/projects/beelemahs-cakes/beelemahs-cakes-homepage.webp', alt: 'Beelemahs Luxury Cakes website homepage', width: 1060, height: 608, label: 'Homepage' },
    ],
  },
  {
    slug: 'lolah-photography',
    title: 'Lolah Photography',
    category: 'Photography · Portfolio & Booking',
    description: 'A cinematic photography website designed to showcase Lolah Photography’s work, services and booking experience.',
    positioning: 'Photography Portfolio + Booking + Client Enquiries',
    challenge: 'Give a photography business a polished home for its work and services, with clear paths for potential clients to make an enquiry.',
    solution: 'A portfolio and service experience with booking calls to action, WhatsApp contact and an email booking workflow.',
    features: ['Photography portfolio', 'Service presentation', 'Booking system and calls to action', 'WhatsApp integration', 'Email booking workflow', 'Cloudinary image architecture', 'SEO structure', 'Google Analytics', 'Vercel deployment'],
    technologies: ['Cloudinary', 'Google Analytics', 'Vercel'],
    outcome: 'A live portfolio and booking experience that gives prospective clients a direct route to explore services and enquire.',
    website: 'https://lolah-photography.vercel.app/booking',
    sourceUrl: 'https://github.com/JimtechAI/lolah-photography',
    images: [
      { src: '/projects/lolah/lolah-homepage.jpg', alt: 'Lolah Photography website homepage', width: 874, height: 608, label: 'Homepage' },
      { src: '/projects/lolah/lolah-portfolio.jpg', alt: 'Lolah Photography portfolio page', width: 874, height: 608, label: 'Portfolio' },
      { src: '/projects/lolah/lolah-booking.jpg', alt: 'Lolah Photography booking experience', width: 874, height: 608, label: 'Booking experience' },
      { src: '/projects/lolah/lolah-booking-form.jpg', alt: 'Lolah Photography booking request form', width: 733, height: 909, label: 'Booking form' },
      { src: '/projects/lolah/lolah-booking-flow.jpg', alt: 'Lolah Photography booking request flow', width: 874, height: 608, label: 'Booking request' },
    ],
  },
  {
    slug: 'the-vine-cleaners',
    title: 'The Vine Cleaners',
    category: 'Commercial Cleaning · Website',
    description: 'A service-led website presenting commercial cleaning and online booking and quote enquiries for customers across Bexley, Gravesham, Medway, Canterbury, Greenwich and Maidstone.',
    positioning: 'Cleaning Services · Online Booking & Quote Enquiries',
    features: ['Commercial cleaning navigation', 'Online booking and free quote calls to action', 'Phone and email contact information', 'Service areas across Bexley, Gravesham, Medway, Canterbury, Greenwich and Maidstone'],
    website: 'https://www.thevinecleaners.co.uk/',
    images: [
      { src: '/projects/the-vine-cleaners/vine-cleaners-homepage.webp', alt: 'The Vine Cleaners commercial cleaning website homepage', width: 1900, height: 1030, label: 'Homepage' },
    ],
  },
];

const portfolioDisplayOrder = [
  'dfabulous-events',
  'beelemahs-cakes',
  'curvesnspice',
  'lolah-photography',
  'the-vine-cleaners',
];

export const portfolioProjects = portfolioDisplayOrder.flatMap((slug) => {
  const project = projects.find((entry) => entry.slug === slug);
  return project ? [project] : [];
});

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

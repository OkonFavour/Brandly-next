export type Category = "Digital" | "Gifts" | "Create" | "Studio" | "Prints"
export type Service = {
  id: number
  slug: string
  name: string
  category: Category
  description: string
  price: number
  popularity: number
  image: string
  gallery: string[]
  tag?: string
  industry: string
  useCase: string
  urgency: string
  turnaround: string
  included: string[]
  optionLabel: string
  options: string[]
}

const photos = {
  cards:
    "https://images.unsplash.com/photo-1667980641526-648d01099ea4?auto=format&fit=crop&w=1200&q=85",
  mug: "https://images.unsplash.com/photo-1751383446800-d2acd87b9aeb?auto=format&fit=crop&w=1200&q=85",
  mugLight:
    "https://images.unsplash.com/photo-1713623069173-3afa89926882?auto=format&fit=crop&w=1200&q=85",
  editorial:
    "https://images.unsplash.com/photo-1600697395543-ef3ee6e9af7b?auto=format&fit=crop&w=1200&q=85",
  laptop:
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
  studio:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85",
  package:
    "https://images.unsplash.com/photo-1760804876166-aae5861ec7c1?auto=format&fit=crop&w=1200&q=85",
  print:
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85",
  event:
    "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1200&q=85",
}

export const services: Service[] = [
  {
    id: 1,
    slug: "signature-logo-design",
    name: "Signature Logo Design",
    category: "Create",
    description:
      "A distinctive visual mark built around your story, strategy, and ambition.",
    price: 145,
    popularity: 98,
    image: photos.studio,
    gallery: [photos.studio, photos.cards, photos.laptop],
    tag: "Bestseller",
    industry: "All industries",
    useCase: "Start a business",
    urgency: "1–2 weeks",
    turnaround: "7–10 business days",
    included: [
      "Three original logo directions",
      "Two revision rounds",
      "Full vector and web-ready files",
      "Mini color and type guide",
    ],
    optionLabel: "Design package",
    options: ["Essential", "Growth", "Complete identity"],
  },
  {
    id: 2,
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    category: "Prints",
    description:
      "Beautifully tactile cards that make every introduction more memorable.",
    price: 42,
    popularity: 92,
    image: photos.cards,
    gallery: [photos.cards, photos.print, photos.studio],
    tag: "15% off",
    industry: "Professional services",
    useCase: "Grow my brand",
    urgency: "This week",
    turnaround: "3–5 business days",
    included: [
      "Double-sided full color print",
      "Expert preflight file check",
      "Premium 400gsm stock",
      "Tracked delivery",
    ],
    optionLabel: "Paper finish",
    options: ["Soft touch", "Uncoated", "Recycled"],
  },
  {
    id: 3,
    slug: "branded-ceramic-mugs",
    name: "Branded Ceramic Mugs",
    category: "Gifts",
    description:
      "Everyday drinkware transformed into a thoughtful brand experience.",
    price: 18,
    popularity: 84,
    image: photos.mug,
    gallery: [photos.mug, photos.mugLight, photos.editorial],
    industry: "Hospitality",
    useCase: "Thank my team",
    urgency: "This month",
    turnaround: "5–7 business days",
    included: [
      "Full-wrap single color print",
      "Durable dishwasher-safe finish",
      "Individual recyclable packaging",
      "Digital proof before production",
    ],
    optionLabel: "Mug style",
    options: ["Classic white", "Matte black", "Speckled cream"],
  },
  {
    id: 4,
    slug: "social-media-launch-kit",
    name: "Social Media Launch Kit",
    category: "Digital",
    description:
      "A polished suite of social templates designed for a confident launch.",
    price: 95,
    popularity: 96,
    image: photos.laptop,
    gallery: [photos.laptop, photos.editorial, photos.studio],
    tag: "New",
    industry: "Technology",
    useCase: "Launch a product",
    urgency: "This week",
    turnaround: "4–6 business days",
    included: [
      "12 editable social templates",
      "Three platform cover images",
      "Launch story sequence",
      "Editable Canva source files",
    ],
    optionLabel: "Platform focus",
    options: ["Instagram", "LinkedIn", "Multi-platform"],
  },
  {
    id: 5,
    slug: "event-step-and-repeat",
    name: "Event Step & Repeat",
    category: "Studio",
    description:
      "A high-impact branded backdrop sized to make your event camera-ready.",
    price: 280,
    popularity: 76,
    image: photos.event,
    gallery: [photos.event, photos.studio, photos.print],
    industry: "Events",
    useCase: "Host an event",
    urgency: "This month",
    turnaround: "7–9 business days",
    included: [
      "Backdrop layout design",
      "High-resolution fabric print",
      "Portable frame and carry case",
      "Production-ready proof",
    ],
    optionLabel: "Backdrop size",
    options: ["6 × 8 ft", "8 × 8 ft", "10 × 8 ft"],
  },
  {
    id: 6,
    slug: "packaging-label-system",
    name: "Packaging Label System",
    category: "Create",
    description:
      "A flexible family of labels that brings clarity and character to every SKU.",
    price: 190,
    popularity: 88,
    image: photos.package,
    gallery: [photos.package, photos.studio, photos.cards],
    tag: "Popular",
    industry: "Food & retail",
    useCase: "Launch a product",
    urgency: "1–2 weeks",
    turnaround: "8–12 business days",
    included: [
      "Three initial design concepts",
      "Up to four SKU adaptations",
      "Print-ready production files",
      "Simple usage guide",
    ],
    optionLabel: "SKU count",
    options: ["1 SKU", "Up to 4 SKUs", "Up to 8 SKUs"],
  },
  {
    id: 7,
    slug: "company-profile-design",
    name: "Company Profile Design",
    category: "Digital",
    description:
      "Turn your company story into a clear, compelling sales-ready document.",
    price: 125,
    popularity: 81,
    image: photos.editorial,
    gallery: [photos.editorial, photos.laptop, photos.studio],
    industry: "Professional services",
    useCase: "Grow my brand",
    urgency: "1–2 weeks",
    turnaround: "6–8 business days",
    included: [
      "Up to 12 custom pages",
      "Content hierarchy support",
      "Two revision rounds",
      "Interactive and print PDFs",
    ],
    optionLabel: "Document length",
    options: ["Up to 8 pages", "Up to 12 pages", "Up to 20 pages"],
  },
  {
    id: 8,
    slug: "welcome-gift-box",
    name: "Team Welcome Gift Box",
    category: "Gifts",
    description:
      "A considered collection of branded essentials for a warmer first day.",
    price: 68,
    popularity: 90,
    image: photos.package,
    gallery: [photos.package, photos.mugLight, photos.cards],
    tag: "Bundle & save",
    industry: "Technology",
    useCase: "Thank my team",
    urgency: "This month",
    turnaround: "7–10 business days",
    included: [
      "Branded mug and notebook",
      "Printed welcome card",
      "Premium mailer box",
      "Individual recipient packing",
    ],
    optionLabel: "Box style",
    options: ["Essential", "Premium", "Custom mix"],
  },
  {
    id: 9,
    slug: "launch-flyers",
    name: "Launch Flyers",
    category: "Prints",
    description:
      "Sharp, vibrant flyers that get your message into the right hands.",
    price: 34,
    popularity: 73,
    image: photos.print,
    gallery: [photos.print, photos.cards, photos.editorial],
    industry: "Food & retail",
    useCase: "Launch a product",
    urgency: "This week",
    turnaround: "2–4 business days",
    included: [
      "Double-sided color printing",
      "Silk 170gsm paper",
      "File quality check",
      "Protective packing",
    ],
    optionLabel: "Flyer size",
    options: ["A6", "A5", "DL"],
  },
  {
    id: 10,
    slug: "brand-product-shoot",
    name: "Brand Product Shoot",
    category: "Studio",
    description:
      "Art-directed product photography with imagery made to stop the scroll.",
    price: 320,
    popularity: 86,
    image: photos.editorial,
    gallery: [photos.editorial, photos.package, photos.mugLight],
    industry: "Food & retail",
    useCase: "Grow my brand",
    urgency: "1–2 weeks",
    turnaround: "10 business days",
    included: [
      "Creative direction and shot list",
      "Two-hour studio session",
      "12 fully retouched images",
      "Web and print exports",
    ],
    optionLabel: "Shoot length",
    options: ["2 hours", "Half day", "Full day"],
  },
  {
    id: 11,
    slug: "brand-strategy-session",
    name: "Brand Strategy Session",
    category: "Create",
    description:
      "A focused workshop to sharpen your audience, position, and next move.",
    price: 210,
    popularity: 94,
    image: photos.studio,
    gallery: [photos.studio, photos.laptop, photos.cards],
    industry: "All industries",
    useCase: "Start a business",
    urgency: "This week",
    turnaround: "Workshop within 5 days",
    included: [
      "90-minute guided workshop",
      "Audience and competitor review",
      "Positioning recommendations",
      "Actionable strategy summary",
    ],
    optionLabel: "Session format",
    options: ["Virtual", "In studio", "Team workshop"],
  },
  {
    id: 12,
    slug: "embroidered-tote-bags",
    name: "Embroidered Tote Bags",
    category: "Gifts",
    description:
      "Heavyweight canvas totes with a refined embroidered brand mark.",
    price: 22,
    popularity: 79,
    image: photos.package,
    gallery: [photos.package, photos.cards, photos.editorial],
    industry: "Events",
    useCase: "Host an event",
    urgency: "This month",
    turnaround: "8–10 business days",
    included: [
      "Heavyweight cotton canvas",
      "One-position embroidery",
      "Thread color matching",
      "Digital proof before production",
    ],
    optionLabel: "Canvas color",
    options: ["Natural", "Black", "Forest green"],
  },
]

export const marketConfig = {
  ng: {
    label: "Nigeria",
    flag: "NG",
    currency: "NGN",
    locale: "en-NG",
    rate: 1650,
    hero: "Build a brand people remember.",
    subhero:
      "Strategy, design, print and branded goods—all made by trusted creative partners.",
  },
  us: {
    label: "United States",
    flag: "US",
    currency: "USD",
    locale: "en-US",
    rate: 1,
    hero: "Your brand, brilliantly brought to life.",
    subhero:
      "From first sketch to final print, get standout creative work without the agency runaround.",
  },
  gb: {
    label: "United Kingdom",
    flag: "GB",
    currency: "GBP",
    locale: "en-GB",
    rate: 0.79,
    hero: "Good ideas, beautifully made.",
    subhero:
      "A handpicked collection of creative services and branded goods for growing teams.",
  },
  ca: {
    label: "Canada",
    flag: "CA",
    currency: "CAD",
    locale: "en-CA",
    rate: 1.36,
    hero: "Make your brand impossible to overlook.",
    subhero:
      "Smart design, quality print and thoughtful brand goods, all in one creative marketplace.",
  },
} as const

export type Market = keyof typeof marketConfig

export function isMarket(value?: string): value is Market {
  return Boolean(value && value in marketConfig)
}

export function formatPrice(price: number, market: Market) {
  const config = marketConfig[market]
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    maximumFractionDigits: market === "ng" ? 0 : 2,
  }).format(price * config.rate)
}

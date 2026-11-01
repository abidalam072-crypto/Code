import { photography, photographs, type Photograph } from "./photography";

/** Owner-editable source of truth. See docs/OWNER-CHECKLIST.md before launch. */
export const site = {
  name: "Rah Bakes",
  tagline: "Sweet little moments, beautifully baked.",
  location: "Sterling Heights, Michigan",
  instagram: "https://www.instagram.com/rahbakes/",
  instagramHandle: "@rahbakes",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  launchReady: process.env.SITE_LAUNCH_READY === "true",
  logo: "/images/rahbakes-logo.png" as string | null,
  colors: {
    cream: "#fbf8f3",
    paper: "#f0eaf3",
    cocoa: "#33271f",
    muted: "#695c56",
    blush: "#e8ddef",
    rose: "#695078",
    caramel: "#aa8559",
  },
  // Phone and menu prices were supplied by the user in the bakery's menu.
  founder: null as string | null,
  phone: "+1 (586) 224-4623" as string | null,
  address: null as string | null,
  story: {
    eyebrow: "A little introduction",
    heading: "Good things come in sweet little moments.",
    paragraphs: [
      "A birthday wish. A thank-you. A Tuesday that could use a little chocolate. There’s something lovely about a treat that makes an ordinary moment feel special.",
      "Meet Rah Bakes, a boutique bakery in Sterling Heights, Michigan. From delicate buttercream flowers to chocolate-drizzled brownies and golden cookies, there’s a little world of sweetness to explore.",
    ],
    ownerNote:
      "Our full story is coming soon. Meet the person behind Rah Bakes and discover the latest from the kitchen on Instagram.",
    status: "Draft brand introduction — owner approval required.",
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Treats", href: "/treats" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Category = "cupcakes" | "brownies" | "cookies";
export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All the sweetness" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "brownies", label: "Brownies" },
  { id: "cookies", label: "Cookies" },
];

/** Transcribed from the menu supplied by the user; all prices are USD. */
export const menu = {
  servingCounts: [4, 6, 12, 24],
  cupcakes: [
    { name: "Classic Vanilla", price: 3 },
    { name: "Decadent Chocolate", price: 3 },
    { name: "Red Velvet Charm", price: 3 },
    { name: "Citrusy Lemon", price: 4 },
    { name: "Strawberry Bliss", price: 4 },
  ],
  brownies: [
    { name: "Classic Brownies", price: 3 },
    { name: "Chocolate Drizzle", price: 3 },
    { name: "Premium with Chocolates", price: 4 },
    { name: "Customized Brownies", price: 4 },
  ],
  cookies: [
    { name: "Brown Butter Choco Chip", price: 2 },
    { name: "Hershey’s Choco Chip", price: 2.5 },
  ],
  bareCake: {
    name: "Bare Cake",
    flavors: ["Sweet Vanilla", "Divine Chocolate", "Elegant Red Velvet"],
    layers: [
      { count: 2, price: 20 },
      { count: 3, price: 30 },
      { count: 4, price: 35 },
    ],
    fruitAddOn: 8,
  },
};

export const catalogCategories = [
  ...categories,
  { id: "bare-cake", label: "Bare Cake" },
];

export type Product = {
  id: Category;
  name: string;
  note: string;
  description: string;
  image: string;
  alt: string;
  photo: Photograph;
  price: number | null;
  priceMax?: number;
  verified: boolean;
};

export const products: Product[] = [
  {
    id: "cupcakes",
    name: "Cupcakes",
    note: "A little swirl of happiness",
    description:
      "From Classic Vanilla to Strawberry Bliss, a little swirl of sweetness for your kind of occasion.",
    image: photography.cupcakes.image,
    alt: photography.cupcakes.alt,
    photo: photography.cupcakes,
    price: Math.min(...menu.cupcakes.map((item) => item.price)),
    priceMax: Math.max(...menu.cupcakes.map((item) => item.price)),
    verified: true,
  },
  {
    id: "brownies",
    name: "Brownies",
    note: "For the love of chocolate",
    description:
      "Classic, chocolate-drizzled, topped with chocolates, or customized. Find your kind of chocolate moment.",
    image: photography.brownies.image,
    alt: photography.brownies.alt,
    photo: photography.brownies,
    price: Math.min(...menu.brownies.map((item) => item.price)),
    priceMax: Math.max(...menu.brownies.map((item) => item.price)),
    verified: true,
  },
  {
    id: "cookies",
    name: "Cookies",
    note: "Your everyday kind of lovely",
    description:
      "Brown Butter Choco Chip or Hershey’s Choco Chip. A little pick-me-up that needs no special occasion.",
    image: photography.cookies.image,
    alt: photography.cookies.alt,
    photo: photography.cookies,
    price: Math.min(...menu.cookies.map((item) => item.price)),
    priceMax: Math.max(...menu.cookies.map((item) => item.price)),
    verified: true,
  },
];

export type GalleryPhoto = {
  id: string;
  category: Category | "celebrations";
  image: string;
  alt: string;
  photo: Photograph;
  title: string;
  aspect: "portrait" | "square" | "landscape";
  position?: string;
};

export const galleryCategories = [
  ...categories,
  { id: "celebrations", label: "Celebrations" },
];

function galleryPhoto(
  id: keyof typeof photographs,
  category: GalleryPhoto["category"],
  aspect: GalleryPhoto["aspect"] = "portrait",
): GalleryPhoto {
  const photo = photographs[id];
  return {
    id,
    category,
    aspect,
    image: photo.image,
    alt: photo.alt,
    title: photo.title,
    photo,
  };
}

/** Every entry is a distinct owner-supplied photograph, never a duplicate crop. */
export const gallery: GalleryPhoto[] = [
  galleryPhoto("flower-box", "cupcakes", "landscape"),
  galleryPhoto("rose-petal-brownies", "brownies", "portrait"),
  galleryPhoto("violet-butterflies", "cupcakes", "portrait"),
  galleryPhoto("cooling-rack-cookies", "cookies", "portrait"),
  galleryPhoto("lavender-garden", "cupcakes", "portrait"),
  galleryPhoto("chocolate-cupcakes", "cupcakes", "square"),
  galleryPhoto("blue-and-ivory", "cupcakes", "portrait"),
  galleryPhoto("chocolate-brownies", "brownies", "square"),
  galleryPhoto("strawberry-raspberry", "cupcakes", "portrait"),
  galleryPhoto("wrapped-with-rah", "cupcakes", "portrait"),
  galleryPhoto("jewel-toned-cupcakes", "cupcakes", "square"),
  galleryPhoto("buttercream-palette", "cupcakes", "portrait"),
  galleryPhoto("brownie-box", "brownies", "square"),
  galleryPhoto("sunshine-butterflies", "cupcakes", "landscape"),
  galleryPhoto("berry-and-ivory", "cupcakes", "landscape"),
  galleryPhoto("blush-blooms", "cupcakes", "portrait"),
  galleryPhoto("chocolate-gathering", "celebrations", "portrait"),
  galleryPhoto("celebration-table", "celebrations", "square"),
];

export const policies = [
  {
    question: "How do I place an order?",
    answer:
      "Start with an inquiry here or message @rahbakes on Instagram. Please wait for Rah Bakes to confirm availability, pricing, and the details directly. An inquiry is not a confirmed order.",
    confirmed: true,
  },
  {
    question: "How much notice do you need?",
    answer:
      "Lead times haven’t been published here yet. Share your requested date and ask Rah Bakes to confirm availability before making plans.",
    confirmed: false,
  },
  {
    question: "Can I request a custom design?",
    answer:
      "You can share a flavor, color palette, or celebration idea in the inquiry form. Custom services and designs are subject to confirmation by Rah Bakes.",
    confirmed: false,
  },
  {
    question: "Is pickup or delivery available?",
    answer:
      "Pickup arrangements, delivery areas, and any fees need owner confirmation. No public pickup address has been provided. Please ask Rah Bakes directly.",
    confirmed: false,
  },
  {
    question: "What about allergens or dietary requirements?",
    answer:
      "Ingredients, allergen handling, and dietary accommodations need owner confirmation. If you have an allergy, contact Rah Bakes before ordering. No allergen-free claims are made on this site.",
    confirmed: false,
  },
  {
    question: "Where can I find prices and minimum quantities?",
    answer:
      "The menu lists cupcakes and brownies at $3–$4 each and cookies at $2–$2.50 each, with treat quantities of 4, 6, 12, or 24. Bare cakes are $20 for 2 layers, $30 for 3 layers, or $35 for 4 layers; fruits are an $8 add-on. Explore Our Treats for the full flavor list. Confirm availability and the final quote directly; deposits and cancellation terms still need confirmation.",
    confirmed: true,
  },
];

export const photographyNote =
  "Real Rah Bakes creations. A look at past work; designs, availability, and your final quote are confirmed directly.";

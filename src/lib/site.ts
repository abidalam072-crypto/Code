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
    cream: "#faf7f2",
    paper: "#f3edf5",
    cocoa: "#38251f",
    muted: "#6f5c52",
    blush: "#eee3f4",
    rose: "#705080",
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
      "Meet Rah Bakes, a boutique bakery in Sterling Heights, Michigan. This is a first look at a world of cupcakes, brownies, and cookies — and an invitation to start a sweet conversation.",
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
    image: "/images/cupcakes.webp",
    alt: "Illustrative pink buttercream cupcakes with raspberries on a cream ceramic stand",
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
    image: "/images/brownies.webp",
    alt: "Illustrative stack of chocolate brownies with glossy tops on parchment",
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
    image: "/images/cookies.webp",
    alt: "Illustrative golden chocolate chunk cookies on warm ivory linen",
    price: Math.min(...menu.cookies.map((item) => item.price)),
    priceMax: Math.max(...menu.cookies.map((item) => item.price)),
    verified: true,
  },
];

export type GalleryPhoto = {
  id: string;
  category: Category;
  image: string;
  alt: string;
  title: string;
  aspect: "portrait" | "square" | "landscape";
  position?: string;
};

export const gallery: GalleryPhoto[] = [
  {
    id: "pink-moments",
    category: "cupcakes",
    image: "/images/cupcakes.webp",
    alt: products[0].alt,
    title: "A little blush",
    aspect: "portrait",
  },
  {
    id: "chocolate-moments",
    category: "brownies",
    image: "/images/brownies.webp",
    alt: products[1].alt,
    title: "The chocolate edit",
    aspect: "square",
  },
  {
    id: "cookie-moments",
    category: "cookies",
    image: "/images/cookies.webp",
    alt: products[2].alt,
    title: "Golden little moments",
    aspect: "portrait",
  },
  {
    id: "cookie-closeup",
    category: "cookies",
    image: "/images/cookies.webp",
    alt: "Illustrative close-up of chocolate chunks and golden cookie edges",
    title: "A closer look",
    aspect: "square",
    position: "50% 70%",
  },
  {
    id: "cupcake-closeup",
    category: "cupcakes",
    image: "/images/cupcakes.webp",
    alt: "Illustrative close-up of pink buttercream piping",
    title: "The sweetest details",
    aspect: "portrait",
    position: "50% 35%",
  },
  {
    id: "brownie-closeup",
    category: "brownies",
    image: "/images/brownies.webp",
    alt: "Illustrative detail of a chocolate brownie’s fudgy center",
    title: "Just one more bite",
    aspect: "square",
    position: "50% 65%",
  },
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
  "Illustrative concept photography, created for this website preview. These are not photos of Rah Bakes products. Prices follow the Rah Bakes menu; final designs and availability are confirmed directly.";

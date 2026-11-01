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
  logo: null as string | null,
  colors: {
    cream: "#faf7f2",
    paper: "#f2ece3",
    cocoa: "#38251f",
    muted: "#6f5c52",
    blush: "#eedbd6",
    rose: "#8b4c43",
    caramel: "#b98559",
  },
  // Never publish a phone, address, founder, hours, or price without owner approval.
  founder: null as string | null,
  phone: null as string | null,
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

export type Product = {
  id: Category;
  name: string;
  note: string;
  description: string;
  image: string;
  alt: string;
  price: number | null;
  verified: boolean;
};

export const products: Product[] = [
  {
    id: "cupcakes",
    name: "Cupcakes",
    note: "A little swirl of happiness",
    description:
      "Pretty little treats for big feelings. Explore cupcake ideas and ask about available flavors and finishes.",
    image: "/images/cupcakes.webp",
    alt: "Illustrative pink buttercream cupcakes with raspberries on a cream ceramic stand",
    price: null,
    verified: false,
  },
  {
    id: "brownies",
    name: "Brownies",
    note: "For the love of chocolate",
    description:
      "A chocolate moment worth making time for. Ask about brownie options for your next sweet occasion.",
    image: "/images/brownies.webp",
    alt: "Illustrative stack of chocolate brownies with glossy tops on parchment",
    price: null,
    verified: false,
  },
  {
    id: "cookies",
    name: "Cookies",
    note: "Your everyday kind of lovely",
    description:
      "The kind of little pick-me-up that needs no occasion. Start a conversation about a cookie box of your own.",
    image: "/images/cookies.webp",
    alt: "Illustrative golden chocolate chunk cookies on warm ivory linen",
    price: null,
    verified: false,
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
      "Prices, minimum quantities, deposits, and cancellation terms will be added after owner confirmation. Ask for a quote based on the treats and quantity you have in mind.",
    confirmed: false,
  },
];

export const photographyNote =
  "Illustrative concept photography, created for this website preview. Flavors, designs, and availability are subject to confirmation. These are not photos of Rah Bakes products.";

import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const displayFont = localFont({
  src: [
    {
      path: "../../public/fonts/cormorant-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-headingface",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
});

const bodyFont = localFont({
  src: "../../public/fonts/dm-sans-variable.woff2",
  weight: "100 900",
  variable: "--font-bodyface",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rah Bakes — Sweet Little Moments | Sterling Heights, MI",
    template: "%s | Rah Bakes",
  },
  description:
    "Explore the sweet side of Rah Bakes, a boutique bakery in Sterling Heights, Michigan. Cupcakes, brownies, cookies, and a little inspiration for your next occasion.",
  applicationName: "Rah Bakes",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Rah Bakes — Sweet Little Moments",
    description:
      "A little sweetness, made just for you. Explore cupcakes, brownies, and cookies in Sterling Heights, Michigan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rah Bakes — Sweet Little Moments",
    description: site.tagline,
  },
  robots: { index: site.launchReady, follow: site.launchReady },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.colors.cream,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = Object.fromEntries(
    Object.entries(site.colors).map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;
  return (
    <html
      lang="en"
      style={theme}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

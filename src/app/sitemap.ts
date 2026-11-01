import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.launchReady) return [];
  return [
    "",
    "/treats",
    "/custom-orders",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}

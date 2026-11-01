import type { Metadata } from "next";
import { PageIntro, PhotoNote } from "@/components/ui";
import { ProductGrid } from "@/components/products";
import { CustomOrderFeature, SweetCTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Treats",
  description:
    "Explore cupcakes, brownies, and cookies from Rah Bakes. Get inspired, then ask about available flavors, quantities, and pricing.",
  alternates: { canonical: "/treats" },
};

export default function TreatsPage() {
  return (
    <>
      <PageIntro
        eyebrow="The sweet collection"
        title={
          <>
            A little something
            <br />
            for <em>every sweet tooth.</em>
          </>
        }
        description="Cupcakes, brownies, or cookies? Start with what you love, then ask Rah Bakes about the delicious possibilities."
      />
      <section className="container catalog-section">
        <div className="catalog-note">
          <span>THE PREVIEW COLLECTION</span>
          <p>
            Illustrative images and inspiration. Ask about current flavors,
            pricing, and availability.
          </p>
        </div>
        <ProductGrid filterable />
        <PhotoNote />
      </section>
      <CustomOrderFeature />
      <SweetCTA />
    </>
  );
}

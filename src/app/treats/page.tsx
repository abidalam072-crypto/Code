import type { Metadata } from "next";
import { PageIntro, PhotoNote } from "@/components/ui";
import { ProductGrid } from "@/components/products";
import { CustomOrderFeature, SweetCTA } from "@/components/sections";
import { menu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Treats",
  description:
    "Browse Rah Bakes’ menu: cupcakes and brownies $3–$4 each, cookies $2–$2.50 each, and bare cakes from $20. Explore flavors, quantities, and layer options.",
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
        description="Cupcakes, brownies, cookies, or a little celebration cake. Find your favorite flavors and make it your kind of sweet."
      />
      <section className="container catalog-section">
        <div className="catalog-note">
          <span>THE RAH BAKES MENU</span>
          <p>
            Menu prices are in USD. Dessert photos are illustrative; please
            confirm availability directly.
          </p>
        </div>
        <h2 className="sr-only">Explore the Rah Bakes menu and prices</h2>
        <ProductGrid filterable />
        <div className="menu-serving-note">
          <p className="eyebrow">Little treats, lovely company</p>
          <h2>Your sweet little selection.</h2>
          <p>
            Cupcakes, brownies, and cookies come in quantities of{" "}
            <strong>
              {menu.servingCounts.slice(0, -1).join(", ")}, or{" "}
              {menu.servingCounts.at(-1)}
            </strong>
            . Listed treat prices are per item; cake prices are for the selected
            layer count.
          </p>
          <p>
            Send an inquiry to confirm your date, availability, and final order
            details.
          </p>
        </div>
        <PhotoNote />
      </section>
      <CustomOrderFeature />
      <SweetCTA />
    </>
  );
}

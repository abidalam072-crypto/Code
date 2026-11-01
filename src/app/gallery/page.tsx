import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { PageIntro } from "@/components/ui";
import { SweetCTA } from "@/components/sections";
import { photographyNote } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Sweet Gallery",
  description:
    "A visual mood board of cupcakes, brownies, and cookies. Find inspiration for your next sweet moment with Rah Bakes.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="The sweet gallery"
        title={
          <>
            Almost too pretty
            <br />
            to <em>take a bite.</em>
          </>
        }
        description="A little inspiration. A lot to fall in love with. Take a closer look at the sweet details."
      />
      <section className="container gallery-page">
        <p className="gallery-disclaimer">{photographyNote}</p>
        <Gallery />
      </section>
      <SweetCTA />
    </>
  );
}

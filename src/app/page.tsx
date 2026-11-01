import Link from "next/link";
import { ArrowUpRight, Sparkle } from "lucide-react";
import {
  ButtonLink,
  Eyebrow,
  ScrollHint,
  SectionHeading,
} from "@/components/ui";
import { BakeryImage } from "@/components/bakery-image";
import { ProductGrid } from "@/components/products";
import { Gallery } from "@/components/gallery";
import { Reveal } from "@/components/reveal";
import {
  CustomOrderFeature,
  FAQPreview,
  InstagramSection,
  SweetCTA,
  WhyRah,
} from "@/components/sections";
import { photography } from "@/lib/photography";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>A boutique bakery in Michigan</Eyebrow>
          <h1>
            A little <br />
            sweetness. <br />
            <em>Just for you.</em>
          </h1>
          <p>
            Delicate buttercream blooms. A little chocolate indulgence. Your
            next favorite cookie. Welcome to the sweet world of Rah Bakes.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/treats">Explore Our Treats</ButtonLink>
            <Link href="/custom-orders" className="text-link">
              Place an order
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-location">
            <span aria-hidden="true" />
            {site.location}
          </div>
          <ScrollHint />
        </div>
        <div className="hero-art">
          <div className="hero-photo-heading">
            <span>THE RAH BAKES COLLECTION</span>
            <Sparkle size={16} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <div className="hero-image">
            <BakeryImage
              photo={photography.hero}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 760px) 92vw, (max-width: 1440px) 48vw, 660px"
              className="image-cover"
            />
          </div>
          <Link href="/treats" className="hero-detail">
            <div>
              <BakeryImage
                photo={photography.heroDetail}
                fill
                sizes="(max-width: 760px) 27vw, 160px"
                className="image-cover"
              />
            </div>
            <span>
              A little chocolate, too.
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </Link>
          <div className="hero-caption">
            <span>Buttercream, in bloom.</span>
            <span>01 — THE FLORAL EDIT</span>
          </div>
          <div className="hero-side-note" aria-hidden="true">
            SWEET LITTLE MOMENTS, BEAUTIFULLY BAKED
          </div>
        </div>
      </section>
      <div className="sweet-ribbon" aria-hidden="true">
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
              Buttercream blooms
              <Sparkle size={17} strokeWidth={1.2} />
              Chocolate daydreams
              <Sparkle size={17} strokeWidth={1.2} />
              Sweet little moments
              <Sparkle size={17} strokeWidth={1.2} />
            </span>
          ))}
        </div>
      </div>
      <section
        id="our-treats"
        className="featured-treats container section-space"
      >
        <SectionHeading
          eyebrow="01 / The sweet collection"
          title={
            <>
              Find your kind <br />
              of <em>sweet.</em>
            </>
          }
          description="For celebrations, little gifts, and the lovely everyday. Explore the menu and tell us what catches your eye."
        >
          <ButtonLink href="/treats" variant="outline">
            Discover our treats
          </ButtonLink>
        </SectionHeading>
        <ProductGrid />
        <div className="collection-footnote">
          <span>Photographed creations by Rah Bakes</span>
          <Link href="/treats" className="text-link">
            Bare cakes, too
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <WhyRah />
      <CustomOrderFeature />
      <section className="home-gallery container section-space">
        <SectionHeading
          eyebrow="03 / The details make it"
          title={
            <>
              A little artistry. <br />
              <em>A lot to love.</em>
            </>
          }
          description="Flowers you can eat. Chocolate worth a closer look. A few sweet moments from the Rah Bakes collection."
        >
          <Link href="/gallery" className="text-link">
            Explore the gallery
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </SectionHeading>
        <Gallery preview />
      </section>
      <section className="home-about">
        <div className="container home-about-inner">
          <Reveal className="about-visual">
            <div className="about-image">
              <BakeryImage
                photo={photography.story}
                fill
                sizes="(max-width: 760px) 80vw, 38vw"
                className="image-cover"
              />
            </div>
            <span className="handwritten">A little something from Rah.</span>
          </Reveal>
          <Reveal className="home-about-copy">
            <Eyebrow>04 / Hello, we’re Rah Bakes</Eyebrow>
            <h2>
              Sweetness with <br />
              <em>a personal touch.</em>
            </h2>
            <p>
              Lavender ribbons, delicate flowers, a box of something lovely.
              Welcome to our little corner of {site.location}.
            </p>
            <p>
              Browse our creations, find a flavor you love, and talk directly
              with Rah Bakes about your next sweet moment.
            </p>
            <ButtonLink href="/about" variant="outline">
              Our little story
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <FAQPreview />
      <InstagramSection />
      <SweetCTA />
    </>
  );
}

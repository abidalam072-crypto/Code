import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Sparkle } from "lucide-react";
import {
  ButtonLink,
  Eyebrow,
  PhotoNote,
  ScrollHint,
  SectionHeading,
} from "@/components/ui";
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
import { site, products } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>Little treats. Lovely moments.</Eyebrow>
          <h1>
            A little
            <br />
            sweetness.
            <br />
            <em>Just for you.</em>
          </h1>
          <p>
            Cupcakes, brownies, and cookies for the moments that deserve
            something lovely.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/treats">Explore Our Treats</ButtonLink>
            <Link href="/custom-orders" className="text-link">
              Place an order
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ScrollHint />
          <Sparkle
            className="hero-sparkle"
            size={45}
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
        <div className="hero-art">
          <div className="hero-image">
            <Image
              src={products[0].image}
              alt="Concept photograph of raspberry-pink cupcakes on a cream cake stand"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 760px) 95vw, 50vw"
              className="image-cover"
            />
            <span className="photo-label">Concept photography</span>
          </div>
          <div className="sweet-seal" aria-hidden="true">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path
                  id="seal-circle"
                  d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0"
                />
              </defs>
              <text>
                <textPath href="#seal-circle" startOffset="0%">
                  SWEET LITTLE MOMENTS · RAH BAKES ·{" "}
                </textPath>
              </text>
            </svg>
            <Heart size={27} strokeWidth={1.25} aria-hidden="true" />
          </div>
          <span className="hero-caption">Life’s a little sweeter here.</span>
        </div>
      </section>
      <div className="sweet-ribbon" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              A little joy
              <Sparkle size={20} strokeWidth={1.2} />A little chocolate
              <Sparkle size={20} strokeWidth={1.2} />A whole lot to love
              <Sparkle size={20} strokeWidth={1.2} />
            </span>
          ))}
        </div>
      </div>
      <section
        id="our-treats"
        className="featured-treats container section-space"
      >
        <SectionHeading
          eyebrow="Meet your next sweet obsession"
          title={
            <>
              The little things.
              <br className="mobile-only" /> <em>The lovely things.</em>
            </>
          }
          description="A few favorites to fall in love with. Which one’s your kind of sweet?"
        >
          <ButtonLink href="/treats" variant="outline">
            Discover our treats
          </ButtonLink>
        </SectionHeading>
        <ProductGrid />
        <PhotoNote />
      </section>
      <WhyRah />
      <CustomOrderFeature />
      <section className="home-gallery container section-space">
        <SectionHeading
          eyebrow="A feast for the eyes"
          title={
            <>
              Pretty sweet, <em>isn’t it?</em>
            </>
          }
          description="A little mood board of sweet possibilities."
        >
          <Link href="/gallery" className="text-link">
            Explore the gallery
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </SectionHeading>
        <Gallery preview />
        <PhotoNote />
      </section>
      <section className="home-about">
        <div className="container home-about-inner">
          <Reveal className="about-visual">
            <div className="about-image">
              <Image
                src={products[1].image}
                alt="Illustrative chocolate brownies with a beautifully crackled top"
                fill
                sizes="(max-width: 800px) 80vw, 35vw"
                className="image-cover"
              />
            </div>
            <span className="handwritten">a little love in every moment</span>
          </Reveal>
          <Reveal className="home-about-copy">
            <Eyebrow>A little hello from Rah Bakes</Eyebrow>
            <h2>
              For the love
              <br />
              of <em>something sweet.</em>
            </h2>
            <p>
              From our corner of {site.location}, an invitation to slow down,
              celebrate the little things, and find your next favorite treat.
            </p>
            <p>Get to know Rah Bakes — and the sweet ideas behind it.</p>
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

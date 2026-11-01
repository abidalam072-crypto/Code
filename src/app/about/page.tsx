import type { Metadata } from "next";
import Image from "next/image";
import { BakeryImage } from "@/components/bakery-image";
import { Heart } from "lucide-react";
import { site } from "@/lib/site";
import { photography } from "@/lib/photography";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/ui";
import { InstagramSection, SweetCTA, WhyRah } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Little Story",
  description:
    "Meet Rah Bakes, a boutique bakery in Sterling Heights, Michigan, and discover a little inspiration for life’s sweet moments.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hello, we’re Rah Bakes"
        title={
          <>
            A little bakery.
            <br />
            <em>A sweet little world.</em>
          </>
        }
        description="From Sterling Heights, Michigan, with a love for life’s sweeter moments."
      />
      <section className="container story-section">
        <div className="story-photo">
          <BakeryImage
            photo={photography.story}
            fill
            preload
            sizes="(max-width: 800px) 90vw, 45vw"
            className="image-cover"
          />
          <span className="photo-label">
            Our little world, wrapped with Rah
          </span>
        </div>
        <div className="story-copy">
          <Eyebrow>{site.story.eyebrow}</Eyebrow>
          <h2>{site.story.heading}</h2>
          {site.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="story-signature">
            <Heart size={23} strokeWidth={1.2} aria-hidden="true" />
            <span>
              With a little sweetness,
              <br />
              <em>Rah Bakes</em>
            </span>
          </div>
          <p className="draft-note">{site.story.status}</p>
        </div>
      </section>
      <section className="founder-note container">
        {site.logo && (
          <Image
            src={site.logo}
            alt="Rah Bakes illustrated logo: a baker in lavender holding a cupcake"
            width={460}
            height={460}
            sizes="230px"
            className="brand-story-logo"
          />
        )}
        <Eyebrow>The person behind the sweetness</Eyebrow>
        <h2>
          {site.founder ? (
            `Meet ${site.founder}.`
          ) : (
            <>
              Our story is <em>still unfolding.</em>
            </>
          )}
        </h2>
        <p>{site.story.ownerNote}</p>
        <ButtonLink href={site.instagram} external variant="outline">
          Say hello on Instagram
        </ButtonLink>
      </section>
      <WhyRah />
      <InstagramSection />
      <SweetCTA />
    </>
  );
}

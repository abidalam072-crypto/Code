import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { site, products } from "@/lib/site";
import { ButtonLink, Eyebrow, PageIntro } from "@/components/ui";
import { FAQPreview } from "@/components/sections";

export const metadata: Metadata = {
  title: "Say Hello",
  description:
    "Get in touch with Rah Bakes in Sterling Heights, Michigan. Find @rahbakes on Instagram or start a dessert inquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Sweet conversations start here"
        title={
          <>
            A question? An idea?
            <br />
            <em>Just say hello.</em>
          </>
        }
        description="Whether you’re dreaming up a celebration or have a question about a treat, let’s start a conversation."
      />
      <section className="container contact-section">
        <div className="contact-copy">
          <Eyebrow>Let’s get in touch</Eyebrow>
          <h2>
            We’d love a<br />
            <em>little hello.</em>
          </h2>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-method"
          >
            <Instagram size={26} strokeWidth={1.3} aria-hidden="true" />
            <span>
              <strong>Instagram</strong>
              <span>{site.instagramHandle}</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {site.email && (
            <a href={`mailto:${site.email}`} className="contact-method">
              <Mail size={26} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <strong>Email</strong>
                <span>{site.email}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className="contact-method"
            >
              <Phone size={26} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <strong>Call Rah Bakes</strong>
                <span>{site.phone}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
          <div className="contact-method">
            <MapPin size={26} strokeWidth={1.3} aria-hidden="true" />
            <span>
              <strong>Our little corner</strong>
              <span>{site.location}</span>
              <small>
                Pickup and delivery details to be confirmed directly.
              </small>
            </span>
          </div>
          <div className="contact-inquiry">
            <h3>Have a sweet idea in mind?</h3>
            <p>Share the date, the treats, and the little details.</p>
            <ButtonLink href="/custom-orders">Start an inquiry</ButtonLink>
          </div>
        </div>
        <div className="contact-photo">
          <Image
            src={products[2].image}
            alt="Concept photograph of chocolate chunk cookies on a cream linen table"
            fill
            preload
            sizes="(max-width: 800px) 90vw, 45vw"
            className="image-cover"
          />
          <span className="photo-label">Concept photography</span>
        </div>
      </section>
      <FAQPreview />
    </>
  );
}

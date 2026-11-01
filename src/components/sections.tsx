import { BakeryImage } from "@/components/bakery-image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Instagram,
  MessageCircle,
  Sparkle,
} from "lucide-react";
import { site, policies } from "@/lib/site";
import { photography } from "@/lib/photography";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export function SweetCTA() {
  return (
    <section className="sweet-cta">
      <div className="container sweet-cta-inner">
        <Sparkle
          className="cta-sparkle"
          size={46}
          strokeWidth={1}
          aria-hidden="true"
        />
        <div>
          <Eyebrow>A little celebration in mind?</Eyebrow>
          <h2>
            Let’s make it <em>sweet.</em>
          </h2>
          <p>Share your idea. We’ll start with a conversation.</p>
        </div>
        <ButtonLink href="/custom-orders" variant="primary">
          Start your inquiry
        </ButtonLink>
      </div>
    </section>
  );
}

export function WhyRah() {
  const values = [
    {
      icon: Heart,
      title: "Small treats. Big feelings.",
      description:
        "A birthday, a thank-you, or a just-because. There’s always room for a little sweetness.",
    },
    {
      icon: Sparkle,
      title: "Your kind of sweet.",
      description:
        "Have a flavor or a look in mind? Share the details and ask what’s possible.",
    },
    {
      icon: MessageCircle,
      title: "A personal hello.",
      description:
        "Talk directly with Rah Bakes about your idea, available options, and the details that matter.",
    },
  ];
  return (
    <section className="why-section">
      <div className="container">
        <div className="why-intro">
          <Eyebrow>A little thought in every detail</Eyebrow>
          <h2>
            More than a treat.
            <br />
            <em>A little moment of joy.</em>
          </h2>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.07}>
              <article>
                <value.icon strokeWidth={1.2} size={29} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomOrderFeature() {
  return (
    <section className="custom-feature container">
      <Reveal className="custom-photo">
        <BakeryImage
          photo={photography.custom}
          fill
          sizes="(max-width: 800px) 90vw, 45vw"
          className="image-cover"
        />
        <span className="photo-label">Blush in bloom · Rah Bakes</span>
      </Reveal>
      <Reveal className="custom-copy">
        <Eyebrow>02 / For your kind of occasion</Eyebrow>
        <h2>
          Some moments <br />
          deserve <em>flowers.</em> <br />
          The edible kind.
        </h2>
        <p>
          A big celebration or a little surprise, it all begins with an idea.
          Tell Rah Bakes what you’re dreaming of and ask about a dessert
          selection that feels like you.
        </p>
        <div className="occasion-tags">
          <span>Birthdays</span>
          <span>Little gatherings</span>
          <span>Just because</span>
        </div>
        <ButtonLink href="/custom-orders">Tell us your sweet idea</ButtonLink>
        <p className="fine-print">
          Custom options and availability need confirmation.
        </p>
      </Reveal>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="instagram-section container">
      <div className="instagram-heading">
        <Instagram size={26} strokeWidth={1.3} aria-hidden="true" />
        <Eyebrow>A little more sweetness</Eyebrow>
        <h2>
          Follow the <em>sweet side.</em>
        </h2>
        <p>
          More buttercream blooms, chocolate moments, and the latest from Rah
          Bakes.
        </p>
        <a
          href={site.instagram}
          className="instagram-handle"
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.instagramHandle}
          <ArrowUpRight size={17} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="instagram-strip">
        {photography.instagram.map((photo) => (
          <a
            href={site.instagram}
            key={photo.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Rah Bakes on Instagram (opens in a new tab)`}
          >
            <BakeryImage
              photo={photo}
              fill
              sizes="(max-width: 600px) 44vw, 23vw"
              className="image-cover"
            />
            <span>
              <Instagram size={22} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
      <p className="photo-note centered">
        A few moments from Rah Bakes · Follow along on Instagram
      </p>
    </section>
  );
}

export function FAQList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {policies.slice(0, limit).map((policy, index) => (
        <details key={policy.question}>
          <summary>
            <span className="faq-number">0{index + 1}</span>
            <span>{policy.question}</span>
            <span className="faq-toggle" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="faq-answer">
            <p>{policy.answer}</p>
            {!policy.confirmed && (
              <span className="policy-status">
                To be confirmed by Rah Bakes
              </span>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export function FAQPreview() {
  return (
    <section className="faq-section container">
      <div>
        <Eyebrow>A few little details</Eyebrow>
        <h2>
          Wondering
          <br />
          <em>about something?</em>
        </h2>
        <p>Here’s where to begin. For anything else, just say hello.</p>
        <Link href="/faq" className="text-link">
          All your questions
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <FAQList limit={4} />
    </section>
  );
}

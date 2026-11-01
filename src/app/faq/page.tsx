import type { Metadata } from "next";
import { FAQList, SweetCTA } from "@/components/sections";
import { ButtonLink, PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "A Few Little Details — FAQ",
  description:
    "Questions about Rah Bakes orders, lead times, pickup, delivery, and allergens. See what is known and what needs owner confirmation.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <PageIntro
        eyebrow="A few little details"
        title={
          <>
            Good questions.
            <br />
            <em>Sweet answers.</em>
          </>
        }
        description="A helpful place to start before your inquiry. We’ll keep these details updated as Rah Bakes confirms its policies."
      />
      <section className="container faq-page">
        <FAQList />
        <div className="faq-contact">
          <h2>A little more on your mind?</h2>
          <p>
            For allergy questions, availability, or anything specific, please
            get in touch directly.
          </p>
          <ButtonLink href="/contact" variant="outline">
            Say hello
          </ButtonLink>
        </div>
      </section>
      <SweetCTA />
    </>
  );
}

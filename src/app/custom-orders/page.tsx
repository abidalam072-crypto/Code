import type { Metadata } from "next";
import { Instagram, Sparkle } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { Eyebrow, PageIntro } from "@/components/ui";
import { FAQList } from "@/components/sections";
import { bakeryToday } from "@/lib/inquiry";
import { emailConfigured } from "@/lib/inquiry-delivery";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your Sweet Inquiry",
  description:
    "Share your dessert idea with Rah Bakes. Ask about cupcakes, brownies, cookies, flavors, dates, quantities, and custom possibilities.",
  alternates: { canonical: "/custom-orders" },
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ dessert?: string }>;
}) {
  const { dessert } = await searchParams;
  const enabled = emailConfigured();
  return (
    <>
      <PageIntro
        eyebrow="Let’s make something sweet"
        title={
          <>
            Your idea.
            <br />
            <em>A delicious beginning.</em>
          </>
        }
        description="Tell us a little about your occasion, your favorite treats, and the details you have in mind. Every sweet conversation starts somewhere."
      />
      <section className="container order-layout">
        <aside className="order-aside">
          <div className="order-aside-card">
            <Sparkle size={32} strokeWidth={1.1} aria-hidden="true" />
            <Eyebrow>A little note before we begin</Eyebrow>
            <h2>
              First, a<br />
              <em>sweet hello.</em>
            </h2>
            <p>
              This is an inquiry, not a confirmed order. Availability, custom
              options, prices, pickup, and delivery need to be agreed directly
              with Rah Bakes.
            </p>
            <ol>
              <li>
                <span>01</span>Share your sweet idea.
              </li>
              <li>
                <span>02</span>Ask about the possibilities.
              </li>
              <li>
                <span>03</span>Confirm the details together.
              </li>
            </ol>
            <div className="ordering-mode">
              <strong>
                {enabled
                  ? "Email inquiries are available"
                  : "Send your inquiry via Instagram"}
              </strong>
              <p>
                {enabled
                  ? "This form sends your inquiry to Rah Bakes by email."
                  : "Online email delivery isn’t set up yet. Fill out the form to prepare a message, then copy it into an Instagram DM. Nothing is sent automatically."}
              </p>
            </div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Instagram size={16} aria-hidden="true" />
              {site.instagramHandle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </aside>
        <div>
          <noscript>
            <div className="inquiry-feedback">
              <h2>A little help getting in touch.</h2>
              <p>
                The inquiry helper needs JavaScript. You can contact{" "}
                <a className="inline-link" href={site.instagram}>
                  @rahbakes on Instagram
                </a>{" "}
                directly with your idea, requested date, and quantity. Nothing
                has been sent from this page.
              </p>
              <style>{`.inquiry-form { display: none; }`}</style>
            </div>
          </noscript>
          <InquiryForm
            key={dessert}
            emailEnabled={enabled}
            initialDessert={dessert}
            today={bakeryToday()}
          />
        </div>
      </section>
      <section className="container order-faq">
        <Eyebrow>A few useful details</Eyebrow>
        <h2>
          Before the <em>first bite.</em>
        </h2>
        <FAQList limit={3} />
      </section>
    </>
  );
}

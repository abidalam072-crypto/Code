import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How information entered into the Rah Bakes inquiry form is handled.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="The thoughtful details"
        title={
          <>
            Your details,
            <br />
            <em>handled with care.</em>
          </>
        }
        description="A plain-language notice about this website’s inquiry form. The bakery owner should review this notice before launch."
      />
      <article className="container prose-page">
        <h2>What you share</h2>
        <p>
          The inquiry form asks for your name, email address, dessert
          preference, quantity, requested date, and idea. Phone, flavor
          preference, budget, and extra notes are optional. Please avoid
          including sensitive personal or payment information.
        </p>
        <h2>When email delivery is configured</h2>
        <p>
          Your inquiry is sent through Resend to the bakery’s configured inbox
          so Rah Bakes can respond. A successful message means the email
          provider accepted it; it does not confirm inbox delivery or an order.
          No inquiry database is included in this website. The hosting and email
          providers may process technical information to operate their services.
        </p>
        <h2>When using the Instagram fallback</h2>
        <p>
          Preparing a message does not submit your inquiry to the bakery. Your
          details stay in the current browser page until you copy them and send
          them yourself. The browser Clipboard API is used only when you choose
          “Copy message.” Once you send a DM, Instagram’s privacy terms apply.
        </p>
        <h2>Abuse prevention and storage</h2>
        <p>
          For configured email submissions, a temporary hashed email identifier
          and attempt count are held in server memory to limit repeated
          requests. A rate-limit window lasts 15 minutes. Expired counters are
          removed when another inquiry is processed or the server instance
          exits. Customer inquiry text is not deliberately logged by the
          application. Form details are not saved in browser local storage and
          are cleared when the page is reloaded or closed.
        </p>
        <h2>Cookies, analytics, and external links</h2>
        <p>
          This starter does not include advertising, analytics trackers,
          embedded Instagram feeds, or marketing cookies. Fonts and concept
          photographs are hosted with the website. Instagram opens only when you
          follow an external link.
        </p>
        <h2>Questions and requests</h2>
        <p>
          Contact{" "}
          <a
            className="inline-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.instagramHandle} on Instagram (opens in a new tab)
          </a>
          {site.email && (
            <>
              {" "}
              or{" "}
              <a className="inline-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </>
          )}{" "}
          about your inquiry or personal information. Before launch, the owner
          must confirm the business contact, hosting arrangements, and inbox
          retention practices, and update this notice accordingly.
        </p>
      </article>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import { navigation, site, photographyNote } from "@/lib/site";
import { Wordmark } from "@/components/header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Wordmark light />
            <p>
              A little joy.
              <br />A little chocolate.
              <br />
              <em>A whole lot to love.</em>
            </p>
            <span className="footer-location">
              <MapPin size={14} aria-hidden="true" />
              {site.location}
            </span>
          </div>
          <div className="footer-links">
            <h2>Take a little look</h2>
            {navigation.slice(1).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/faq">Frequently asked questions</Link>
          </div>
          <div className="footer-connect">
            <h2>Let’s make something sweet.</h2>
            <p>
              Have a question or a little celebration in mind? We’d love to hear
              your idea.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <Instagram size={18} aria-hidden="true" />
              {site.instagramHandle}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
                <Phone size={15} aria-hidden="true" />
                {site.phone}
              </a>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Rah Bakes. A little sweetness lives
            here.
          </p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">
              Say hello
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className="footer-preview">{photographyNote}</p>
      </div>
    </footer>
  );
}

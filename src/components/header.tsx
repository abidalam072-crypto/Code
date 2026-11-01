"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Instagram, Sparkle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={cn("wordmark", light && "wordmark-light")}>
      {site.logo ? (
        <Image src={site.logo} alt="Rah Bakes" width={110} height={70} />
      ) : (
        <>
          <span className="wordmark-rah">
            rah
            <span className="wordmark-star" aria-hidden="true">
              <Sparkle size={16} strokeWidth={1.3} />
            </span>
          </span>{" "}
          <span className="wordmark-bakes">BAKES</span>
        </>
      )}
      <span className="sr-only"> home</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        <span>{site.location}</span>
        <Sparkle
          size={12}
          strokeWidth={1.3}
          className="announcement-star"
          aria-hidden="true"
        />
        <span>A little sweetness, a little closer.</span>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(pathname === link.href && "active")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/custom-orders"
            className="button button-primary header-order"
          >
            Order Now
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="icon-button mobile-menu-trigger"
                aria-label="Open navigation"
              >
                <Menu size={24} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content
                className="mobile-menu"
                aria-describedby="menu-description"
              >
                <div className="mobile-menu-top">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <Wordmark />
                  <Dialog.Close asChild>
                    <button
                      className="icon-button"
                      aria-label="Close navigation"
                    >
                      <X />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description id="menu-description" className="eyebrow">
                  A little look around
                </Dialog.Description>
                <nav aria-label="Mobile navigation">
                  {navigation.map((link, index) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      <span className="menu-index">0{index + 1}</span>
                      {link.label}
                      <ArrowUpRight size={22} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
                <Link
                  href="/custom-orders"
                  className="button button-primary"
                  onClick={() => setOpen(false)}
                >
                  Let’s make something sweet
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-instagram"
                >
                  <Instagram size={17} />
                  {site.instagramHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
      <div className="mobile-order">
        <Link href="/custom-orders">
          A sweet idea in mind?
          <span>
            Order Now
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </>
  );
}

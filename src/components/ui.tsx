import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("button", `button-${variant}`, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {arrow && <ArrowUpRight size={16} aria-hidden="true" />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Link>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow", className)}>
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-heading", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <Sparkle
        className="intro-sparkle"
        size={42}
        strokeWidth={1}
        aria-hidden="true"
      />
    </section>
  );
}

export function PhotoNote({ className }: { className?: string }) {
  return (
    <p className={cn("photo-note", className)}>
      <Sparkle size={13} aria-hidden="true" />
      Original Rah Bakes photography · Please confirm designs and availability
      directly
    </p>
  );
}

export function ScrollHint() {
  return (
    <a className="scroll-hint" href="#our-treats">
      <ArrowDown size={16} aria-hidden="true" />A little more to love
    </a>
  );
}

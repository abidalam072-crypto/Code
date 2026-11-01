"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkle } from "lucide-react";
import { categories, products, type Product } from "@/lib/site";
import { inquiryHref, cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const number = String(
    products.findIndex((p) => p.id === product.id) + 1,
  ).padStart(2, "0");
  return (
    <Reveal delay={index * 0.07}>
      <article className="product-card">
        <Link
          href={inquiryHref(product.id)}
          className="product-photo"
          aria-label={`${number} — Inquire about ${product.name.toLowerCase()}`}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 650px) 90vw, (max-width: 1000px) 46vw, 30vw"
            className="image-cover"
          />
          <span className="product-number" aria-hidden="true">
            {number}
          </span>
          <span className="product-photo-cta">
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </Link>
        <div className="product-copy">
          <p className="product-note">{product.note}</p>
          <h3>
            <Link href={inquiryHref(product.id)}>{product.name}</Link>
          </h3>
          <p>{product.description}</p>
          <div className="product-bottom">
            <Link href={inquiryHref(product.id)} className="text-link">
              Make an inquiry
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            {product.price !== null && product.verified && (
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ProductGrid({ filterable = false }: { filterable?: boolean }) {
  const [category, setCategory] = useState("all");
  const filtered = products.filter(
    (product) => category === "all" || product.id === category,
  );
  return (
    <div>
      {filterable && (
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter treats by category"
        >
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              className={cn("filter-chip", category === item.id && "selected")}
              onClick={() => setCategory(item.id)}
            >
              {item.id === "all" && <Sparkle size={14} aria-hidden="true" />}
              {item.label}
            </button>
          ))}
        </div>
      )}
      <div className="product-grid" aria-live="polite">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      {filterable && (
        <p className="results-count" role="status">
          {filtered.length} {filtered.length === 1 ? "category" : "categories"}{" "}
          to explore. Ask about today’s available options.
        </p>
      )}
    </div>
  );
}

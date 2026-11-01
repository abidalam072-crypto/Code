"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkle, CakeSlice } from "lucide-react";
import { catalogCategories, menu, products, type Product } from "@/lib/site";
import { inquiryHref, cn, formatMoney } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function ProductCard({
  product,
  index = 0,
  detailed = false,
}: {
  product: Product;
  index?: number;
  detailed?: boolean;
}) {
  const number = String(
    products.findIndex((p) => p.id === product.id) + 1,
  ).padStart(2, "0");
  return (
    <Reveal delay={index * 0.07}>
      <article
        className={cn("product-card", detailed && "product-card-detailed")}
      >
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
          {detailed && (
            <div className="product-menu">
              <p className="menu-unit">From the menu · per treat</p>
              <ul>
                {menu[product.id].map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <span>
                      {formatMoney(item.price)}
                      <span className="sr-only"> each</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="product-bottom">
            <Link href={inquiryHref(product.id)} className="text-link">
              Make an inquiry
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            {product.price !== null && product.verified && (
              <span className="product-price">
                {formatMoney(product.price)}
                {product.priceMax !== undefined &&
                  product.priceMax !== product.price &&
                  `–${formatMoney(product.priceMax)}`}
                <small>each</small>
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function BareCakeMenu() {
  return (
    <article className="bare-cake-menu">
      <div className="bare-cake-intro">
        <CakeSlice size={32} strokeWidth={1.2} aria-hidden="true" />
        <p className="eyebrow">A little celebration cake</p>
        <h3>
          Bare cake.
          <br />
          <em>Beautiful possibilities.</em>
        </h3>
        <p>
          Choose a flavor and the layer count that’s right for your occasion.
          Add a little fruit, if you like.
        </p>
        <Link href={inquiryHref("bare-cake")} className="button button-primary">
          Inquire about a bare cake
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="bare-cake-details">
        <div>
          <h4>Your flavor</h4>
          <ul className="cake-flavors">
            {menu.bareCake.flavors.map((flavor) => (
              <li key={flavor}>
                <Sparkle size={12} aria-hidden="true" />
                {flavor}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Your layers</h4>
          <dl className="cake-layer-prices">
            {menu.bareCake.layers.map((layer) => (
              <div key={layer.count}>
                <dt>{layer.count} layers</dt>
                <dd>{formatMoney(layer.price)}</dd>
              </div>
            ))}
          </dl>
          <p className="cake-fruit">
            <span>Fruit add-on</span>
            <strong>+{formatMoney(menu.bareCake.fruitAddOn)}</strong>
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ filterable = false }: { filterable?: boolean }) {
  const [category, setCategory] = useState("all");
  const filtered = products.filter(
    (product) => category === "all" || product.id === category,
  );
  const showCake =
    filterable && (category === "all" || category === "bare-cake");
  const count = filtered.length + (showCake ? 1 : 0);
  return (
    <div>
      {filterable && (
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter treats by category"
        >
          {catalogCategories.map((item) => (
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
      <div aria-live="polite">
        {filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                detailed={filterable}
              />
            ))}
          </div>
        )}
        {showCake && <BareCakeMenu />}
      </div>
      {filterable && (
        <p className="results-count" role="status">
          {count} {count === 1 ? "category" : "categories"} to explore. Ask
          about today’s available options.
        </p>
      )}
    </div>
  );
}

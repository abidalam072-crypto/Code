"use client";

import { useRef, useState } from "react";
import { BakeryImage } from "@/components/bakery-image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Sparkle,
  X,
} from "lucide-react";
import {
  galleryCategories,
  gallery,
  site,
  type GalleryPhoto,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function Gallery({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const photos = (preview ? gallery.slice(0, 3) : gallery).filter(
    (photo) => category === "all" || photo.category === category,
  );
  const selected: GalleryPhoto | null = active !== null ? photos[active] : null;
  const move = (step: number) =>
    setActive((current) =>
      current === null
        ? null
        : (current + step + photos.length) % photos.length,
    );
  return (
    <>
      {!preview && (
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter gallery by category"
        >
          {galleryCategories.map((item) => (
            <button
              key={item.id}
              className={cn("filter-chip", category === item.id && "selected")}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.id === "all" && <Sparkle size={14} aria-hidden="true" />}
              {item.label}
            </button>
          ))}
        </div>
      )}
      <div
        className={cn("gallery-grid", preview && "gallery-preview")}
        aria-live="polite"
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={cn("gallery-tile", `gallery-${photo.aspect}`)}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setActive(index);
            }}
            aria-label={`Enlarge ${photo.title}`}
          >
            <BakeryImage
              photo={photo.photo}
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 31vw"
              style={{ objectPosition: photo.position }}
              className="image-cover"
            />
            <span className="gallery-tile-caption">
              {photo.title}
              <Expand size={19} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <Dialog.Root
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay lightbox-overlay" />
          <Dialog.Content
            className="lightbox"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              trigger.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(1);
              }
            }}
            onTouchStart={(event) => {
              touchStart.current = event.changedTouches[0].screenX;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const distance =
                event.changedTouches[0].screenX - touchStart.current;
              if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
              touchStart.current = null;
            }}
          >
            <div className="lightbox-top">
              <span>THE SWEET GALLERY</span>
              <Dialog.Close asChild>
                <button className="icon-button" aria-label="Close image">
                  <X size={25} />
                </button>
              </Dialog.Close>
            </div>
            {selected && (
              <>
                <div className="lightbox-image">
                  <BakeryImage
                    photo={selected.photo}
                    fill
                    sizes="(max-width: 700px) 95vw, 75vw"
                    className="image-contain"
                    quality={90}
                  />
                </div>
                <div className="lightbox-bottom">
                  <div>
                    <Dialog.Title>{selected.title}</Dialog.Title>
                    <Dialog.Description>
                      {selected.category === "celebrations"
                        ? "A past Rah Bakes celebration display. Ask about current options; this is not the priced Bare Cake menu."
                        : "An original Rah Bakes creation. Ask about current designs and availability."}
                    </Dialog.Description>
                  </div>
                  <div className="lightbox-controls">
                    <button
                      className="icon-button"
                      onClick={() => move(-1)}
                      aria-label="Previous image"
                    >
                      <ArrowLeft />
                    </button>
                    <span aria-live="polite">
                      {(active ?? 0) + 1} / {photos.length}
                    </span>
                    <button
                      className="icon-button"
                      onClick={() => move(1)}
                      aria-label="Next image"
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {!preview && (
        <p className="results-count" role="status">
          {photos.length} Rah Bakes{" "}
          {photos.length === 1 ? "photograph" : "photographs"}. Follow the
          latest on{" "}
          <a
            className="inline-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
            <ArrowUpRight size={12} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      )}
    </>
  );
}

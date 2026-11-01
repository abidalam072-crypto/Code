import Image, { type ImageProps } from "next/image";
import type { Photograph } from "@/lib/photography";

/** All dessert imagery comes from the owner-supplied, cropped originals. */
export function BakeryImage({
  photo,
  ...props
}: { photo: Photograph } & Omit<
  ImageProps,
  "src" | "alt" | "blurDataURL" | "placeholder"
>) {
  return (
    <Image
      src={photo.image}
      alt={photo.alt}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      {...props}
    />
  );
}

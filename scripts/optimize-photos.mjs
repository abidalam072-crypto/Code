import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { photoRecipes } from "./photo-recipes.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = `${root}public/images/optimized`;
await mkdir(output, { recursive: true });
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;

for (const recipe of photoRecipes) {
  const source = await readFile(`${root}public/images/${recipe.source}.jpg`);
  const [left, top, width, height] = recipe.crop;
  // Auto-orient before cropping, especially the EXIF-rotated 4.jpg.
  const oriented = await sharp(source).autoOrient().toBuffer();
  let pipeline = sharp(oriented)
    .extract({ left, top, width, height })
    .resize({ width: 1400, withoutEnlargement: true });
  if (recipe.brightness)
    pipeline = pipeline.modulate({ brightness: recipe.brightness });
  const { data, info } = await pipeline
    .sharpen({ sigma: 0.4, m1: 0.35, m2: 0.7 })
    .webp({ quality: 86, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile(`${output}/${recipe.id}.webp`, data);
  const blur = await sharp(data).resize(12).webp({ quality: 35 }).toBuffer();
  manifest[recipe.id] = {
    source: `/images/${recipe.source}.jpg`,
    sourceSha256: createHash("sha256").update(source).digest("hex"),
    image: `/images/optimized/${recipe.id}.webp`,
    title: recipe.title,
    alt: recipe.alt,
    width: info.width,
    height: info.height,
    bytes: info.size,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  originalBytes += source.length;
  optimizedBytes += info.size;
}
await writeFile(
  `${root}src/lib/photo-manifest.json`,
  `${JSON.stringify(manifest, null, 2)}\n`,
);
// The social-image renderer needs JPEG/PNG; use the same real hero photograph.
await sharp(`${output}/lavender-garden.webp`)
  .resize(480, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(`${output}/social-florals.jpg`);
console.log(
  `Prepared ${photoRecipes.length} authentic photographs. ${(originalBytes / 1e6).toFixed(2)} MB → ${(optimizedBytes / 1e6).toFixed(2)} MB (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% smaller). Originals untouched; no upscaling or generative edits.`,
);

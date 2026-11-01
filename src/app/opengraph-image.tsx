import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt =
  "Rah Bakes floral cupcakes — A little sweetness, just for you. Sterling Heights, Michigan.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const [font, photo, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/cormorant-regular.woff")),
    readFile(join(process.cwd(), "public/images/optimized/social-florals.jpg")),
    site.logo
      ? readFile(join(process.cwd(), "public", site.logo))
      : Promise.resolve(null),
  ]);
  const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logoUrl = logo
    ? `data:image/png;base64,${logo.toString("base64")}`
    : null;
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: site.colors.cream,
        color: site.colors.cocoa,
        fontFamily: "Cormorant",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 720,
          padding: "46px 54px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {logoUrl && (
            <div
              style={{
                width: 76,
                height: 76,
                backgroundImage: `url(${logoUrl})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 5 }}>
            RAH BAKES
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 34,
            fontSize: 90,
            letterSpacing: -3,
            lineHeight: 0.98,
          }}
        >
          <div>A little</div>
          <div>sweetness.</div>
          <div style={{ color: site.colors.rose, marginTop: 10 }}>
            Just for you.
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 22 }}>
          Sterling Heights, Michigan
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 18,
            color: site.colors.rose,
            letterSpacing: 2,
          }}
        >
          CUPCAKES · BROWNIES · COOKIES · BARE CAKE
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 480,
          height: 630,
          backgroundImage: `url(${photoUrl})`,
          backgroundSize: "cover",
        }}
      />
    </div>,
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, weight: 400, style: "normal" }],
    },
  );
}

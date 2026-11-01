import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt =
  "Rah Bakes — A little sweetness, just for you. Sterling Heights, Michigan.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/cormorant-regular.woff"),
  );
  const logo = site.logo
    ? `data:image/png;base64,${(await readFile(join(process.cwd(), "public", site.logo))).toString("base64")}`
    : null;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: site.colors.cream,
        color: site.colors.cocoa,
        display: "flex",
        flexDirection: "column",
        padding: "70px 85px",
        position: "relative",
        fontFamily: "Cormorant",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 8 }}>
        RAH BAKES
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 102,
          lineHeight: 1.1,
          marginTop: 58,
          letterSpacing: -4,
        }}
      >
        <div>A little sweetness.</div>
        <div style={{ color: site.colors.rose }}>Just for you.</div>
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 21 }}>
        CUPCAKES · BROWNIES · COOKIES · BARE CAKE
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 65,
          bottom: 65,
          background: site.colors.blush,
          borderRadius: 100,
          width: 220,
          height: 220,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logo ? (
          <div
            style={{
              width: 200,
              height: 200,
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <svg width="70" height="70" viewBox="0 0 70 70">
            <path
              d="M35 3v64M3 35h64M12 12l46 46M58 12 12 58"
              stroke={site.colors.rose}
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, weight: 400, style: "normal" }],
    },
  );
}

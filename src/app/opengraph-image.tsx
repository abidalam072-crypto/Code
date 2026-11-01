import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Rah Bakes — A little sweetness, just for you. Sterling Heights, Michigan.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/cormorant-regular.woff"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#faf7f2",
        color: "#38251f",
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
        <div style={{ color: "#8b4c43" }}>Just for you.</div>
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 21 }}>
        CUPCAKES · BROWNIES · COOKIES
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 65,
          bottom: 65,
          background: "#eedbd6",
          borderRadius: 100,
          width: 170,
          height: 170,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <path
            d="M35 3v64M3 35h64M12 12l46 46M58 12 12 58"
            stroke="#8b4c43"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, weight: 400, style: "normal" }],
    },
  );
}

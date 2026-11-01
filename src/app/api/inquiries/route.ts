import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry";
import { deliverInquiry, emailConfigured } from "@/lib/inquiry-delivery";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; reset: number }>();
const maxBodyBytes = 16_384;
const windowMs = 15 * 60_000;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Please send your inquiry from this website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Please use the inquiry form." },
      { status: 415 },
    );
  const length = Number(request.headers.get("content-length"));
  if (length > maxBodyBytes)
    return NextResponse.json(
      { error: "Your inquiry is too long. Please shorten the details." },
      { status: 413 },
    );

  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("No body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Your inquiry is too long. Please shorten the details." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json(
      { error: "We couldn’t read your inquiry. Please try again." },
      { status: 400 },
    );
  }
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: "Please check your inquiry details.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  if (!emailConfigured())
    return NextResponse.json(
      {
        error:
          "Online sending isn’t available yet. Nothing has been sent. Please copy your inquiry and send it to @rahbakes on Instagram.",
        fallback: true,
      },
      { status: 503 },
    );

  // A bounded per-instance throttle. Add a shared rate limiter/WAF for multi-instance hosting.
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.reset <= now) attempts.delete(key);
  const key = createHash("sha256")
    .update(parsed.data.email.toLowerCase())
    .digest("hex");
  const current = attempts.get(key);
  if (current && current.count >= 3)
    return NextResponse.json(
      {
        error:
          "You’ve made a few inquiries recently. Please try again later or contact Rah Bakes on Instagram.",
        fallback: true,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((current.reset - now) / 1000)),
        },
      },
    );
  if (!current && attempts.size >= 5000)
    return NextResponse.json(
      {
        error:
          "The inquiry form is busy. Please contact Rah Bakes on Instagram.",
        fallback: true,
      },
      { status: 429 },
    );
  attempts.set(key, {
    count: (current?.count ?? 0) + 1,
    reset: current?.reset ?? now + windowMs,
  });
  const result = await deliverInquiry(parsed.data);
  if (!result.ok)
    return NextResponse.json(
      {
        error:
          "We couldn’t send your inquiry. Your details are still here. Please try again or copy your message and contact Rah Bakes on Instagram.",
        fallback: true,
      },
      { status: 502 },
    );
  return NextResponse.json({
    sent: true,
    message:
      "Your inquiry has been sent to Rah Bakes. Please wait for a personal reply to confirm availability and pricing. This is not an order confirmation.",
  });
}

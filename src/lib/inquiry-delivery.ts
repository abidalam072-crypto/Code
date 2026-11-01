import { Resend } from "resend";
import { serializeInquiry, type Inquiry } from "@/lib/inquiry";

export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.INQUIRY_FROM_EMAIL &&
    process.env.INQUIRY_TO_EMAIL,
  );
}

export async function deliverInquiry(data: Inquiry) {
  if (!emailConfigured())
    return { ok: false as const, reason: "unconfigured" as const };
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.INQUIRY_FROM_EMAIL!,
      to: process.env.INQUIRY_TO_EMAIL!,
      replyTo: data.email,
      subject: `Website inquiry: ${data.dessert} · ${data.date}`,
      // Plain text avoids HTML injection; user input is never used as a mail header.
      text: serializeInquiry(data),
    });
    if (result.error || !result.data?.id)
      return { ok: false as const, reason: "delivery" as const };
    return { ok: true as const };
  } catch {
    // Do not log customer details or provider credentials.
    return { ok: false as const, reason: "delivery" as const };
  }
}

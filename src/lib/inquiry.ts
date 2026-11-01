import { z } from "zod";

export function bakeryToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Detroit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function realDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name (at least 2 characters).")
    .max(100, "Please keep your name under 100 characters."),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(35, "Please keep your phone number under 35 characters.")
    .refine(
      (value) =>
        !value ||
        (/^[+\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 7),
      "Please enter a valid phone number, or leave it blank.",
    ),
  dessert: z.enum(["cupcakes", "brownies", "cookies", "mixed"], {
    error: "Please choose a dessert type.",
  }),
  quantity: z
    .number()
    .int("Please enter a whole number.")
    .min(1, "Please request at least one treat.")
    .max(
      1000,
      "For more than 1,000 treats, please contact Rah Bakes directly.",
    ),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a requested date.")
    .refine(realDate, "Please choose a valid calendar date.")
    .refine(
      (value) => value >= bakeryToday(),
      "Please choose today or a future date.",
    ),
  flavor: z
    .string()
    .trim()
    .max(150, "Please keep flavor preferences under 150 characters."),
  design: z
    .string()
    .trim()
    .min(5, "Tell us a little about your idea (at least 5 characters).")
    .max(2000, "Please keep design details under 2,000 characters."),
  budget: z
    .string()
    .trim()
    .max(100, "Please keep your budget note under 100 characters."),
  notes: z
    .string()
    .trim()
    .max(2000, "Please keep additional notes under 2,000 characters."),
  consent: z.literal(true, {
    error: "Please agree to the inquiry privacy notice.",
  }),
  website: z.string().max(0, "Please leave this field empty."),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryFields = Omit<Inquiry, "quantity" | "consent"> & {
  quantity: string;
  consent: boolean;
};
export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

export function serializeInquiry(data: Inquiry) {
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${data.date}T12:00:00Z`));
  return [
    "Hello Rah Bakes! I’d love to ask about a dessert order.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.phone ? [`Phone: ${data.phone}`] : []),
    `Dessert: ${data.dessert}`,
    `Quantity: ${data.quantity}`,
    `Requested date: ${date}`,
    `Preferred flavor: ${data.flavor || "Open to suggestions"}`,
    "",
    `My idea: ${data.design}`,
    ...(data.budget ? [`Budget: ${data.budget}`] : []),
    ...(data.notes ? ["", `Additional notes: ${data.notes}`] : []),
    "",
    "Please let me know availability, pricing, and next steps. I understand this is an inquiry, not a confirmed order.",
  ].join("\n");
}

"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Instagram,
  LoaderCircle,
  Send,
} from "lucide-react";
import {
  inquirySchema,
  serializeInquiry,
  type InquiryErrors,
  type InquiryFields,
} from "@/lib/inquiry";
import { site, menu } from "@/lib/site";

type Props = { emailEnabled: boolean; initialDessert?: string; today: string };

export function InquiryForm({
  emailEnabled,
  initialDessert = "",
  today,
}: Props) {
  const id = useId();
  const [fields, setFields] = useState<InquiryFields>({
    name: "",
    email: "",
    phone: "",
    dessert: ["cupcakes", "brownies", "cookies", "bare-cake", "mixed"].includes(
      initialDessert,
    )
      ? (initialDessert as InquiryFields["dessert"])
      : ("" as InquiryFields["dessert"]),
    quantity: "",
    date: "",
    flavor: "",
    design: "",
    budget: "",
    notes: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "prepared" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  function update<K extends keyof InquiryFields>(
    key: K,
    value: InquiryFields[K],
  ) {
    setFields((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setStatus("idle");
    setSummary("");
    setCopied(false);
  }

  function showFeedback() {
    requestAnimationFrame(() => feedback.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = inquirySchema.safeParse({
      ...fields,
      quantity: fields.quantity.trim() ? Number(fields.quantity) : 0,
    });
    if (!result.success) {
      const nextErrors: InquiryErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof InquiryFields;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setStatus("idle");
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true']")
          ?.focus(),
      );
      return;
    }
    setErrors({});
    const text = serializeInquiry(result.data);
    setSummary(text);
    if (!emailEnabled) {
      setStatus("prepared");
      setMessage("Your message is ready. Nothing has been sent yet.");
      showFeedback();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();
      if (!response.ok || data.sent !== true) {
        setStatus("error");
        setMessage(
          data.error ||
            "We couldn’t send your inquiry. Please try again or use Instagram.",
        );
        if (data.fields)
          setErrors(
            Object.fromEntries(
              Object.entries(data.fields).map(([key, value]) => [
                key,
                (value as string[])[0],
              ]),
            ),
          );
      } else {
        setStatus("sent");
        setSummary("");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage(
        "We couldn’t connect. Your details are still here. Please copy your message and send it on Instagram, or try again.",
      );
    }
    showFeedback();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      summaryRef.current?.focus();
      summaryRef.current?.select();
      setCopied(false);
      setMessage(
        "Please copy the selected message, then paste it into an Instagram message to @rahbakes. Nothing has been sent yet.",
      );
    }
  }

  const inputProps = (key: keyof InquiryFields) => ({
    id: `${id}-${key}`,
    name: key,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });
  const error = (key: keyof InquiryFields) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="field-error">
        {errors[key]}
      </p>
    );

  if (status === "sent")
    return (
      <div
        ref={feedback}
        tabIndex={-1}
        className="inquiry-success"
        role="status"
      >
        <CheckCircle2 size={43} strokeWidth={1.2} aria-hidden="true" />
        <p className="eyebrow">A sweet conversation has started</p>
        <h2>
          Your inquiry
          <br />
          <em>is on its way.</em>
        </h2>
        <p>{message}</p>
        <Link href="/treats" className="button button-outline">
          A little more browsing
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );

  return (
    <form
      ref={formRef}
      method="post"
      onSubmit={submit}
      noValidate
      className="inquiry-form"
    >
      <div className="form-heading">
        <span className="form-step">01 / A LITTLE ABOUT YOU</span>
        <p>Fields marked with * are required.</p>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={`${id}-name`}>Your name *</label>
          <input
            {...inputProps("name")}
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your lovely name"
            maxLength={100}
            required
          />
          {error("name")}
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-email`}>Email address *</label>
          <input
            {...inputProps("email")}
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            maxLength={254}
            required
          />
          {error("email")}
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-phone`}>
            Phone number <span>(optional)</span>
          </label>
          <input
            {...inputProps("phone")}
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="A number to reach you"
            maxLength={35}
          />
          {error("phone")}
        </div>
      </div>
      <div className="form-divider">
        <span className="form-step">02 / THE SWEET DETAILS</span>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={`${id}-dessert`}>Dessert type *</label>
          <select
            {...inputProps("dessert")}
            value={fields.dessert}
            onChange={(e) =>
              update("dessert", e.target.value as InquiryFields["dessert"])
            }
            required
          >
            <option value="" disabled>
              Choose your sweet thing
            </option>
            <option value="cupcakes">Cupcakes</option>
            <option value="brownies">Brownies</option>
            <option value="cookies">Cookies</option>
            <option value="bare-cake">Bare Cake</option>
            <option value="mixed">A little mix</option>
          </select>
          {error("dessert")}
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-quantity`}>
            {fields.dessert === "bare-cake"
              ? "Number of cakes *"
              : "Quantity *"}
          </label>
          <input
            {...inputProps("quantity")}
            type="number"
            inputMode="numeric"
            min={1}
            max={1000}
            step={1}
            placeholder="How many treats?"
            value={fields.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            required
          />
          {error("quantity")}
          <p className="field-hint">
            {fields.dessert === "bare-cake"
              ? "Choose 2, 3, or 4 layers and tell us in your design details. Fruit add-on: $8."
              : `Menu treat quantities: ${menu.servingCounts.join(", ")}. Ask directly about other quantities.`}
          </p>
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-date`}>Requested date *</label>
          <input
            {...inputProps("date")}
            type="date"
            min={today}
            value={fields.date}
            onChange={(e) => update("date", e.target.value)}
            required
          />
          {error("date")}
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-flavor`}>
            Preferred flavor <span>(optional)</span>
          </label>
          <input
            {...inputProps("flavor")}
            placeholder="Chocolate? Vanilla? Open to ideas?"
            value={fields.flavor}
            onChange={(e) => update("flavor", e.target.value)}
            maxLength={150}
          />
          {error("flavor")}
        </div>
        <div className="form-field field-full">
          <label htmlFor={`${id}-design`}>Tell us about your idea *</label>
          <textarea
            {...inputProps("design")}
            placeholder="The occasion, colors, design inspiration… we’d love to hear the little details."
            value={fields.design}
            onChange={(e) => update("design", e.target.value)}
            rows={4}
            maxLength={2000}
            required
          />
          {error("design")}
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-budget`}>
            Budget <span>(optional)</span>
          </label>
          <input
            {...inputProps("budget")}
            placeholder="A range you have in mind"
            value={fields.budget}
            onChange={(e) => update("budget", e.target.value)}
            maxLength={100}
          />
          {error("budget")}
        </div>
        <div className="form-field field-full">
          <label htmlFor={`${id}-notes`}>
            Anything else? <span>(optional)</span>
          </label>
          <textarea
            {...inputProps("notes")}
            placeholder="Other questions or details you’d like to share. Please discuss allergies directly before ordering."
            value={fields.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            maxLength={2000}
          />
          {error("notes")}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      <div className="form-consent">
        <div>
          <input
            {...inputProps("consent")}
            type="checkbox"
            checked={fields.consent}
            onChange={(e) => update("consent", e.target.checked)}
            required
          />
          <label htmlFor={`${id}-consent`}>
            I understand this is an inquiry, not a confirmed order, and agree to
            the{" "}
            <Link href="/privacy" className="inline-link">
              privacy notice
            </Link>
            . *
          </label>
        </div>
        {error("consent")}
      </div>
      <button
        type="submit"
        className="button button-primary form-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="spin" size={17} aria-hidden="true" />
            Sending your inquiry…
          </>
        ) : emailEnabled ? (
          <>
            Send my sweet inquiry
            <Send size={16} aria-hidden="true" />
          </>
        ) : (
          <>
            Prepare my Instagram inquiry
            <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </button>
      <p className="form-footer-note">
        {emailEnabled
          ? "Rah Bakes will reply to discuss availability, pricing, and next steps."
          : "We’ll prepare a message for you to copy and send. This form won’t send anything automatically."}
      </p>
      {(status === "prepared" || status === "error") && (
        <div
          ref={feedback}
          tabIndex={-1}
          className={`inquiry-feedback ${status === "error" ? "feedback-error" : ""}`}
          role="status"
        >
          <p className="eyebrow">
            {status === "error"
              ? "Let’s try another way"
              : "One little step to go"}
          </p>
          <h3>
            {status === "error"
              ? "Your inquiry hasn’t been sent."
              : "Your message is ready."}
          </h3>
          <p>{message}</p>
          <label htmlFor={`${id}-summary`}>Your inquiry message</label>
          <textarea
            id={`${id}-summary`}
            ref={summaryRef}
            value={summary}
            readOnly
            rows={9}
          />
          <div className="feedback-actions">
            <button
              type="button"
              onClick={copy}
              className="button button-primary"
            >
              {copied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  Copy message
                </>
              )}
            </button>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              <Instagram size={16} aria-hidden="true" />
              Open Instagram
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="fine-print">
            Paste your message into a DM to {site.instagramHandle} and send it
            there. Opening Instagram does not send it.
          </p>
        </div>
      )}
    </form>
  );
}

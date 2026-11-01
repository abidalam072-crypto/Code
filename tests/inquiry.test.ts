import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  bakeryToday,
  inquirySchema,
  serializeInquiry,
  type Inquiry,
} from "../src/lib/inquiry";
import { deliverInquiry } from "../src/lib/inquiry-delivery";
import { POST } from "../src/app/api/inquiries/route";

const sample: Inquiry = {
  name: "Test Customer",
  email: "customer@example.com",
  phone: "",
  dessert: "cupcakes",
  quantity: 12,
  date: "2099-05-15",
  flavor: "Vanilla",
  design: "A blush birthday celebration",
  budget: "",
  notes: "",
  consent: true,
  website: "",
};
const envKeys = [
  "RESEND_API_KEY",
  "INQUIRY_FROM_EMAIL",
  "INQUIRY_TO_EMAIL",
] as const;
let originalEnv: Record<string, string | undefined>;
const originalFetch = globalThis.fetch;

beforeEach(() => {
  originalEnv = Object.fromEntries(
    envKeys.map((key) => [key, process.env[key]]),
  );
  for (const key of envKeys) delete process.env[key];
});
afterEach(() => {
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  globalThis.fetch = originalFetch;
});

function configureMockEmail() {
  process.env.RESEND_API_KEY = "unit-test-not-a-real-key";
  process.env.INQUIRY_FROM_EMAIL = "test@example.com";
  process.env.INQUIRY_TO_EMAIL = "bakery@example.com";
}
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("date validation uses Michigan time at a UTC day boundary", () => {
  assert.equal(bakeryToday(new Date("2026-06-01T02:00:00Z")), "2026-05-31");
});

test("a complete inquiry is accepted and whitespace is trimmed", () => {
  const parsed = inquirySchema.parse({ ...sample, name: "  Test Customer  " });
  assert.equal(parsed.name, "Test Customer");
  const cake = inquirySchema.parse({
    ...sample,
    dessert: "bare-cake",
    quantity: 1,
  });
  assert.match(serializeInquiry(cake), /Dessert: Bare Cake/);
});

test("invalid email, dates, quantities, consent, and honeypot are rejected", () => {
  for (const patch of [
    { email: "bad-address" },
    { date: "2020-01-01" },
    { date: "2099-02-30" },
    { quantity: 0 },
    { quantity: 1.5 },
    { consent: false },
    { website: "spam" },
    { phone: "not-a-number" },
    { dessert: "cake" },
  ]) {
    assert.equal(
      inquirySchema.safeParse({ ...sample, ...patch }).success,
      false,
      JSON.stringify(patch),
    );
  }
});

test("copyable inquiry contains requested details and no order confirmation", () => {
  const message = serializeInquiry(sample);
  for (const value of [
    sample.name,
    sample.email,
    sample.design,
    "May 15, 2099",
    "Quantity: 12",
    "not a confirmed order",
  ])
    assert.ok(message.includes(value));
});

test("unconfigured email never claims successful submission", async () => {
  const response = await POST(request(sample));
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.fallback, true);
  assert.equal(body.sent, undefined);
  assert.match(body.error, /Nothing has been sent/);
});

test("API validates fields independently of the browser", async () => {
  const response = await POST(
    request({ ...sample, email: "bad", quantity: -1 }),
  );
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.fields.email);
  assert.ok(body.fields.quantity);
});

test("API rejects cross-origin requests, unsupported content, invalid JSON, and oversized payloads", async () => {
  assert.equal(
    (await POST(request(sample, { origin: "https://unrelated.example" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request(sample, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (
      await POST(
        new Request("http://localhost:3000/api/inquiries", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "not json",
        }),
      )
    ).status,
    400,
  );
  assert.equal((await POST(request({ notes: "a".repeat(17000) }))).status, 413);
});

test("mocked email delivery sends all inquiry details and honors reply-to", async () => {
  configureMockEmail();
  let called = false;
  globalThis.fetch = async (_input, init) => {
    called = true;
    const body = JSON.parse(String(init?.body));
    assert.equal(body.reply_to, sample.email);
    assert.equal(body.to, "bakery@example.com");
    assert.match(body.text, /blush birthday/);
    assert.equal(body.html, undefined);
    return new Response(
      JSON.stringify({ id: "mocked-provider-acceptance-id" }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };
  assert.deepEqual(await deliverInquiry(sample), { ok: true });
  assert.equal(called, true);
});

test("email provider errors are not reported as success", async () => {
  configureMockEmail();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ name: "validation_error", message: "Test rejection" }),
      { status: 422, headers: { "content-type": "application/json" } },
    );
  assert.deepEqual(await deliverInquiry(sample), {
    ok: false,
    reason: "delivery",
  });
  const response = await POST(
    request({ ...sample, email: "failure-case@example.com" }),
  );
  assert.equal(response.status, 502);
  assert.equal((await response.json()).sent, undefined);
});

test("network errors preserve the fallback instead of claiming success", async () => {
  configureMockEmail();
  globalThis.fetch = async () => {
    throw new Error("Test network outage");
  };
  assert.deepEqual(await deliverInquiry(sample), {
    ok: false,
    reason: "delivery",
  });
});

test("the API confirms provider acceptance and throttles repeat submissions", async () => {
  configureMockEmail();
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "mocked-id" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  const data = { ...sample, email: "throttle-case@example.com" };
  for (let i = 0; i < 3; i++) {
    const response = await POST(request(data));
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.sent, true);
    assert.match(result.message, /not an order confirmation/);
  }
  const throttled = await POST(request(data));
  assert.equal(throttled.status, 429);
  assert.ok(Number(throttled.headers.get("Retry-After")) > 0);
});

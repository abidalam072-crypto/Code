import { test, expect, type Page } from "@playwright/test";

async function fillInquiry(page: Page) {
  await page.goto("/custom-orders");
  await page.getByLabel("Your name *").fill("Email UI Test");
  await page.getByLabel("Email address *").fill("test@example.com");
  await page.getByLabel("Dessert type *").selectOption("cookies");
  await page.getByLabel("Quantity *", { exact: true }).fill("12");
  await page.getByLabel("Requested date *").fill("2099-05-15");
  await page
    .getByLabel("Tell us about your idea *")
    .fill("A celebration with golden cookie boxes");
  await page.getByRole("checkbox").check();
}

test("configured email UI shows success only after a successful API response", async ({
  page,
}) => {
  await page.route("**/api/inquiries", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        sent: true,
        message:
          "Your inquiry has been sent to Rah Bakes. This is not an order confirmation.",
      }),
    }),
  );
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send my sweet inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: /Your inquiry.*is on its way/ }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Your inquiry has been sent to Rah Bakes. This is not an order confirmation.",
    ),
  ).toBeVisible();
});

test("provider failure retains details and offers the copyable fallback", async ({
  page,
}) => {
  await page.route("**/api/inquiries", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        error: "We couldn’t send your inquiry. Your details are still here.",
        fallback: true,
      }),
    }),
  );
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send my sweet inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your inquiry hasn’t been sent." }),
  ).toBeVisible();
  await expect(page.getByLabel("Your name *")).toHaveValue("Email UI Test");
  await expect(page.getByLabel("Your inquiry message")).toContainText(
    "golden cookie boxes",
  );
  await expect(
    page.getByRole("button", { name: "Copy message" }),
  ).toBeVisible();
});

test("a connection failure never becomes a success message", async ({
  page,
}) => {
  await page.route("**/api/inquiries", (route) => route.abort("failed"));
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send my sweet inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your inquiry hasn’t been sent." }),
  ).toBeVisible();
  await expect(page.getByText(/We couldn’t connect/)).toBeVisible();
});

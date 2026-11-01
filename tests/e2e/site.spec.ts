import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage renders photography, working destinations, and no horizontal overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "sweetness",
  );
  const heroImage = page.getByAltText(
    "Concept photograph of raspberry-pink cupcakes on a cream cake stand",
  );
  await expect(heroImage).toBeVisible();
  await expect
    .poll(() =>
      heroImage.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBeTruthy();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await expect(
    page.getByRole("link", { name: "Explore Our Treats", exact: true }),
  ).toHaveAttribute("href", "/treats");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await document.fonts.ready;
  });
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("catalog filters categories and inquiry links carry the selected dessert", async ({
  page,
}) => {
  await page.goto("/treats");
  await page.getByRole("button", { name: "Brownies", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card h3")).toHaveText("Brownies");
  await page
    .getByRole("link", { name: "Make an inquiry", exact: true })
    .click();
  await expect(page.getByLabel("Dessert type *")).toHaveValue("brownies");
});

test("gallery filtering, keyboard lightbox, and focus restoration work", async ({
  page,
}) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Cookies", exact: true }).click();
  await expect(page.locator(".gallery-tile")).toHaveCount(2);
  const trigger = page.getByRole("button", {
    name: "Enlarge Golden little moments — concept photograph",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Golden little moments");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading")).toHaveText("A closer look");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("inquiry validates and prepares a message without pretending it was sent", async ({
  page,
}) => {
  await page.goto("/custom-orders");
  await page
    .getByRole("button", { name: "Prepare my Instagram inquiry" })
    .click();
  await expect(
    page.getByText("Please tell us your name (at least 2 characters)."),
  ).toBeVisible();
  await expect(page.getByLabel("Your name *")).toBeFocused();
  await page.getByLabel("Your name *").fill("Website Test");
  await page.getByLabel("Email address *").fill("test@example.com");
  await page.getByLabel("Dessert type *").selectOption("cupcakes");
  await page.getByLabel("Quantity *", { exact: true }).fill("12");
  await page.getByLabel("Requested date *").fill("2099-05-15");
  await page
    .getByLabel("Tell us about your idea *")
    .fill("A blush birthday celebration");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Prepare my Instagram inquiry" })
    .click();
  await expect(
    page.getByText("Your message is ready. Nothing has been sent yet."),
  ).toBeVisible();
  await expect(page.getByLabel("Your inquiry message")).toContainText(
    "A blush birthday celebration",
  );
  await expect(
    page.getByRole("link", { name: /Open Instagram/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/rahbakes/");
  await expect(page.getByText("Your inquiry is on its way.")).toHaveCount(0);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("main pages pass automated WCAG accessibility checks", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/treats",
    "/custom-orders",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
  ]) {
    await page.goto(route);
    await page.locator("h1").waitFor();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, route).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `${route} overflow`,
    ).toBeTruthy();
  }
});

test("all internal navigation destinations render, unknown pages return 404, and preview indexing is disabled", async ({
  request,
}) => {
  for (const route of [
    "/",
    "/treats",
    "/custom-orders",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/opengraph-image",
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }
  expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
});

test("navigation reaches the chosen page and mobile menu closes", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "desktop") {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Our Treats" })
      .click();
    await expect(page).toHaveURL(/\/treats$/);
    return;
  }
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Our Treats/ })
    .click();
  await expect(page).toHaveURL(/\/treats$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".mobile-order")).toBeVisible();
});

test("reduced motion still leaves all content and controls available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page
    .getByRole("link", { name: "Discover our treats" })
    .scrollIntoViewIfNeeded();
  await expect(page.locator(".product-card")).toHaveCount(3);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("inquiry has a usable contact fallback with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/custom-orders`);
  // Playwright text/role selectors skip <noscript>; inspect its actual rendered DOM.
  await expect(page.locator("noscript p")).toBeVisible();
  await expect(page.locator("noscript p")).toContainText(
    "The inquiry helper needs JavaScript.",
  );
  await expect(page.locator(".inquiry-form")).not.toBeVisible();
  await expect(page.locator("noscript a")).toHaveAttribute(
    "href",
    "https://www.instagram.com/rahbakes/",
  );
  await context.close();
});

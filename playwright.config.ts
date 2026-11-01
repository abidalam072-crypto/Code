import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    },
  },
  projects: [
    {
      name: "desktop",
      testMatch: "site.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      testMatch: "site.spec.ts",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    {
      name: "email-ui",
      testMatch: "email.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:3001" },
    },
  ],
  webServer: [
    {
      command: "npm run start -- --port 3000",
      url: "http://127.0.0.1:3000",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: { RESEND_API_KEY: "", INQUIRY_FROM_EMAIL: "", INQUIRY_TO_EMAIL: "" },
    },
    {
      command: "npm run start -- --port 3001",
      url: "http://127.0.0.1:3001",
      reuseExistingServer: false,
      timeout: 60_000,
      // Deliberately fake test settings. Browser intercepts the API; no email is sent.
      env: {
        RESEND_API_KEY: "unit-test-unused-key",
        INQUIRY_FROM_EMAIL: "test@example.com",
        INQUIRY_TO_EMAIL: "test@example.com",
      },
    },
  ],
});

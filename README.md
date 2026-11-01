# Rah Bakes

A complete, responsive boutique bakery website built with **Next.js App Router, TypeScript, Tailwind CSS 4, Motion, Lucide, and Radix Dialog**. Ivory, cocoa, and lavender, locally hosted editorial typography, the user-supplied illustrated logo refined for the website, and concept dessert photography give the site its visual identity.

## Local development

Requires **Node.js 22.13+** (Node 24 LTS recommended) and npm. This project was developed with Node 24.19.0.

```bash
cd /workspace/Code # or your local checkout
npm ci
test -f .env.local || cp .env.example .env.local
npm run dev
```

The development server uses port 3000. No database, external fonts, payment provider, or email credentials are needed for the default Instagram inquiry workflow. Do not create another Git worktree for cloud tasks; use the existing isolated checkout.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
# In a separate terminal, against the production build:
npm run test:e2e
```

`npm test` runs the inquiry validation and API integration tests. Every email request in these tests is mocked; no messages are sent. Browser tests cover desktop and mobile layouts, filtering, inquiry preparation, lightbox navigation/focus, mobile navigation, routing, reduced motion, and automated accessibility checks.

The browser suite uses `/usr/bin/chromium` if available, or a Playwright-installed Chromium. On another machine, run `npx playwright install --with-deps chromium` first. Override the browser path with `PLAYWRIGHT_CHROMIUM_EXECUTABLE` or an existing test server with `PLAYWRIGHT_BASE_URL`. `test:e2e` runs the production server automatically if one is not running. Do not run it against a live customer inbox: its default server environment explicitly disables email delivery.

Stop a development server you started on port 3000 before running the production browser suite. The suite can reuse an existing server on that port, so ensure it serves the intended production build. Email UI checks use a separate local server with fake test settings and intercepted API requests; no email is sent. See [`docs/VALIDATION.md`](docs/VALIDATION.md) for the completed checks and their limits.

## Pages

| Route            | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `/`              | Editorial homepage, featured treats, story, FAQ, and Instagram |
| `/treats`        | Category-filtered product collection                           |
| `/custom-orders` | Validated dessert inquiry and honest delivery/fallback states  |
| `/gallery`       | Filterable masonry gallery, keyboard/touch lightbox            |
| `/about`         | Editable brand introduction and owner story placeholder        |
| `/contact`       | Instagram, optional verified email, inquiry links              |
| `/faq`           | Ordering questions with unconfirmed policies clearly marked    |
| `/privacy`       | Plain-language inquiry privacy notice for owner review         |

`POST /api/inquiries` validates JSON, rejects cross-origin submissions, enforces a request-size limit and honeypot, throttles repeat email addresses, and uses Resend only when fully configured. It returns success only after provider acceptance, never for the unconfigured fallback or provider failure. Provider acceptance does not guarantee inbox delivery or confirm an order. Unknown pages return a designed 404.

## Edit the brand and content

**Start in [`src/lib/site.ts`](src/lib/site.ts).** This is the central configuration for brand colors, optional logo, location, social links, product catalog, gallery photos, draft story, and ordering policies.

- Change `site.colors` to update the theme: the layout exposes these values as CSS variables.
- The refined user-supplied logo lives at `public/images/rahbakes-logo.png`, configured through `site.logo`. Its cupcake-holding hand has been corrected. The full seal is used in the header, mobile menu, footer, About page, touch icon, and social preview; responsive companion lettering keeps the name legible at small sizes. You can replace that asset or change `site.logo` to another local image path.
- Replace images in `public/images/` and edit their paths and honest alt text in the product/gallery data.
- The user-supplied menu is transcribed in `menu` in `src/lib/site.ts`; see [`docs/MENU.md`](docs/MENU.md). Cupcake, brownie, and cookie prices are per item, with quantities of 4, 6, 12, or 24. Category price ranges are derived from these values. The Bare Cake panel lists three flavors, 2/3/4-layer prices, and an $8 fruit add-on. Update the centralized menu to change prices or flavors; photos remain illustrative.
- `categories` covers the three photographed treat categories. `catalogCategories` also includes Bare Cake, which has a price panel without an invented product photo. The inquiry schema and form accept `bare-cake`; when adding another type, update the schema, form, and catalog together.
- Replace the draft story and owner note, and confirm the remaining policies. The phone on the supplied menu is now shown on Contact and in the footer. Lead times, pickup, delivery, deposits, cancellation terms, and the founder's identity remain unconfirmed.
- Gallery entries deliberately reuse three concept photos in different crops. Replace the collection with distinct authorized images of actual bakery products before launch.
- Remove or revise concept-photo captions, the preview collection label, draft story notice, and global photography note **only after** the corresponding content has been replaced and approved.

## Inquiry modes

### Default: Instagram message preparation

Without all three email variables, the form is explicitly labeled as an Instagram inquiry helper. It validates the input, prepares a copyable message, and offers the real [@rahbakes](https://www.instagram.com/rahbakes/) profile. The customer copies and sends the DM themselves. **Preparing, copying, or opening Instagram does not send a message or confirm an order.** Clipboard permission failures fall back to a selectable text area. Form values remain in current-page memory and are not persisted to browser storage.

### Optional: server-side Resend email

1. Create a Resend account and verify a domain you own.
2. Set the following server-only variables in `.env.local` or your deployment provider’s secret settings:

```dotenv
RESEND_API_KEY=your_secret_key
INQUIRY_FROM_EMAIL="Rah Bakes <orders@your-verified-domain.com>"
INQUIRY_TO_EMAIL=the_owners_verified_inbox
```

3. Optionally set `NEXT_PUBLIC_CONTACT_EMAIL` to an owner-approved public email. It is displayed on Contact, the footer, and Privacy; it is independent of the private delivery inbox.
4. Restart the server. `/custom-orders` dynamically detects complete email configuration. The button changes to “Send my sweet inquiry.” Credentials never reach client components.
5. Before public launch, send an owner-authorized test inquiry from the actual deployment and confirm receipt and reply-to behavior. Mocked tests do not verify your domain, API key, inbox, or deliverability.

The server sends plain text and keeps the user-supplied address in `replyTo`. Failures retain the form details and show the copy/Instagram fallback. There is no checkout, payment, promise of availability, automatic customer email, or order management system.

The included throttle is **per server instance**, not a shared distributed limiter. For a public multi-instance deployment, configure your hosting firewall/rate limits (or a shared Redis-backed limiter) before enabling email. A honeypot and email-address throttle do not replace a WAF or spam monitoring. No inquiry contents or API keys are deliberately logged. Confirm your provider’s log handling and inbox retention policies.

## Deployment

### Vercel

1. Import this Git repository into Vercel and select the Next.js preset. Set Node 24.x.
2. Add the environment variables described above. Email variables are optional while using the Instagram fallback.
3. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS origin, without a trailing slash. Public variables are included at build time, so redeploy after changing them.
4. Keep `SITE_LAUNCH_READY=false` for previews. The site sends `noindex, nofollow`, disallows crawling in `robots.txt`, and emits an empty sitemap until you change it to `true` and rebuild. `noindex` is not access control; protect private previews with your hosting provider.
5. Complete [`docs/OWNER-CHECKLIST.md`](docs/OWNER-CHECKLIST.md), replace concept assets, verify every policy, configure the firewall if using email, and test an owner-authorized inquiry. Then set `SITE_LAUNCH_READY=true` and redeploy.

### Node hosting

Use Node 24, run `npm ci && npm run build`, then `npm start` behind an HTTPS reverse proxy. Make the configured environment available at build and runtime. Keep the `.next`, `public`, `package.json`, lockfile, and installed production dependencies. Set `PORT` as needed. Forward the original host/protocol consistently so same-origin inquiry checks work. Forward the browser's `Accept` header and respect `Vary: Accept` for Next.js image responses so AVIF/WebP negotiation works correctly. The first encoding of an image is slower; cache optimized responses at the CDN and use new filenames when replacing photography. Permit outbound HTTPS to `api.resend.com` only if email is enabled. No external image host or font service is required at runtime.

## SEO, performance, and accessibility

- Page-specific metadata, canonical paths, Open Graph PNG, Twitter card, favicon, robots, and sitemap.
- No fabricated reviews, awards, prices, founder, opening hours, dietary claims, or pickup address; no unverified structured business schema.
- Local WebP photographs, responsive Next.js Image, eager hero image, lazy offscreen images, self-hosted fonts, and mostly server-rendered pages.
- Accessible skip link, semantic landmarks, labeled inputs, field-level errors, focus on the first error and feedback, trapped dialog focus, restored gallery focus, Escape/arrow keys, touch swipe, and reduced-motion support.
- Motion is restrained and content remains visible without JavaScript. Interactive filtering, inquiry preparation, mobile navigation, and lightbox require JavaScript.

## Research and asset provenance

See [`docs/BRAND-RESEARCH.md`](docs/BRAND-RESEARCH.md). Instagram's public profile metadata is now accessible, but its product-photo endpoint requires login. No Instagram dessert photos have been downloaded or reused. The current lavender accents and illustrated mark follow the logo supplied by the user; the dessert photographs remain clearly labeled concepts until authorized originals are supplied.

The three WebP images were generated for this project and are explicitly identified as illustrative concept photographs. Their pictured flavors, finishes, and presentation are not verified bakery offerings. All launch content and assets require owner review.

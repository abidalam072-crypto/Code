# Validation — authentic photography redesign

Validated **2026-11-01** in the supplied cloud environment with Node 24.19.0, Next.js 16.4.3, React 19.3.1, and Chromium. These results apply to the authentic-photo redesign, not the earlier concept version.

| Check                          | Result                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run lint`                 | Passed, no lint warnings/errors                                                                                                                  |
| `npm run typecheck`            | Passed, including Next.js route generation                                                                                                       |
| `npm test`                     | **11** inquiry validation/API tests passed; none skipped                                                                                         |
| `npm run build`                | Production compilation, TypeScript, and generation of all 13 route entries passed                                                                |
| `npm run test:e2e`             | **23** desktop/mobile/email-interface browser tests passed; none skipped                                                                         |
| Responsive layout smoke checks | Six main pages at **320, 390, 768, 1024, and 1440px**: 30 checks, no horizontal overflow                                                         |
| Original-file preservation     | Git comparison against upload commit `6e69faa`: all **24 numbered JPEGs unchanged**                                                              |
| Image provenance and paths     | All 18 selected-source SHA-256 checksums match; 18 unique derivatives exist; three generated dessert assets removed after reference checks       |
| Photo HTTP responses           | All 18 WebP paths return 200; representative hero, brownie, and cookie images successfully pass through Next.js AVIF/WebP optimization           |
| Menu preservation              | Deep comparison of the entire `menu` object against `6e69faa` passed: items, prices, quantities, cake flavors/layers, and fruit add-on unchanged |
| Social preview                 | Production social-image route returns 200 and uses the authentic hero photograph and current logo/colors                                         |
| Formatting/whitespace          | Changed source/docs formatted with Prettier; `git diff --check` passed                                                                           |

## Browser coverage

- Actual hero image decodes, meaningful CTA destinations, no client page errors, and full-page desktop/mobile screenshots.
- Menu category filtering, Brownie/Bare Cake inquiry prefilling, and correct quantity label for cakes.
- Authentic gallery category filtering, cookie image matching, full-screen lightbox, arrow-key navigation, Escape, and restored focus.
- Inline inquiry validation, error focus, prepared message, manual Instagram handoff, and no false submission claim.
- Mocked email success, provider rejection, and connection failure; no real email sent.
- Mobile navigation open/close, destination selection, and persistent ordering action.
- Automated WCAG 2/2.1 A/AA checks on all eight main pages, the gallery dialog, mobile navigation, and prepared inquiry state.
- Reduced-motion behavior, no-JavaScript contact fallback, all internal routes, 404 response, social image, and preview robots policy.

The initial browser attempt found a still-running server from the previous website version. It was stopped; Playwright now refuses to reuse occupied ports, preventing silent testing against old assets. A subsequent accessibility check found a hero inset link whose explicit accessible name did not include its visible caption. The unnecessary override was removed. The **final production run passed all 23 tests against fresh servers**, including unmodified accessibility scans on every page.

## Visual/photo review

All 24 originals were inspected before editing; the 18 selected exports were reviewed again after cropping. Small profile overlays in landscape photos 12/13 were identified in the second pass and cropped out. Desktop/mobile home layouts and menu/gallery presentations were reviewed using browser screenshots. The complete selection, crop recipes, actual corrections, and six held-out photographs are documented in [PHOTO-AUDIT.md](PHOTO-AUDIT.md).

The 18 selected JPEG sources total 10.87 MB; their WebP exports total 3.73 MB, about 66% smaller. Next.js additionally selects responsive sizes and modern formats. No upscaling or generated detail was used. No new Lighthouse score or deployed Core Web Vitals result is claimed.

## Limits and owner review

- Automated browser/accessibility checks supplement real-device and human review; they are not an accessibility certification.
- Real email credentials, domain verification, inbox delivery, public DNS/HTTPS hosting, and deployed performance are not validated here. The default Instagram message-preparation workflow remains functional and explicit about what has not been sent.
- The heart-shaped products in 11/23 need identification before catalog use; 22 would benefit from a brighter original. The warm original lighting in 20 is intentionally retained. Celebration photos do not establish a new priced bundle or the Bare Cake decoration included at its menu price.
- Current custom services, flavors pictured, lead times, pickup/delivery, allergen handling, deposits/cancellations, founder biography, draft story, public email, and final domain still need owner confirmation. See [OWNER-CHECKLIST.md](OWNER-CHECKLIST.md).
- Preview indexing remains disabled until the owner finishes the launch checklist and explicitly enables `SITE_LAUNCH_READY`.

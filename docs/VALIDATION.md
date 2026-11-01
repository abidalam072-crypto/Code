# Validation

Validated in the supplied Linux cloud environment with Node 24.19.0, Next.js 16.4.3, React 19.3.1, and Chromium 154.

| Check                           | Result                                                   |
| ------------------------------- | -------------------------------------------------------- |
| `npm ci --no-audit --no-fund`   | Clean lockfile installation passed                       |
| `npm run lint`                  | Passed without warnings                                  |
| `npm run typecheck`             | Passed                                                   |
| `npm test`                      | 11 inquiry validation/API tests passed; none skipped     |
| `npm run build`                 | Production build and static generation passed            |
| `npm run test:e2e`              | 21 browser tests passed; none skipped                    |
| Prettier / Git whitespace check | Passed                                                   |
| Production dependency audit     | 0 known vulnerabilities reported                         |
| Tablet widths 768 / 1024        | Six principal pages rendered without horizontal overflow |

## Browser coverage

- Desktop and emulated iPhone layouts, loaded hero photography, screenshots, and overflow checks.
- Product filtering and selected-dessert handoff to the inquiry form.
- Gallery filters, full-screen lightbox, arrow keys, Escape, and focus restoration.
- Inline form validation, error focus, message preparation, and truthful Instagram fallback.
- Mocked email success, provider rejection, and connection failure; no real messages sent.
- Mobile menu open/close/navigation and persistent ordering action.
- Automated WCAG 2/2.1 A and AA checks on all eight main pages, gallery dialog, mobile menu, and prepared inquiry state.
- Reduced-motion behavior, no-JavaScript contact fallback, routes, 404, social image, and preview robots policy.

Automated accessibility checks supplement human testing; they are not an accessibility certification. Tablet checks are layout smoke checks, not a full real-device test suite.

## What is not yet verified

- Real bakery photography, story, flavors, prices, contact information, service availability, and ordering policies need owner approval.
- Instagram profile research was blocked by the environment's network policy. No profile content was scraped or reused.
- Resend domain verification, actual credentials, recipient inbox, and real delivery are not verified. The default Instagram helper works without email credentials.
- Public DNS, HTTPS hosting, deployed Core Web Vitals, and real-device behavior need validation after deployment.
- Preview indexing remains disabled until the owner completes the launch checklist and enables `SITE_LAUNCH_READY`.
- Cloud configuration publication and restoration in a new task are separate product actions; current-instance checks do not establish those outcomes.

## Local mobile performance audit

Lighthouse 13.6.0, default simulated mobile throttling, against the final local production build with preloaded local fonts and AVIF image delivery:

| Category       | Score |
| -------------- | ----- |
| Performance    | 90    |
| Accessibility  | 100   |
| Best practices | 100   |

- First contentful paint: 0.8 s
- Largest contentful paint: 3.4 s
- Cumulative layout shift: 0
- Total blocking time: 140 ms

The optimized 750px hero photo transfers 37,295 bytes as AVIF, compared with 66,046 bytes for the earlier WebP response. All three dessert photos returned successful AVIF image responses. Development startup was also verified with functional requests to the home, treats, and inquiry pages.

This is a local lab sample, not a field Core Web Vitals result or a deployed performance guarantee. Earlier production-build samples ranged from 88–94 for performance, showing run-to-run variability. Measure the deployed site with final assets and real traffic; an LCP above 2.5 seconds needs follow-up on the actual hosting/CDN. SEO was deliberately excluded from scoring because this preview has noindex enabled.

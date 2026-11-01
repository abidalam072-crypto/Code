# Rah Bakes: before-launch owner checklist

## Identity and assets

- [ ] Approve the proposed wordmark, typography, palette, voice, and overall design, or provide the existing brand assets.
- [x] Supply the original illustrated logo; refined transparent PNG and corrected hand are now included.
- [ ] Review the refined logo and lavender website treatment on desktop and mobile.
- [ ] Supply distinct, high-resolution photos of actual cupcakes, brownies, and cookies and confirm permission to publish them.
- [ ] Replace all three generated concept photos and gallery crops. Update alt text accurately.
- [ ] Approve a founder name, portrait, biography, story, and any personal introduction that should be public.
- [ ] Replace or approve the draft story; remove its draft label only after approval.
- [ ] Remove concept/preview photography labels only after replacing all affected assets with approved real work.

## Products and ordering

- [ ] Verify offered categories, flavors, designs, sizes, and portions.
- [x] Supply menu prices and flavor names; the provided screenshot's per-item prices, treat quantities, cake layer prices, and fruit add-on are now displayed.
- [ ] Confirm current availability and any taxes or charges beyond the supplied menu.
- [ ] Confirm whether custom designs, mixed selections, or celebration orders are offered.
- [ ] Confirm the actual inquiry/ordering channel and the Instagram profile.
- [ ] Provide lead times, booking availability, deposits/payment terms, and cancellation/refund policies.
- [ ] Confirm pickup location and whether it should be publicly disclosed.
- [ ] Confirm delivery availability, areas, fees, and hours, or explicitly state that delivery is unavailable.
- [ ] Provide ingredient/allergen and cross-contact guidance; do not claim allergen-free or dietary suitability without verification.
- [ ] Replace every “to be confirmed” FAQ answer with an approved policy.

## Contact, privacy, and operations

- [x] Supply a contact number on the menu; +1 (586) 224-4623 is now displayed.
- [ ] Provide an owner-approved public email if one should be displayed.
- [ ] If using email delivery, verify the Resend sender domain and recipient inbox. Set the three server-only environment variables securely.
- [ ] Submit an owner-authorized real inquiry from the deployed site and verify receipt, reply-to, error behavior, and spam handling.
- [ ] Confirm the fallback message can be copied and manually sent through Instagram on real phones.
- [ ] Review and approve the privacy notice, legal contact, hosting/email processors, technical logs, and inbox retention practices.
- [ ] Enable hosting/WAF rate limits or a shared limiter before exposing configured email to public multi-instance traffic.

## Technical launch

- [ ] Set the real HTTPS `NEXT_PUBLIC_SITE_URL`; configure domain, TLS, and consistent forwarded host/protocol.
- [ ] Review page titles, descriptions, Open Graph image, favicon, and any final logo assets.
- [ ] Run lint, type-check, inquiry tests, production build, and browser tests.
- [ ] Review desktop, tablet, and phone layouts and keyboard navigation with final content.
- [ ] Check all images and destinations, actual email delivery if enabled, and Instagram on real devices.
- [ ] Check performance on the deployed site with real assets; local tests do not establish deployed Core Web Vitals.
- [ ] Confirm no fabricated prices, reviews, awards, ingredients, policies, or service promises remain.
- [ ] When the owner approves all content, set `SITE_LAUNCH_READY=true`, rebuild/redeploy, and verify robots/sitemap/canonical URLs.

No payment checkout or automatic booking is included. An accepted inquiry email is not an accepted order.

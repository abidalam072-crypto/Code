# Brand research and content provenance

## What was available

The brief identifies the business as **Rah Bakes**, a boutique bakery based in **Sterling Heights, Michigan**, with Instagram at **https://www.instagram.com/rahbakes/**. The brief specifically requests cupcakes, brownies, and cookies as the product categories. These are used as the site’s starting collection, with availability and specific products to be confirmed by the owner.

## Instagram access

A previous direct HTTPS request was blocked by the cloud network proxy. In the updated environment, the public profile now returns **200 OK** with the title **Baker in Michigan (@rahbakes)** and profile metadata. The public photo-data request returns **401**, with `require_login: true`; product photographs, captions, prices, policies, and the full biography could not be retrieved.

No attempt was made to bypass login requirements or disable TLS verification. A browser certificate-store update was rejected by automatic approval review because it would expand persistent browser trust. Existing verified HTTP access was used for the public metadata checks. No Instagram product photos have been downloaded or embedded.

## Design decisions

The user supplied the existing circular Rahbakes illustration: a faceless baker with medium-brown skin and dark hair, a lavender blouse, a cupcake with purple buttercream, script lettering, and a fine double ring. The website uses a refined version of that illustration, including a corrected, natural five-digit hand. This is an illustrated brand mark, not a verified photograph of the founder. Its lavender accents now guide the site's highlights, soft backgrounds, favicon, and social preview, with ivory and cocoa retained for warmth and contrast.

Cormorant Garamond display type, DM Sans body copy, thin editorial rules, an asymmetric curved hero, and restrained Motion reveals complete the visual treatment. The supplied illustration is the source for the current identity; product availability, policies, founder identity, biography, and the draft brand story still require confirmation.

## Images

| File                              | Source                                                                       | Status                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `public/images/cupcakes.webp`     | Original AI-generated editorial cupcake concept                              | Replace with authorized Rah Bakes photography before launch |
| `public/images/brownies.webp`     | Original AI-generated editorial brownie concept                              | Replace with authorized Rah Bakes photography before launch |
| `public/images/cookies.webp`      | Original AI-generated editorial cookie concept                               | Replace with authorized Rah Bakes photography before launch |
| `public/images/rahbakes-logo.png` | User-supplied logo, refined with image generation and corrected hand anatomy | Current website logo; transparent PNG                       |

Images are stored locally, not fetched from Instagram or third-party image services. Some gallery entries reuse images with different crops. Concept labels appear in the hero, catalog, gallery, Instagram section, alt text, and footer. No generated photo is described as real bakery work.

## User-supplied menu

The user supplied a screenshot of the bakery's menu and explicitly requested that its prices be used. The menu confirms five cupcake flavors ($3–$4 each), four brownie options ($3–$4 each), two cookie options ($2–$2.50 each), treat quantities of 4/6/12/24, and Bare Cake with three flavors and layer-based prices of $20/$30/$35 for 2/3/4 layers. Fruits are an $8 add-on. It also supplies the contact number +1 (586) 224-4623. These facts are now in the central configuration; the complete transcription is in `docs/MENU.md`.

## Unconfirmed details

- Exact tone, founder, biography, business story, and any brand guidance beyond the supplied logo.
- Fillings, final finishes, portion dimensions, current availability, and any information beyond the supplied menu.
- Whether custom orders, celebration designs, or mixed boxes are offered.
- Current ordering channel. Instagram is offered as a profile/contact fallback, not described as a verified booking system.
- Lead times, deposits, cancellation/refund terms, pickup address, hours, delivery areas, and fees.
- Ingredients, cross-contact practices, allergen information, dietary accommodations, licenses, and certifications.
- Public email address, legal business contact, and privacy/inbox retention practices.

The central configuration at `src/lib/site.ts` leaves unknown facts unset or explicitly marks them for owner confirmation. All displayed prices come from the user-supplied menu. No review, award, dietary assurance, founder identity, founding date, or service guarantee has been invented.

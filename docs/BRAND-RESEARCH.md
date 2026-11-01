# Brand research and content provenance

## What was available

The brief identifies the business as **Rah Bakes**, a boutique bakery based in **Sterling Heights, Michigan**, with Instagram at **https://www.instagram.com/rahbakes/**. The brief specifically requests cupcakes, brownies, and cookies as the product categories. These are used as the site’s starting collection, with availability and specific products to be confirmed by the owner.

## Instagram access

A direct HTTPS request to the supplied Instagram profile was attempted. The cloud environment’s egress proxy returned **403 Forbidden / CONNECT tunnel failed**. No public profile, posts, captions, logo, menu, highlights, pricing, policies, biography, contact information, or current ordering method could be inspected. This is a network access limitation, not evidence that the account is private or unavailable to customers.

No attempt was made to bypass the network policy. No Instagram photos were scraped, downloaded, or embedded.

## Design decisions

The brief’s ivory, chocolate, blush, and caramel direction became an original visual concept: Cormorant Garamond display type, DM Sans body copy, a lowercase typographic wordmark, thin editorial rules, an asymmetric curved hero, a bakery-style circular seal, restrained Motion reveals, and warm dessert images.

These are design proposals, not findings from the bakery’s actual account. The owner must approve the logo, visual identity, brand voice, and content.

## Images

| File                          | Source                                          | Status                                                      |
| ----------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `public/images/cupcakes.webp` | Original AI-generated editorial cupcake concept | Replace with authorized Rah Bakes photography before launch |
| `public/images/brownies.webp` | Original AI-generated editorial brownie concept | Replace with authorized Rah Bakes photography before launch |
| `public/images/cookies.webp`  | Original AI-generated editorial cookie concept  | Replace with authorized Rah Bakes photography before launch |

Images are stored locally, not fetched from Instagram or third-party image services. Some gallery entries reuse images with different crops. Concept labels appear in the hero, catalog, gallery, Instagram section, alt text, and footer. No generated photo is described as real bakery work.

## Unconfirmed details

- Existing logo, brand colors, exact tone, founder, biography, and business story.
- Actual flavors, fillings, finishes, portion sizes, prices, minimum quantities, and availability.
- Whether custom orders, celebration designs, or mixed boxes are offered.
- Current ordering channel. Instagram is offered as a profile/contact fallback, not described as a verified booking system.
- Lead times, deposits, cancellation/refund terms, pickup address, hours, delivery areas, and fees.
- Ingredients, cross-contact practices, allergen information, dietary accommodations, licenses, and certifications.
- Public email address, phone, legal business contact, and privacy/inbox retention practices.

The central configuration at `src/lib/site.ts` leaves unknown facts unset or explicitly marks them for owner confirmation. No price, review, award, dietary assurance, founder identity, founding date, or service guarantee has been invented.

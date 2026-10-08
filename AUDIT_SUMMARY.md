# JimTech AI Studio Website Audit

**Audit date:** 2026-10-07  
**Requested branch:** `redesign-2026`  
**Initial checkout:** `main`; only `origin/main` existed. Created local `redesign-2026` before implementing the audited changes.

## Findings before fixes

| Severity | Finding | Location | Why it matters | Resolution |
|---|---|---|---|---|
| Critical | No confirmed critical security or availability issue found in the reviewed application source. | API/config/source review | — | No emergency rewrite required. |
| High | Portfolio contained four entries and omitted The Vine Cleaners despite the audit brief requiring five. | `data/projects.ts`, project cards, generated work route and sitemap | Project portfolio did not match the requested offering. | Added a factual fifth project, case-study route generation and sitemap entry. No local screenshot was available; the case study clearly marks the missing asset. |
| High | Curvesnspice still referenced the previous live site instead of the user-provided AI Studio URL. | `data/projects.ts`, case-study CTA | Visitors could be sent to an outdated or unintended destination. | Updated to the supplied URL and verified the destination resolves in the browser; added the requested “Visit Live Website” CTA. |
| Medium | Malformed JSON contact submissions fell through to a generic server-error response. | `app/api/contact/route.ts` | Invalid client input was incorrectly reported as an internal failure. | Invalid JSON now returns HTTP 400 with a validation message; regular form validation and mail delivery paths are retained. |
| Medium | Contact endpoint had no inexpensive bot honeypot. | `components/ContactForm.tsx`, `app/api/contact/route.ts` | Public forms can receive automated spam. | Added a visually hidden honeypot; a filled honeypot receives a generic success response without sending mail. |
| Medium | Root social metadata declared dimensions that did not match the actual logo; `/work` inherited generic sharing metadata. | `app/layout.tsx`, `app/work/page.tsx` | Link previews could have inaccurate dimensions or fail to represent the work page. | Corrected logo dimensions and added explicit work-page Open Graph/Twitter metadata. |
| Medium | Unknown-route responses inherited the site canonical, risking the homepage being declared canonical for 404s. | `app/not-found.tsx` | Search engines could misinterpret errors as duplicate homepage content. | Added a branded 404 with `noindex`, no canonical, and no Open Graph/Twitter metadata. |
| Low | New-tab project/contact links used `noreferrer` without explicit `noopener`. | Project detail and WhatsApp links | Explicit opener isolation is clearer and more portable. | Updated external new-tab anchors to `rel="noopener noreferrer"`. |
| Low | Lolah’s existing booking-form screenshot was not included in its project gallery. | `data/projects.ts` | The case study omitted an existing relevant real asset. | Added the existing booking-form screenshot and descriptive alt text. |
| Improvement | The requested Vine Cleaners image folder/screenshot was absent; its public domain currently displays a “Coming Soon” page. | `public/projects/the-vine-cleaners/`, `https://www.thevinecleaners.co.uk/` | A fabricated image or an unqualified “live site” claim would be misleading. | Created the asset folder with `.gitkeep`; no fake screenshot was created. The case-study CTA labels the provided URL as currently unavailable. |

## Additional checks

- Confirmed no source references to Latobil Interior, Fabrics by Efftee, or Gabel Travels.
- Confirmed SMTP values are loaded from environment variables; `.env.example` contains placeholders only. No secret values were found in application source.
- Reviewed the Next.js 16 local documentation before changing metadata/not-found behavior.
- Preserved the existing contact API delivery logic, project-data-driven routes, metadata architecture, visual system, reduced-motion CSS, and mobile navigation.

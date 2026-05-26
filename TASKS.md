# Gopalsons Website — Development Task List

> **Methodology:** Spec-Driven Development (SDD)  
> **Reference Spec:** `SPEC.md`  
> **Status Legend:** `[ ]` Not Started | `[~]` In Progress | `[x]` Done

---

## Phase 0 — Planning & Specs ✅

- [x] **T-00:** Fetch and analyse reference website
- [x] **T-01:** Write full `SPEC.md` (design system, sections, behaviours, a11y, SEO)
- [x] **T-02:** Write `TASKS.md` (this file)

---

## Phase 1 — Project Scaffolding

- [ ] **T-10:** Create `index.html` with HTML5 boilerplate
  - DOCTYPE, lang="en", charset UTF-8
  - Viewport meta
  - SEO meta (title, description, Open Graph)
  - Google Fonts `<link>` for Inter
  - `<link rel="stylesheet" href="styles.css">`
  - `<script defer src="script.js">`

- [ ] **T-11:** Create empty `styles.css` with CSS custom properties block
  - All colour tokens from SPEC §5.1
  - All typography tokens from SPEC §5.2
  - All spacing, radius, shadow tokens from SPEC §5.3–5.5
  - CSS reset / base styles

- [ ] **T-12:** Create empty `script.js` with DOMContentLoaded wrapper

---

## Phase 2 — Navigation Component

- [ ] **T-20:** HTML — `<header id="navbar">` with nav brand, links, CTA, hamburger (SPEC §6.1)
- [ ] **T-21:** CSS — Nav desktop layout: flexbox, fixed positioning, brand group, links group
- [ ] **T-22:** CSS — Nav `.scrolled` state (background + shadow)
- [ ] **T-23:** CSS — Mobile drawer styles, hamburger styles, open/close transitions
- [ ] **T-24:** JS — Scroll listener → add/remove `.scrolled` on `#navbar`
- [ ] **T-25:** JS — Hamburger click → toggle `.open` on `#navDrawer`, toggle icon ☰/✕
- [ ] **T-26:** JS — Close drawer when drawer link is clicked
- [ ] **T-27:** JS — `IntersectionObserver` → highlight active nav link

---

## Phase 3 — Hero Section

- [ ] **T-30:** HTML — `<section id="hero">` with left (text) + right (image) columns (SPEC §6.2)
  - Location badge
  - H1 + accent span
  - Tagline paragraph
  - Two CTA buttons
  - Store image with alt text

- [ ] **T-31:** CSS — Hero section: two-column grid, gradient background, typography sizing
- [ ] **T-32:** CSS — Hero buttons: primary filled + secondary outline styles
- [ ] **T-33:** CSS — Hero image: rounded corners, box-shadow, object-fit: cover
- [ ] **T-34:** CSS — Hero responsive: single column on mobile, adjusted font sizes

---

## Phase 4 — Products Section

- [ ] **T-40:** HTML — `<section id="products">` with section header + product card grid (SPEC §6.3)
  - Section label, H2, description
  - 6 product cards (image, h3, description, "Learn more" link)

- [ ] **T-41:** CSS — Products section: alternate background colour (`--color-bg-alt`)
- [ ] **T-42:** CSS — Section header: centred, label styling, H2 styling
- [ ] **T-43:** CSS — Product cards grid: `grid-template-columns: repeat(3, 1fr)` desktop
- [ ] **T-44:** CSS — Product card: image height, text padding, hover translate + shadow
- [ ] **T-45:** CSS — "Learn more" link: blue with arrow symbol
- [ ] **T-46:** CSS — Products grid responsive: 2 columns tablet, 1 column mobile

---

## Phase 5 — About / Trust Section

- [ ] **T-50:** HTML — `<section id="about">` with left (text) + right (image/testimonial) (SPEC §6.4)
  - Section label, H2, paragraph
  - 3 feature rows with icon + title + description
  - Store image
  - Testimonial carousel: quote block + 5 dot indicators

- [ ] **T-51:** CSS — About section: two-column grid, light accent background
- [ ] **T-52:** CSS — Feature rows: flex layout, icon circle, text group
- [ ] **T-53:** CSS — About image: rounded, shadow, full width of column
- [ ] **T-54:** CSS — Testimonial block: card style, italic quote, attribution
- [ ] **T-55:** CSS — Carousel dots: flex row, circle bullets, active state (filled)
- [ ] **T-56:** JS — Testimonial carousel: `setInterval` auto-advance every 4s, dot click handler
- [ ] **T-57:** CSS — About section responsive: stacked column on tablet/mobile

---

## Phase 6 — Contact Section

- [ ] **T-60:** HTML — `<section id="contact">` with two columns (SPEC §6.5)
  - H2, description paragraph
  - 3 store detail blocks (icon + label + value)
  - Inquiry form: Full Name, Phone, Textarea, Submit button

- [ ] **T-61:** CSS — Contact section: two-column grid, padding
- [ ] **T-62:** CSS — Store detail block: icon circle, text label, value text
- [ ] **T-63:** CSS — Form: input/textarea common styles, focus ring, label styles
- [ ] **T-64:** CSS — Submit button: full-width, primary blue, hover darken
- [ ] **T-65:** JS — Form submit: `preventDefault`, HTML5 validity check, show toast
- [ ] **T-66:** CSS — Toast notification: fixed bottom-right, green, slide-in animation
- [ ] **T-67:** JS — Hide toast after 3 seconds
- [ ] **T-68:** CSS — Contact responsive: stacked column on mobile

---

## Phase 7 — Footer

- [ ] **T-70:** HTML — `<footer>` with brand block + nav links + copyright bar (SPEC §6.6)
- [ ] **T-71:** CSS — Footer: navy background, white text, two-column or centred layout
- [ ] **T-72:** CSS — Footer brand: G badge circle, store name, tagline
- [ ] **T-73:** CSS — Footer links: vertical list, hover underline
- [ ] **T-74:** CSS — Copyright bar: border-top, small text, centred
- [ ] **T-75:** CSS — Footer responsive: stacked on mobile

---

## Phase 8 — Polish & QA ✅

- [x] **T-80:** Smooth scroll — JS `scrollIntoView` for all `<a href="#…">` clicks
- [x] **T-81:** CSS transitions — Add `transition` to all interactive elements (buttons, cards, links)
- [x] **T-82:** Verify all images load (reference CDN URLs) — 8 images checked ✅
- [x] **T-83:** Validate HTML structure — 1 `<h1>`, `<h2>` per section, `<h3>` sub-items ✅
- [x] **T-84:** Fix nav contrast — navbar now has permanent navy background (was transparent on load)
- [x] **T-85:** Keyboard a11y — skip-to-content link added; `scroll-padding-top` set; all focus rings present
- [x] **T-86:** Mobile layout — responsive breakpoints at 639px and 768px ✅
- [x] **T-87:** Desktop layout — 1024px+ full two-column grid layouts ✅
- [x] **T-88:** ARIA — all `alt`, `aria-label`, `aria-expanded`, `aria-labelledby`, `aria-live` validated ✅
- [x] **T-89:** CSS bug fixed — removed invalid `aria-hidden: false` property from `.toast.show` rule
         Fixed duplicate `"` in testimonial (CSS `::before` quote + text quote)

---

## Dependency Graph

```
T-10, T-11, T-12   ← foundation (run in parallel)
     ↓
T-20 → T-21..T-27  ← nav (HTML then CSS then JS)
T-30 → T-31..T-34  ← hero
T-40 → T-41..T-46  ← products
T-50 → T-51..T-57  ← about
T-60 → T-61..T-68  ← contact
T-70 → T-71..T-75  ← footer
     ↓
T-80..T-89         ← polish & QA (run after all sections)
```

---

## Phase 9 — Google Maps Embed & Real Store Details

- [x] **T-90:** Update real address → `Samrat Ashok Nagar, Kashiram Nagar, Moradabad, UP 244001`
- [x] **T-91:** Update real phone number → `+91 75992 95513`
- [x] **T-92:** Update hero + nav "Get Directions" link to real address URL
- [x] **T-93:** HTML — Add `<iframe>` Google Maps embed below contact grid (full-width)
  - Embed URL: address-based query `Samrat+Ashok+Nagar,Kashiram+Nagar,Moradabad,UP+244001`
  - Attributes: `loading="lazy"`, `title`, `aria-label`, `allowfullscreen`
  - Fallback link for users without iframe support
- [x] **T-94:** CSS — Map container: full-width, `aspect-ratio: 16/7`, rounded corners, shadow, margin-top
- [x] **T-95:** CSS — Map responsive: reduce height to `aspect-ratio: 4/3` on mobile
- [x] **T-96:** Update "Get Directions" href in hero to use real address

---

## Phase 10 — Product Listing Pages (PLP)

- [x] **T-100:** Add Phase 10 tasks to TASKS.md
- [x] **T-101:** Create `plp.html` — full PLP page (nav, breadcrumb bar, category hero, products grid, footer)
- [x] **T-102:** Create `plp.js` — CATALOG data (4 products × 6 categories), URL param reading, card rendering, localStorage merge
- [x] **T-103:** Update all 6 "Learn more" links in `index.html` → `plp.html?category=<slug>`
- [x] **T-104:** Add Category `<select>` dropdown to admin Add Product form in `index.html`
- [x] **T-105:** Add Category column to admin CSV template (`name,description,imageUrl,category`)
- [x] **T-106:** Update `script.js` — save `category` on add product; show Category column in Manage List table; parse `category` from CSV
- [x] **T-107:** Add PLP CSS to `styles.css` — `.sr-only`, `select` styling, breadcrumb bar, plp-hero, grid toolbar, plp-count, plp-empty, responsive rules

---

## Phase 11 — Product Detail Page (PDP)

- [x] **T-110:** Add Phase 11 tasks to TASKS.md
- [x] **T-111:** Create `pdp.html` — full PDP page (nav, breadcrumb, product hero, specs panel, enquiry CTA, related products grid, footer)
- [x] **T-112:** Create `pdp.js` — read `id` + `category` URL params, look up product in CATALOG + localStorage, render all PDP sections
- [x] **T-113:** Update `plp.js` — "Enquire Now" card links changed to `pdp.html?category=<slug>&id=<id>` to navigate to PDP
- [x] **T-114:** Add PDP CSS to `styles.css` — `.pdp-hero`, `.pdp-specs`, `.pdp-enquire-banner`, `.pdp-related`, responsive rules

---

## Acceptance Criteria

A task is **Done** when:
1. The visual output matches the reference URL for that section.
2. The section is responsive across all 3 breakpoints.
3. All interactive states (hover, focus, active) work as specified.
4. No new lint / console errors are introduced.
5. Accessibility attributes are present and correct.

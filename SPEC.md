# Gopalsons Sanitary Supply — Website Specification

> **Version:** 1.0  
> **Date:** 2026-05-26  
> **Reference URL:** https://gopalsons-sanitary-supply--jaswant.replit.app/  
> **Methodology:** Spec-Driven Development (SDD)

---

## 1. Project Overview

**Business:** Gopalsons — a neighbourhood sanitary / hardware showroom located in Kashiram, Moradabad, Uttar Pradesh, India.  
**Purpose:** Single-page marketing website to showcase products, build trust, and drive in-store visits & phone enquiries.  
**Type:** Static single-page website (HTML5 + CSS3 + Vanilla JavaScript).

---

## 2. Goals & Success Criteria

| Goal | Measurable Criterion |
|---|---|
| Faithful visual replica of reference site | Every section matches layout, typography, and colour of the reference |
| Fully responsive | Renders correctly on 320 px–1920 px wide viewports |
| Accessible | Semantic HTML, `aria-label` attributes, sufficient colour contrast (WCAG AA) |
| Fast | No external JS frameworks; images sourced from reference CDN |
| Functional navigation | Smooth-scroll to all anchor sections |
| Functional contact form | Client-side validation; shows a success toast on submit |

---

## 3. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Markup | HTML5 | Semantic structure, SEO |
| Styling | CSS3 (custom properties + Flexbox + Grid) | No build step required |
| Scripting | Vanilla JavaScript (ES6+) | Lightweight, no dependencies |
| Icons | Inline SVG + Unicode symbols | Zero network requests for icons |
| Fonts | Google Fonts — *Inter* (sans-serif) | Clean, modern look matching reference |
| Images | Hosted on reference CDN (`gopalsons-sanitary-supply--jaswant.replit.app`) | Authentic imagery |

---

## 4. File Structure

```
GopalSons/
├── SPEC.md        ← This document
├── TASKS.md       ← Development task list
├── index.html     ← Single HTML page
├── styles.css     ← All styles
└── script.js      ← All JS behaviour
```

---

## 5. Design System

### 5.1 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#1a3c6e` | Navy – nav background, headings |
| `--color-primary-dark` | `#122a52` | Darker navy – hover states |
| `--color-accent` | `#2563eb` | Blue – CTA buttons, links |
| `--color-accent-hover` | `#1d4ed8` | Darker blue – button hover |
| `--color-accent-light` | `#eff6ff` | Light blue tint – section backgrounds |
| `--color-text` | `#1f2937` | Dark grey – body text |
| `--color-text-muted` | `#6b7280` | Mid grey – secondary text |
| `--color-bg` | `#ffffff` | White – default background |
| `--color-bg-alt` | `#f9fafb` | Off-white – alternate sections |
| `--color-border` | `#e5e7eb` | Light grey – dividers, input borders |
| `--color-success` | `#16a34a` | Green – form success toast |

### 5.2 Typography

| Token | Value |
|---|---|
| `--font-sans` | `'Inter', system-ui, sans-serif` |
| Base size | `16px` |
| `--text-xs` | `0.75rem` |
| `--text-sm` | `0.875rem` |
| `--text-base` | `1rem` |
| `--text-lg` | `1.125rem` |
| `--text-xl` | `1.25rem` |
| `--text-2xl` | `1.5rem` |
| `--text-3xl` | `1.875rem` |
| `--text-4xl` | `2.25rem` |
| `--text-5xl` | `3rem` |
| Line height | `1.6` |

### 5.3 Spacing Scale

`4px` base unit. Common values: `4, 8, 12, 16, 24, 32, 48, 64, 96 px`.

### 5.4 Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `12px` |
| `--radius-xl` | `16px` |
| `--radius-full` | `9999px` |

### 5.5 Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |

---

## 6. Page Sections (Component Specifications)

---

### 6.1 Navigation Bar (`<header>` / `<nav>`)

**Behaviour:** Fixed at the top. Adds `.scrolled` class (adds background + shadow) after user scrolls 50 px down. Opens mobile drawer on hamburger click.

**Desktop Layout:**
- Left group: circular `G` logo badge + "Gopalsons" wordmark + "SANITARY STORE" subtitle pill
- Right group: navigation links `Products | Why Choose Us | Contact` + primary CTA button "Call Us"

**Mobile Layout (≤ 768 px):**
- Hamburger icon (☰) on the right.
- Full-width overlay drawer with stacked links slides down on toggle.

**DOM Structure:**
```
<header id="navbar">
  <nav class="nav-container">
    <div class="nav-brand">
      <div class="nav-logo">G</div>
      <div class="nav-brand-text">
        <span class="nav-title">Gopalsons</span>
        <span class="nav-subtitle">SANITARY STORE</span>
      </div>
    </div>
    <ul class="nav-links">
      <li><a href="#products">Products</a></li>
      <li><a href="#about">Why Choose Us</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="tel:+910000000000" class="btn btn-primary nav-cta">Call Us</a>
    <button class="nav-hamburger" aria-label="Toggle navigation">☰</button>
  </nav>
  <div class="nav-drawer" id="navDrawer">…stacked links…</div>
</header>
```

---

### 6.2 Hero Section (`#hero`)

**Layout:** Two equal columns on desktop; single stacked column on mobile.

**Left Column:**
- Small badge: `📍 Kashiram, Moradabad`
- H1: `Gopalsons` (large, navy)
- H2 span: `SANITARY STORE` (blue accent)
- Tagline paragraph: *"Your neighbourhood hardware showroom for reliable sanitary goods, pipes, and fittings. Serving homes and professionals in Moradabad."*
- Two CTA buttons:
  - Primary: `📞 Call Us` → `tel:+910000000000`
  - Secondary (outline): `🗺 Get Directions` (no href required – opens Google Maps intent)

**Right Column:**
- `<img>` with `src="https://gopalsons-sanitary-supply--jaswant.replit.app/hero-bg.jpg"` and `alt="Store Interior"`
- Image has `border-radius: 16px` and a subtle drop shadow.

**Background:** Gradient `linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)`.

---

### 6.3 Products Section (`#products`)

**Section Header:**
- Small label: `✦ Everything You Need` (uppercase, blue, letter-spaced)
- H2: `Solid Plumbing. Trusted Quality.`
- Subtext paragraph: *"We stock high-quality components for every stage of your plumbing project."*

**Product Cards Grid:** 3 columns on desktop, 2 on tablet, 1 on mobile. 6 cards total.

| # | Name | Description | Image URL |
|---|---|---|---|
| 1 | Taps & Faucets | Premium chrome and brass fittings for bathrooms and kitchens. | `.../taps.jpg` |
| 2 | Pipes & Fittings | Durable PVC, CPVC, and UPVC pipes for all plumbing needs. | `.../pipes.jpg` |
| 3 | Bathroom Fixtures | Modern showerheads, valves, and bath accessories. | `.../fixtures.jpg` |
| 4 | Water Tanks | High-capacity, UV-protected storage solutions. | `.../tank.jpg` |
| 5 | Plumbing Accessories | Tools, sealants, and essential repair components. | `.../accessories.jpg` |
| 6 | Basin & Sinks | Elegant ceramic wash basins and stainless steel sinks. | `.../basin.jpg` |

**Card Anatomy:**
```
┌─────────────────┐
│   [Image 240px] │ ← overflow hidden, object-fit: cover
├─────────────────┤
│  Category Name  │ ← h3, 1.1rem
│  Description    │ ← muted, 0.875rem
│  [Learn More →] │ ← text link, blue
└─────────────────┘
```

Card hover: translate Y -4px + elevate shadow.

---

### 6.4 About / Trust Section (`#about`)

**Layout:** Two columns on desktop. Left = text content. Right = image + testimonial carousel.

**Left Column:**
- Small label: `✦ Why Choose Us`
- H2: `Built on Trust & Local Expertise`
- Paragraph about philosophy.
- 3 feature rows (icon + title + text):
  1. 🏅 **Quality Assured** — We only stock brands that meet professional standards.
  2. 💬 **Expert Advice** — Not sure what you need? Our team has the technical know-how.
  3. 📍 **Local Availability** — Fully stocked inventory right here in Kashiram.

**Right Column:**
- Large store image (`hero-bg.jpg`) with rounded corners.
- Testimonial carousel below: 5 thumbnail dots; displayed quote:  
  *"The most reliable sanitary store in Kashiram. Great prices and solid advice."*  
  Attribution: `— Local Plumber`  
- Auto-advances every 4 seconds. Dots are clickable.

---

### 6.5 Contact Section (`#contact`)

**Layout:** Two columns on desktop; single column on mobile.

**Left Column — Store Details:**
- H2: `Visit the Store`
- Paragraph: *"Have a question or need a specific part? Drop by or give us a call."*
- Three detail blocks (icon + label + value):
  1. 🏠 **Address**: Kashiram, Moradabad, Uttar Pradesh
  2. 🕐 **Business Hours**: Mon – Sat: 9:00 AM – 8:00 PM / Sunday: Closed
  3. 📞 **Contact**: +91 00000 00000 / info@gopalsons.com

**Right Column — Inquiry Form:**
- H3: `Send an Inquiry`
- Fields:
  - Text input: `Full Name` (required)
  - Tel input: `Phone Number` (required, pattern: digits)
  - Textarea: `Message / Part Request` (required, rows=5)
- Submit button: `Send Message` (full-width, primary blue)
- On valid submission: show green toast *"Message sent! We'll get back to you shortly."*
- On invalid: native HTML5 validation messages shown.

---

### 6.6 Footer

**Layout:** Single column centred on mobile; two columns (brand left, links right) on desktop.

**Content:**
- Left: `G` badge + `Gopalsons Sanitary Store` + tagline *"Kashiram, Moradabad, UP. Serving the community with quality hardware."*
- Right: Nav links (Products, Why Choose Us, Contact)
- Bottom bar: `© 2026 Gopalsons. All rights reserved.`
- Background: navy (`--color-primary`); text: white.

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | `< 640px` | Single column, hamburger menu, smaller headings |
| Tablet | `640px – 1023px` | 2-column product grid, stacked about/contact |
| Desktop | `≥ 1024px` | Full side-by-side layouts, nav bar visible |

---

## 8. JavaScript Behaviour Specifications

| Feature | Trigger | Behaviour |
|---|---|---|
| Nav scroll style | `window.scroll` | Add/remove `.scrolled` class at 50px threshold |
| Mobile drawer | Hamburger `click` | Toggle `.open` on `#navDrawer`; toggle hamburger icon ☰ ↔ ✕ |
| Close drawer on link click | Link `click` inside drawer | Remove `.open` from drawer |
| Smooth scroll | All `<a href="#…">` | `scrollIntoView({ behavior: 'smooth' })` |
| Testimonial carousel | `setInterval` 4000ms | Cycle through 5 slide states; update dot active class |
| Dot click | Dot `click` | Jump to that slide index |
| Form submission | `submit` | Prevent default; validate; show toast for 3s then hide |
| Active nav highlight | `IntersectionObserver` | Add `.active` class to nav link whose section is ≥ 40% visible |

---

## 9. Accessibility Requirements

- All `<img>` elements must have descriptive `alt` text.
- Navigation links must be keyboard-focusable with visible focus ring.
- Form inputs must have associated `<label>` elements.
- Colour contrast ratio ≥ 4.5:1 for normal text against background.
- Hamburger button must have `aria-label="Toggle navigation"` and `aria-expanded` attribute.
- Carousel: dots must have `aria-label="Go to slide N"`.

---

## 10. SEO Requirements

- `<title>`: `Gopalsons Sanitary Store | Kashiram, Moradabad`
- `<meta name="description">`: 155 characters describing the store.
- Semantic heading hierarchy: one `<h1>`, then `<h2>` per section, `<h3>` for sub-items.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Open Graph tags for social sharing.

---

## 11. Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. No IE11 support required.

---

## 12. Out of Scope

- Backend / server-side processing
- CMS integration
- E-commerce / checkout
- Live search
- Map embed (Google Maps) — placeholder text only

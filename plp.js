'use strict';

// =============================================================
// Gopalsons — plp.js
// Product Listing Page: catalog data + rendering
// =============================================================

const BASE_IMG    = 'https://gopalsons-sanitary-supply--jaswant.replit.app/';
const STORAGE_KEY = 'gopalsons_custom_products';

// ── Category catalog: 4 products per category ────────────────
const CATALOG = {
  'taps-faucets': {
    label:       '✦ Taps & Faucets',
    name:        'Taps & Faucets',
    description: 'Premium chrome and brass fittings for bathrooms and kitchens. Browse our full range of single taps, mixers, and concealed valves.',
    image:       BASE_IMG + 'taps.jpg',
    products: [
      { id: 'tf-1', name: 'Single Handle Basin Tap',  description: 'Sleek chrome finish with 360° swivel spout. Easy single-hand operation for wash basins.',       imageUrl: BASE_IMG + 'taps.jpg' },
      { id: 'tf-2', name: 'Pillar Cock Tap',           description: 'Heavy-duty brass body, ISI marked. Ideal for washroom and kitchen sink installations.',        imageUrl: BASE_IMG + 'taps.jpg' },
      { id: 'tf-3', name: 'Kitchen Sink Mixer',        description: 'Hot & cold water mixer with pull-out spray head and flexible hose. 360° swivel neck.',        imageUrl: BASE_IMG + 'taps.jpg' },
      { id: 'tf-4', name: 'Concealed Angle Valve',     description: 'Quarter-turn ceramic disc cartridge, corrosion-resistant chrome finish. Easy wall fitting.',  imageUrl: BASE_IMG + 'taps.jpg' },
    ]
  },
  'pipes-fittings': {
    label:       '✦ Pipes & Fittings',
    name:        'Pipes & Fittings',
    description: 'Durable PVC, CPVC, and UPVC pipes and fittings for every plumbing need — from domestic supply lines to underground drainage layouts.',
    image:       BASE_IMG + 'pipes.jpg',
    products: [
      { id: 'pf-1', name: 'CPVC Hot Water Pipe ½"',      description: 'High-temperature rated for hot & cold supply lines. ISI certified. Available in 3 m lengths.', imageUrl: BASE_IMG + 'pipes.jpg' },
      { id: 'pf-2', name: 'PVC Column Pipe 4"',            description: 'Deep borewell grade, thick-walled, UV stabilised. Compatible with all standard submersibles.', imageUrl: BASE_IMG + 'pipes.jpg' },
      { id: 'pf-3', name: 'UPVC Pressure Pipe',            description: 'For underground water supply lines. High impact strength, chemical resistant interior.',       imageUrl: BASE_IMG + 'pipes.jpg' },
      { id: 'pf-4', name: 'Elbow & T-Joint Fitting Set',   description: 'Full range: 90°/45° elbows, T-joints, couplers — all standard sizes and schedules.',          imageUrl: BASE_IMG + 'pipes.jpg' },
    ]
  },
  'bathroom-fixtures': {
    label:       '✦ Bathroom Fixtures',
    name:        'Bathroom Fixtures',
    description: 'Modern showerheads, pressure valves, and bath accessories to upgrade any bathroom to a contemporary finish.',
    image:       BASE_IMG + 'fixtures.jpg',
    products: [
      { id: 'bf-1', name: 'Overhead Rain Shower Head',   description: 'Large 8" round shower head with chrome anti-limescale nozzles. Wall or ceiling mount.',   imageUrl: BASE_IMG + 'fixtures.jpg' },
      { id: 'bf-2', name: 'Pressure Balance Valve',       description: 'Thermostatic temperature control for safe, consistent shower temperature at all times.',   imageUrl: BASE_IMG + 'fixtures.jpg' },
      { id: 'bf-3', name: 'Wall-Mount Bath Spout',        description: 'Chrome-plated deck-mounted bath filler spout. Smooth flow, easy installation.',           imageUrl: BASE_IMG + 'fixtures.jpg' },
      { id: 'bf-4', name: 'Adjustable Shower Rod Set',    description: 'Tension-mount design, adjustable 120–200 cm. Includes rings and decorative end caps.',    imageUrl: BASE_IMG + 'fixtures.jpg' },
    ]
  },
  'water-tanks': {
    label:       '✦ Water Tanks',
    name:        'Water Tanks',
    description: 'High-capacity, UV-protected storage solutions for domestic rooftop and underground cistern installations.',
    image:       BASE_IMG + 'tank.jpg',
    products: [
      { id: 'wt-1', name: 'Overhead Loft Tank 500 L',        description: 'Triple-layer UV-protected. Food-grade polyethylene, ISI certified, vented lid.',           imageUrl: BASE_IMG + 'tank.jpg' },
      { id: 'wt-2', name: 'Underground Sump Tank 1000 L',    description: 'Heavy-duty black polyethylene, ISI certified, anti-microbial, seamless construction.',     imageUrl: BASE_IMG + 'tank.jpg' },
      { id: 'wt-3', name: 'Overhead Tank 1500 L',             description: 'White food-grade, anti-bacterial treated, wide-mouth lid for easy interior cleaning.',     imageUrl: BASE_IMG + 'tank.jpg' },
      { id: 'wt-4', name: 'Narrow Space Tank 300 L',          description: 'Slim profile for small rooftops or balcony installations. Triple-layer UV protection.',   imageUrl: BASE_IMG + 'tank.jpg' },
    ]
  },
  'plumbing-accessories': {
    label:       '✦ Plumbing Accessories',
    name:        'Plumbing Accessories',
    description: 'Tools, sealants, and essential components for every stage of a plumbing job — from new installations to quick repairs.',
    image:       BASE_IMG + 'accessories.jpg',
    products: [
      { id: 'pa-1', name: 'PTFE Thread Seal Tape',        description: '12 m roll standard white Teflon tape. Essential for all threaded pipe and fitting joints.',   imageUrl: BASE_IMG + 'accessories.jpg' },
      { id: 'pa-2', name: 'Ratchet PVC Pipe Cutter',       description: 'Clean, burr-free cuts up to 42 mm OD. Ergonomic one-hand ratchet action mechanism.',         imageUrl: BASE_IMG + 'accessories.jpg' },
      { id: 'pa-3', name: 'Pipe Thread Jointing Compound', description: 'Non-hardening sealant paste (200 g) for metal threaded fittings and connections.',           imageUrl: BASE_IMG + 'accessories.jpg' },
      { id: 'pa-4', name: 'Full-Bore Ball Valve ¾"',        description: 'Brass lever-type isolation valve for main supply lines. ISI certified, full-bore design.',  imageUrl: BASE_IMG + 'accessories.jpg' },
    ]
  },
  'basin-sinks': {
    label:       '✦ Basin & Sinks',
    name:        'Basin & Sinks',
    description: 'Elegant ceramic wash basins and stainless steel sinks for kitchens and bathrooms across all styles and budgets.',
    image:       BASE_IMG + 'basin.jpg',
    products: [
      { id: 'bs-1', name: 'Pedestal Wash Basin',           description: 'Ceramic white, wall-hung with full pedestal leg. Classic styling, easy to clean.',         imageUrl: BASE_IMG + 'basin.jpg' },
      { id: 'bs-2', name: 'Counter-Top Designer Basin',     description: 'Rectangular above-counter ceramic basin for modern vanity tops. Gloss white finish.',      imageUrl: BASE_IMG + 'basin.jpg' },
      { id: 'bs-3', name: 'Double-Bowl Kitchen Sink',       description: '304-grade stainless steel, deep bowls, anti-drip rim. ISI certified, scratch resistant.',  imageUrl: BASE_IMG + 'basin.jpg' },
      { id: 'bs-4', name: 'Wall-Hung Basin + Bracket Set',  description: 'Space-saving wall-hung ceramic basin. Chrome bracket set with all fixings included.',     imageUrl: BASE_IMG + 'basin.jpg' },
    ]
  }
};

// =============================================================
// DOMContentLoaded
// =============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll effect ───────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ── Hamburger drawer ────────────────────────────────────────
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navDrawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      hamburger.textContent = isOpen ? '✕' : '☰';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        hamburger.textContent = '☰';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        hamburger.textContent = '☰';
        hamburger.focus();
      }
    });
  }

  // ── Read category slug from URL ─────────────────────────────
  const params  = new URLSearchParams(window.location.search);
  const catSlug = params.get('category') || '';
  const catData = CATALOG[catSlug];

  // ── DOM refs ────────────────────────────────────────────────
  const breadcrumbCat = document.getElementById('plpBreadcrumbCat');
  const labelEl       = document.getElementById('plpLabel');
  const headingEl     = document.getElementById('plpHeading');
  const descEl        = document.getElementById('plpDesc');
  const heroImgEl     = document.getElementById('plpHeroImg');
  const gridEl        = document.getElementById('plpGrid');
  const countEl       = document.getElementById('plpCount');
  const emptyEl       = document.getElementById('plpEmpty');

  // ── Unknown / missing category ─────────────────────────────
  if (!catData) {
    document.title = 'Products | Gopalsons Sanitary Store';
    if (headingEl)    headingEl.textContent = 'Products';
    if (labelEl)      labelEl.textContent   = '✦ Browse All';
    if (descEl)       descEl.textContent    = 'Select a category from our homepage to browse products.';
    if (heroImgEl)    heroImgEl.hidden      = true;
    if (countEl)      countEl.textContent   = '';
    if (emptyEl)      emptyEl.hidden        = false;
    return;
  }

  // ── Populate page header ────────────────────────────────────
  document.title = `${catData.name} | Gopalsons Sanitary Store`;
  if (breadcrumbCat) breadcrumbCat.textContent     = catData.name;
  if (labelEl)       labelEl.textContent           = catData.label;
  if (headingEl)     headingEl.textContent         = catData.name;
  if (descEl)        descEl.textContent            = catData.description;
  if (heroImgEl) {
    heroImgEl.src = catData.image;
    heroImgEl.setAttribute('alt', `${catData.name} products at Gopalsons Sanitary Store`);
  }

  // ── Merge catalog + custom localStorage products ────────────
  let customProducts = [];
  try {
    customProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      .filter(p => p.category === catSlug);
  } catch { /* localStorage unavailable */ }

  const allProducts = [...catData.products, ...customProducts];

  // ── Update product count ────────────────────────────────────
  if (countEl) {
    countEl.textContent = `${allProducts.length} product${allProducts.length !== 1 ? 's' : ''}`;
  }

  if (!gridEl) return;

  if (allProducts.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    return;
  }

  // ── Render product cards ────────────────────────────────────
  allProducts.forEach(product => {
    const article = document.createElement('article');
    article.className = 'product-card';

    // Image wrap
    const imgWrap = document.createElement('div');
    imgWrap.className = 'product-card-img-wrap';

    if (product.imageUrl) {
      const img = document.createElement('img');
      img.src     = product.imageUrl;
      img.loading = 'lazy';
      img.width   = 400;
      img.height  = 240;
      img.setAttribute('alt', product.name);
      img.addEventListener('error', function () {
        this.remove();
        imgWrap.classList.add('no-image');
      });
      imgWrap.appendChild(img);
    } else {
      imgWrap.classList.add('no-image');
    }

    // Card body
    const body = document.createElement('div');
    body.className = 'product-card-body';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const p = document.createElement('p');
    p.textContent = product.description;

    const link = document.createElement('a');
    link.href      = `pdp.html?category=${encodeURIComponent(catSlug)}&id=${encodeURIComponent(product.id)}`;
    link.className = 'product-link';
    link.textContent = 'View Details ';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    link.appendChild(arrow);

    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(link);

    article.appendChild(imgWrap);
    article.appendChild(body);
    gridEl.appendChild(article);
  });

});

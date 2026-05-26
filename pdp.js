'use strict';

// =============================================================
// Gopalsons — pdp.js
// Product Detail Page: looks up product by id+category and renders
// =============================================================

const BASE_IMG    = 'https://gopalsons-sanitary-supply--jaswant.replit.app/';
const STORAGE_KEY = 'gopalsons_custom_products';

// ── Shared catalog (must stay in sync with plp.js) ─────────
const CATALOG = {
  'taps-faucets': {
    label: '✦ Taps & Faucets', name: 'Taps & Faucets', image: BASE_IMG + 'taps.jpg',
    products: [
      { id: 'tf-1', name: 'Single Handle Basin Tap',
        description: 'Sleek chrome finish with 360° swivel spout. Easy single-hand operation for wash basins.',
        imageUrl: BASE_IMG + 'taps.jpg',
        specs: ['Chrome-plated brass body', '360° swivel spout', 'Compatible with ½" inlets', 'Easy quarter-turn operation', 'Wall or counter top mount'] },
      { id: 'tf-2', name: 'Pillar Cock Tap',
        description: 'Heavy-duty brass body, ISI marked. Ideal for washroom and kitchen sink installations.',
        imageUrl: BASE_IMG + 'taps.jpg',
        specs: ['ISI certified brass body', 'Corrosion-resistant finish', 'Standard ½" thread', 'Suitable for high-pressure lines', 'Ceramic disc cartridge'] },
      { id: 'tf-3', name: 'Kitchen Sink Mixer',
        description: 'Hot & cold water mixer with pull-out spray head and flexible hose. 360° swivel neck.',
        imageUrl: BASE_IMG + 'taps.jpg',
        specs: ['Hot & cold dual inlet', 'Pull-out spray head included', '1.5 m braided flexible hose', '360° swivel neck', 'Chrome ABS finish'] },
      { id: 'tf-4', name: 'Concealed Angle Valve',
        description: 'Quarter-turn ceramic disc cartridge, corrosion-resistant chrome finish. Easy wall fitting.',
        imageUrl: BASE_IMG + 'taps.jpg',
        specs: ['Ceramic disc quarter-turn', 'Chrome body corrosion-resistant', '15 mm inlet / ½" outlet', 'For concealed wall installations', 'ISO 9001 compliant'] },
    ]
  },
  'pipes-fittings': {
    label: '✦ Pipes & Fittings', name: 'Pipes & Fittings', image: BASE_IMG + 'pipes.jpg',
    products: [
      { id: 'pf-1', name: 'CPVC Hot Water Pipe ½"',
        description: 'High-temperature rated for hot & cold supply lines. ISI certified. Available in 3 m lengths.',
        imageUrl: BASE_IMG + 'pipes.jpg',
        specs: ['ISI certified CPVC compound', 'Rated up to 93 °C', 'Available in 3 m / 6 m lengths', 'Compatible with CPVC fittings', 'Chlorine & corrosion resistant'] },
      { id: 'pf-2', name: 'PVC Column Pipe 4"',
        description: 'Deep borewell grade, thick-walled, UV stabilised. Compatible with all standard submersibles.',
        imageUrl: BASE_IMG + 'pipes.jpg',
        specs: ['Borewell grade PVC compound', '4" OD standard flange', 'UV stabilised for longevity', 'Available in 3 m sections', 'Pressure rated PN 6'] },
      { id: 'pf-3', name: 'UPVC Pressure Pipe',
        description: 'For underground water supply lines. High impact strength, chemical resistant interior.',
        imageUrl: BASE_IMG + 'pipes.jpg',
        specs: ['UPVC pressure grade', 'Chemical resistant smooth bore', 'Pressure rating up to PN 12.5', 'Suitable for underground burial', 'Available in 6 m lengths'] },
      { id: 'pf-4', name: 'Elbow & T-Joint Fitting Set',
        description: 'Full range: 90°/45° elbows, T-joints, couplers — all standard sizes and schedules.',
        imageUrl: BASE_IMG + 'pipes.jpg',
        specs: ['Available ½" to 4" sizes', '90° and 45° elbow variants', 'Equal and reducing T-joints', 'Solvent weld socket type', 'PVC conforming to IS 7834'] },
    ]
  },
  'bathroom-fixtures': {
    label: '✦ Bathroom Fixtures', name: 'Bathroom Fixtures', image: BASE_IMG + 'fixtures.jpg',
    products: [
      { id: 'bf-1', name: 'Overhead Rain Shower Head',
        description: 'Large 8" round shower head with chrome anti-limescale nozzles. Wall or ceiling mount.',
        imageUrl: BASE_IMG + 'fixtures.jpg',
        specs: ['8" (200 mm) diameter face', 'Anti-limescale silicone nozzles', 'ABS chrome-plated body', 'Wall or ceiling arm compatible', 'Flow rate: 8–10 L/min'] },
      { id: 'bf-2', name: 'Pressure Balance Valve',
        description: 'Thermostatic temperature control for safe, consistent shower temperature at all times.',
        imageUrl: BASE_IMG + 'fixtures.jpg',
        specs: ['Thermostatic cartridge', 'Scald protection max 45 °C', 'Brass valve body', 'Compatible with ½" inlets', 'Single-lever operation'] },
      { id: 'bf-3', name: 'Wall-Mount Bath Spout',
        description: 'Chrome-plated deck-mounted bath filler spout. Smooth flow, easy installation.',
        imageUrl: BASE_IMG + 'fixtures.jpg',
        specs: ['Solid brass body chromed', 'Wall-mount ¾" thread', 'Available in 15 cm / 20 cm reach', 'Smooth high-flow output', 'Matching hand-shower bracket optional'] },
      { id: 'bf-4', name: 'Adjustable Shower Rod Set',
        description: 'Tension-mount design, adjustable 120–200 cm. Includes rings and decorative end caps.',
        imageUrl: BASE_IMG + 'fixtures.jpg',
        specs: ['Adjustable 120 cm–200 cm', 'Stainless steel tube, chrome finish', '12 glide rings included', 'Tension mount — no drilling', 'Decorative end cap covers'] },
    ]
  },
  'water-tanks': {
    label: '✦ Water Tanks', name: 'Water Tanks', image: BASE_IMG + 'tank.jpg',
    products: [
      { id: 'wt-1', name: 'Overhead Loft Tank 500 L',
        description: 'Triple-layer UV-protected. Food-grade polyethylene, ISI certified, vented lid.',
        imageUrl: BASE_IMG + 'tank.jpg',
        specs: ['Capacity: 500 litres', 'Triple-layer UV protection', 'Food-grade HDPE material', 'ISI IS 12701 certified', 'Lockable vented lid'] },
      { id: 'wt-2', name: 'Underground Sump Tank 1000 L',
        description: 'Heavy-duty black polyethylene, ISI certified, anti-microbial, seamless construction.',
        imageUrl: BASE_IMG + 'tank.jpg',
        specs: ['Capacity: 1000 litres', 'Black HDPE UV opaque', 'Anti-microbial compound', 'Seamless blow-moulded body', 'CPVC inlet/outlet fittings'] },
      { id: 'wt-3', name: 'Overhead Tank 1500 L',
        description: 'White food-grade, anti-bacterial treated, wide-mouth lid for easy interior cleaning.',
        imageUrl: BASE_IMG + 'tank.jpg',
        specs: ['Capacity: 1500 litres', 'White food-grade HDPE', 'Anti-bacterial treated interior', 'Wide-mouth lid: 300 mm opening', 'ISI IS 12701 certified'] },
      { id: 'wt-4', name: 'Narrow Space Tank 300 L',
        description: 'Slim profile for small rooftops or balcony installations. Triple-layer UV protection.',
        imageUrl: BASE_IMG + 'tank.jpg',
        specs: ['Capacity: 300 litres', 'Slim profile — fits narrow terraces', 'Triple-layer UV protection', 'Food-grade polyethylene', 'Lightweight for easy rooftop lifting'] },
    ]
  },
  'plumbing-accessories': {
    label: '✦ Plumbing Accessories', name: 'Plumbing Accessories', image: BASE_IMG + 'accessories.jpg',
    products: [
      { id: 'pa-1', name: 'PTFE Thread Seal Tape',
        description: '12 m roll standard white Teflon tape. Essential for all threaded pipe and fitting joints.',
        imageUrl: BASE_IMG + 'accessories.jpg',
        specs: ['12 m roll, 12 mm wide', 'Standard white PTFE material', 'Temperature range: -200 °C to +260 °C', 'Ideal for NPT and BSP threads', 'Multi-packs available'] },
      { id: 'pa-2', name: 'Ratchet PVC Pipe Cutter',
        description: 'Clean, burr-free cuts up to 42 mm OD. Ergonomic one-hand ratchet action mechanism.',
        imageUrl: BASE_IMG + 'accessories.jpg',
        specs: ['Cuts up to 42 mm OD pipe', 'Ratchet one-hand mechanism', 'Hardened SK5 steel blade', 'Ergonomic soft-grip handle', 'Spring-loaded auto-open jaw'] },
      { id: 'pa-3', name: 'Pipe Thread Jointing Compound',
        description: 'Non-hardening sealant paste (200 g) for metal threaded fittings and connections.',
        imageUrl: BASE_IMG + 'accessories.jpg',
        specs: ['200 g tin with applicator brush', 'Non-hardening formulation', 'For metal NPT/BSP threads', 'Resistant to water and gas', 'Easy disassembly after use'] },
      { id: 'pa-4', name: 'Full-Bore Ball Valve ¾"',
        description: 'Brass lever-type isolation valve for main supply lines. ISI certified, full-bore design.',
        imageUrl: BASE_IMG + 'accessories.jpg',
        specs: ['¾" (20 mm) full-bore design', 'Forged brass body, chromed', 'ISI certified lever handle', 'Rated up to 25 bar WP', 'PTFE seats — zero-leak shutoff'] },
    ]
  },
  'basin-sinks': {
    label: '✦ Basin & Sinks', name: 'Basin & Sinks', image: BASE_IMG + 'basin.jpg',
    products: [
      { id: 'bs-1', name: 'Pedestal Wash Basin',
        description: 'Ceramic white, wall-hung with full pedestal leg. Classic styling, easy to clean.',
        imageUrl: BASE_IMG + 'basin.jpg',
        specs: ['Vitreous china ceramic', 'Classic pedestal leg included', '510 × 400 mm basin size', 'Single tap hole', 'Easy-clean glaze surface'] },
      { id: 'bs-2', name: 'Counter-Top Designer Basin',
        description: 'Rectangular above-counter ceramic basin for modern vanity tops. Gloss white finish.',
        imageUrl: BASE_IMG + 'basin.jpg',
        specs: ['Vitreous china ceramic', 'Above-counter installation', '500 × 350 mm footprint', 'Single central tap hole', 'High-gloss white glaze'] },
      { id: 'bs-3', name: 'Double-Bowl Kitchen Sink',
        description: '304-grade stainless steel, deep bowls, anti-drip rim. ISI certified, scratch resistant.',
        imageUrl: BASE_IMG + 'basin.jpg',
        specs: ['304 stainless steel (0.8 mm)', 'Double bowl: 450 + 380 mm', 'Anti-drip raised rim', 'Satin brush finish', 'Drain and basket strainer included'] },
      { id: 'bs-4', name: 'Wall-Hung Basin + Bracket Set',
        description: 'Space-saving wall-hung ceramic basin. Chrome bracket set with all fixings included.',
        imageUrl: BASE_IMG + 'basin.jpg',
        specs: ['Vitreous china wall-hung', '450 × 350 mm compact size', 'Chrome steel bracket set', 'All wall fixings included', 'Weight rated: 120 kg load'] },
    ]
  }
};

// =============================================================
// Helpers
// =============================================================
function loadCustomProducts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function findProduct(catSlug, productId) {
  // 1. Search catalog
  const cat = CATALOG[catSlug];
  if (cat) {
    const found = cat.products.find(p => p.id === productId);
    if (found) return { product: found, catData: cat, isCustom: false };
  }
  // 2. Search localStorage custom products
  const custom = loadCustomProducts().find(p => p.id === productId);
  if (custom) {
    const catData = CATALOG[custom.category] || {
      label: '✦ Products', name: custom.category || 'Products', image: ''
    };
    return { product: { ...custom, specs: [] }, catData, isCustom: true };
  }
  return null;
}

function getRelatedProducts(catSlug, currentId) {
  const cat     = CATALOG[catSlug];
  const catalog = cat ? cat.products.filter(p => p.id !== currentId).slice(0, 3) : [];
  const custom  = loadCustomProducts()
    .filter(p => p.category === catSlug && p.id !== currentId)
    .slice(0, Math.max(0, 3 - catalog.length));
  return [...catalog, ...custom];
}

// =============================================================
// DOMContentLoaded
// =============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll + hamburger (same as plp.js) ────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navDrawer');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

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

  // ── Read URL params ────────────────────────────────────────
  const params    = new URLSearchParams(window.location.search);
  const catSlug   = params.get('category') || '';
  const productId = params.get('id') || '';

  const result = findProduct(catSlug, productId);

  // ── Not found ──────────────────────────────────────────────
  if (!result) {
    document.title = 'Product Not Found | Gopalsons';
    document.getElementById('pdpProductName').textContent = 'Product Not Found';
    document.getElementById('pdpDescription').textContent =
      'Sorry, we could not find that product. Please browse our categories.';
    document.getElementById('pdpSpecs').hidden = true;
    const img = document.getElementById('pdpImage');
    if (img) img.hidden = true;
    return;
  }

  const { product, catData } = result;
  const plpUrl = `plp.html?category=${encodeURIComponent(catSlug || product.category || '')}`;

  // ── Page title + meta ──────────────────────────────────────
  document.title = `${product.name} | Gopalsons Sanitary Store`;

  // ── Breadcrumb ─────────────────────────────────────────────
  const breadCat  = document.getElementById('pdpBreadcrumbCat');
  const breadProd = document.getElementById('pdpBreadcrumbProduct');
  if (breadCat) { breadCat.textContent = catData.name; breadCat.href = plpUrl; }
  if (breadProd) breadProd.textContent = product.name;

  // ── Hero image ─────────────────────────────────────────────
  const imgEl = document.getElementById('pdpImage');
  if (imgEl) {
    imgEl.src = product.imageUrl || catData.image || '';
    imgEl.setAttribute('alt', `${product.name} — available at Gopalsons Sanitary Store`);
    imgEl.addEventListener('error', function () {
      this.closest('.pdp-img-wrap').classList.add('no-image');
      this.hidden = true;
    });
  }

  // ── Category label + product name + description ────────────
  const catLabelEl = document.getElementById('pdpCategoryLabel');
  const nameEl     = document.getElementById('pdpProductName');
  const descEl     = document.getElementById('pdpDescription');
  if (catLabelEl) catLabelEl.textContent  = catData.label;
  if (nameEl)     nameEl.textContent      = product.name;
  if (descEl)     descEl.textContent      = product.description;

  // ── Specs list ─────────────────────────────────────────────
  const specsList = document.getElementById('pdpSpecsList');
  const specsWrap = document.getElementById('pdpSpecs');
  if (product.specs && product.specs.length && specsList) {
    product.specs.forEach(spec => {
      const li = document.createElement('li');
      li.className = 'pdp-spec-item';
      li.textContent = spec;
      specsList.appendChild(li);
    });
  } else if (specsWrap) {
    specsWrap.hidden = true;
  }

  // ── Related products ───────────────────────────────────────
  const relatedGrid   = document.getElementById('pdpRelatedGrid');
  const viewAllLink   = document.getElementById('pdpViewAllLink');
  if (viewAllLink) viewAllLink.href = plpUrl;

  const related = getRelatedProducts(catSlug || product.category || '', productId);

  if (relatedGrid) {
    if (related.length === 0) {
      const section = document.querySelector('.pdp-related');
      if (section) section.hidden = true;
    } else {
      related.forEach(rel => {
        const article = document.createElement('article');
        article.className = 'product-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'product-card-img-wrap';
        if (rel.imageUrl) {
          const img = document.createElement('img');
          img.src     = rel.imageUrl;
          img.loading = 'lazy';
          img.width   = 400;
          img.height  = 240;
          img.setAttribute('alt', rel.name);
          img.addEventListener('error', function () {
            this.remove();
            imgWrap.classList.add('no-image');
          });
          imgWrap.appendChild(img);
        } else {
          imgWrap.classList.add('no-image');
        }

        const body = document.createElement('div');
        body.className = 'product-card-body';

        const h3 = document.createElement('h3');
        h3.textContent = rel.name;

        const p = document.createElement('p');
        p.textContent = rel.description.length > 90
          ? rel.description.slice(0, 90) + '…'
          : rel.description;

        const link = document.createElement('a');
        const relCat = catSlug || rel.category || '';
        link.href = `pdp.html?category=${encodeURIComponent(relCat)}&id=${encodeURIComponent(rel.id)}`;
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
        relatedGrid.appendChild(article);
      });
    }
  }

});

'use strict';

// ================================================================
// Gopalsons — script.js
// Implements all behaviour from SPEC.md §8
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────────────────────
  // T-24 / T-22  Nav scroll style
  // Adds .scrolled on #navbar when window scrolls past 50px
  // ──────────────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  // Run once on load in case page is already scrolled
  handleNavScroll();


  // ──────────────────────────────────────────────────────────────
  // T-25 / T-26  Mobile drawer toggle
  // ──────────────────────────────────────────────────────────────
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navDrawer');

  function closeDrawer() {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.textContent = '☰';
  }

  function openDrawer() {
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.textContent = '✕';
  }

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // T-26 — Close drawer when a link inside it is clicked
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') &&
        !navbar.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      hamburger.focus();
    }
  });


  // ──────────────────────────────────────────────────────────────
  // T-80  Smooth scroll for all anchor links
  // ──────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height') || '72',
        10
      );

      const top = target.getBoundingClientRect().top +
                  window.scrollY -
                  offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ──────────────────────────────────────────────────────────────
  // T-27  Active nav link highlight via IntersectionObserver
  // ──────────────────────────────────────────────────────────────
  const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections   = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));


  // ──────────────────────────────────────────────────────────────
  // T-56 / T-57  Testimonial carousel
  // 5 slides, auto-advances every 4 seconds, dots are clickable
  // ──────────────────────────────────────────────────────────────
  const testimonials = [
    {
      quote: '"The most reliable sanitary store in Kashiram. Great prices and solid advice."',
      author: '— Local Plumber'
    },
    {
      quote: '"Found exactly the fittings I needed. Staff really knows their products."',
      author: '— Home Owner'
    },
    {
      quote: '"Best CPVC pipes in Moradabad. Fast service and fair rates every time."',
      author: '— Contractor'
    },
    {
      quote: '"Gopalsons helped us complete our bathroom renovation without a hitch."',
      author: '— Resident, Moradabad'
    },
    {
      quote: '"Our go-to store for every plumbing job. Quality never compromises here."',
      author: '— Senior Plumber'
    }
  ];

  const quoteEl      = document.getElementById('testimonialQuote');
  const dots         = document.querySelectorAll('.carousel-dots .dot');
  let currentSlide   = 0;
  let carouselTimer  = null;

  function goToSlide(index) {
    currentSlide = index;

    const { quote, author } = testimonials[index];
    if (quoteEl) {
      quoteEl.querySelector('p').textContent = quote;
      quoteEl.querySelector('footer').textContent = author;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % testimonials.length);
  }

  function startCarousel() {
    carouselTimer = setInterval(nextSlide, 4000);
  }

  function stopCarousel() {
    clearInterval(carouselTimer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopCarousel();
      goToSlide(i);
      startCarousel();
    });
  });

  // Start only if carousel elements exist
  if (quoteEl && dots.length) {
    startCarousel();
  }


  // ──────────────────────────────────────────────────────────────
  // T-65 / T-67  Contact form submission
  // ──────────────────────────────────────────────────────────────
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast() {
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3000);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        // Trigger native browser validation UI
        form.reportValidity();
        return;
      }

      // Reset the form
      form.reset();

      // Show success toast
      showToast();
    });
  }


  // ──────────────────────────────────────────────────────────────
  // ADMIN — Product Management
  // ──────────────────────────────────────────────────────────────

  const STORAGE_KEY  = 'gopalsons_custom_products';
  const adminSection = document.getElementById('admin');
  const openAdminLink = document.getElementById('openAdminLink');
  const adminCloseBtn = document.getElementById('adminCloseBtn');

  // ── Storage helpers ─────────────────────────────────────────
  function loadCustomProducts() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveCustomProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  function generateId() {
    return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  // ── Render custom product cards into the grid ────────────────
  function createProductCardEl(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.productId = product.id;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'product-card-img-wrap';

    if (product.imageUrl) {
      const img = document.createElement('img');
      img.src = product.imageUrl;
      img.loading = 'lazy';
      img.width = 400;
      img.height = 240;
      img.addEventListener('error', function () {
        this.remove();
        imgWrap.classList.add('no-image');
      });
      // Set alt via textContent-safe setAttribute
      img.setAttribute('alt', product.name);
      imgWrap.appendChild(img);
    } else {
      imgWrap.classList.add('no-image');
    }

    const body = document.createElement('div');
    body.className = 'product-card-body';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const p = document.createElement('p');
    p.textContent = product.description;

    const link = document.createElement('a');
    link.href = '#contact';
    link.className = 'product-link';
    link.textContent = 'Learn more ';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    link.appendChild(arrow);

    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(link);
    article.appendChild(imgWrap);
    article.appendChild(body);
    return article;
  }

  function renderCustomProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    grid.querySelectorAll('[data-product-id]').forEach(el => el.remove());
    loadCustomProducts().forEach(p => grid.appendChild(createProductCardEl(p)));
  }

  // Render on page load
  renderCustomProducts();

  // ── Show / hide admin panel ──────────────────────────────────
  function showAdmin() {
    if (!adminSection) return;
    adminSection.hidden = false;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72', 10
    );
    const top = adminSection.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function hideAdmin() {
    if (adminSection) adminSection.hidden = true;
  }

  if (openAdminLink) {
    openAdminLink.addEventListener('click', (e) => { e.preventDefault(); showAdmin(); });
  }
  if (adminCloseBtn) {
    adminCloseBtn.addEventListener('click', hideAdmin);
  }

  // ── Tab switching ────────────────────────────────────────────
  const adminTabBtns = document.querySelectorAll('.admin-tab');
  const adminPanels  = document.querySelectorAll('.admin-panel');

  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      adminTabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      adminPanels.forEach(p => { p.hidden = true; });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.hidden = false;
        if (targetId === 'tab-manage-list') renderManageList();
      }
    });
  });

  // ── Feedback helper ──────────────────────────────────────────
  function showAdminFeedback(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `admin-feedback ${type}`;
    setTimeout(() => { el.textContent = ''; el.className = 'admin-feedback'; }, 3000);
  }

  // ── Add Single Product form ──────────────────────────────────
  const adminProductForm = document.getElementById('adminProductForm');
  const adminAddFeedback = document.getElementById('adminAddFeedback');

  if (adminProductForm) {
    adminProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!adminProductForm.checkValidity()) { adminProductForm.reportValidity(); return; }

      const name        = document.getElementById('adminProductName').value.trim();
      const description = document.getElementById('adminProductDesc').value.trim();
      const imageUrl    = document.getElementById('adminProductImg').value.trim();
      const category    = document.getElementById('adminProductCategory').value;

      const product  = { id: generateId(), name, description, imageUrl, category };
      const products = loadCustomProducts();
      products.push(product);
      saveCustomProducts(products);
      renderCustomProducts();
      adminProductForm.reset();
      showAdminFeedback(adminAddFeedback, '✅ Product added!', 'success');
    });
  }

  // ── CSV Parsing helpers ──────────────────────────────────────
  function parseCSVRow(line) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQ = !inQ; }
      } else if (c === ',' && !inQ) { result.push(cur); cur = ''; }
      else { cur += c; }
    }
    result.push(cur);
    return result;
  }

  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = parseCSVRow(lines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g, ''));
    const nameIdx  = headers.indexOf('name');
    const descIdx  = headers.indexOf('description');
    const imgIdx   = headers.indexOf('imageurl');
    const catIdx   = headers.indexOf('category');
    if (nameIdx === -1 || descIdx === -1) return null; // signal bad format
    const products = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const row  = parseCSVRow(lines[i]);
      const name = row[nameIdx]?.trim() || '';
      const desc = row[descIdx]?.trim() || '';
      if (!name || !desc) continue;
      products.push({
        id: `csv_${Date.now()}_${i}`,
        name,
        description: desc,
        imageUrl:  imgIdx !== -1 ? (row[imgIdx]?.trim() || '') : '',
        category:  catIdx !== -1 ? (row[catIdx]?.trim() || '') : ''
      });
    }
    return products;
  }

  // ── CSV Upload UI ────────────────────────────────────────────
  const csvDropzone      = document.getElementById('csvDropzone');
  const csvFileInput     = document.getElementById('csvFileInput');
  const csvResult        = document.getElementById('csvResult');
  const csvResultSummary = document.getElementById('csvResultSummary');
  const csvImportBtn     = document.getElementById('csvImportBtn');
  const csvCancelBtn     = document.getElementById('csvCancelBtn');
  const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
  let parsedCSVProducts  = [];

  function handleCSVFile(file) {
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      alert('Please upload a .csv file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const products = parseCSV(ev.target.result);
      if (!products) {
        alert('Invalid CSV format. Please ensure the file has "name" and "description" columns in the first row.');
        return;
      }
      if (products.length === 0) {
        alert('No valid rows found. Each row must have a non-empty name and description.');
        return;
      }
      parsedCSVProducts = products;
      if (csvResultSummary) csvResultSummary.textContent = `Found ${products.length} product(s) ready to import.`;
      if (csvResult) csvResult.hidden = false;
    };
    reader.readAsText(file);
  }

  if (csvDropzone) {
    csvDropzone.addEventListener('click', () => csvFileInput && csvFileInput.click());
    csvDropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); csvFileInput && csvFileInput.click(); }
    });
    csvDropzone.addEventListener('dragover', (e) => { e.preventDefault(); csvDropzone.classList.add('dragover'); });
    csvDropzone.addEventListener('dragleave', () => csvDropzone.classList.remove('dragover'));
    csvDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      csvDropzone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) handleCSVFile(file);
    });
  }

  if (csvFileInput) {
    csvFileInput.addEventListener('change', () => {
      const file = csvFileInput.files[0];
      if (file) handleCSVFile(file);
    });
  }

  if (csvImportBtn) {
    csvImportBtn.addEventListener('click', () => {
      if (!parsedCSVProducts.length) return;
      const count = parsedCSVProducts.length;
      saveCustomProducts([...loadCustomProducts(), ...parsedCSVProducts]);
      renderCustomProducts();
      parsedCSVProducts = [];
      if (csvResult) csvResult.hidden = true;
      if (csvFileInput) csvFileInput.value = '';
      if (csvResultSummary) {
        csvResultSummary.textContent = `✅ ${count} product(s) imported successfully!`;
        if (csvResult) csvResult.hidden = false;
        setTimeout(() => {
          if (csvResult) csvResult.hidden = true;
          csvResultSummary.textContent = '';
        }, 3000);
      }
    });
  }

  if (csvCancelBtn) {
    csvCancelBtn.addEventListener('click', () => {
      parsedCSVProducts = [];
      if (csvResult) csvResult.hidden = true;
      if (csvFileInput) csvFileInput.value = '';
    });
  }

  if (downloadTemplateBtn) {
    downloadTemplateBtn.addEventListener('click', () => {
      const csv = [
        'name,description,imageUrl,category',
        'Brass Ball Valve,Heavy duty brass valve for water supply lines,https://example.com/valve.jpg,plumbing-accessories',
        'PVC Elbow 90°,90 degree PVC elbow fitting for pipe corners,,pipes-fittings'
      ].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = 'gopalsons-products-template.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // ── Manage List tab ──────────────────────────────────────────
  function renderManageList() {
    const products  = loadCustomProducts();
    const container = document.getElementById('manageProductsTable');
    const countEl   = document.getElementById('manageCount');
    if (countEl) countEl.textContent = `${products.length} custom product${products.length !== 1 ? 's' : ''}`;
    if (!container) return;
    container.innerHTML = '';

    if (products.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'manage-empty';
      empty.textContent = 'No custom products added yet.';
      container.appendChild(empty);
      return;
    }

    const table = document.createElement('table');
    table.className = 'manage-table';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Name</th><th>Category</th><th>Description</th><th>Image URL</th><th>Action</th></tr>';
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    const CATEGORY_LABELS = {
      'taps-faucets': 'Taps & Faucets', 'pipes-fittings': 'Pipes & Fittings',
      'bathroom-fixtures': 'Bathroom Fixtures', 'water-tanks': 'Water Tanks',
      'plumbing-accessories': 'Plumbing Accessories', 'basin-sinks': 'Basin & Sinks',
      'other': 'Other'
    };

    products.forEach(product => {
      const tr = document.createElement('tr');

      const nameTd = document.createElement('td');
      nameTd.textContent = product.name;

      const catTd = document.createElement('td');
      catTd.textContent = CATEGORY_LABELS[product.category] || product.category || '—';

      const descTd = document.createElement('td');
      descTd.textContent = product.description.length > 60
        ? product.description.slice(0, 60) + '…'
        : product.description;

      const imgTd = document.createElement('td');
      if (product.imageUrl) {
        const a = document.createElement('a');
        a.href = product.imageUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = product.imageUrl.length > 40
          ? product.imageUrl.slice(0, 40) + '…'
          : product.imageUrl;
        imgTd.appendChild(a);
      } else {
        imgTd.textContent = '—';
      }

      const actionTd = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-icon-danger';
      deleteBtn.textContent = '🗑';
      deleteBtn.setAttribute('aria-label', `Delete ${product.name}`);
      deleteBtn.addEventListener('click', () => {
        saveCustomProducts(loadCustomProducts().filter(p => p.id !== product.id));
        renderCustomProducts();
        renderManageList();
      });
      actionTd.appendChild(deleteBtn);

      [nameTd, catTd, descTd, imgTd, actionTd].forEach(td => tr.appendChild(td));
      tbody.appendChild(tr);
    });

    container.appendChild(table);
  }

  const clearAllBtn = document.getElementById('clearAllBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (!confirm('Delete all custom products? This cannot be undone.')) return;
      saveCustomProducts([]);
      renderCustomProducts();
      renderManageList();
    });
  }

});

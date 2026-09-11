/**
 * SGS ASSOCIATES - DYNAMIC INTERACTION SCRIPT
 * High-performance, modular, and dynamic client-side engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollSpy();
  initHeroParticles();
  initCounters();
  renderServices('all', '');
  initServiceFilterTabs();
  initServiceSearch();
  initToolkitTabs();
  initGstCalculator();
  initIncomeTaxCalculator();
  initComplianceQuiz();
  renderBranches();
  renderCalendar();
  initDueCountdown();
  initClientStories();
  initCardSpotlight();
  initContactForm();
  initCareerModal();
  initMobileDrawer();
});

/* ==========================================================================
   HEADER SCROLL & ACTIVE SCROLLSPY (UNDERLINE TRACKER)
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollSpy() {
  const homeLink = document.getElementById('nav-link-home');
  const servicesDropdownToggle = document.getElementById('nav-dropdown-services-toggle');
  const aboutDropdownToggle = document.getElementById('nav-dropdown-about-toggle');
  const careersLink = document.getElementById('nav-link-careers');
  const contactLink = document.getElementById('nav-link-contact');

  const allNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

  // Defined sections and their corresponding navbar targets
  const sectionMap = [
    { id: 'home', target: homeLink },
    { id: 'services', target: servicesDropdownToggle },
    { id: 'tax-toolkit', target: servicesDropdownToggle },
    { id: 'compliance-navigator', target: servicesDropdownToggle },
    { id: 'why-us', target: aboutDropdownToggle },
    { id: 'compliance-calendar', target: servicesDropdownToggle },
    { id: 'careers', target: careersLink },
    { id: 'branches', target: aboutDropdownToggle },
    { id: 'client-stories', target: aboutDropdownToggle },
    { id: 'contact', target: contactLink }
  ];

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 140; // Header height + buffer
    let activeTarget = homeLink;
    let activeSectionId = 'home';

    // Check if scrolled near the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120);

    if (isAtBottom) {
      activeTarget = contactLink;
      activeSectionId = 'contact';
    } else {
      // Find the active section based on scroll position
      for (let i = 0; i < sectionMap.length; i++) {
        const item = sectionMap[i];
        const sectionEl = document.getElementById(item.id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          const height = sectionEl.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeTarget = item.target;
            activeSectionId = item.id;
            break;
          }
        }
      }
    }

    // Reset all nav-link active states
    allNavLinks.forEach(link => link.classList.remove('active'));

    // Activate current target with glowing underline
    if (activeTarget) {
      activeTarget.classList.add('active');
    }

    // Also update mobile drawer active link
    mobileLinks.forEach(mLink => {
      const href = mLink.getAttribute('href');
      if (href === `#${activeSectionId}`) {
        mLink.classList.add('active');
      } else {
        mLink.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // Dropdown touch support on tablets/mobile
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dd => {
    const toggle = dd.querySelector('.nav-dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          dd.classList.toggle('is-open');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('is-open');
      }
    });
  });
}

/* ==========================================================================
   1. HERO PARTICLES & AMBIENT CANVAS
   ========================================================================== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 140 };

  const colors = [
    'rgba(0, 208, 108, 0.7)',   // Green
    'rgba(121, 64, 236, 0.7)',  // Purple
    'rgba(46, 226, 142, 0.5)',  // Light green
    'rgba(151, 100, 255, 0.5)'  // Light purple
  ];

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 16000), 55);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(121, 64, 236, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    particles.forEach(p => {
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  const heroSection = canvas.closest('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ==========================================================================
   2. ANIMATED NUMBER COUNTERS (INTERSECTION OBSERVER)
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val[data-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        let start = 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. SERVICES RENDERING, FILTERING & LIVE SEARCH
   ========================================================================== */
const iconMap = {
  'building': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  'users': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'globe': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  'percent': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  'credit-card': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
  'shield-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'calculator': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  'trending-up': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  'user-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  'heart-pulse': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
  'scale': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  'coins': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
  'fuel': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>`,
  'key': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`,
  'check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  'arrow-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
};

let currentCategory = 'all';
let currentSearchQuery = '';

function renderServices(selectedCategory = 'all', searchQuery = '') {
  const container = document.getElementById('services-grid-container');
  const countBadge = document.getElementById('service-count-text');
  if (!container) return;

  currentCategory = selectedCategory;
  currentSearchQuery = searchQuery.trim().toLowerCase();

  let filtered = SGS_DATA.services;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(s => s.category === currentCategory);
  }

  if (currentSearchQuery) {
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(currentSearchQuery) ||
      s.shortDesc.toLowerCase().includes(currentSearchQuery) ||
      s.categoryName.toLowerCase().includes(currentSearchQuery) ||
      s.features.some(f => f.toLowerCase().includes(currentSearchQuery))
    );
  }

  if (countBadge) {
    if (currentSearchQuery) {
      countBadge.textContent = `Found ${filtered.length} service${filtered.length === 1 ? '' : 's'} matching "${searchQuery}"`;
    } else if (currentCategory !== 'all') {
      countBadge.textContent = `Showing ${filtered.length} service${filtered.length === 1 ? '' : 's'} in category`;
    } else {
      countBadge.textContent = `Showing all ${filtered.length} services`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--bg-dark-card); border-radius: var(--radius-md); border: 1px dashed var(--bg-dark-border);">
        <p style="font-size: 1.1rem; color: #FFFFFF; font-weight: 600; margin-bottom: 8px;">No specific services matched "${searchQuery}"</p>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">Try searching for "GST", "Audit", "Pvt Ltd", "PF", or "Income Tax", or explore our all-inclusive consultation.</p>
        <button class="btn btn-secondary btn-sm" onclick="clearServiceSearch()">View All 18 Services</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="service-card interactive-glow-card" data-category="${item.category}">
      <div class="service-card-header">
        <div class="service-icon-box">
          ${iconMap[item.icon] || iconMap['file-text']}
        </div>
        <span class="service-category-tag">${item.categoryName}</span>
      </div>
      <h3 class="service-card-title">${item.title}</h3>
      <p class="service-card-desc">${item.shortDesc}</p>
      
      <ul class="service-features-list">
        ${item.features.map(f => `
          <li>
            ${iconMap['check']}
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <div class="service-card-footer">
        <button class="service-enquire-btn" onclick="selectServiceForInquiry('${item.title}')">
          <span>Enquire For This</span>
          ${iconMap['arrow-right']}
        </button>
      </div>
    </div>
  `).join('');

  initCardSpotlight();
}

function initServiceFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderServices(category, currentSearchQuery);
    });
  });
}

function initServiceSearch() {
  const searchInput = document.getElementById('service-search-input');
  const clearBtn = document.getElementById('service-search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = val ? 'inline-block' : 'none';
      }
      renderServices(currentCategory, val);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      clearBtn.style.display = 'none';
      renderServices(currentCategory, '');
    });
  }
}

window.clearServiceSearch = function() {
  const searchInput = document.getElementById('service-search-input');
  const clearBtn = document.getElementById('service-search-clear-btn');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  const allTab = document.querySelector('.filter-tab-btn[data-category="all"]');
  if (allTab) {
    document.querySelectorAll('.filter-tab-btn').forEach(t => t.classList.remove('active'));
    allTab.classList.add('active');
  }
  renderServices('all', '');
};

window.selectServiceForInquiry = function(serviceTitle) {
  const serviceSelect = document.getElementById('consultation-service');
  if (serviceSelect) {
    let found = false;
    for (let opt of serviceSelect.options) {
      if (opt.text.includes(serviceTitle) || serviceTitle.includes(opt.text)) {
        serviceSelect.value = opt.value;
        found = true;
        break;
      }
    }
    if (!found) {
      serviceSelect.value = 'General Compliance / Other';
    }
  }
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('consultation-name');
    if (nameInput) nameInput.focus();
  }
};

/* ==========================================================================
   4. INTERACTIVE FINANCIAL TOOLKIT (GST & TAX REGIME SIMULATOR)
   ========================================================================== */
function initToolkitTabs() {
  const tabs = document.querySelectorAll('.toolkit-tab-btn');
  const gstCard = document.getElementById('tool-gst-container');
  const itCard = document.getElementById('tool-incometax-container');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tool = tab.getAttribute('data-tool');

      if (tool === 'gst') {
        if (gstCard) gstCard.style.display = 'block';
        if (itCard) itCard.style.display = 'none';
      } else {
        if (gstCard) gstCard.style.display = 'none';
        if (itCard) itCard.style.display = 'block';
      }
    });
  });
}

function initGstCalculator() {
  let gstType = 'exclusive'; // 'exclusive' | 'inclusive'
  let amount = 50000;
  let rate = 18;

  const amountInput = document.getElementById('gst-amount-input');
  const typePills = document.querySelectorAll('.calc-type-toggle .toggle-pill');
  const presetChips = document.querySelectorAll('.amount-presets .preset-chip');
  const rateChips = document.querySelectorAll('.gst-rate-chips .rate-chip');
  const transferBtn = document.getElementById('gst-transfer-btn');

  function calculate() {
    let net = 0;
    let tax = 0;
    let total = 0;

    if (gstType === 'exclusive') {
      net = amount;
      tax = (amount * rate) / 100;
      total = net + tax;
    } else {
      total = amount;
      net = (amount * 100) / (100 + rate);
      tax = total - net;
    }

    const cgst = tax / 2;
    const sgst = tax / 2;

    // Update DOM
    const netEl = document.getElementById('gst-res-net');
    const cgstEl = document.getElementById('gst-res-cgst');
    const sgstEl = document.getElementById('gst-res-sgst');
    const totalEl = document.getElementById('gst-res-total');
    const cgstRateEl = document.getElementById('gst-cgst-rate');
    const sgstRateEl = document.getElementById('gst-sgst-rate');
    const rateBadgeEl = document.getElementById('gst-rate-label');

    if (netEl) netEl.textContent = `₹${Math.round(net).toLocaleString('en-IN')}`;
    if (cgstEl) cgstEl.textContent = `₹${Math.round(cgst).toLocaleString('en-IN')}`;
    if (sgstEl) sgstEl.textContent = `₹${Math.round(sgst).toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
    if (cgstRateEl) cgstRateEl.textContent = (rate / 2).toString();
    if (sgstRateEl) sgstRateEl.textContent = (rate / 2).toString();
    if (rateBadgeEl) rateBadgeEl.textContent = `${rate}% GST (${gstType === 'exclusive' ? 'Added' : 'Included'})`;

    // Ratio progress bar
    const basePct = total > 0 ? ((net / total) * 100).toFixed(1) : '100';
    const taxPct = total > 0 ? ((tax / total) * 100).toFixed(1) : '0';

    const fillBase = document.getElementById('ratio-bar-fill-base');
    const fillTax = document.getElementById('ratio-bar-fill-tax');
    const labelBase = document.getElementById('ratio-base-pct');
    const labelTax = document.getElementById('ratio-tax-pct');

    if (fillBase) fillBase.style.width = `${basePct}%`;
    if (fillTax) fillTax.style.width = `${taxPct}%`;
    if (labelBase) labelBase.textContent = basePct;
    if (labelTax) labelTax.textContent = taxPct;
  }

  // Type toggle
  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      gstType = pill.getAttribute('data-gst-type');
      calculate();
    });
  });

  // Amount input
  if (amountInput) {
    amountInput.addEventListener('input', (e) => {
      amount = parseFloat(e.target.value) || 0;
      presetChips.forEach(c => c.classList.remove('active'));
      calculate();
    });
  }

  // Presets
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      amount = parseFloat(chip.getAttribute('data-amount')) || 50000;
      if (amountInput) amountInput.value = amount;
      calculate();
    });
  });

  // Rates
  rateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      rateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      rate = parseFloat(chip.getAttribute('data-rate')) || 18;
      calculate();
    });
  });

  // Transfer calculation to inquiry form
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      selectServiceForInquiry('GST Registration, Returns & Audits');
      const msgInput = document.getElementById('consultation-message');
      if (msgInput) {
        msgInput.value = `GST Advisory Inquiry: Transaction Amount of ₹${amount.toLocaleString('en-IN')} at ${rate}% GST rate (${gstType.toUpperCase()} mode). Please advise on optimal tax filing and input tax credit (ITC) reconciliation.`;
      }
    });
  }

  calculate();
}

function initIncomeTaxCalculator() {
  const slider = document.getElementById('it-income-slider');
  const incomeDisplay = document.getElementById('it-income-display');
  const ded80cInput = document.getElementById('it-ded-80c');
  const ded80dInput = document.getElementById('it-ded-80d');
  const dedOtherInput = document.getElementById('it-ded-other');
  const deductionsBadge = document.getElementById('total-deductions-badge');
  const consultBtn = document.getElementById('it-consult-btn');

  function calculateTax() {
    const gross = parseFloat(slider ? slider.value : 1200000) || 1200000;
    const ded80c = Math.min(150000, parseFloat(ded80cInput ? ded80cInput.value : 150000) || 0);
    const ded80d = Math.min(100000, parseFloat(ded80dInput ? ded80dInput.value : 25000) || 0);
    const dedOther = parseFloat(dedOtherInput ? dedOtherInput.value : 75000) || 0;
    const totalDeductions = ded80c + ded80d + dedOther + 50000; // includes 50k standard deduction for old regime

    if (incomeDisplay) {
      incomeDisplay.textContent = `₹${gross.toLocaleString('en-IN')}`;
    }
    if (deductionsBadge) {
      deductionsBadge.textContent = `₹${totalDeductions.toLocaleString('en-IN')}`;
    }

    // --- 1. NEW REGIME (AY 2025-26 Budget Slabs) ---
    // Standard deduction under New Regime: ₹75,000
    const taxableNew = Math.max(0, gross - 75000);
    let taxNew = 0;

    if (taxableNew <= 700000) {
      // 87A rebate makes tax nil up to 7L
      taxNew = 0;
    } else {
      if (taxableNew > 1500000) {
        taxNew += (taxableNew - 1500000) * 0.30;
        taxNew += 300000 * 0.20; // 12-15L
        taxNew += 200000 * 0.15; // 10-12L
        taxNew += 300000 * 0.10; // 7-10L
        taxNew += 400000 * 0.05; // 3-7L
      } else if (taxableNew > 1200000) {
        taxNew += (taxableNew - 1200000) * 0.20;
        taxNew += 200000 * 0.15;
        taxNew += 300000 * 0.10;
        taxNew += 400000 * 0.05;
      } else if (taxableNew > 1000000) {
        taxNew += (taxableNew - 1000000) * 0.15;
        taxNew += 300000 * 0.10;
        taxNew += 400000 * 0.05;
      } else if (taxableNew > 700000) {
        taxNew += (taxableNew - 700000) * 0.10;
        taxNew += 400000 * 0.05;
      } else if (taxableNew > 300000) {
        taxNew += (taxableNew - 300000) * 0.05;
      }
    }
    // Add 4% cess
    taxNew = Math.round(taxNew * 1.04);

    // --- 2. OLD REGIME ---
    const taxableOld = Math.max(0, gross - totalDeductions);
    let taxOld = 0;

    if (taxableOld <= 500000) {
      taxOld = 0; // 87A rebate
    } else {
      if (taxableOld > 1000000) {
        taxOld += (taxableOld - 1000000) * 0.30;
        taxOld += 500000 * 0.20; // 5-10L
        taxOld += 250000 * 0.05; // 2.5-5L
      } else if (taxableOld > 500000) {
        taxOld += (taxableOld - 500000) * 0.20;
        taxOld += 250000 * 0.05;
      } else if (taxableOld > 250000) {
        taxOld += (taxableOld - 250000) * 0.05;
      }
    }
    taxOld = Math.round(taxOld * 1.04);

    // Update DOM elements
    const taxNewEl = document.getElementById('it-tax-new');
    const taxOldEl = document.getElementById('it-tax-old');
    const badgeEl = document.getElementById('it-recommendation-badge');
    const bannerEl = document.getElementById('it-savings-banner');
    const savingsEl = document.getElementById('it-savings-amount');

    if (taxNewEl) taxNewEl.textContent = `₹${taxNew.toLocaleString('en-IN')}`;
    if (taxOldEl) taxOldEl.textContent = `₹${taxOld.toLocaleString('en-IN')}`;

    const diff = Math.abs(taxOld - taxNew);

    if (taxNew <= taxOld) {
      if (badgeEl) {
        badgeEl.textContent = 'New Regime Saves More';
        badgeEl.className = 'calc-rate-badge green';
      }
      if (bannerEl) {
        bannerEl.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <strong>You save ₹${diff.toLocaleString('en-IN')} under New Regime!</strong>
            <p style="font-size: 0.8rem; margin-top: 2px; color: var(--text-secondary);">Simulated with 4% Health & Education Cess</p>
          </div>
        `;
      }
    } else {
      if (badgeEl) {
        badgeEl.textContent = 'Old Regime Saves More';
        badgeEl.className = 'calc-rate-badge';
      }
      if (bannerEl) {
        bannerEl.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <strong>You save ₹${diff.toLocaleString('en-IN')} under Old Regime with your deductions!</strong>
            <p style="font-size: 0.8rem; margin-top: 2px; color: var(--text-secondary);">Based on claimed Sec 80C, 80D & exemptions</p>
          </div>
        `;
      }
    }
  }

  if (slider) slider.addEventListener('input', calculateTax);
  if (ded80cInput) ded80cInput.addEventListener('input', calculateTax);
  if (ded80dInput) ded80dInput.addEventListener('input', calculateTax);
  if (dedOtherInput) dedOtherInput.addEventListener('input', calculateTax);

  if (consultBtn) {
    consultBtn.addEventListener('click', () => {
      selectServiceForInquiry('Income Tax Filing & Compliance');
      const msgInput = document.getElementById('consultation-message');
      const gross = slider ? slider.value : 1200000;
      if (msgInput) {
        msgInput.value = `Income Tax Planning Request: Annual income of approx ₹${parseInt(gross, 10).toLocaleString('en-IN')}. Seeking professional CA advice on optimal tax regime selection, capital gains deductions, and maximizing ITR refund.`;
      }
    });
  }

  calculateTax();
}

/* ==========================================================================
   5. SMART COMPLIANCE & ENTITY NAVIGATOR (QUIZ)
   ========================================================================== */
function initComplianceQuiz() {
  let selectedEntity = null;
  let selectedGoal = null;

  const step1 = document.getElementById('quiz-step-1');
  const step2 = document.getElementById('quiz-step-2');
  const step3 = document.getElementById('quiz-step-3');

  const ind1 = document.querySelector('.quiz-step-indicator[data-step="1"]');
  const ind2 = document.querySelector('.quiz-step-indicator[data-step="2"]');
  const ind3 = document.querySelector('.quiz-step-indicator[data-step="3"]');

  const backBtn = document.getElementById('quiz-back-btn');
  const restartBtn = document.getElementById('quiz-restart-btn');
  const consultActionBtn = document.getElementById('quiz-action-consult-btn');

  // Step 1 clicks
  const entityCards = document.querySelectorAll('#quiz-step-1 .quiz-option-card');
  entityCards.forEach(card => {
    card.addEventListener('click', () => {
      selectedEntity = card.getAttribute('data-entity');
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';
      if (ind1) ind1.classList.remove('active');
      if (ind2) ind2.classList.add('active');
    });
  });

  // Step 2 clicks
  const goalCards = document.querySelectorAll('#quiz-step-2 .quiz-option-card');
  goalCards.forEach(card => {
    card.addEventListener('click', () => {
      selectedGoal = card.getAttribute('data-goal');
      showResult();
    });
  });

  function showResult() {
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'block';
    if (ind2) ind2.classList.remove('active');
    if (ind3) ind3.classList.add('active');

    const key = `${selectedEntity}_${selectedGoal}`;
    const resData = (SGS_DATA.navigatorQuiz && SGS_DATA.navigatorQuiz.results && SGS_DATA.navigatorQuiz.results[key])
      ? SGS_DATA.navigatorQuiz.results[key]
      : (SGS_DATA.navigatorQuiz.results['default'] || {
          recommendedService: "Custom Tax & Financial Compliance Advisory",
          turnaround: "1 - 3 Business Days",
          checklist: ["Basic Identity Documents", "Relevant Invoices or Notices", "Financial Statements"],
          summary: "Personalized consultation with our senior Chartered Accountants and tax consultants."
        });

    const titleEl = document.getElementById('quiz-res-service-title');
    const descEl = document.getElementById('quiz-res-summary');
    const timeEl = document.getElementById('quiz-res-turnaround');
    const listEl = document.getElementById('quiz-res-checklist');

    if (titleEl) titleEl.textContent = resData.recommendedService;
    if (descEl) descEl.textContent = resData.summary;
    if (timeEl) timeEl.textContent = resData.turnaround;

    if (listEl) {
      listEl.innerHTML = resData.checklist.map(item => `<li>${item}</li>`).join('');
    }

    if (consultActionBtn) {
      consultActionBtn.onclick = () => {
        selectServiceForInquiry(resData.recommendedService);
        const msgInput = document.getElementById('consultation-message');
        if (msgInput) {
          msgInput.value = `Inquiry following Advisor Quiz: Structure: ${selectedEntity || 'Business'}, Need: ${selectedGoal || 'Compliance'}. Recommended Service: ${resData.recommendedService}. Turnaround estimate: ${resData.turnaround}.`;
        }
      };
    }
  }

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (step2) step2.style.display = 'none';
      if (step1) step1.style.display = 'block';
      if (ind2) ind2.classList.remove('active');
      if (ind1) ind1.classList.add('active');
    });
  }

  // Restart button
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      selectedEntity = null;
      selectedGoal = null;
      if (step3) step3.style.display = 'none';
      if (step1) step1.style.display = 'block';
      if (ind3) ind3.classList.remove('active');
      if (ind1) ind1.classList.add('active');
    });
  }
}

/* ==========================================================================
   6. STATUTORY DUE DATE LIVE COUNTDOWN CLOCK
   ========================================================================== */
function initDueCountdown() {
  const daysEl = document.getElementById('clock-days');
  const hoursEl = document.getElementById('clock-hours');
  const minsEl = document.getElementById('clock-mins');
  const secsEl = document.getElementById('clock-secs');
  const titleEl = document.getElementById('next-deadline-title');

  function getNextStatutoryDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // Statutory monthly targets:
    // 7th: TDS Deposit
    // 11th: GSTR-1
    // 15th: PF & ESI
    // 20th: GSTR-3B
    const targets = [
      { day: 7, title: "TDS / TCS Monthly Deposit" },
      { day: 11, title: "GSTR-1 Monthly Outward Supplies" },
      { day: 15, title: "PF & ESIC Monthly Remittance" },
      { day: 20, title: "GSTR-3B Monthly Return & Tax Liability" }
    ];

    for (let t of targets) {
      const targetDate = new Date(currentYear, currentMonth, t.day, 23, 59, 59);
      if (targetDate > now) {
        return { date: targetDate, title: `${t.title} (${t.day}th)` };
      }
    }

    // If passed all in current month, target the 7th of next month
    const nextMonth = new Date(currentYear, currentMonth + 1, 7, 23, 59, 59);
    return { date: nextMonth, title: "TDS / TCS Deposit (7th Next Month)" };
  }

  const nextDue = getNextStatutoryDate();
  if (titleEl) {
    titleEl.textContent = `Upcoming: ${nextDue.title}`;
  }

  function updateClock() {
    const now = new Date();
    let diff = nextDue.date - now;

    if (diff <= 0) {
      diff = 0;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. CLIENT SUCCESS STORIES & CASE STUDIES
   ========================================================================== */
function initClientStories() {
  const tabsContainer = document.getElementById('stories-nav-tabs');
  const displayContainer = document.getElementById('story-detail-display');
  if (!tabsContainer || !displayContainer || !SGS_DATA.clientStories) return;

  const stories = SGS_DATA.clientStories;
  let activeIndex = 0;

  function renderTabs() {
    tabsContainer.innerHTML = stories.map((s, idx) => `
      <button class="story-tab-btn ${idx === activeIndex ? 'active' : ''}" data-index="${idx}">
        ${s.category}
      </button>
    `).join('');

    const btns = tabsContainer.querySelectorAll('.story-tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeIndex = parseInt(btn.getAttribute('data-index'), 10);
        renderTabs();
        renderActiveStory();
      });
    });
  }

  function renderActiveStory() {
    const s = stories[activeIndex];
    displayContainer.innerHTML = `
      <div class="story-detail-grid">
        <div class="story-content">
          <div class="story-client-type">Client Case: ${s.clientType}</div>
          <h3>${s.title}</h3>
          
          <div class="story-narrative-block">
            <strong>The Compliance Challenge</strong>
            <p>${s.challenge}</p>
          </div>

          <div class="story-narrative-block">
            <strong>SGS Strategic Execution</strong>
            <p>${s.solution}</p>
          </div>
        </div>

        <div class="story-metric-card">
          <div class="story-metric-figure">${s.metric}</div>
          <span class="story-metric-badge">${s.badge}</span>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 12px;">Audited & Verified under statutory guidelines</p>
        </div>
      </div>
    `;
  }

  renderTabs();
  renderActiveStory();
}

/* ==========================================================================
   8. CARD SPOTLIGHT MOUSE TRACKING
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.interactive-glow-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   9. BRANCHES RENDERING
   ========================================================================== */
function renderBranches() {
  const container = document.getElementById('branches-grid-container');
  if (!container) return;

  container.innerHTML = SGS_DATA.branches.map(branch => `
    <div class="branch-card ${branch.isHeadOffice ? 'is-headoffice' : ''} interactive-glow-card">
      <div class="branch-header">
        <h3 class="branch-title">${branch.name}</h3>
        ${branch.isHeadOffice ? '<span class="headoffice-badge">Head Office</span>' : ''}
      </div>

      <div class="branch-address">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <p><strong>${branch.address}</strong></p>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Near: ${branch.landmark}</p>
        </div>
      </div>

      <div class="branch-contact-list">
        <div class="branch-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <div>
            ${branch.phones.map(p => `<a href="tel:${p.replace(/\s+/g, '')}">${p}</a>`).join(' / ')}
          </div>
        </div>

        <div class="branch-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <a href="mailto:${branch.email}">${branch.email}</a>
        </div>

        <div class="branch-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${branch.timing}</span>
        </div>
      </div>

      <div class="branch-actions">
        <a href="https://maps.google.com/?q=${branch.mapQuery}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="flex: 1;">
          Get Directions
        </a>
        <a href="https://wa.me/${SGS_DATA.firm.whatsapp}?text=Hello%20SGS%20Associates,%20I%20would%20like%20to%20consult%20at%20your%20${encodeURIComponent(branch.name)}" target="_blank" rel="noopener" class="btn btn-green btn-sm" style="flex: 1;">
          WhatsApp
        </a>
      </div>
    </div>
  `).join('');

  initCardSpotlight();
}

/* ==========================================================================
   10. CALENDAR RENDERING
   ========================================================================== */
function renderCalendar() {
  const container = document.getElementById('calendar-grid-container');
  if (!container) return;

  container.innerHTML = SGS_DATA.complianceCalendar.map(item => `
    <div class="calendar-item interactive-glow-card">
      <div class="calendar-date-badge">
        <span class="day">${item.day}</span>
        <span class="month">${item.month}</span>
      </div>
      <div class="calendar-item-info">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');

  initCardSpotlight();
}

/* ==========================================================================
   11. CONSULTATION FORM & HYBRID INQUIRY DISPATCH
   ========================================================================== */
async function sendToInquiryEndpoint(payload) {
  const endpoint = SGS_DATA.firm.inquiryEndpoint;
  if (!endpoint || endpoint.trim() === '') {
    return false;
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    return false;
  }
}

function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successCard = document.getElementById('consultation-success-card');
  const submitBtn = document.getElementById('consultation-submit-btn');
  const resetBtn = document.getElementById('consultation-reset-btn');
  const whatsappDirectBtn = document.getElementById('whatsapp-direct-btn');

  function getFormData() {
    return {
      type: 'consultation',
      name: (document.getElementById('consultation-name')?.value || '').trim(),
      phone: (document.getElementById('consultation-phone')?.value || '').trim(),
      email: (document.getElementById('consultation-email')?.value || '').trim(),
      service: document.getElementById('consultation-service')?.value || 'General Compliance / Other',
      branch: document.getElementById('consultation-branch')?.value || 'Head Office - North Paravur',
      message: (document.getElementById('consultation-message')?.value || '').trim(),
      submittedAt: new Date().toISOString()
    };
  }

  function generateWhatsAppUrl(data) {
    const text = `*New Consultation Request - SGS Associates*%0A%0A` +
      `*Client Name:* ${encodeURIComponent(data.name || 'Client')}%0A` +
      `*Phone Number:* ${encodeURIComponent(data.phone || 'Not provided')}%0A` +
      (data.email ? `*Email:* ${encodeURIComponent(data.email)}%0A` : '') +
      `*Required Service:* ${encodeURIComponent(data.service)}%0A` +
      `*Preferred Branch:* ${encodeURIComponent(data.branch)}%0A` +
      (data.message ? `*Notes:* ${encodeURIComponent(data.message)}%0A` : '');

    return `https://wa.me/${SGS_DATA.firm.whatsapp}?text=${text}`;
  }

  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      window.open(generateWhatsAppUrl(data), '_blank');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = getFormData();

      if (!data.name || !data.phone) {
        alert('Please enter your Name and Contact Phone Number so our advisors can assist you.');
        return;
      }

      if (submitBtn) submitBtn.classList.add('is-loading');

      await sendToInquiryEndpoint(data);

      const clientNameEl = document.getElementById('success-client-name');
      const serviceNameEl = document.getElementById('success-service-name');
      const branchNameEl = document.getElementById('success-branch-name');
      const whatsappCtaEl = document.getElementById('success-whatsapp-btn');

      if (clientNameEl) clientNameEl.textContent = data.name;
      if (serviceNameEl) serviceNameEl.textContent = data.service;
      if (branchNameEl) branchNameEl.textContent = data.branch;
      if (whatsappCtaEl) whatsappCtaEl.href = generateWhatsAppUrl(data);

      if (submitBtn) submitBtn.classList.remove('is-loading');
      form.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'block';
      }
      if (successCard) {
        successCard.style.display = 'none';
      }
    });
  }
}

/* ==========================================================================
   12. CAREER APPLICATION MODAL
   ========================================================================== */
function initCareerModal() {
  const modal = document.getElementById('career-modal');
  const openBtns = document.querySelectorAll('.open-career-modal-btn');
  const closeBtn = document.getElementById('close-career-modal');
  const careerForm = document.getElementById('career-application-form');
  const careerSuccessCard = document.getElementById('career-success-card');
  const careerSubmitBtn = document.getElementById('career-submit-btn');

  function resetModalState() {
    if (careerForm) {
      careerForm.reset();
      careerForm.style.display = 'block';
    }
    if (careerSuccessCard) {
      careerSuccessCard.style.display = 'none';
    }
    if (careerSubmitBtn) {
      careerSubmitBtn.classList.remove('is-loading');
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resetModalState();
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (careerForm) {
    careerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('applicant-name')?.value || '').trim();
      const phone = (document.getElementById('applicant-phone')?.value || '').trim();
      const qualification = document.getElementById('applicant-qualification')?.value || 'B.Com';
      const branch = document.getElementById('applicant-branch')?.value || 'Head Office - North Paravur';
      const notes = (document.getElementById('applicant-notes')?.value || '').trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number to submit your application.');
        return;
      }

      if (careerSubmitBtn) careerSubmitBtn.classList.add('is-loading');

      const payload = {
        type: 'career',
        name,
        phone,
        qualification,
        branch,
        notes,
        submittedAt: new Date().toISOString()
      };

      await sendToInquiryEndpoint(payload);

      if (careerSubmitBtn) careerSubmitBtn.classList.remove('is-loading');

      const careerNameEl = document.getElementById('career-success-name');
      const careerWhatsappEl = document.getElementById('career-whatsapp-btn');
      if (careerNameEl) careerNameEl.textContent = name;

      const whatsappText = `*Trainee Job Application - SGS Associates*%0A%0A` +
        `*Applicant Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone Number:* ${encodeURIComponent(phone)}%0A` +
        `*Qualification:* ${encodeURIComponent(qualification)}%0A` +
        `*Preferred Branch:* ${encodeURIComponent(branch)}%0A` +
        `*Brief Profile:* ${encodeURIComponent(notes || 'Fresh graduate applying for trainee position.')}`;

      if (careerWhatsappEl) {
        careerWhatsappEl.href = `https://wa.me/${SGS_DATA.firm.whatsapp}?text=${whatsappText}`;
      }

      careerForm.style.display = 'none';
      if (careerSuccessCard) {
        careerSuccessCard.style.display = 'block';
      }
    });
  }
}

/* ==========================================================================
   13. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openDrawer);
  }
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

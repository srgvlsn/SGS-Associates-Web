/**
 * SGS ASSOCIATES - MAIN INTERACTION SCRIPT
 * Modular, clean, and easily portable to React/Vite in the future.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderServices('all');
  initServiceFilterTabs();
  renderBranches();
  renderCalendar();
  initContactForm();
  initCareerModal();
  initMobileDrawer();
});

/* ==========================================================================
   HEADER SCROLL & ACTIVE LINK
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   SERVICES RENDERING & FILTERING
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

function renderServices(selectedCategory) {
  const container = document.getElementById('services-grid-container');
  if (!container) return;

  const filtered = selectedCategory === 'all' 
    ? SGS_DATA.services 
    : SGS_DATA.services.filter(s => s.category === selectedCategory);

  container.innerHTML = filtered.map(item => `
    <div class="service-card" data-category="${item.category}">
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
}

function initServiceFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderServices(category);
    });
  });
}

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
      // Add custom option or set to other
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
   BRANCHES RENDERING
   ========================================================================== */
function renderBranches() {
  const container = document.getElementById('branches-grid-container');
  if (!container) return;

  container.innerHTML = SGS_DATA.branches.map(branch => `
    <div class="branch-card ${branch.isHeadOffice ? 'is-headoffice' : ''}">
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
          <span>${branch.phones.join(' / ')}</span>
        </div>
        <div class="branch-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${branch.timing}</span>
        </div>
      </div>

      <div class="branch-actions">
        <a href="tel:${branch.phones[0].replace(/\s+/g, '')}" class="btn btn-sm btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Branch
        </a>
        <a href="https://maps.google.com/?q=${encodeURIComponent(branch.mapQuery)}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">
          Directions
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CALENDAR TICKER RENDERING
   ========================================================================== */
function renderCalendar() {
  const container = document.getElementById('calendar-grid-container');
  if (!container) return;

  container.innerHTML = SGS_DATA.complianceCalendar.map(item => `
    <div class="calendar-card">
      <div class="calendar-card-day">${item.day}</div>
      <div class="calendar-card-month">${item.month}</div>
      <div class="calendar-card-title">${item.title}</div>
      <div class="calendar-card-desc">${item.desc}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   CONTACT & CONSULTATION FORM (WITH WHATSAPP DISPATCH)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const whatsappBtn = document.getElementById('whatsapp-direct-btn');

  function getFormData() {
    return {
      name: document.getElementById('consultation-name')?.value.trim() || '',
      phone: document.getElementById('consultation-phone')?.value.trim() || '',
      email: document.getElementById('consultation-email')?.value.trim() || '',
      service: document.getElementById('consultation-service')?.value || '',
      branch: document.getElementById('consultation-branch')?.value || '',
      message: document.getElementById('consultation-message')?.value.trim() || ''
    };
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      const text = `*New Website Inquiry - SGS Associates*%0A%0A` +
        `*Name:* ${encodeURIComponent(data.name || 'Client')}%0A` +
        `*Phone:* ${encodeURIComponent(data.phone || 'Not provided')}%0A` +
        `*Service Needed:* ${encodeURIComponent(data.service || 'General Compliance')}%0A` +
        `*Preferred Branch:* ${encodeURIComponent(data.branch || 'North Paravur')}%0A` +
        `*Details:* ${encodeURIComponent(data.message || 'I would like to book a consultation.')}`;

      window.open(`https://wa.me/${SGS_DATA.firm.whatsapp}?text=${text}`, '_blank');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!data.name || !data.phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      // Display friendly success notification
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Inquiry Sent!';
      submitBtn.style.background = 'var(--color-green)';
      submitBtn.style.color = '#000';

      setTimeout(() => {
        alert(`Thank you, ${data.name}! We have received your consultation request for ${data.service}. Our team from ${data.branch} will connect with you shortly.`);
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 500);
    });
  }
}

/* ==========================================================================
   CAREER APPLICATION MODAL
   ========================================================================== */
function initCareerModal() {
  const modal = document.getElementById('career-modal');
  const openBtns = document.querySelectorAll('.open-career-modal-btn');
  const closeBtn = document.getElementById('close-career-modal');
  const careerForm = document.getElementById('career-application-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicant-name')?.value.trim() || '';
      const phone = document.getElementById('applicant-phone')?.value.trim() || '';
      const qual = document.getElementById('applicant-qualification')?.value || '';
      const branch = document.getElementById('applicant-branch')?.value || '';
      const notes = document.getElementById('applicant-notes')?.value.trim() || '';

      const text = `*Trainee Job Application - SGS Associates*%0A%0A` +
        `*Applicant Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Qualification:* ${encodeURIComponent(qual)}%0A` +
        `*Preferred Branch:* ${encodeURIComponent(branch)}%0A` +
        `*Notes:* ${encodeURIComponent(notes || 'Fresh graduate eager to learn.')}`;

      window.open(`https://wa.me/${SGS_DATA.firm.whatsapp}?text=${text}`, '_blank');

      alert(`Thank you ${name}! Your trainee application has been prepared. You will now be redirected to submit it directly to SGS Associates HR on WhatsApp/Email.`);
      modal.classList.remove('active');
      careerForm.reset();
    });
  }
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
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

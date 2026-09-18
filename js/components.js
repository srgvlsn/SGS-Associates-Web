/**
 * SGS ASSOCIATES — SHARED COMPONENTS ENGINE
 * Centralized, reusable components for Navigation, Global Contact Form, and Footer.
 * Modeled after modern enterprise architecture (inspired by orchid.security).
 */

const SGS_COMPONENTS = {
  /**
   * Render Top Notification & Helpline Bar
   */
  getTopBarHTML() {
    return `
      <aside class="top-bar" aria-label="Quick contact and office hours">
        <div class="container">
          <div class="top-bar-left">
            <div class="top-bar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Helpline: <a href="tel:9947144568">9947144568</a><span class="top-bar-alt-phones"> / <a href="tel:9847365124">9847365124</a> / <a href="tel:8281027566">8281027566</a></span></span>
            </div>
            <div class="top-bar-item top-bar-email-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <a href="mailto:tax.sgs@gmail.com">tax.sgs@gmail.com</a>
            </div>
          </div>
          <div class="top-bar-right">
            <div class="top-bar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Mon - Sat: 9:30 AM - 6:00 PM</span>
            </div>
            <div class="top-bar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>6 Branches across Kerala</span>
            </div>
          </div>
        </div>
      </aside>
    `;
  },

  /**
   * Render Main Sticky Header with Navigation
   * @param {string} activePage - e.g. 'home', 'services', 'due-dates', 'tools', 'about', 'careers', 'contact'
   */
  getHeaderHTML(activePage = 'home') {
    const isActive = (page) => activePage === page ? 'active' : '';

    return `
      <header class="header" role="banner">
        <div class="container">
          <a href="index.html" class="brand-logo" title="SGS Associates Homepage">
            <img src="assets/icons/LOGO.png" alt="SGS Associates Logo" width="180" height="48">
          </a>

          <!-- Desktop Navigation Menu with Clean Dropdowns -->
          <nav class="nav-menu" aria-label="Main Navigation">
            <a href="index.html" class="nav-link ${isActive('home')}">Home</a>

            <!-- Services Dropdown -->
            <div class="nav-dropdown">
              <a href="services.html" class="nav-link nav-dropdown-toggle ${isActive('services')}">
                <span>Services</span>
                <svg class="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="services.html" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>All 18+ Services</strong>
                    <span>MCA, GST, Audits, PF &amp; Appeals</span>
                  </div>
                </a>
                <a href="due-dates.html" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>Statutory Due Dates</strong>
                    <span>Live Countdown &amp; Tax Deadlines</span>
                  </div>
                </a>
                <a href="tools.html" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>Tax &amp; GST Calculators</strong>
                    <span>GST Estimator &amp; Regime Comparison</span>
                  </div>
                </a>
              </div>
            </div>

            <a href="due-dates.html" class="nav-link ${isActive('due-dates')}">Due Dates</a>
            <a href="tools.html" class="nav-link ${isActive('tools')}">Financial Tools</a>

            <!-- About Us Dropdown -->
            <div class="nav-dropdown">
              <a href="about.html" class="nav-link nav-dropdown-toggle ${isActive('about')}">
                <span>About Us</span>
                <svg class="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="about.html" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>Firm Profile &amp; Pillars</strong>
                    <span>Over 15 Years of Trusted Practice</span>
                  </div>
                </a>
                <a href="about.html#client-stories" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>Client Case Studies</strong>
                    <span>Real-world Tax Solutions</span>
                  </div>
                </a>
                <a href="contact.html#branches" class="dropdown-item">
                  <div class="dd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div class="dd-text">
                    <strong>6 Regional Branches</strong>
                    <span>North Paravur, Adimali &amp; More</span>
                  </div>
                </a>
              </div>
            </div>

            <a href="careers.html" class="nav-link ${isActive('careers')}">Careers <span class="nav-badge-hiring">Hiring</span></a>
            <a href="contact.html" class="nav-link ${isActive('contact')}">Contact &amp; Branches</a>
          </nav>

          <!-- Action Button & Mobile Toggle -->
          <div class="nav-actions">
            <a href="#contact" class="btn btn-primary btn-sm">
              Book Consultation
            </a>
            <button id="mobile-toggle-btn" class="mobile-toggle" aria-label="Toggle mobile navigation menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    `;
  },

  /**
   * Render Mobile Slide Drawer
   */
  getMobileDrawerHTML(activePage = 'home') {
    const isActive = (page) => activePage === page ? 'active' : '';

    return `
      <div id="mobile-drawer-overlay" class="mobile-drawer-overlay"></div>
      <aside id="mobile-drawer" class="mobile-drawer" aria-label="Mobile Navigation">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <img src="assets/icons/LOGO.png" alt="SGS Associates" style="height: 38px;">
          <button id="mobile-drawer-close" aria-label="Close navigation" style="background: transparent; border: none; color: #fff; cursor: pointer; padding: 4px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mobile-drawer-nav">
          <a href="index.html" class="mobile-drawer-link ${isActive('home')}">Home</a>
          <a href="services.html" class="mobile-drawer-link ${isActive('services')}">Services (18+ Areas)</a>
          <a href="due-dates.html" class="mobile-drawer-link ${isActive('due-dates')}">Due Dates &amp; Calendar</a>
          <a href="tools.html" class="mobile-drawer-link ${isActive('tools')}">Financial Tools &amp; Calculators</a>
          <a href="about.html" class="mobile-drawer-link ${isActive('about')}">About Firm &amp; Success Stories</a>
          <a href="careers.html" class="mobile-drawer-link ${isActive('careers')}">Careers &amp; Traineeship <span class="nav-badge-hiring" style="margin-left: 6px;">Hiring</span></a>
          <a href="contact.html" class="mobile-drawer-link ${isActive('contact')}">Contact &amp; 6 Kerala Branches</a>
        </div>
        <div style="margin-top: auto; padding-top: 24px; border-top: 1px solid var(--bg-dark-border);">
          <a href="#contact" class="btn btn-primary mobile-drawer-link" style="width: 100%; margin-bottom: 12px; text-align: center;">Book Consultation</a>
          <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center;">
            Direct Helpline: <a href="tel:9947144568" style="color: var(--color-green); font-weight: 600;">9947144568</a>
          </p>
        </div>
      </aside>
    `;
  },

  /**
   * Render Global High-Converting Pre-Footer Contact Section (Orchid Security Style)
   * Included across EVERY page right above the footer so users never need to scroll endlessly
   */
  getGlobalContactSectionHTML() {
    return `
      <section id="contact" class="contact-section global-contact-section" aria-labelledby="contact-heading">
        <div class="container">
          <div class="contact-grid">
            <!-- Left Info Panel -->
            <div class="contact-info-panel">
              <div class="hero-badge" style="margin-bottom: 16px;">
                <span class="ping-dot"></span>
                <span>Proactive Tax &amp; Corporate Advisory</span>
              </div>
              <h2 id="contact-heading">Speak With Our Tax &amp; Corporate Specialists</h2>
              <p>
                Get reliable auditing, statutory corporate registrations, GST appeals, and income tax compliance tailored to your business across Kerala.
              </p>

              <div class="direct-contact-cards">
                <div class="contact-method-card">
                  <div class="method-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h5>Direct Helpline</h5>
                    <a href="tel:9947144568">+91 99471 44568</a>
                    <span style="font-size: 0.8rem; color: var(--text-secondary); display: block;">Also: 9847365124 / 8281027566</span>
                  </div>
                </div>

                <div class="contact-method-card">
                  <div class="method-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h5>Email Advisory Desk</h5>
                    <a href="mailto:tax.sgs@gmail.com">tax.sgs@gmail.com</a>
                    <span style="font-size: 0.8rem; color: var(--text-secondary); display: block;">Official replies within 2 working hours</span>
                  </div>
                </div>

                <div class="contact-method-card">
                  <div class="method-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h5>Head Office &amp; 6 Regional Hubs</h5>
                    <p style="color: #fff; font-weight: 600; margin: 0;">Vyapara Bhavan Complex, North Paravur</p>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Branches in Kodungallur, Cherai, Perumbavoor, Kaloor &amp; Adimali</p>
                  </div>
                </div>
              </div>

              <!-- Trust Signal Badges -->
              <div class="contact-trust-badges">
                <div class="trust-badge-item">
                  <span class="trust-check">✓</span>
                  <span>100% Confidential</span>
                </div>
                <div class="trust-badge-item">
                  <span class="trust-check">✓</span>
                  <span>Fast Turnaround</span>
                </div>
                <div class="trust-badge-item">
                  <span class="trust-check">✓</span>
                  <span>Direct CA Consultation</span>
                </div>
              </div>
            </div>

            <!-- Right Consultation Booking Card -->
            <div class="inquiry-form-card" id="contact-form-container">
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 8px;">Schedule a Consultation</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px;">
                Submit your inquiry below or connect directly with our designated accountant on WhatsApp.
              </p>

              <form id="consultation-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="consultation-name" class="form-label">Full Name *</label>
                    <input type="text" id="consultation-name" class="form-input" placeholder="e.g. Rahul Menon" required>
                  </div>
                  <div class="form-group">
                    <label for="consultation-phone" class="form-label">Contact Phone Number *</label>
                    <input type="tel" id="consultation-phone" class="form-input" placeholder="e.g. 9876543210" required>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="consultation-email" class="form-label">Email Address (Optional)</label>
                    <input type="email" id="consultation-email" class="form-input" placeholder="e.g. client@example.com">
                  </div>
                  <div class="form-group">
                    <label for="consultation-service" class="form-label">Service Required</label>
                    <select id="consultation-service" class="form-select">
                      <option value="Company & LLP Registration (MCA)">Company &amp; LLP Registration (MCA)</option>
                      <option value="Partnership Firm Registration">Partnership Firm Registration</option>
                      <option value="Import & Export Code (IEC)">Import &amp; Export Code (IEC)</option>
                      <option value="Income Tax Filing & Compliance">Income Tax Filing &amp; Compliance</option>
                      <option value="Tax Audits u/s 44AB">Tax Audits u/s 44AB</option>
                      <option value="TDS / TCS Filing & Correction">TDS / TCS Filing &amp; Correction</option>
                      <option value="GST Registration & Amendment">GST Registration &amp; Amendment</option>
                      <option value="GST Return Filing (GSTR-1, 3B, 9/9C)">GST Monthly &amp; Annual Return Filing</option>
                      <option value="GST Departmental Audits & Notice Handling">GST Audits &amp; Departmental Notices</option>
                      <option value="Day-to-Day Accounting & Bookkeeping">Day-to-Day Accounting &amp; Bookkeeping</option>
                      <option value="Statutory & Internal Audits">Statutory &amp; Internal Audits</option>
                      <option value="Finalization of Financial Accounts">Finalization of Financial Statements</option>
                      <option value="Project Reports for Bank Loans (CMA)">Project Reports for Bank Loans (CMA)</option>
                      <option value="Labour Law (PF & ESI Compliance)">Labour Law (PF &amp; ESI Compliance)</option>
                      <option value="Legal & Representations (Tax Appeals)">Legal &amp; Tax Appeals Representation</option>
                      <option value="Digital Signature Certificate (DSC)">Digital Signature Certificate (DSC)</option>
                      <option value="General Compliance / Other">General Advisory / Other Compliance</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="consultation-branch" class="form-label">Preferred Branch</label>
                  <select id="consultation-branch" class="form-select">
                    <option value="Head Office - North Paravur">Head Office - North Paravur</option>
                    <option value="Kodungallur Branch">Kodungallur Branch</option>
                    <option value="Cherai Branch">Cherai Branch</option>
                    <option value="Perumbavoor Branch">Perumbavoor Branch</option>
                    <option value="Kaloor Branch">Kaloor Branch</option>
                    <option value="Adimali Branch">Adimali Branch (Idukki)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="consultation-message" class="form-label">Brief Requirement / Question</label>
                  <textarea id="consultation-message" class="form-textarea" placeholder="Tell us about your business or specific filing questions..."></textarea>
                </div>

                <div class="form-submit-row">
                  <button type="submit" id="consultation-submit-btn" class="btn btn-primary" style="flex: 1;">
                    <span>Submit Inquiry</span>
                  </button>
                  <button type="button" id="whatsapp-direct-btn" class="btn whatsapp-fast-btn" style="flex: 1;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </form>

              <!-- Dynamic Submission Success Card -->
              <div id="consultation-success-card" class="submission-success-card" style="display: none;">
                <div class="success-icon-badge">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 class="success-heading">Inquiry Received Successfully!</h4>
                <p class="success-desc">
                  Thank you, <strong id="success-client-name" style="color: #fff;">Client</strong>. Your request regarding
                  <span id="success-service-name" style="color: var(--color-green); font-weight: 600;">Compliance</span> has been recorded and routed to our
                  <span id="success-branch-name" style="color: #CBD5E1; font-weight: 600;">North Paravur Head Office</span> advisory team.
                </p>

                <!-- Fast WhatsApp Connect Prompt -->
                <div class="whatsapp-prompt-box">
                  <div class="wpb-header">
                    <span class="pulse-dot"></span>
                    <strong>Need immediate feedback?</strong>
                  </div>
                  <p class="wpb-text">
                    Chat directly with our designated accountant on WhatsApp for quick filing quotes or document requirements:
                  </p>
                  <a href="#" id="success-whatsapp-btn" target="_blank" class="btn whatsapp-fast-btn wpb-cta-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Continue on WhatsApp Now &rarr;</span>
                  </a>
                </div>

                <button type="button" id="consultation-reset-btn" class="btn btn-secondary btn-sm" style="margin-top: 16px;">
                  &larr; Submit Another Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * Render Multi-Column Footer
   */
  getFooterHTML() {
    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="statutory-disclaimer">
            <strong>Statutory Notice:</strong> This website is maintained solely for providing informational and educational guidance regarding corporate, accounting, and tax compliance procedures. SGS Associates does not solicit work or advertise services in contravention of statutory professional guidelines.
          </div>

          <div class="footer-grid">
            <!-- Brand Info -->
            <div class="footer-brand">
              <a href="index.html">
                <img src="assets/icons/LOGO.png" alt="SGS Associates Logo" style="height: 44px; margin-bottom: 16px;">
              </a>
              <p>
                Qualified Chartered Accountants &amp; Tax Practitioners providing accounting, statutory audit, taxation, and MCA corporate registration services across Kerala.
              </p>
              <div style="font-size: 0.85rem; color: var(--color-green); font-weight: 600; margin-top: 12px;">
                ✓ 100% Statutory Compliance Assistance
              </div>
            </div>

            <!-- Quick Navigation Pages -->
            <div>
              <h4 class="footer-heading">Pages</h4>
              <ul class="footer-links-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">All 18+ Services</a></li>
                <li><a href="due-dates.html">Compliance Due Dates</a></li>
                <li><a href="tools.html">Financial Tools &amp; Calculators</a></li>
                <li><a href="about.html">About Firm &amp; Stories</a></li>
                <li><a href="careers.html">Careers &amp; Articleship</a></li>
                <li><a href="contact.html">Contact &amp; 6 Branches</a></li>
              </ul>
            </div>

            <!-- Practice Areas -->
            <div>
              <h4 class="footer-heading">Core Practice</h4>
              <ul class="footer-links-list">
                <li><a href="services.html">Company &amp; LLP Registration</a></li>
                <li><a href="services.html">Income Tax Filing &amp; Audit</a></li>
                <li><a href="services.html">GST Returns &amp; Reconciliations</a></li>
                <li><a href="services.html">Bookkeeping &amp; Accounting</a></li>
                <li><a href="services.html">Bank Project Reports (CMA)</a></li>
                <li><a href="services.html">PF &amp; ESI Labour Law</a></li>
              </ul>
            </div>

            <!-- Contact & Hours -->
            <div>
              <h4 class="footer-heading">Contact Us</h4>
              <ul class="footer-links-list">
                <li><strong>Head Office:</strong> Vyapara Bhavan Complex, North Paravur</li>
                <li><strong>Helpline:</strong> <a href="tel:9947144568">9947144568</a> / <a href="tel:9847365124">9847365124</a></li>
                <li><strong>Email:</strong> <a href="mailto:tax.sgs@gmail.com">tax.sgs@gmail.com</a></li>
                <li><strong>Working Hours:</strong> Mon - Sat: 9:30 AM - 6:00 PM</li>
                <li><strong>Branch Network:</strong> Kodungallur, Cherai, Perumbavoor, Kaloor, Adimali</li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} SGS Associates. All Rights Reserved. Chartered Accountants &amp; Tax Practitioners.</p>
            <div class="footer-bottom-links">
              <a href="contact.html">Privacy &amp; Terms</a>
              <span>•</span>
              <a href="due-dates.html">Tax Calendar</a>
              <span>•</span>
              <a href="contact.html">Branch Locator</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  /**
   * Initializes all shared components on any page
   * @param {string} activePage
   */
  init(activePage = 'home') {
    // 1. Top Bar
    const topBarContainer = document.getElementById('top-bar-placeholder');
    if (topBarContainer) {
      topBarContainer.outerHTML = this.getTopBarHTML();
    }

    // 2. Header
    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
      headerContainer.outerHTML = this.getHeaderHTML(activePage);
    }

    // 3. Mobile Drawer
    const drawerContainer = document.getElementById('mobile-drawer-placeholder');
    if (drawerContainer) {
      drawerContainer.outerHTML = this.getMobileDrawerHTML(activePage);
    }

    // 4. Global Contact Section (Orchid Security style pre-footer)
    const contactContainer = document.getElementById('global-contact-placeholder');
    if (contactContainer) {
      contactContainer.outerHTML = this.getGlobalContactSectionHTML();
    }

    // 5. Footer
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
      footerContainer.outerHTML = this.getFooterHTML();
    }
  }
};

window.SGS_COMPONENTS = SGS_COMPONENTS;

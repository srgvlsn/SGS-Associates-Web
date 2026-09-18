# Changelog

All notable changes to this project will be documented in this file.

## 3.0.0 - 2026-09-18 (v3.0)

### Added
- **Multi-Page Web Architecture (Orchid Security Inspired)**:
  - Restructured the monolithic single-page layout into 6 dedicated, high-performance subpages with focused breadcrumb hero banners:
    - [`services.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services.html): Complete 18+ services catalogue with interactive category filters, real-time search, and 1-click enquiry pre-fill.
    - [`due-dates.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/due-dates.html): Statutory compliance calendar with live countdown clock ticker, QRMP & CMP-08 details, reference table, and WhatsApp alerts.
    - [`tools.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/tools.html): Interactive Financial Toolkit featuring Smart GST estimator, New vs. Old Tax Regime simulator, and 3-step compliance quiz with custom SVG icons.
    - [`about.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/about.html): Firm profile, 4 credibility pillars, interactive client case studies tabs, and 6 branch cards.
    - [`careers.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/careers.html): We Are Hiring section, branch positions, and CA articleship / trainee application modal.
    - [`contact.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/contact.html): Walk-in branch directory, maps/directions info, helpline numbers, and direct consultation booking.
- **Persistent Pre-Footer Global Contact Form**:
  - Embedded a high-converting consultation form right above the footer across every single page.
  - Features enterprise trust badges, dynamic service auto-selection, WhatsApp routing, and interactive submission confirmation states.
- **Centralized Shared Components Engine (`js/components.js`)**:
  - Unified rendering for top helpline bar, floating sticky header with official logo ([`assets/icons/LOGO.png`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/icons/LOGO.png)), responsive mobile drawer, global contact section, and comprehensive footer.
- **New 6th Branch at Adimali (Idukki)**:
  - Added full branch data (`Near KSRTC Bus Stand, High Range Commercial Arcade, NH 85, Adimali`) in [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js).
  - Updated Kerala branch network count to 6 branches across all headers, helpline bars, footers, pre-footer consultation forms, careers traineeship modal, and homepage statistics counter (`data-target="6"`).
- **Homepage Quick-Access Hub Teasers**:
  - Fast department access cards on [`index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/index.html) allowing visitors to immediately navigate into their required section.

### Changed & Enhanced
- **Floating Sticky Navbar Architecture (`css/style.css`, `js/components.js`, `js/main.js`)**:
  - Replaced wrapper container injection with `.outerHTML` and set `position: sticky; top: 0; z-index: 1000; width: 100%;` so the header smoothly sticks and floats across all pages upon scrolling.
  - Switched body and html horizontal overflow to modern `overflow-x: clip;` preventing browser clipping contexts from disabling sticky positioning.
  - Restored interactive dropdown menus on "Services" and "About Us" with hover chevrons and seamless direct links.
  - Added `scroll-margin-top: 90px;` to all section anchors for clean alignment beneath the floating header.
- **Favicon Restored Across All 7 Pages**:
  - Replaced rectangular banner logo with the dedicated high-resolution square SGS emblem ([`assets/icons/LOGO_favicon.png`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/icons/LOGO_favicon.png)) across all HTML `<head>` tags.
- **Design System & Typography Standardization**:
  - Standardized font loading across all 7 HTML `<head>` files with preconnected Google Fonts (`Outfit` + `Inter`) and removed render-blocking CSS `@import`.
  - Upgraded quiz `.q-icon` with crisp vector SVG icons and glowing glassmorphic containers.
  - Replaced 40+ raw inline styles on [`due-dates.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/due-dates.html) with semantic classes (`.compliance-table-card`, `.compliance-table`).

### Fixed
- **Fixed Search Icon in Services (`services.html`)**:
  - Constrained `.service-search-box svg` and `.search-icon` to fixed 20x20px dimensions with explicit SVG attributes and CSS rules, eliminating icon enlargement.
- **Desktop Navigation Fitting & Responsive Breakpoints**:
  - Standardized `.nav-menu` gap (`clamp(8px, 1.3vw, 20px)`) and `.nav-link` font size (`0.91rem`) to eliminate link wrapping between 1024px and 1280px viewports.
  - Switched mobile drawer breakpoint to `1024px` for clean tablet viewing.
  - Added responsive utility classes (`.top-bar-alt-phones`, `.top-bar-email-item`) for clean single-helpline display on mobile screens.
- **CSS Variables Audit**:
  - Resolved all undefined CSS variables (`--text-muted`, `--transition-normal`, `--mouse-x`, `--mouse-y`) in [`css/variables.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/variables.css).

## 2.0.0 - 2026-09-11 (v2.0)

### Added
- **Interactive Financial Toolkit**:
  - *Smart GST Calculator*: Exclusive vs. Inclusive tax computation with 5%, 12%, 18%, and 28% slabs, quick amount presets (₹10k to ₹5L), visual ratio progress bar, and 1-click consultation form prefilling.
  - *AY 2025-26 Income Tax Regime Simulator*: Side-by-side comparison of New vs. Old Tax Regime with standard deduction, Section 80C, and Section 80D inputs, featuring real-time dynamic savings recommendation badge.
- **3-Click Compliance & Entity Navigator**:
  - Interactive questionnaire diagnosing entity structures (Proprietorship, LLP, Pvt Ltd, Individual, NRI) and compliance goals to output personalized document checklists, turnaround estimates, and 1-click booking.
- **Statutory Due Dates Showcase & Live Countdown Clock**:
  - Live ticking countdown clock (Days, Hours, Mins, Secs) tracking upcoming monthly & quarterly deadlines with 1-click WhatsApp reminder alerts.
  - Multi-column card matrix displaying all 7 statutory deadlines with frequency badges:
    - *TDS / TCS Deposit*: 07th Every Month
    - *GSTR-1 Filing*: 11th Every Month (Regular) & 13th Every Month (QRMP)
    - *PF & ESI Challan*: 15th Every Month
    - *CMP-08 Composition*: 18th Quarterly
    - *GSTR-3B Filing*: 20th Every Month (Regular) & 22nd Quarterly (QRMP)
    - *ITR Filing*: 31st July / Oct
    - *Annual Return*: Regular GSTR-9 & 9C (31 Dec) and Composition GSTR-4 (30 June)
- **Real-Time Live Service Search Bar**:
  - Instant keyword filtering across all 18+ practice areas with live match counter and zero-state fallback with 1-click reset.
- **Ambient Hero Particle Network**:
  - Interactive 60fps HTML5 canvas constellation responding smoothly to mouse movements and viewport intersection with emerald green and violet accent nodes.
- **Client Success Stories Showcase**:
  - Interactive case studies highlighting real metrics: ₹4.2L+ ITC recovery, 7-day MCA incorporation, 100% on-time filings, and ₹8.5L property tax savings across Kerala businesses.
- **Floating Quick-Action Island Dock**:
  - Modern glassmorphic slipstream dock pinned to the bottom screen for 1-click access to Calculators, Due Dates, Advisor Quiz, and direct WhatsApp chat.
- **Animated Numerical Counters**:
  - Dynamic cubic-bezier rolling number counters for key firm statistics (5+ Branches, 18+ Practice Areas, 100% Compliance, 1,500+ Satisfied Clients) triggered via IntersectionObserver.
- **Mouse-Tracking Card Spotlight Glow**:
  - Vercel/Linear-inspired dynamic radial lighting that follows the user's cursor across interactive cards.
- **Hero Floating Live Badges**:
  - Live status pills displaying timely statutory filing rate and upcoming filing deadlines.

### Changed
- **Streamlined Navigation Bar**:
  - Replaced cluttered 10-link top navigation with clean, professional dropdown menus:
    - *Services & Tools*: All Services, Tax & GST Calculators, Compliance Advisor Quiz, Statutory Due Dates.
    - *About Firm*: Why Choose Us, Client Success Stories, Our 5 Branches.
    - Direct Links: Home, Careers (Hiring), Contact, and Book Consultation CTA.
- **Scrollspy Dynamic Active Underline Tracking**:
  - Implemented viewport tracking where the active green glowing underline dynamically moves to the active section as the user scrolls, highlighting Home only when at the top.
- **Hero Floating Badge Alignment Refinement**:
  - Lowered `.badge-top-right` into the banner card space and raised `.badge-bottom-left` with ~42px clearance above the bottom glass WhatsApp card for optimal visual balance.
- **Layout & Navigation Synchronization**:
  - Reordered page sections into contiguous functional suites matching the navbar sequence (Hero $\rightarrow$ Services & Tools $\rightarrow$ About Firm $\rightarrow$ Careers $\rightarrow$ Contact), ensuring uninterrupted chronological scrolling and flawless scrollspy tracking.
- **Visual Design & Contrast Elevation**:
  - Upgraded typography, button states, dark-mode glassmorphism, and micro-animations throughout the entire platform.

## 1.0.0 - 2026-09-10

### Added
- **Hybrid Enquiry System**: Implemented an automated system where forms send JSON payloads to a Google Apps Script endpoint.
- **Google Sheets & Email Integration**: Backend script (`scripts/google-apps-script.js`) logs submissions to Google Sheets and sends styled HTML email alerts.
- **WhatsApp Fast-Track Integration**: Success cards now feature a "WhatsApp Fast-Track" button that pre-fills with form data.
- **Submission Success Cards**: Added new success UI cards for both Consultation and Career Application forms.
- **Data Centralization (`js/data.js`)**: Created `SGS_DATA` object to manage firm contact points and API endpoints.

### Changed
- Updated `js/main.js` to support async webhooks and success state transitions.
- Updated `index.html` DOM structures for the new success UI components.
- Updated `css/style.css` with styles for the `submission-success-card` and button loading states.
- Refined form submissions to fail gracefully to WhatsApp if the backend endpoint is missing.

### Removed
- Removed `.git` directory to start a fresh git history as requested.

# Changelog

All notable changes to this project will be documented in this file.

## 4.3.2 - 2026-11-04 (v4.3.2)

- **Hero Banner Asset Refresh**:
  - Replaced the previous elongated banner in [`assets/images/hero-banner.jpg`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/images/hero-banner.jpg) with the clean 4:3 high-resolution composition (1448 × 1086), removing the redundant bottom address strip and framing seamlessly inside the homepage hero media card.

## 4.3.1 - 2026-11-04 (v4.3.1)

- **Phone Number Display Standardization (`+91 XXXXX XXXXX`)**:
  - Adopted the official Indian telecom & national numbering standard 5-5 split (`+91 XXXXX XXXXX`) across the entire site.
  - Standardized all primary numbers (`+91 99471 44568`, `+91 98473 65124`, `+91 82810 27566`) across [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js), [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js) (top bar helpline, mobile drawer, pre-footer contact, and footer), and [`firm/careers/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/careers/index.html).
  - Maintained clean, space-stripped dialable strings (`href="tel:+91..."`) to ensure seamless one-tap calling on all mobile devices.
- **Branch Address & Pincode Data Harmonization**:
  - **Cherai Branch**: Updated official postal address to `Cherai Tower, Devaswam Nada, Cherai - 683514` with targeted landmark and Google Maps navigation query.
  - **Kodungallur Branch**: Updated official building address to `XX/32B, 32C, Near Krishna Temple, Chappara, Pullut - 680663` (PIN `680663`) with updated landmark and Google Maps query.
  - **Head Office (North Paravur)**: Added pincode `683513` across the primary address string in [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js) and synchronized contact/footer components in [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js).
  - **Streamlined Card Layout**: Removed redundant `Near: ...` secondary subtext from branch cards in [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js), keeping the address presentation crisp and decluttered.

## 4.3.0 - 2026-10-26 (v4.3.0)

- **Buttery-Smooth Client-Side SPA Navigation & View Transitions Engine**:
  - **Speculative Hover & Touch Prefetching**: Engineered custom in-memory caching engine in [`js/router.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/router.js) that intercepts `pointerenter` and `touchstart` events to pre-fetch target pages into RAM ~150–250ms before the click finishes, achieving true **0 ms perceived network latency**.
  - **Idle Route Pre-loading**: Automatically loads core site sections (`services-page/`, `due-dates/`, `financial-tools/`, `clients/`, `firm/about/`, `contact/`) in the background via `requestIdleCallback` after initial page paint.
  - **Stationary App Shell with Native View Transitions**:
    - Isolated `.header` (`sgs-header`), `.top-bar` (`sgs-topbar`), and `#main-content` (`sgs-main`) using browser View Transitions (`document.startViewTransition`).
    - The top navbar, brand logo, mobile drawer, and footer stay permanently mounted in memory with zero blinking, flashing, or unmounting.
    - Swaps `<main id="main-content">` with hardware-accelerated Apple-grade liquid crossfade and micro-lift easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
    - Includes GPU-accelerated CSS opacity and transform fallback for browsers without native View Transitions support.
  - **Luminous Micro-Progress Pulse Bar**:
    - Added a sleek 2.5px glowing hairline progress bar (`#sgs-router-bar`) at the top of the viewport in [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css) featuring an emerald-to-lavender gradient and luminous blur.
  - **Modular Page Lifecycle Hooks & Memory Hygiene**:
    - Refactored [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js) to export `window.SGS_MAIN` with `initPage()` and `cleanupPage()`, ensuring clean cancellation of particle animation frames and countdown intervals upon leaving pages.
    - Added `window.SGS_COMPONENTS.updateActiveNav()` to seamlessly animate the active indicator underline and dropdown selections without destroying header DOM.
    - Idempotent consultation form binding and query param pre-filling (`?service=...`).
  - **Browser History & Anchors**:
    - Full `popstate` support for silky Back and Forward button glides, plus smooth intra-page `#contact` anchor scrolling without unnecessary re-renders.
- **Navigation Selection Highlight & Dropdown Alignment Polish**:
  - **Precision Text Span Anchoring**: Separated text labels into `<span>` wrappers in [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js) and anchored the active underline (`.nav-link span::after`) strictly to the text itself in [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css), completely eliminating horizontal offset caused by dropdown chevron accessory SVGs and flex gaps.
  - **High-Luminance Gradient & Glow**: Upgraded the active indicator gradient to `#c084fc` -> `var(--color-green-light)` -> `var(--color-green)` with dual-tone luminous shadows (`rgba(0, 208, 108, 0.85)` and `rgba(192, 132, 252, 0.65)`), guaranteeing uniform, unbroken brightness against dark backgrounds from pixel 0 to the end.
  - **Dropdown Stabilization & Subpage Active States**: Removed jarring `translateX(3px)` hover shifts from `.dropdown-item`, added subtle icon scaling (`scale(1.06)`), and integrated `isSubpageActive()` to highlight the currently viewed service or firm subpage with liquid glass backdrops.
- **Apple iOS Squircle Liquid Glass Architecture (Site-Wide)**:
  - Extracted the physical optical properties from the degree-6 superellipse squircle shader and applied them across all round-cornered rectangles throughout the entire website:
    - **Continuous-Curvature Squircles**: Continuous superellipse radii tokens (`--radius-squircle-xs` to `--radius-squircle-xl`) mapped to all cards, inputs, pills, chips, and buttons. Eliminated all hardcoded pixel radii across stylesheets.
    - **3-Tier Razor Specular Bevel Rims (`rb2` + `rb3`)**: Razor-sharp 1px top highlight (`inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.40)`), subsurface rim (`inset 0 0 0 1px rgba(255, 255, 255, 0.06)`), and obsidian bottom grounding shadow (`inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.35)`).
    - **Unified Multi-Layer Background Glare Sheen**: Layered specular lens gradients (`var(--glass-lens-specular)`) directly onto `.feature-box`, `.service-card`, `.toolkit-card`, `.calendar-banner`, `.calendar-card`, `.branch-card`, `.inquiry-form-card`, `.contact-method-card`, `.stories-showcase`, `.modal-box`, `.cip-block`, `.careers-card`, `.results-summary-card`, `.compliance-table-card`, `.submission-success-card`, and `.interactive-glow-card`.
    - **Frosted Liquid Form Controls**: Refined inputs, selects, and textareas into inset frosted squircle panels with deep optical blur and glowing focus rings.
    - **Refined Search Bar & Pills**: Elevated `.service-search-box`, filter tabs, toolkit preset chips, and countdown clock units with dual-bevel specular highlights.
- **Site-Wide Visual Consistency Audit & Polish**:
  - **Eliminated Conflicting Inline Overrides**: Replaced legacy inline `var(--bg-dark-card)` linear gradients on `.page-callout-card` in [`firm/about/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html) and [`contact/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/contact/index.html) with modular `.callout-green` and `.callout-purple` classes featuring emerald/purple rim glows.
  - **Standardized Grid Containers**: Replaced ad-hoc inline grid style declarations across [`services-page/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/index.html), [`services-page/financial-tools/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/financial-tools/index.html), [`services-page/due-dates/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html), [`firm/about/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html), and [`firm/careers/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/careers/index.html) with the canonical `.home-teaser-grid` class.
  - **Tokenized Backgrounds**: Replaced all hardcoded hex backgrounds (`#04070D`, `#060910`, `#05070B`) in `.features-section`, `.calendar-section`, `.toolkit-section`, `.stories-section`, and `.footer` with design tokens `var(--bg-dark-base)` and `var(--bg-dark-surface)`.
  - **Deduplicated CSS Selectors**: Cleaned up duplicated card selector definitions in [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css) into a unified liquid glass container rule.
  - **Micro-Element Harmonization**: Upgraded `.nav-badge-hiring`, `.badge-mini`, `.regime-tag`, `.story-metric-badge`, `.custom-range-slider`, `.ratio-progress-bar`, `.rate-chip`, and `.clock-unit` to squircle and pill tokens.
  - **Empty Search Results State**: Upgraded dynamic empty search fallback in [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js) to liquid glass styling with specular rim and squircle curvature.
- **Hero Canvas Streamlining**:
  - Removed the cursor squircle lens bubble from `#hero-particles-canvas` in [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js) and reset opacity to `0.55` in [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css), restoring the sleek, distraction-free interactive particle constellation ambient network.

## 4.2.2 - 2026-10-10 (v4.2.2)

- **Mobile Navigation Drawer Emblem Logo**:
  - Replaced the horizontal full text logo with the clean, icon-only monogram brand emblem ([`assets/icons/LOGO_favicon.png`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/icons/LOGO_favicon.png)) in the slide-in mobile navigation drawer ([`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js)), creating a streamlined header layout for mobile screens.
  - Synchronized mobile drawer navigation contact link to "Contact & Branches".
- **Client Stories Removal (Preserved in Codebase)**:
  - Removed client success stories and case study showcases from the live site while cleanly preserving the full data objects and rendering logic in comments across [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js), [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js), and [`clients/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/clients/index.html) for future reactivation.
  - Re-anchored navigation links and cross-hub cards on [`firm/about/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html) and [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js) to *"Clientele"*.
- **Clientele Heading & Navigation Label Harmonization**:
  - Replaced the top navbar link, mobile drawer heading, footer link, and breadcrumbs from *"Clients"* to *"Clientele"*.
## 4.2.1 - 2026-10-09 (v4.2.1)

- **Mobile Tap Selection Highlight Elimination**:
  - Eliminated the default rectangular mobile touch selection overlay across all mobile devices using `-webkit-tap-highlight-color: transparent`, `outline: none`, `-webkit-touch-callout: none`, and `touch-action: manipulation` across `html`, `button`, `a`, and `.floating-btn` in [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css).

## 4.2.0 - 2026-10-09 (v4.2)

- **Branch Network & Service Reach Data Harmonization**:
  - Clarified physical walk-in branch offices (**North Paravur (HO)**, **Kodungallur**, and **Cherai**) across [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js), [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js), [`contact/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/contact/index.html), and site headers/footers.
  - Formally categorized **Kaloor**, **Perumbavoor**, and **Adimali** as active service coverage locations (served without a physical walk-in branch), while cleanly preserving and commenting out their configuration code blocks for future physical branch expansions as requested.
- **Obsidian Black Theme & Contrast Optimization**:
  - Replaced legacy dark navy background hues (`#080B11` / `#0E131F` / `#141B2D`) across the global design system with an ultra-deep Obsidian Black palette (`--bg-dark-base: #03060A`, `--bg-dark-surface: #060910`, `--bg-dark-card: #090E17`) in [`css/variables.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/variables.css) and [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css).
  - Maximized visual contrast, clarity, and chromatic vibrancy for brand neon greens (`#00D06C`) and electric purples (`#7940EC`).
- **Apple iOS 26.1 Liquid Glassmorphism & Continuous Squircle Architecture**:
  - Engineered ultra-refined liquid glass surfaces with dual-layer specular rim highlights (`inset 0 1.5px 1.5px rgba(255,255,255,0.45)`), deep optical blur filters (`--glass-blur-sm/md/lg`), and continuous-curvature squircle radii tokens (`--radius-squircle-xs` to `--radius-squircle-xl`).
  - Upgraded all interactive site buttons (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-green`, `.whatsapp-fast-btn`) with responsive tactile press physics (`:active { transform: scale(0.97); }`) and luminous refraction glows.
  - Upgraded Pre-Footer Consultation Section (cards, badges, inquiry form container, inputs/selects/textareas) and navigation dropdowns with enhanced liquid opacity and emerald focus glow rings.

## 4.1.0 - 2026-10-09 (v4.1)

- **Floating Quick Navigation Buttons (Scroll Up & Contact Anchor)**:
  - Added sleek, glassmorphic floating action buttons docked at the bottom-right across all pages via [`js/components.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/components.js) and [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css).
  - Features an intuitive **Scroll to Top** button with automatic scroll-depth detection (smoothly reveals after scrolling 250px) and a direct **Contact Us** anchor button that smoothly scrolls to the page's consultation form and focuses the first input.
  - Complete with desktop hover micro-tooltips, emerald glow transitions, and responsive mobile adaptations.
- **Service Category Filtering Optimization**:
  - Enhanced `renderServices()` in [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js) so the *"Labour & Legal"* filter tab seamlessly aggregates both Labour Law (`labour`) and Legal Appeals (`legal`) service portfolios.

## 4.0.1 - 2026-10-09 (v4.0.1)

### Changed & Refactored
- **Directory Structure Update (`services` $\rightarrow$ `services-page`)**:
  - Renamed the `services/` directory to `services-page/` and synchronized all navigation dropdowns, mobile drawer links, hero buttons, cross-hub cards, and footer links across the site.
- **Firm & Practice Navigation Harmonization**:
  - Updated section headings and layout hierarchy on [`firm/about/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html) to provide direct pathways to practice areas, careers, client case studies, and branch locations.

## 4.0.0 - 2026-09-25 (v4.0)

### Added & Enhanced
- **Subpage Cross-Linking & Interconnected Site Architecture**:
  - **Services Hub**: Added subpages navigation on [`services-page/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/index.html) linking directly to Statutory Due Dates and Financial Tools.
  - **Due Dates & Tools Subpages**: Added reciprocal back links to the main Services directory as well as subpage-to-subpage cross links between [`services-page/due-dates/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html) and [`services-page/financial-tools/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/financial-tools/index.html).
  - **Firm Hub**: Added reciprocal cross-links between [`firm/about/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html) and [`firm/careers/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/careers/index.html), plus navigation pathways to Client Stories, Branch Locator, and Services.
- **Career Callout on About Us Page**:
  - Integrated high-visibility *"Looking for a career in accounting?"* callout banner with a *"Join our team"* fast-action button leading to the Careers portal on [`firm/about/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/firm/about/index.html).
- **Homepage Statutory Deadline Section Streamlined**:
  - Removed compliance calendar cards from the homepage (`index.html`) to declutter the layout while keeping the live countdown banner ticker and "View Full Calendar" portal link fully functional.
  - Dedicated full interactive calendar cards and table remain accessible on [`services-page/due-dates/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html).
- **GST Service Card Scope Expanded**:
  - Updated GST service card features in [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js) to explicitly highlight Composition Scheme filing in pointer 1 and GSTR-4 annual return in pointer 3.
- **Financial Toolkit GST Slab Calculator Modernized**:
  - Replaced legacy 12% and 28% slab buttons with 3% (*Gold / Special*) and 40% (*Luxury / Demerit*) rates in [`services-page/financial-tools/index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/financial-tools/index.html).
- **Compliance Cards Design Streamlined**:
  - Removed redundant *"Click to track"* hint text from the compliance calendar cards on [`services-page/due-dates/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html) for a cleaner, modern look while preserving complete click-to-track countdown functionality.

## 3.1.0 - 2026-09-23 (v3.1)

### Added & Enhanced
- **Interactive Click-to-Track Statutory Countdown Timer**:
  - Upgraded statutory countdown ticker on Homepage and [`services-page/due-dates/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html) to support dynamic deadline tracking on card click.
  - Clicking any compliance calendar card locks the countdown banner to that specific statutory deadline with `is-active-target` emerald glow highlighting and real-time days/hours/minutes/seconds countdown.
  - Smoothly reverts to the nearest default statutory deadline when mouse pointer leaves the card (`mouseleave`) on desktop, or automatically after a 10-second timeout for mobile/touchscreen visitors.
  - Added full keyboard accessibility (`Enter` / `Space`) and streamlined card design (removed redundant "Click to track" labels).
- **Statutory Calendar Accuracy Corrections**:
  - Corrected CMP-08 composition scheme statement frequency from monthly to quarterly (18th of Apr, Jul, Oct, Jan) in [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js), [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js), and [`services-page/due-dates/`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/services-page/due-dates/index.html).
  - Synchronized GSTR-3B (QRMP) 22nd quarterly deadline calculations.

### Removed & Cleaned
- **Repository Structure & Stub File Elimination**:
  - Deleted 7 legacy root redirect stub files (`about.html`, `careers.html`, `clients.html`, `contact.html`, `due-dates.html`, `services.html`, `tools.html`) to establish a clean directory architecture where the project root exclusively contains `index.html`.
  - Removed outdated root development plan artifact (`implementation_plan.md`) and internal audit scripts.
- **Dead Code & Obsolete CSS Purged**:
  - Deleted ~75 lines of uncalled, legacy `initScrollSpy()` code from [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js).
  - Removed redundant `initClientStories()` and `renderBranches()` invocations under the About page in [`js/main.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js).
  - Purged ~105 lines of orphaned, legacy CSS rules from [`css/style.css`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css) (`.floating-actions`, `.floating-btn`, `.mobile-drawer-group`, `.mobile-drawer-heading`, `.service-search-bar-container`, `.service-search-status`, `.quick-island-dock`, and `.dock-item`).
  - Simplified `.service-filter-tabs` selector alias into `.filter-tabs`.

### Changed & Harmonized
- **Redundancy Elimination Within Pages**:
  - Removed duplicated Client Stories (`#client-stories`) and Branch locator cards (`#branches`) from `firm/about/index.html`, retaining single-source-of-truth architectures on dedicated `/clients` and `/contact` pages.
  - Elevated `firm/about/index.html` with an enterprise 4-Tier Governance & Quality Assurance framework (dual-layer partner review, bank-grade data security, zero penalty assurance, direct partner availability) and cross-hub navigation cards.
- **Consistency Across Components & Data**:
  - Standardized branch location names across `js/data.js` (`branchesHiring`), `<select id="consultation-branch">` in `js/components.js`, and `<select id="applicant-branch">` in `firm/careers/index.html` into uniform `[Town], [District]` options.
  - Updated `SGS_DATA.firm.stats` branch count from `"5"` to `"6"`.
  - Fixed phone number typo in direct helpline (`+91 98473 6512` $\rightarrow$ `+91 98473 65124`) in `js/components.js`.
  - Harmonized all relative breadcrumbs and header/footer brand links across all pages to navigate directly to clean directory roots (`../`, `../../`, `${root}`) rather than exposing `index.html` in browser address bars.
  - Updated district coverage in `firm/careers/index.html` to reflect Ernakulam, Thrissur, and Idukki (Adimali).

## 3.0.0 - 2026-09-18 (v3.0)

### Added
- **Clean URL Architecture & Directory Restructuring**:
  - Restructured routes into clean, modern directory endpoints without visible `.html` extensions:
    - `/services`: All 18+ services directory with live search and category filter.
    - `/services/due-dates`: Statutory compliance calendar with live countdown ticker and WhatsApp alerts.
    - `/services/financial-tools`: Interactive Smart GST and New vs. Old Tax Regime calculators.
    - `/clients`: Dedicated client showcase highlighting measurable results, case studies, and industry coverage.
    - `/firm/about`: Firm profile, credibility pillars, and partner practice overview.
    - `/firm/careers`: Careers & CA articleship opportunities with interactive application modal.
    - `/contact`: Regional branch locator, maps, helpline numbers, and direct consultation booking.
- **Multi-Page Web Architecture (Orchid Security Inspired)**:
  - High-performance subpages with focused breadcrumb hero banners.
- **Persistent Pre-Footer Global Contact Form**:
  - Embedded a high-converting consultation form right above the footer across every single page.
  - Features enterprise trust badges, dynamic service auto-selection, WhatsApp routing, and interactive submission confirmation states.
- **Centralized Shared Components Engine (`js/components.js`)**:
  - Root-path aware rendering (`data-root`) for seamless asset and link resolution across nested directories.
  - Unified rendering for top helpline bar, floating sticky header with official logo ([`assets/icons/LOGO.png`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/icons/LOGO.png)), responsive mobile drawer, global contact section, and comprehensive footer.
- **New 6th Branch at Adimali (Idukki)**:
  - Added full branch data (`Near KSRTC Bus Stand, High Range Commercial Arcade, NH 85, Adimali`) in [`js/data.js`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js).
  - Updated Kerala branch network count to 6 branches across all headers, helpline bars, footers, pre-footer consultation forms, careers traineeship modal, and homepage statistics counter (`data-target="6"`).
- **Homepage Quick-Access Hub Teasers**:
  - Fast department access cards on [`index.html`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/index.html) allowing visitors to immediately navigate into their required section.

### Changed & Enhanced
- **Streamlined 5-Item Navigation Bar (`js/components.js`, `css/style.css`)**:
  - Removed "Due Dates" and "Financial Tools" from the top-level navbar and nested them cleanly under the **Services** dropdown (`/services`, `/services/due-dates`, `/services/financial-tools`).
  - Reorganized firm profile links under a non-clickable **"Firm"** navbar header (`.nav-dropdown-toggle-static`) that smoothly pops up **About Us** (`/firm/about`) and **Careers (Hiring)** (`/firm/careers`) on hover and focus without triggering page navigation.
  - Moved **Clients** (`/clients`) to a dedicated top-level navigation link.
- **Floating Sticky Navbar Architecture (`css/style.css`, `js/components.js`, `js/main.js`)**:
  - Replaced wrapper container injection with `.outerHTML` and set `position: sticky; top: 0; z-index: 1000; width: 100%;` so the header smoothly sticks and floats across all pages upon scrolling.
  - Switched body and html horizontal overflow to modern `overflow-x: clip;` preventing browser clipping contexts from disabling sticky positioning.
  - Added `scroll-margin-top: 90px;` to all section anchors for clean alignment beneath the floating header.
- **Favicon Restored Across All Pages**:
  - Replaced rectangular banner logo with the dedicated high-resolution square SGS emblem ([`assets/icons/LOGO_favicon.png`](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/icons/LOGO_favicon.png)) across all HTML `<head>` tags.
- **Design System & Typography Standardization**:
  - Standardized font loading across all HTML `<head>` files with preconnected Google Fonts (`Outfit` + `Inter`) and removed render-blocking CSS `@import`.
  - Upgraded quiz `.q-icon` with crisp vector SVG icons and glowing glassmorphic containers.
  - Replaced 40+ raw inline styles on due dates with semantic classes (`.compliance-table-card`, `.compliance-table`).

### Fixed
- **Services Page Layout & Element Spacing (`css/style.css`)**:
  - Resolved the lack of spacing between filter tabs, search box, and interactive glow cards:
    - Added flex column container `.services-filter-bar` with `gap: 28px; margin-bottom: 48px;`.
    - Standardized `.filter-tabs` with flex gap (`12px`) and center alignment.
    - Constrained `.service-search-box` width to `max-width: 640px; margin: 0 auto;`.
    - Added `margin-bottom: 56px;` to `.services-grid` for clean separation from the callout advisory card.
- **Fixed Search Icon in Services**:
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

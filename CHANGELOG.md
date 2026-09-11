# Changelog

All notable changes to this project will be documented in this file.

## 2.0.0 - 2026-09-11 (v2.0)

### Added
- **Interactive Financial Toolkit**:
  - *Smart GST Calculator*: Exclusive vs. Inclusive tax computation with 5%, 12%, 18%, and 28% slabs, quick amount presets (₹10k to ₹5L), visual ratio progress bar, and 1-click consultation form prefilling.
  - *AY 2025-26 Income Tax Regime Simulator*: Side-by-side comparison of New vs. Old Tax Regime with standard deduction, Section 80C, and Section 80D inputs, featuring real-time dynamic savings recommendation badge.
- **3-Click Compliance & Entity Navigator**:
  - Interactive questionnaire diagnosing entity structures (Proprietorship, LLP, Pvt Ltd, Individual, NRI) and compliance goals to output personalized document checklists, turnaround estimates, and 1-click booking.
- **Live Statutory Due Date Countdown Clock**:
  - Real-time ticking countdown clock (Days, Hours, Mins, Secs) tracking upcoming monthly deadlines (TDS 7th, GSTR-1 11th, PF/ESI 15th, GSTR-3B 20th) with WhatsApp reminder links.
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
- **Mobile Drawer Navigation**:
  - Reorganized drawer navigation with structured category groupings and active state indicators.
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

# SGS Associates Website Implementation Plan

Build a modern, high-converting, and responsive website for **SGS Associates – Accountants and Tax Practitioners** based on the provided branding and flyers. The site will be built using modern HTML5, vanilla CSS3 (with custom properties and glassmorphism), and modular JavaScript.

## Architecture & Future-Proofing Strategy

To ensure a painless future migration to **Option B (React + Vite)** when client requirements evolve, we will use a **data-driven component structure**:
- **Data Layer (`js/data.js`)**: All services, branch locations, career job openings, and contact details will be stored in clean JavaScript objects. In the future, this file can be imported directly into React state or fetched from a backend API/CMS without rewriting content.
- **Design Tokens (`css/variables.css`)**: Centralized design tokens (colors, typography, shadows, borders) matching SGS Associates' purple (`#7C3AED`) and green (`#00D06C`) palette.
- **Sectional Modules**: Each UI section will be self-contained so that converting them to React components (`<Hero />`, `<Services />`, `<Branches />`, `<Careers />`, `<Contact />`) will be virtually 1-to-1.

---

## Proposed Changes

### Assets & Setup
#### [NEW] [assets/](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/assets/)
- Copy and organize the firm's flyer graphics and logo marks into an organized `assets/images/` directory.
- Create SVG icons for services (tax, audit, legal, corporate, payroll) and social/contact channels.

---

### Styling & Design System
#### [NEW] [css/variables.css](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/variables.css)
- Define CSS custom properties:
  - Brand Primary Green: `#00D06C` / `#00b85c`
  - Brand Primary Violet/Purple: `#7940EC` / `#5B21B6`
  - Neutral Backgrounds: Deep Slate (`#0B0F19`) and Clean Off-White (`#F8FAFC`)
  - Typography: Modern Google Fonts (`Plus Jakarta Sans` or `Outfit` for headings, `Inter` for body)
  - Glassmorphism effects, shadows, and smooth transitions

#### [NEW] [css/style.css](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/css/style.css)
- Reset and base typography
- Header & Sticky Glassmorphism Navigation with Mobile Drawer
- Hero Section with floating stat badges
- Services Grid with interactive category filter tabs
- Why Choose Us / Trust Badges
- Careers / "We Are Hiring!" interactive section
- Multi-Branch Locator Cards with direct Click-to-Call & Directions
- Consultation Booking & Inquiry Form
- Floating Quick Action Bar (WhatsApp + Call)
- Responsive media queries (Desktop, Tablet, Mobile)

---

### Logic & Data Layer
#### [NEW] [js/data.js](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/data.js)
- Structured data for:
  - **Services**: 5 core categories with 16+ specific services from the flyer (MCA, GST, Audits, Labour Law, Appeals, DSC, etc.)
  - **Branches**: Head Office (North Paravur) + 4 Branches (Kodungallur, Cherai, Perumbavoor, Kaloor/Ernakulam) with phone numbers and map pins
  - **Careers**: Trainee/Fresher requirements and application details
  - **Compliance Deadlines**: Useful tax due-date reference banner

#### [NEW] [js/main.js](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/js/main.js)
- Mobile navigation toggle
- Dynamic service filtering / tab switching
- Service inquiry auto-fill (clicking "Enquire" on a service selects it in the contact form)
- Interactive Career Application Modal / Trainee application handler
- Direct WhatsApp link generator for pre-filled consultation inquiries
- Smooth scrolling and active section highlighter

---

### Structure
#### [NEW] [index.html](file:///c:/zPzeudoDisk/Coding/Stack%20Development/SGSAssociates/index.html)
- High-SEO semantic structure:
  - **Top Bar**: Direct phone numbers (`9947144568`, `9847365124`, `8281027566`), Email (`tax.sgs@gmail.com`), Working Hours
  - **Navbar**: Logo, navigation links, and "Book Consultation" action button
  - **Hero**: Tagline *"Expert Financial Guidance You Can Trust"*, firm overview, and trust credentials
  - **Services Matrix**: 5 distinct service clusters with high-contrast icons
  - **Careers Section**: "Join Our Growing Team – Freshers & Trainees Welcome" with quick apply
  - **Branch Network**: Interactive cards for all 5 locations across Ernakulam & Thrissur
  - **Consultation Form**: Quick lead capture with WhatsApp & Email options
  - **Footer**: Full site map, statutory disclaimer, and copyright

---

## Verification Plan

### Automated / Server Verification
- Launch local development server using Python:
  ```bash
  python -m http.server 3000
  ```
- Validate responsiveness and console errors across various screen resolutions using browser subagent or local browser tests.

### Manual Verification
1. **Visual Match**: Verify brand colors (purple `#7940EC` and emerald green `#00D06C`) match the branding flyers.
2. **Responsiveness**: Verify proper rendering on mobile (375px), tablet (768px), and desktop (1280px+).
3. **Interactive Features**: Test mobile menu toggle, service category tabs, career modal, and WhatsApp link generation.

# SGS Associates — Official Website

> **Accountants & Tax Practitioners | Kerala**
> Qualified Chartered Accountants providing end-to-end financial compliance, taxation, auditing, and corporate registration services across 5 branches in Kerala.

---

## 🏢 About the Firm

**SGS Associates** is a multi-branch accounting and tax practice headquartered in North Paravur, Ernakulam, Kerala. The firm offers comprehensive financial services including GST filings, Income Tax, MCA company registrations, statutory audits, labour law compliance, and legal representations.

| Detail | Info |
|---|---|
| **Head Office** | 2nd Floor, Vyapara Bhavan Complex, Chendamangalam Jn. Main Road, North Paravur – 683513 |
| **Branches** | Kodungallur · Cherai · Perumbavoor · Deshabhimani, Kaloor (Ernakulam) |
| **Phone** | 9947144568 / 9847365124 / 8281027566 |
| **Email** | tax.sgs@gmail.com |
| **Working Hours** | Mon – Sat: 9:30 AM – 6:00 PM |

---

## 🗂️ Project Structure

```
SGSAssociates/
├── index.html              # Single-page application entry point
├── css/
│   ├── variables.css       # Design system tokens (colors, fonts, spacing, shadows)
│   └── style.css           # Main stylesheet (~1740 lines, fully modular)
├── js/
│   ├── data.js             # Centralized structured data layer (SGS_DATA object)
│   └── main.js             # DOM interactions, rendering, form handling
├── assets/
│   ├── icons/
│   │   └── logo.svg        # SVG brand logo
│   └── images/
│       ├── hero-banner.jpg       # Hero section banner
│       ├── brand-logo-card.jpg   # OG / social share card image
│       ├── hiring-flyer.jpg      # Original hiring flyer (source reference)
│       └── services-flyer.jpg    # Services flyer (source reference)
├── scripts/
│   └── google-apps-script.js # Ready-to-paste Google Sheets & Email webhook
├── _source/                # Raw client-supplied WhatsApp images (reference only)
├── implementation_plan.md  # Technical implementation notes
└── README.md               # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 |
| **Styling** | Vanilla CSS with custom properties (no frameworks) |
| **Scripting** | Vanilla JavaScript (ES6+), modular and framework-ready |
| **Fonts** | Google Fonts — Inter (body) · Outfit (headings) |
| **Icons** | Inline SVG (Lucide-style, zero external dependency) |
| **Hosting** | Static — deployable to any web host, GitHub Pages, Netlify, etc. |

> **Zero dependencies.** No npm, no build step. Drop the folder on any web server and it works.

---

## ✨ Features

### 🎨 Design & UX
- **Dark-mode premium design** with purple/green brand palette
- Glassmorphism cards with backdrop-filter blur effects
- Smooth scroll navigation with active-link tracking
- Responsive layout — works on desktop, tablet, and mobile
- Floating WhatsApp & Call action bar (always-visible)
- Mobile slide-in navigation drawer

### 📄 Sections

| Section | ID | Description |
|---|---|---|
| Top Bar | — | Contact info, helpline numbers, office hours |
| Navigation | — | Sticky header with scroll shadow, "Hiring" badge on Careers link |
| Hero | #home | Headline, stats (5+ branches, 1500+ clients), WhatsApp glass card |
| Why Us | #why-us | 4 credibility pillars |
| Services | #services | 14 services across 5 categories with filterable tab UI |
| Tax Calendar | #compliance-calendar | Key statutory due dates at a glance |
| Careers | #careers | Hiring section with structured info panel (address, openings, requirements, apply CTA) |
| Branches | #branches | 5 branch cards with address, phone, directions |
| Contact | #contact | Consultation booking form + WhatsApp inquiry dispatch |
| Footer | — | Statutory disclaimer, services, branches, contact info |
| Career Modal | — | Trainee application form dispatches to WhatsApp |

### ⚙️ JavaScript Modules (js/main.js)

- `initHeader()` — scroll-aware sticky header
- `renderServices(category)` — dynamic service card grid with filter tabs
- `renderBranches()` — branch cards from data layer
- `renderCalendar()` — compliance calendar cards
- `initContactForm()` — form submit + WhatsApp dispatch
- `initCareerModal()` — modal open/close + trainee application form
- `initMobileDrawer()` — slide-in mobile nav

---

## 📦 Data Layer (js/data.js)

All site content is centralized in the `SGS_DATA` object with the following keys:

```js
SGS_DATA = {
  firm:               // Firm name, phones, email, working hours, stats
  serviceCategories:  // Filter tab definitions
  services:           // 14 service objects with title, description, features, icon
  branches:           // 5 branch objects with address, phones, map query
  careers:            // Hiring details, requirements, training areas
  complianceCalendar: // 5 recurring statutory deadlines
}
```

> **Future-proof:** data.js is written to be directly importable into a React/Next.js/Vite project when upgrading. It exports via both `window.SGS_DATA` (vanilla) and `module.exports` (CommonJS).

---

## 🚀 Deployment

### Local Development

Open `index.html` directly in a browser, or use any static server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server . -p 8080
```

### Production Hosting Options

| Option | Steps |
|---|---|
| **GitHub Pages** | Push to `main` branch → enable Pages in repo Settings |
| **Netlify** | Drag & drop the project folder onto netlify.com |
| **Hostinger / cPanel** | Upload via FTP to `public_html/` |
| **Any shared hosting** | Upload all files maintaining the same folder structure |

> **No build step required.** No `npm install`, no compilation.

---

## 🔧 Maintenance Guide

### Updating Contact Information
Edit `js/data.js` → `SGS_DATA.firm`:
```js
primaryPhone: "+91 9947144568",
phones: ["+91 9947144568", "+91 9847365124", "+91 8281027566"],
email: "tax.sgs@gmail.com",
```

### Adding a New Service
Add an entry to `SGS_DATA.services[]` in `js/data.js`:
```js
{
  id: "unique-id",
  category: "taxation",       // corporate | taxation | accounting | labour | legal
  categoryName: "Taxation & Filing",
  title: "Service Title",
  shortDesc: "Short description...",
  features: ["Feature 1", "Feature 2"],
  icon: "file-text"           // see iconMap in main.js
}
```

### Adding a New Branch
Add an entry to `SGS_DATA.branches[]` in `js/data.js` and update the branch dropdowns in `index.html` (contact form and career modal selects).

### Changing Brand Colors
Edit `css/variables.css`:
```css
--color-green: #00D06C;
--color-purple: #7940EC;
```

---

## 📬 Hybrid Enquiry Management Setup (Google Sheets + Email + WhatsApp)

The website features an automated lead capture workflow:
1. **Google Sheets**: Enquiries are logged as new rows in a shared spreadsheet.
2. **Instant Email Alert**: Notifications are sent directly to `tax.sgs@gmail.com`.
3. **WhatsApp Prompt**: Clients receive a fast-track prompt to chat directly on WhatsApp.

### 3-Minute Setup Guide:
1. Open [Google Sheets](https://sheets.new) in your browser while logged into your Google account (e.g. `tax.sgs@gmail.com`). Name the spreadsheet **SGS Associates Client Enquiries**.
2. Click **Extensions** > **Apps Script** from the top menu.
3. Replace all existing text in the script editor with the contents of [`scripts/google-apps-script.js`](scripts/google-apps-script.js).
4. Click the **Save** (disk) icon.
5. In the top-right corner, click **Deploy** > **New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**:
   - **Description**: `SGS Leads v1.0`
   - **Execute as**: `Me (tax.sgs@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: allows public form submissions without Google login)*
7. Click **Deploy**. Google may ask for authorization — grant permissions.
8. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/...`).
9. Open `js/data.js` and paste your URL into `SGS_DATA.firm.inquiryEndpoint`:
   ```javascript
   inquiryEndpoint: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
   ```
10. Save the file. Your website is now fully connected!

---

## 📋 SEO Implemented

- Descriptive `<title>` tag with firm name + location keywords
- `<meta name="description">` covering all service areas
- `<meta name="keywords">` targeting local Kerala search queries
- Open Graph tags for social media sharing
- `schema.org/AccountingService` structured data (JSON-LD)
- Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<aside>`, `<footer>`, `<address>`)
- Single `<h1>` per page with proper heading hierarchy
- `alt` text on all images
- `loading="lazy"` on non-critical images

---

## 🗒️ Source Files Reference

The `_source/` directory contains the original WhatsApp images provided by the client during development:

| File | Content |
|---|---|
| `10.40.39.jpeg` | Services flyer |
| `10.46.33.jpeg` | Hero / brand image |
| `10.46.34.jpeg` | Brand logo card |
| `10.46.35.jpeg` | Hiring flyer (content extracted and reconstructed as the Careers section) |

---

## 📄 License

Private project — © 2026 SGS Associates. All rights reserved.
Website developed for internal business use. Not for redistribution.

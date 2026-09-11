/**
 * SGS Associates - Centralized Structured Data Layer
 * Designed to be 100% future-proof: this file can be directly imported 
 * into React/Vite/Next.js when upgrading in the future.
 */

const SGS_DATA = {
  firm: {
    name: "SGS Associates",
    fullName: "SGS Associates - Accountants and Tax Practitioners",
    shortName: "SGS Associates",
    tagline: "Accountants and Tax Practitioners",
    heroHeadline: "Expert Financial Guidance You Can Trust",
    heroSubheadline: "We provide end-to-end accounting, auditing, and statutory compliance services. Our team of qualified Chartered Accountants and Tax Practitioners helps businesses navigate complex regulatory landscapes with ease.",
    established: "Kerala, India",
    primaryPhone: "+91 9947144568",
    phones: ["+91 9947144568", "+91 9847365124", "+91 8281027566"],
    whatsapp: "919947144568",
    email: "tax.sgs@gmail.com",
    inquiryEndpoint: "", // Paste your Google Apps Script Web App URL here to enable Google Sheets & Email dispatch
    workingHours: "Mon - Sat: 9:30 AM - 6:00 PM",
    stats: [
      { label: "Branch Offices", value: "5", suffix: "+" },
      { label: "Core Practice Areas", value: "18", suffix: "+" },
      { label: "Compliance Rate", value: "100", suffix: "%" },
      { label: "Satisfied Clients", value: "1,500", suffix: "+" }
    ]
  },

  serviceCategories: [
    { id: "all", label: "All Services" },
    { id: "corporate", label: "Corporate & MCA" },
    { id: "taxation", label: "Taxation & GST" },
    { id: "accounting", label: "Accounting & Audit" },
    { id: "labour", label: "Labour Law & HR" },
    { id: "legal", label: "Legal & Appeals" }
  ],

  services: [
    // Corporate & Business Registrations
    {
      id: "company-llp-reg",
      category: "corporate",
      categoryName: "Corporate & Business Registrations",
      title: "Company & LLP Registration (MCA)",
      shortDesc: "Complete end-to-end incorporation of Private Limited, OPC, Section 8 Companies, and LLPs through the Ministry of Corporate Affairs.",
      features: [
        "Name availability search & reservation (SPICe+)",
        "MOA, AOA & LLP Agreement drafting",
        "DIN & DSC generation for Directors",
        "PAN, TAN, EPFO & ESIC alongside incorporation"
      ],
      icon: "building"
    },
    {
      id: "partnership-reg",
      category: "corporate",
      categoryName: "Corporate & Business Registrations",
      title: "Partnership Firm Registration",
      shortDesc: "Formal legal constitution of partnership firms with ROF filing, notarization, and partnership deed drafting.",
      features: [
        "Tailored partnership deed drafting",
        "Registration with Registrar of Firms (ROF)",
        "Partnership PAN & Bank Account onboarding",
        "Profit sharing & dispute resolution clauses"
      ],
      icon: "users"
    },
    {
      id: "iec-code",
      category: "corporate",
      categoryName: "Corporate & Business Registrations",
      title: "Import & Export Code (IEC)",
      shortDesc: "Registration and modification of 10-digit DGFT Import Export Code required for foreign trade and cross-border commercial transactions.",
      features: [
        "DGFT portal onboarding and verification",
        "AD Code registration at custom ports",
        "Annual IEC renewal & update compliance",
        "Export incentive advisory"
      ],
      icon: "globe"
    },

    // Taxation & Filing
    {
      id: "income-tax",
      category: "taxation",
      categoryName: "Taxation & Filing",
      title: "Income Tax Filing & Compliance",
      shortDesc: "Accurate tax planning, computing, and timely e-filing of ITR for individuals, professionals, firms, trusts, and corporate entities.",
      features: [
        "ITR 1 through ITR 7 computation & e-filing",
        "Old vs. New Tax Regime comparison & optimization",
        "Capital gains calculations & tax-saving advisory",
        "Response to notices under section 143(1), 139(9), and 148"
      ],
      icon: "file-text"
    },
    {
      id: "gst-services",
      category: "taxation",
      categoryName: "Taxation & Filing",
      title: "GST Registration, Returns & Audits",
      shortDesc: "Comprehensive Goods & Services Tax solutions covering new registration, monthly/quarterly filings, reconciliation, and statutory audits.",
      features: [
        "GSTR-1, GSTR-3B, and QRMP scheme filing",
        "ITC reconciliation with GSTR-2B to avoid tax loss",
        "Annual Return (GSTR-9) and Reconciliation (GSTR-9C)",
        "E-Way Bills and E-Invoicing setup"
      ],
      icon: "percent"
    },
    {
      id: "tds-tcs",
      category: "taxation",
      categoryName: "Taxation & Filing",
      title: "TDS, TCS, PAN, & TAN Services",
      shortDesc: "Complete withholding tax management including monthly challan deductions, quarterly 24Q/26Q returns, and Form 16/16A generation.",
      features: [
        "Quarterly TDS/TCS return filing (24Q, 26Q, 27Q)",
        "Form 16 / 16A download & digital signing",
        "TAN registration & corrections",
        "PAN card application, update & linking"
      ],
      icon: "credit-card"
    },

    // Accounting & Audit
    {
      id: "audit-works",
      category: "accounting",
      categoryName: "Accounting & Audit",
      title: "Statutory & Internal Audit Works",
      shortDesc: "Rigorous independent examination of financial statements ensuring compliance with accounting standards and Companies Act provisions.",
      features: [
        "Statutory Audit for Companies, LLPs & Trusts",
        "Tax Audit under Section 44AB of the Income Tax Act",
        "Internal control evaluation & risk mitigation",
        "Stock audit and management verification"
      ],
      icon: "shield-check"
    },
    {
      id: "day-to-day-accounting",
      category: "accounting",
      categoryName: "Accounting & Audit",
      title: "Day-to-Day Accounting Works",
      shortDesc: "Outsourced bookkeeping, cloud accounting, ledger maintenance, and monthly financial statements tailored to your business scale.",
      features: [
        "Tally Prime, Zoho Books & QuickBooks support",
        "Bank reconciliation & vendor payables management",
        "Accounts receivable tracking & invoicing",
        "Monthly Profit & Loss and Balance Sheet generation"
      ],
      icon: "calculator"
    },
    {
      id: "project-reports",
      category: "accounting",
      categoryName: "Accounting & Audit",
      title: "Project Reports for Financial Institutions",
      shortDesc: "Professional bankable project feasibility reports and CMA data preparation for business loans, CC limits, and term financing.",
      features: [
        "CMA Data preparation for working capital limits",
        "Projected Balance Sheets & Cash Flow forecasts",
        "Break-even analysis & DSCR computation",
        "MSME loan proposals (Mudra, PMEGP, CGTMSE)"
      ],
      icon: "trending-up"
    },

    // Labour Law Compliance
    {
      id: "pf-compliance",
      category: "labour",
      categoryName: "Labour Law Compliance",
      title: "PF Registration & Return Filing",
      shortDesc: "Complete Employees' Provident Fund (EPFO) regulatory registration, employee UAN generation, and monthly ECR electronic filing.",
      features: [
        "Establishment EPFO online registration",
        "Monthly Electronic Challan cum Return (ECR) filing",
        "Employee UAN generation & KYC seeding",
        "PF withdrawal assistance & transfer compliance"
      ],
      icon: "user-check"
    },
    {
      id: "esi-compliance",
      category: "labour",
      categoryName: "Labour Law Compliance",
      title: "ESI Registration & Return Filing",
      shortDesc: "Employee State Insurance Corporation (ESIC) registration, IP number generation, monthly contribution challans, and statutory health cover compliances.",
      features: [
        "ESIC employer registration & code generation",
        "Monthly ESI contribution computation & e-challans",
        "Pehchan card and employee onboarding",
        "Half-yearly return submissions & audit readiness"
      ],
      icon: "heart-pulse"
    },

    // Legal & Representations
    {
      id: "tax-appeals",
      category: "legal",
      categoryName: "Legal & Representations",
      title: "GST & Income Tax Appeal Cases",
      shortDesc: "Expert representation before appellate authorities, drafting replies to departmental notices, and litigation support.",
      features: [
        "Representation before CIT(Appeals) & GST Appellate Authority",
        "Drafting grounds of appeal & statement of facts",
        "Scrutiny assessment and faceless assessment replies",
        "Penalty waiver petitions & rectification filings"
      ],
      icon: "scale"
    },
    {
      id: "kml-registration",
      category: "legal",
      categoryName: "Legal & Representations",
      title: "KML Registration for Money Lenders",
      shortDesc: "Kerala Money Lenders Act license application, renewal, record keeping, and statutory compliance for financial enterprises.",
      features: [
        "Fresh KML license application & documentation",
        "Annual renewal filing & statutory registers",
        "Security deposit management and verification",
        "Liaison with revenue authorities"
      ],
      icon: "coins"
    },
    {
      id: "kvat-kgst-special",
      category: "legal",
      categoryName: "Legal & Representations",
      title: "KVAT & KGST Registration for Bar & Petrol Pump",
      shortDesc: "Specialized state tax registrations and compliance management for petroleum outlets, bars, and liquor retail entities in Kerala.",
      features: [
        "KGST registration for petroleum dispensing units",
        "FL-3 / Bar license KGST filing and monthly returns",
        "Turnover tax assessment and compliance check",
        "Department audit & reconciliation representation"
      ],
      icon: "fuel"
    },
    {
      id: "dsc-services",
      category: "legal",
      categoryName: "Legal & Representations",
      title: "Digital Signature Certificate (DSC)",
      shortDesc: "Instant issuance of Class 3 Digital Signature Certificates with encryption tokens for MCA, Income Tax, GST, and e-Tendering.",
      features: [
        "Paperless Video KYC approval within 30 minutes",
        "Class 3 Signing & Encryption combo tokens",
        "Validity options: 2 Years & 3 Years",
        "FIPS-certified USB crypto tokens"
      ],
      icon: "key"
    }
  ],

  branches: [
    {
      id: "north-paravur",
      name: "Head Office - North Paravur",
      isHeadOffice: true,
      address: "2nd Floor, Vyapara Bhavan Complex, Chendamangalam Jn. Main Road, North Paravur",
      district: "Ernakulam",
      pincode: "683513",
      landmark: "Chendamangalam Junction Main Road",
      phones: ["+91 9947144568", "+91 9847365124", "+91 8281027566"],
      email: "tax.sgs@gmail.com",
      timing: "Mon - Sat: 9:30 AM - 6:00 PM",
      mapQuery: "Vyapara+Bhavan+Complex+North+Paravur+Kerala+683513"
    },
    {
      id: "kodungallur",
      name: "Kodungallur Branch",
      isHeadOffice: false,
      address: "Main Commercial Center, Near Town Hall, Kodungallur",
      district: "Thrissur",
      pincode: "680664",
      landmark: "Kodungallur Town Center",
      phones: ["+91 9947144568", "+91 9847365124"],
      email: "tax.sgs@gmail.com",
      timing: "Mon - Sat: 9:30 AM - 6:00 PM",
      mapQuery: "Kodungallur+Thrissur+Kerala"
    },
    {
      id: "cherai",
      name: "Cherai Branch",
      isHeadOffice: false,
      address: "Coastal Commercial Plaza, Cherai Beach Road, Cherai",
      district: "Ernakulam",
      pincode: "683514",
      landmark: "Cherai Center",
      phones: ["+91 9947144568", "+91 8281027566"],
      email: "tax.sgs@gmail.com",
      timing: "Mon - Sat: 9:30 AM - 6:00 PM",
      mapQuery: "Cherai+Ernakulam+Kerala"
    },
    {
      id: "perumbavoor",
      name: "Perumbavoor Branch",
      isHeadOffice: false,
      address: "Merchant Association Arcade, AM Road, Perumbavoor",
      district: "Ernakulam",
      pincode: "683542",
      landmark: "Near AM Road Junction",
      phones: ["+91 9947144568", "+91 9847365124"],
      email: "tax.sgs@gmail.com",
      timing: "Mon - Sat: 9:30 AM - 6:00 PM",
      mapQuery: "Perumbavoor+Ernakulam+Kerala"
    },
    {
      id: "ernakulam-kaloor",
      name: "Ernakulam / Kaloor Branch",
      isHeadOffice: false,
      address: "Deshabhimani Road, Kaloor, Kochi",
      district: "Ernakulam",
      pincode: "682017",
      landmark: "Deshabhimani Junction",
      phones: ["+91 9947144568", "+91 8281027566"],
      email: "tax.sgs@gmail.com",
      timing: "Mon - Sat: 9:30 AM - 6:00 PM",
      mapQuery: "Deshabhimani+Road+Kaloor+Kochi+Kerala"
    }
  ],

  careers: {
    badge: "WE ARE HIRING!",
    title: "Join Our Growing Team",
    headline: "Excited to announce the opening of our new branches and looking for passionate Trainees to grow with us!",
    requirements: [
      { text: "Freshers / Trainees welcome", icon: "check-circle" },
      { text: "Prior experience is NOT mandatory", icon: "check-circle" },
      { text: "Eager to learn and build a high-growth career in finance & tax", icon: "check-circle" },
      { text: "B.Com / M.Com / BBA / CA-Inter / CMA aspirants preferred", icon: "check-circle" }
    ],
    branchesHiring: [
      "Head Office - North Paravur",
      "Perumbavoor Branch",
      "Kodungallur Branch",
      "Cherai Branch",
      "Deshabhimani, Kaloor (Ernakulam)"
    ],
    trainingAreas: [
      "Practical GST & Income Tax e-Filing",
      "Tally Prime & Corporate Bookkeeping",
      "Statutory Audit Assistance",
      "MCA Company Incorporation Procedures",
      "PF & ESI Monthly Compliances"
    ],
    applyEmail: "tax.sgs@gmail.com",
    applyPhones: ["9947144568", "8281027566"]
  },

  complianceCalendar: [
    { day: "07", month: "Every Month", title: "TDS / TCS Deposit", desc: "Payment of tax deducted/collected at source for previous month", code: "tds" },
    { day: "11", month: "Every Month", title: "GSTR-1 Filing", desc: "Monthly statement of outward supplies for regular taxpayers", code: "gstr1" },
    { day: "15", month: "Every Month", title: "PF & ESI Challan", desc: "Remittance of Provident Fund & ESIC monthly contributions", code: "pfesi" },
    { day: "20", month: "Every Month", title: "GSTR-3B Filing", desc: "Summary monthly return & tax liability payment", code: "gstr3b" },
    { day: "31", month: "July / Oct", title: "ITR Filing", desc: "Income Tax Returns for Non-Audit & Audited cases", code: "itr" }
  ],

  // Client Success Stories & Case Highlights
  clientStories: [
    {
      id: "manufacturing",
      category: "Manufacturing & Industrial",
      title: "Statutory Tax Audit & ₹4.2 Lakhs Input Tax Credit (ITC) Recovery",
      clientType: "Engineering Machinery Manufacturer, Ernakulam",
      challenge: "Accumulated uncredited GST ITC due to supplier non-filing and complex GSTR-2B mismatches threatening working capital.",
      solution: "Conducted forensic line-by-line invoice reconciliation, issued legal supplier vendor notices, and successfully salvaged ITC before statutory deadline.",
      metric: "₹4.2L+ ITC Recovered",
      badge: "Zero Penalties"
    },
    {
      id: "startup",
      category: "Tech & E-Commerce",
      title: "End-to-End Private Limited Incorporation & MCA Compliance in 7 Days",
      clientType: "SaaS & Retail Platform, Kochi",
      challenge: "Founder required fast company registration, PAN, TAN, GST, and international payment gateway compliance to receive seed funding.",
      solution: "Executed expedited SPICe+ filing, drafted tailored MOA/AOA founder vesting clauses, and completed GST & bank setup within one week.",
      metric: "7 Days Turnaround",
      badge: "Full MCA Clearance"
    },
    {
      id: "retail",
      category: "Wholesale & Supermarkets",
      title: "Multi-Branch Daily Bookkeeping & Punctual Monthly GST Filing",
      clientType: "Chain of Supermarkets (North Paravur & Kodungallur)",
      challenge: "High transaction volume, POS integration lags, and previous delay notices causing recurring late fees.",
      solution: "Instituted centralized Tally Prime cloud sync, weekly purchase voucher validation, and automated GSTR-1 and GSTR-3B filings.",
      metric: "100% On-Time Filing",
      badge: "0 Scrutiny Notices"
    },
    {
      id: "nri-tax",
      category: "NRI & High Net-Worth",
      title: "Kerala Property Sale TDS Exemption & Capital Gains Reinvestment",
      clientType: "NRI Tech Executive (Dubai / Cherai)",
      challenge: "Selling ancestral agricultural and residential land with steep 20%+ TDS withholding risk under Section 195.",
      solution: "Secured Nil/Lower TDS withholding certificate from Assessing Officer under Section 197 and structured Section 54EC capital gains exemption bonds.",
      metric: "₹8.5L Tax Saved",
      badge: "Complete Repatriation"
    }
  ],

  // Interactive Compliance Navigator Questions & Mappings
  navigatorQuiz: {
    steps: [
      {
        id: "entity",
        title: "What is your business or entity structure?",
        subtitle: "Select the legal form of your venture or individual status",
        options: [
          { id: "proprietorship", label: "Sole Proprietorship / Small Shop", icon: "user-check" },
          { id: "partnership", label: "Partnership Firm / LLP", icon: "users" },
          { id: "pvtltd", label: "Private Limited / Startup", icon: "building" },
          { id: "individual", label: "Salaried Individual / Professional", icon: "file-text" },
          { id: "nri", label: "NRI / Foreign Citizen", icon: "globe" }
        ]
      },
      {
        id: "goal",
        title: "What is your primary compliance requirement?",
        subtitle: "Choose the service you need immediate assistance with",
        options: [
          { id: "incorporation", label: "Register New Entity / Business License", icon: "key" },
          { id: "tax_planning", label: "Income Tax Return (ITR) & Tax Saving", icon: "calculator" },
          { id: "gst_filing", label: "GST Registration, Filing or Notice Reply", icon: "percent" },
          { id: "audit_books", label: "Bookkeeping, Tally & Statutory Audit", icon: "trending-up" },
          { id: "loan_report", label: "Bank Loan Project CMA Report", icon: "credit-card" }
        ]
      }
    ],
    results: {
      "proprietorship_incorporation": {
        recommendedService: "Partnership / Trade License & GST Setup",
        turnaround: "2 - 4 Business Days",
        checklist: ["Aadhaar & PAN Card", "Rental Agreement / Tax Receipt of Shop", "Cancelled Cheque", "Passport Size Photo"],
        summary: "Ideal setup for local retailers and single-owner businesses in Kerala ensuring 100% legal compliance with minimal annual overhead."
      },
      "pvtltd_incorporation": {
        recommendedService: "Company & LLP Registration (MCA SPICe+)",
        turnaround: "5 - 7 Business Days",
        checklist: ["Director PAN & Aadhaar / Passport", "Bank Statement with Present Address", "Digital Signature Certificate (DSC)", "Electricity Bill of Registered Office"],
        summary: "Comprehensive incorporation package including Name Reservation, MOA/AOA, DIN, PAN, TAN, EPFO, ESIC, and corporate bank account introduction."
      },
      "default": {
        recommendedService: "Custom Tax & Financial Compliance Advisory",
        turnaround: "1 - 3 Business Days",
        checklist: ["Financial Year Bank Statements", "Previous Year Returns (if any)", "Basic Identity Documents", "Relevant Invoices or Notices"],
        summary: "Personalized consultation with our senior Chartered Accountants and tax consultants across our 5 Kerala branch locations."
      }
    }
  }
};

// Make available globally on window (for vanilla JS) and export for ES modules/React
if (typeof window !== "undefined") {
  window.SGS_DATA = SGS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SGS_DATA;
}

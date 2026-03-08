# India Tools Website — Complete Build Specification

## What You Are Building

A multi-tool utility website targeting Indian users. 50 standalone browser-based tools covering tax, finance, government, and everyday utility needs. Monetized via Google AdSense + a premium tier. Built for SEO — each tool has its own URL, title, meta description, and supporting content. All computation runs client-side in the browser (zero server cost per user).

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) — SSG/SSR for SEO, fast page loads
- **Styling**: Vanilla CSS (no Tailwind) — full control, no class bloat
- **Language**: TypeScript
- **Fonts**: Inter from Google Fonts
- **Deployment**: Vercel (free tier initially)
- **Analytics**: Google Search Console + Google Analytics 4
- **Ads**: Google AdSense (apply after ~10 tools are live and getting traffic)
- **Package manager**: npm

---

## Project Structure

```
india-tools/
├── app/
│   ├── layout.tsx              # Root layout with nav, footer, AdSense script
│   ├── page.tsx                # Homepage — grid of all 50 tools
│   ├── globals.css             # Global styles, CSS variables
│   └── tools/
│       ├── salary-calculator/
│       │   ├── page.tsx        # The tool page
│       │   └── metadata.ts     # SEO metadata
│       ├── gst-calculator/
│       │   └── page.tsx
│       ├── ... (one folder per tool)
├── components/
│   ├── ToolLayout.tsx          # Wrapper used by every tool page
│   ├── AdUnit.tsx              # AdSense ad component
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   └── calculations/
│       ├── tax.ts              # Tax calculation functions
│       ├── finance.ts          # Finance calculation functions
│       └── utils.ts            # Shared utilities
├── public/
│   ├── sitemap.xml             # Auto-generated
│   └── robots.txt
├── next.config.js
├── package.json
└── README.md
```

---

## Design System

### Colors
```css
:root {
  --primary: #1a56db;       /* Trustworthy blue */
  --primary-light: #e8f0fe;
  --success: #0d9f6e;
  --danger: #e02424;
  --text: #111827;
  --text-muted: #6b7280;
  --bg: #f9fafb;
  --card: #ffffff;
  --border: #e5e7eb;
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
}
```

### Typography
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}
```

### Rules
- Mobile-first. Every tool must work perfectly on a 375px screen.
- Page load: under 1 second (tools run in-browser, no API calls)
- Every input has a label. Every output has a rupee/unit symbol.
- No dark patterns. No popups. Minimal ads (max 2 per tool page).

---

## Every Tool Page Structure

Each tool page must have exactly this structure:

```tsx
// app/tools/[tool-name]/page.tsx

export const metadata = {
  title: "[Tool Name] | India Tools",
  description: "[150-char description targeting the main keyword]",
  keywords: "[keyword1], [keyword2], [keyword3]",
}

export default function ToolPage() {
  return (
    <ToolLayout
      title="[Tool Name]"
      description="[Short subtitle shown under the title]"
      category="[Finance | Tax | Government | Utility]"
    >
      {/* The interactive tool */}
      <ToolComponent />

      {/* SEO content — REQUIRED for every tool */}
      <article className="seo-content">
        <h2>What is [Tool Name]?</h2>
        <p>[2-3 paragraphs explaining the concept]</p>

        <h2>How to use this [Tool Name]</h2>
        <ol>
          <li>[Step 1]</li>
          <li>[Step 2]</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        {/* 3-5 FAQs with schema markup */}
      </article>
    </ToolLayout>
  )
}
```

---

## The 50 Tools — Complete List

### 🏦 Finance & Tax (Tools 1-20) — HIGHEST PRIORITY, BUILD FIRST

| # | URL slug | Tool Name | Target keyword |
|---|---------|-----------|----------------|
| 1 | `/tools/salary-calculator` | Take-Home Salary Calculator | "take home salary calculator india" |
| 2 | `/tools/gst-calculator` | GST Calculator | "gst calculator" |
| 3 | `/tools/income-tax-calculator` | Income Tax Calculator | "income tax calculator 2025-26" |
| 4 | `/tools/emi-calculator` | EMI Calculator | "emi calculator" |
| 5 | `/tools/sip-calculator` | SIP Calculator | "sip calculator" |
| 6 | `/tools/ppf-calculator` | PPF Calculator | "ppf calculator" |
| 7 | `/tools/fd-calculator` | FD Calculator | "fd calculator" |
| 8 | `/tools/hra-calculator` | HRA Exemption Calculator | "hra exemption calculator" |
| 9 | `/tools/capital-gains-calculator` | Capital Gains Tax Calculator | "capital gains tax calculator india" |
| 10 | `/tools/tds-calculator` | TDS Calculator | "tds calculator" |
| 11 | `/tools/gratuity-calculator` | Gratuity Calculator | "gratuity calculator" |
| 12 | `/tools/nps-calculator` | NPS Calculator | "nps calculator" |
| 13 | `/tools/sukanya-samriddhi-calculator` | Sukanya Samriddhi Calculator | "sukanya samriddhi calculator" |
| 14 | `/tools/loan-prepayment-calculator` | Loan Prepayment Calculator | "loan prepayment calculator" |
| 15 | `/tools/advance-tax-calculator` | Advance Tax Calculator | "advance tax calculator" |
| 16 | `/tools/epf-calculator` | EPF/PF Calculator | "epf calculator" |
| 17 | `/tools/rd-calculator` | RD Calculator | "rd calculator" |
| 18 | `/tools/tax-saving-calculator` | 80C Tax Saving Calculator | "80c deduction calculator" |
| 19 | `/tools/gst-invoice-generator` | GST Invoice Generator | "gst invoice generator free" |
| 20 | `/tools/tds-return-calendar` | TDS Due Date Calendar | "tds due date 2025" |

### 🏡 Real Estate (Tools 21-25)

| # | URL slug | Tool Name | Target keyword |
|---|---------|-----------|----------------|
| 21 | `/tools/stamp-duty-calculator` | Stamp Duty Calculator | "stamp duty calculator [state]" |
| 22 | `/tools/home-loan-eligibility` | Home Loan Eligibility Calculator | "home loan eligibility calculator" |
| 23 | `/tools/rental-yield-calculator` | Rental Yield Calculator | "rental yield calculator india" |
| 24 | `/tools/carpet-area-converter` | Carpet Area Converter | "carpet area to super built up area" |
| 25 | `/tools/emi-vs-rent-calculator` | EMI vs Rent Calculator | "buy vs rent calculator india" |

### 🏛️ Government & Compliance (Tools 26-33)

| # | URL slug | Tool Name | Target keyword |
|---|---------|-----------|----------------|
| 26 | `/tools/pan-validator` | PAN Card Validator | "pan card validator" |
| 27 | `/tools/ifsc-lookup` | IFSC Code Lookup | "ifsc code search" |
| 28 | `/tools/upi-qr-generator` | UPI QR Code Generator | "upi qr code generator" |
| 29 | `/tools/aadhaar-masking` | Aadhaar Masking Tool | "aadhaar masking tool" |
| 30 | `/tools/passport-fee-calculator` | Passport Fee Calculator | "passport fee calculator india" |
| 31 | `/tools/professional-tax-calculator` | Professional Tax Calculator | "professional tax calculator" |
| 32 | `/tools/name-transliterator` | English to Hindi Transliterator | "english to hindi typing" |
| 33 | `/tools/pin-code-search` | PIN Code Search | "pincode search" |

### 🛒 E-Commerce & Business (Tools 34-40)

| # | URL slug | Tool Name | Target keyword |
|---|---------|-----------|----------------|
| 34 | `/tools/amazon-fee-calculator` | Amazon Seller Fee Calculator | "amazon seller fee calculator india" |
| 35 | `/tools/flipkart-fee-calculator` | Flipkart Seller Fee Calculator | "flipkart seller fee calculator" |
| 36 | `/tools/msme-udyam-guide` | MSME Registration Guide | "udyam registration" |
| 37 | `/tools/gst-hsn-lookup` | HSN Code Lookup | "hsn code list gst rate" |
| 38 | `/tools/business-name-checker` | Company Name Availability Checker | "company name availability check mca" |
| 39 | `/tools/tcs-remittance-calculator` | Foreign Remittance TCS Calculator | "tcs on foreign remittance calculator" |
| 40 | `/tools/invoice-to-words` | Invoice Amount in Words | "amount in words converter rupees" |

### 🧾 Everyday Utility (Tools 41-50)

| # | URL slug | Tool Name | Target keyword |
|---|---------|-----------|----------------|
| 41 | `/tools/age-calculator` | Age Calculator | "age calculator india" |
| 42 | `/tools/gold-price-calculator` | Gold Price Calculator | "gold price calculator today" |
| 43 | `/tools/land-area-converter` | Land Area Converter | "bigha to acre converter" |
| 44 | `/tools/number-to-words` | Number to Words (Indian) | "number to words converter" |
| 45 | `/tools/electricity-bill-calculator` | Electricity Bill Calculator | "electricity bill calculator" |
| 46 | `/tools/cgpa-to-percentage` | CGPA to Percentage Converter | "cgpa to percentage converter" |
| 47 | `/tools/marriage-biodata-maker` | Marriage Biodata Maker | "marriage biodata maker" |
| 48 | `/tools/fuel-cost-calculator` | Road Trip Fuel Cost Calculator | "fuel cost calculator india" |
| 49 | `/tools/currency-inr-converter` | Currency to INR Converter | "dollar to rupee converter" |
| 50 | `/tools/water-tank-calculator` | Water Tank Capacity Calculator | "water tank capacity calculator litres" |

---

## Tool #1 In Detail: Take-Home Salary Calculator

This is your most important tool. Build this first, use it as the template for all others.

### Logic
```typescript
// lib/calculations/tax.ts

export interface SalaryInput {
  ctc: number;           // Annual CTC in rupees
  regime: 'old' | 'new'; // Tax regime
  hraReceived: number;   // Annual HRA received
  rentPaid: number;      // Annual rent paid
  cityTier: 'metro' | 'non-metro';
  investments80c: number; // PF + PPF + ELSS etc (old regime only)
  npsContribution: number;
  professionalTax: number; // Annual, state-specific (default 2400)
}

export interface SalaryBreakdown {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  employeePF: number;        // 12% of basic, max 21,600/yr
  professionalTax: number;
  hraExemption: number;      // Only for old regime
  standardDeduction: number; // 75,000 new regime / 50,000 old
  taxableIncome: number;
  incomeTax: number;
  cess: number;              // 4% of income tax
  totalDeductions: number;
  netTakeHome: number;
  monthlyTakeHome: number;
}

export function calculateSalary(input: SalaryInput): SalaryBreakdown {
  const { ctc, regime, hraReceived, rentPaid, cityTier, investments80c, npsContribution, professionalTax } = input;

  // Assumptions (industry standard)
  const basicSalary = ctc * 0.4; // 40% of CTC
  const hra = basicSalary * 0.5; // 50% of basic (metro)
  const employerPF = Math.min(basicSalary * 0.12, 21600); // Employer PF (part of CTC)
  const employeePF = Math.min(basicSalary * 0.12, 21600); // Employee PF

  const grossSalary = ctc - employerPF;
  const specialAllowance = grossSalary - basicSalary - hraReceived;

  // HRA Exemption (old regime only)
  let hraExemption = 0;
  if (regime === 'old' && rentPaid > 0) {
    const hraLimit1 = hraReceived;
    const hraLimit2 = rentPaid - (basicSalary * 0.1);
    const hraLimit3 = basicSalary * (cityTier === 'metro' ? 0.5 : 0.4);
    hraExemption = Math.max(0, Math.min(hraLimit1, hraLimit2, hraLimit3));
  }

  const standardDeduction = regime === 'new' ? 75000 : 50000;

  // Taxable income
  let taxableIncome = grossSalary - employeePF - professionalTax - standardDeduction;
  if (regime === 'old') {
    taxableIncome -= hraExemption;
    taxableIncome -= Math.min(investments80c, 150000); // 80C cap
    taxableIncome -= Math.min(npsContribution, 50000); // 80CCD(1B)
  }
  taxableIncome = Math.max(0, taxableIncome);

  // Tax slabs
  const incomeTax = regime === 'new'
    ? calculateNewRegimeTax(taxableIncome)
    : calculateOldRegimeTax(taxableIncome);

  const cess = incomeTax * 0.04;
  const totalTax = incomeTax + cess;

  const totalDeductions = employeePF + professionalTax + totalTax;
  const netTakeHome = grossSalary - totalDeductions;

  return {
    grossSalary,
    basicSalary,
    hra: hraReceived,
    specialAllowance,
    employeePF,
    professionalTax,
    hraExemption,
    standardDeduction,
    taxableIncome,
    incomeTax,
    cess,
    totalDeductions,
    netTakeHome,
    monthlyTakeHome: Math.round(netTakeHome / 12),
  };
}

function calculateNewRegimeTax(income: number): number {
  // FY 2025-26 new regime slabs
  if (income <= 300000) return 0;
  if (income <= 700000) return (income - 300000) * 0.05;
  if (income <= 1000000) return 20000 + (income - 700000) * 0.10;
  if (income <= 1200000) return 50000 + (income - 1000000) * 0.15;
  if (income <= 1500000) return 80000 + (income - 1200000) * 0.20;
  return 140000 + (income - 1500000) * 0.30;
}

function calculateOldRegimeTax(income: number): number {
  // FY 2025-26 old regime slabs
  if (income <= 250000) return 0;
  if (income <= 500000) return (income - 250000) * 0.05;
  if (income <= 1000000) return 12500 + (income - 500000) * 0.20;
  return 112500 + (income - 1000000) * 0.30;
}
```

### UI Requirements for Salary Calculator
- Large CTC input at top (with ₹ prefix, formatting as user types)
- Toggle: Old Regime vs New Regime (default: New)
- Collapsible "Advanced" section for HRA, Investments, etc.
- Output: Monthly take-home (BIG, front-and-center)
- Output: Breakdown table showing each deduction
- Output: Pie chart showing gross vs tax vs PF vs take-home
- "Compare both regimes" button — shows side by side

---

## SEO Requirements (Non-Negotiable)

### Per-page checklist
- [ ] Unique `<title>` tag: "[Tool Name] | IndiaTools.in" (60 chars max)
- [ ] Unique `<meta description>`: 140-155 chars, includes target keyword
- [ ] `<h1>` contains the target keyword exactly once
- [ ] Minimum 800 words of supporting content below the tool
- [ ] FAQ section with `application/ld+json` FAQ schema markup
- [ ] Canonical URL set
- [ ] OpenGraph tags for social sharing
- [ ] Tool output is server-side renderable (not just client-side — Next.js handles this)

### Sitemap
Generate `public/sitemap.xml` with all 50 tool URLs. Submit to Google Search Console on launch day.

### Internal Linking
Every tool page must link to 3-5 related tools. Salary Calculator → TDS Calculator → Tax Saving Calculator → HRA Calculator.

---

## Homepage Design

- Hero: "50+ Free Tools for Every Indian" — tagline
- Category tabs: Finance | Tax | Government | Real Estate | Utility | E-Commerce
- Tool cards: Icon + Name + One-line description + link
- Click → goes to `/tools/[slug]`
- No login required. No signup required. Everything free (with ads).

---

## Local Development Setup

```bash
# 1. Create the Next.js project
npx create-next-app@latest india-tools --typescript --app --no-tailwind --no-eslint

# 2. Enter the project
cd india-tools

# 3. Install dependencies
npm install

# 4. Start local dev server
npm run dev
# → Opens at http://localhost:3000
```

### Folder creation commands
```bash
# Create all tool directories at once
mkdir -p app/tools/{salary-calculator,gst-calculator,income-tax-calculator,emi-calculator,sip-calculator,ppf-calculator,fd-calculator,hra-calculator,capital-gains-calculator,tds-calculator,gratuity-calculator,nps-calculator,sukanya-samriddhi-calculator,loan-prepayment-calculator,advance-tax-calculator,epf-calculator,rd-calculator,tax-saving-calculator,gst-invoice-generator,tds-return-calendar,stamp-duty-calculator,home-loan-eligibility,rental-yield-calculator,carpet-area-converter,emi-vs-rent-calculator,pan-validator,ifsc-lookup,upi-qr-generator,aadhaar-masking,passport-fee-calculator,professional-tax-calculator,name-transliterator,pin-code-search,amazon-fee-calculator,flipkart-fee-calculator,msme-udyam-guide,gst-hsn-lookup,business-name-checker,tcs-remittance-calculator,invoice-to-words,age-calculator,gold-price-calculator,land-area-converter,number-to-words,electricity-bill-calculator,cgpa-to-percentage,marriage-biodata-maker,fuel-cost-calculator,currency-inr-converter,water-tank-calculator}

mkdir -p lib/calculations components public
```

---

## Deployment on Vercel (Free)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: india-tools
# - In which directory is your code located? ./
# - Want to override settings? No

# Vercel gives you a URL like: india-tools-xyz.vercel.app

# 4. For production deployments after changes:
vercel --prod
```

### Custom Domain (later)
1. Buy domain on Namecheap/GoDaddy/Cloudflare (~₹700-1200/year for .in)
2. In Vercel dashboard → Domains → Add domain
3. Update DNS to point to Vercel (they guide you)
4. HTTPS is automatic

---

## Build Order (Day by Day)

**Week 1: Foundation + First 5 tools**
- Day 1: Project setup, design system, shared components, homepage shell
- Day 2: Tool #1 — Salary Calculator (most complex, sets the template)
- Day 3: Tool #2 — GST Calculator
- Day 4: Tool #3 — EMI Calculator
- Day 5: Tool #4 — SIP Calculator
- Day 6: Tool #5 — Income Tax Calculator
- Day 7: Deploy, submit sitemap to Google Search Console, test on mobile

**Week 2-8: Remaining 45 tools**
- 1-2 tools per day following the same ToolLayout template
- Each tool = logic function + UI component + SEO content
- Re-use the calculation library (lib/calculations/)

---

## Google AdSense Setup

1. Apply at adsense.google.com after 15-20 tools are live
2. Add the AdSense script to `app/layout.tsx`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX" crossOrigin="anonymous"></script>
```
3. Place max 2 ad units per page:
   - One above the tool (leaderboard 728x90)
   - One below the tool, above the SEO content (rectangle 336x280)
4. Never place ads INSIDE the tool interaction area

---

## Quality Checklist Before Each Tool Goes Live

- [ ] Works on iPhone SE (375px width)
- [ ] Inputs have proper labels (accessibility)
- [ ] Output shows on keypress (no "calculate" button needed for simple tools)
- [ ] Numbers formatted with Indian number system (1,00,000 not 100,000)
- [ ] Rupee symbol (₹) on all monetary outputs
- [ ] At least 800 words of SEO content
- [ ] H1 contains the target keyword
- [ ] Meta description written and under 155 chars
- [ ] FAQ schema added
- [ ] Links to 3 related tools

---

## Indian Number Formatting (Use Everywhere)

```typescript
// lib/utils.ts
export function formatIndianNumber(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)}L`;
  return `₹${num.toLocaleString('en-IN')}`;
}

export function formatRupees(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}
```

---

## The Goal

By end of Month 2: 50 tools live on a custom `.in` domain, submitted to Google Search Console.
By Month 6: Google ranks 15-20 of the tools on page 1. Traffic starting to compound.
By Month 12: 500K+ monthly visitors. AdSense revenue ₹2-4L/month. Premium tier launching.

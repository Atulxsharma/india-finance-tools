import { ToolCategory, ToolDefinition, ToolRuntime, ToolSchemaType } from "@/lib/types";

function createToolDefinition({
  slug,
  name,
  category,
  schemaType,
  runtime = "pure-client",
  targetKeyword,
  description,
  primaryPromise,
  relatedToolSlugs,
  keywords,
  articleHeading,
  coverage,
  howTo,
  faqs,
  featured = false,
  navLabel,
  reviewedAt,
  sourceLabel,
}: {
  slug: string;
  name: string;
  category: ToolCategory;
  schemaType: ToolSchemaType;
  runtime?: ToolRuntime;
  targetKeyword: string;
  description: string;
  primaryPromise: string;
  relatedToolSlugs: string[];
  keywords: string[];
  articleHeading: string;
  coverage: string[];
  howTo: string[];
  faqs: Array<{ question: string; answer: string }>;
  featured?: boolean;
  navLabel?: string;
  reviewedAt?: string;
  sourceLabel?: string;
}): ToolDefinition {
  return {
    slug,
    name,
    category,
    schemaType,
    runtime,
    targetKeyword,
    description,
    primaryPromise,
    relatedToolSlugs,
    featured,
    navLabel,
    reviewedAt,
    sourceLabel,
    seoContent: {
      title: name,
      metaDescription: description,
      keywords,
      h1: name,
      articleHeading,
      coverage,
      intro: [
        description,
        `${name} is built for fast mobile use, visible assumptions, and direct result-first decisions.`,
      ],
      howTo,
      faqs,
    },
  };
}

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: "salary-calculator",
    name: "Take-Home Salary Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "Salary",
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed against Income Tax Department rules for FY 2024-25 and FY 2025-26",
    targetKeyword: "take home salary calculator india",
    description:
      "Estimate monthly take-home salary with old vs new regime comparison, HRA handling, PF, and professional tax.",
    primaryPromise:
      "Enter annual CTC to see monthly in-hand salary and old-vs-new regime difference.",
    relatedToolSlugs: ["income-tax-calculator", "gst-calculator", "emi-calculator"],
    seoContent: {
      title: "Take Home Salary Calculator India",
      metaDescription:
        "Use a take home salary calculator for India with FY-based tax logic, HRA, PF, professional tax, and old vs new regime comparison.",
      keywords: [
        "take home salary calculator india",
        "monthly in hand salary calculator",
        "ctc to in hand salary india",
      ],
      h1: "Take Home Salary Calculator India",
      articleHeading: "What this take-home salary calculator helps you estimate",
      coverage: [
        "CTC to gross salary estimate with employer PF handling",
        "HRA exemption logic for old regime cases",
        "FY 2024-25 and FY 2025-26 tax rules",
      ],
      intro: [
        "A take-home salary estimate is only useful when the assumptions are visible. Many calculators show a headline monthly number without telling you how basic pay, HRA, PF, professional tax, or tax regime choices were handled. This page makes those moving parts explicit so you can check whether the output fits your payslip structure.",
        "For salaried users in India, the gap between annual CTC and actual in-hand pay is often driven by three items: employer-side salary structuring, statutory deductions such as employee PF and professional tax, and income tax under the selected financial year. HRA can shift the answer further when you are on the old regime and paying rent.",
        "Use this calculator as an estimate before salary negotiations, offer comparisons, or home-loan planning. It is designed to be quick enough for mobile use but still transparent about where the money goes each year.",
      ],
      howTo: [
        "Enter your annual CTC and choose the financial year you want to evaluate.",
        "Select old or new regime, then add HRA, rent, and city tier if you want the old-regime HRA estimate to be more realistic.",
        "Open the advanced section to add 80C, NPS, and professional tax values if they apply to you.",
        "Read the annual breakdown and the regime comparison before using the monthly take-home figure for planning.",
      ],
      faqs: [
        {
          question: "Why is my take-home lower than my CTC?",
          answer:
            "CTC includes employer-side components and your take-home excludes employee PF, professional tax, and income tax. That gap can be material even before bonuses or variable pay are considered.",
        },
        {
          question: "Does this calculator use exact payslip structure data?",
          answer:
            "No. It uses transparent payroll assumptions intended for estimation. If your employer structures pay differently, your real in-hand salary can vary.",
        },
        {
          question: "When does HRA matter?",
          answer:
            "HRA exemption matters mainly in old-regime cases when you receive HRA and pay rent. Under the new regime, this tool does not apply HRA exemption.",
        },
      ],
    },
  },
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "Tax",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "GST",
    reviewedAt: "2026-03-08",
    sourceLabel: "GST invoice math reviewed for inclusive and exclusive calculations",
    targetKeyword: "gst calculator",
    description:
      "Add or remove GST in seconds, switch slabs, and see CGST/SGST or IGST splits clearly.",
    primaryPromise:
      "Enter an amount and GST slab to see taxable value, tax amount, and final invoice total.",
    relatedToolSlugs: ["income-tax-calculator", "salary-calculator", "emi-calculator"],
    seoContent: {
      title: "GST Calculator",
      metaDescription:
        "Calculate GST online by adding or removing tax, choosing the slab, and splitting the amount into CGST, SGST, or IGST.",
      keywords: ["gst calculator", "add gst calculator", "remove gst calculator"],
      h1: "GST Calculator",
      articleHeading: "What this GST calculator covers",
      coverage: [
        "Inclusive and exclusive GST modes",
        "Common slabs from 0% to 28%",
        "Intra-state and inter-state tax splits",
      ],
      intro: [
        "A useful GST calculator should answer two slightly different questions. First, what will the invoice total become after GST is added to a taxable value? Second, if you already have a tax-inclusive number, what is the underlying taxable amount and the GST inside it? This tool handles both without changing the interface.",
        "The other common source of confusion is the tax split. In intra-state transactions the GST amount is usually shown as equal CGST and SGST, while inter-state transactions are typically shown as IGST. The calculator keeps that distinction visible so you can use the output directly in billing or reconciliation discussions.",
        "Because GST treatment depends on the applicable slab and transaction context, the result is only as good as the inputs you choose. The interface is simple, but the output is structured to make invoice math easy to verify.",
      ],
      howTo: [
        "Choose whether you want to add GST to a taxable value or remove GST from a gross amount.",
        "Enter the amount and select the applicable GST rate.",
        "Pick intra-state or inter-state supply so the tax split matches the transaction type.",
        "Use the breakdown table to verify taxable value, GST amount, and final invoice amount.",
      ],
      faqs: [
        {
          question: "What is the difference between add GST and remove GST?",
          answer:
            "Add GST starts from a taxable value and calculates the invoice total. Remove GST starts from a tax-inclusive amount and extracts the taxable value and GST inside it.",
        },
        {
          question: "When should I use IGST instead of CGST and SGST?",
          answer:
            "Use IGST for inter-state supplies in general cases. Use CGST and SGST split for intra-state supplies.",
        },
        {
          question: "Does this tool decide the correct GST slab for me?",
          answer:
            "No. You still need to choose the correct rate based on the product, service, and applicable GST rules.",
        },
      ],
    },
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "EMI",
    targetKeyword: "emi calculator",
    description:
      "Plan monthly loan payments with EMI, total interest, total payout, and amortization snapshots.",
    primaryPromise:
      "Enter loan amount, rate, and tenure to see the EMI and the full borrowing cost.",
    relatedToolSlugs: ["salary-calculator", "sip-calculator", "income-tax-calculator"],
    seoContent: {
      title: "EMI Calculator",
      metaDescription:
        "Calculate EMI for loans in India using loan amount, annual rate, and tenure. See monthly EMI, interest cost, and payout clearly.",
      keywords: ["emi calculator", "loan emi calculator", "monthly emi calculator"],
      h1: "EMI Calculator",
      articleHeading: "How to read an EMI estimate properly",
      coverage: [
        "Monthly EMI calculation from principal, rate, and tenure",
        "Total interest and total repayment output",
        "Amortization snapshots for first, mid, and last stages",
      ],
      intro: [
        "EMI calculators are easy to find, but many stop at the monthly payment. For a borrowing decision, the monthly EMI is only the start. You also need to know how much interest you will pay over the full tenure and how slowly the outstanding balance falls during the early years of a long loan.",
        "This calculator is designed for fast scenario analysis. Change the principal, rate, or tenure and the output updates immediately so you can compare affordability, total cost, and loan stretch. That is particularly helpful for housing or vehicle decisions where a slightly lower EMI can hide a much larger total interest bill.",
        "Use the amortization snapshot to see what your first instalment mostly pays for, where the midpoint balance sits, and how the final months look. That context often matters more than the EMI headline.",
      ],
      howTo: [
        "Enter the loan amount you expect to borrow.",
        "Add the annual interest rate offered by the lender and choose whether tenure is in months or years.",
        "Review the EMI first, then look at total interest and total payout before deciding whether the tenure is too long.",
        "Use the snapshot rows to understand how principal repayment changes over time.",
      ],
      faqs: [
        {
          question: "Why does a longer tenure reduce EMI but increase cost?",
          answer:
            "A longer tenure spreads principal across more instalments, which lowers monthly EMI. But it also keeps the outstanding balance alive for longer, so total interest rises.",
        },
        {
          question: "Can I use this for home, car, and personal loans?",
          answer:
            "Yes. The EMI formula is generic. The accuracy depends on whether the lender uses a standard reducing-balance structure and whether fees are excluded from the amount entered.",
        },
        {
          question: "Does this include insurance, processing fees, or prepayments?",
          answer:
            "No. This version focuses on the core EMI structure only. Add-ons, insurance, and prepayments need a separate scenario analysis.",
        },
      ],
    },
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "SIP",
    targetKeyword: "sip calculator",
    description:
      "Estimate SIP corpus growth with monthly investment, expected return, total invested amount, and wealth gained.",
    primaryPromise:
      "Enter monthly SIP, return, and years to estimate corpus, invested amount, and gains.",
    relatedToolSlugs: ["emi-calculator", "salary-calculator", "income-tax-calculator"],
    seoContent: {
      title: "SIP Calculator",
      metaDescription:
        "Estimate SIP returns in India using monthly contribution, expected annual return, and investment period. See corpus, invested amount, and gain.",
      keywords: ["sip calculator", "mutual fund sip calculator", "sip returns calculator"],
      h1: "SIP Calculator",
      articleHeading: "What a SIP estimate can and cannot tell you",
      coverage: [
        "Monthly SIP future value estimate",
        "Invested amount vs growth split",
        "Intermediate milestone output for long-term planning",
      ],
      intro: [
        "A SIP calculator is useful when it helps you think in contributions, duration, and compounding rather than in vague target numbers. This version keeps the model simple: fixed monthly investment, expected annual return, and a consistent investment period. That is enough to compare discipline-driven outcomes across many real-life scenarios.",
        "The most important distinction in long-term investing is between the money you contribute and the growth created by compounding. This page keeps those separate so you can judge how much of the final corpus came from your own cash flow versus market growth assumptions.",
        "Use the result as an illustration, not a promise. Mutual fund returns are not fixed and a SIP estimate cannot account for sequence-of-returns risk, fund-specific expense ratios, or tax treatment at redemption.",
      ],
      howTo: [
        "Enter the amount you can invest every month without straining cash flow.",
        "Set an expected annual return and an investment horizon in years.",
        "Compare total invested amount with estimated corpus and wealth gained.",
        "Use the intermediate milestone to judge whether your horizon is doing enough of the compounding work.",
      ],
      faqs: [
        {
          question: "Does this guarantee my future corpus?",
          answer:
            "No. It is a projection based on a fixed expected return. Actual mutual fund performance will vary and can be materially different.",
        },
        {
          question: "Why does extending the time horizon change the result so much?",
          answer:
            "Compounding becomes more powerful over longer durations. Even if the monthly contribution stays the same, the later years often create a disproportionate share of growth.",
        },
        {
          question: "Does the calculator account for step-up SIPs?",
          answer:
            "No. This version assumes a flat monthly SIP. Step-up planning can be added as a later enhancement.",
        },
      ],
    },
  },
  {
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "Tax",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "Tax",
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed against Income Tax Department rules for FY 2024-25 and FY 2025-26",
    targetKeyword: "income tax calculator india",
    description:
      "Compare old vs new regime tax outcomes across financial years with visible deductions, rebates, and take-home impact.",
    primaryPromise:
      "Enter annual income and deductions to see which tax regime leaves you better off.",
    relatedToolSlugs: ["salary-calculator", "gst-calculator", "sip-calculator"],
    seoContent: {
      title: "Income Tax Calculator India",
      metaDescription:
        "Compare old and new income tax regimes for India using FY-based rules, common deductions, and visible rebate logic.",
      keywords: [
        "income tax calculator india",
        "old vs new tax regime calculator",
        "income tax calculator 2025-26",
      ],
      h1: "Income Tax Calculator India",
      articleHeading: "How to compare the old and new tax regime properly",
      coverage: [
        "FY 2024-25 and FY 2025-26 comparison",
        "Old-regime deduction inputs with standard deduction handling",
        "Rebate-aware new-vs-old recommendation",
      ],
      intro: [
        "Comparing the old and new regime is not just about looking at slab rates. It depends on whether you are salaried, how much of your income qualifies for deductions, whether HRA exemption applies, and whether your taxable income falls near the rebate threshold where the answer can change quickly.",
        "This calculator keeps the comparison direct. You enter annual income once, add the most common old-regime deductions, and the tool estimates tax under both regimes for the selected financial year. That makes it easier to see whether deductions are strong enough to beat the simpler new-regime structure.",
        "The result is still an estimate. It does not replace return filing advice or cover every edge case, but it gives you a practical decision frame for salary planning, advance tax estimates, or annual declaration choices.",
      ],
      howTo: [
        "Pick the financial year and indicate whether the income is salaried so the correct standard deduction can apply.",
        "Enter annual income and add common deduction figures such as 80C, 80D, HRA exemption, NPS, and other deductions.",
        "Compare old-regime and new-regime tax output side by side.",
        "Use the recommendation as a starting point, then validate with your own filing documents before submitting declarations.",
      ],
      faqs: [
        {
          question: "Why can the recommended regime change with the financial year?",
          answer:
            "Because slabs, standard deduction, and rebate thresholds can change by financial year. A good result must be tied to the rules for the selected year.",
        },
        {
          question: "Does the new regime allow all deductions?",
          answer:
            "No. In this tool, the new regime keeps only the standard deduction for salaried users. Common old-regime deductions are not applied under the new regime estimate.",
        },
        {
          question: "Is this suitable for final tax filing?",
          answer:
            "Use it as a planning estimate. Final filing should always be matched against official guidance, Form 16, AIS, and your actual deduction proofs.",
        },
      ],
    },
  },
  {
    slug: "ppf-calculator",
    name: "PPF Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "PPF",
    reviewedAt: "2026-03-08",
    sourceLabel: "Default rate reviewed against the latest DEA small-savings notification and kept editable",
    targetKeyword: "ppf calculator",
    description:
      "Estimate PPF maturity value, total contributions, extension scenarios, and long-term tax-free growth.",
    primaryPromise:
      "Enter your PPF contribution to estimate maturity value, total invested amount, and interest earned.",
    relatedToolSlugs: ["fd-calculator", "gratuity-calculator", "sip-calculator"],
    seoContent: {
      title: "PPF Calculator",
      metaDescription:
        "Use a PPF calculator for India to estimate maturity value, total investment, extension scenarios, and tax-free interest growth.",
      keywords: ["ppf calculator", "public provident fund calculator", "ppf maturity calculator"],
      h1: "PPF Calculator",
      articleHeading: "What this PPF calculator helps you estimate",
      coverage: [
        "Monthly or yearly contribution estimates",
        "15-year maturity planning with extension scenarios",
        "Total invested amount versus interest earned",
      ],
      intro: [
        "A PPF calculator is most useful when it does more than show one maturity number. Long-term savings decisions depend on how much you contribute, how long you stay invested, and whether you extend the account after the initial 15-year term.",
        "This calculator helps you estimate the maturity value of a Public Provident Fund contribution pattern using a fixed annual rate assumption. It also separates your own contribution from the interest built over time, which makes the outcome easier to understand.",
        "Use it for long-term tax-saving planning, retirement accumulation checks, or to compare PPF with other low-risk savings options like fixed deposits.",
      ],
      howTo: [
        "Choose whether you want to think in monthly or yearly contributions.",
        "Enter the amount, the expected annual PPF rate, and the investment period.",
        "Check the maturity value first, then compare total invested amount and interest earned.",
        "Use the comparison section to see how extension beyond 15 years changes the result.",
      ],
      faqs: [
        {
          question: "Does this calculator use the current PPF rate automatically?",
          answer:
            "No. You can enter the rate you want to model. PPF rates are reviewed periodically by the government, so always confirm the current notified rate.",
        },
        {
          question: "Can I use this for the standard 15-year PPF period?",
          answer:
            "Yes. The calculator is designed around the standard PPF tenure and also shows longer extension scenarios for comparison.",
        },
        {
          question: "Is the maturity amount guaranteed?",
          answer:
            "The estimate depends on the contribution pattern and the rate you enter. Actual credited interest follows the government-notified PPF rate for each period.",
        },
      ],
    },
  },
  {
    slug: "fd-calculator",
    name: "FD Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    featured: true,
    navLabel: "FD",
    targetKeyword: "fd calculator",
    description:
      "Estimate FD maturity amount with compounding choice, total interest earned, and a quick post-tax view.",
    primaryPromise:
      "Enter your deposit, rate, and period to see FD maturity amount, interest earned, and a post-tax estimate.",
    relatedToolSlugs: ["ppf-calculator", "sip-calculator", "income-tax-calculator"],
    seoContent: {
      title: "FD Calculator",
      metaDescription:
        "Calculate fixed deposit maturity value using amount, annual rate, tenure, and compounding frequency. See interest and post-tax estimates.",
      keywords: ["fd calculator", "fixed deposit calculator", "fd interest calculator"],
      h1: "FD Calculator",
      articleHeading: "How to read an FD maturity estimate",
      coverage: [
        "Fixed deposit maturity estimate from amount, rate, and tenure",
        "Quarterly, monthly, half-yearly, and yearly compounding",
        "Pre-tax versus post-tax return view",
      ],
      intro: [
        "An FD calculator should help you understand not just the maturity value but also how much of the final amount comes from interest, how compounding frequency affects the result, and how taxation can reduce the effective return.",
        "This calculator uses a standard compound-interest approach so you can test common fixed deposit scenarios quickly. That makes it useful for comparing tenure choices or checking whether an FD still fits your savings goal.",
        "Use the post-tax estimate as a planning shortcut only. Actual tax treatment depends on your slab, interest thresholds, and whether TDS applies.",
      ],
      howTo: [
        "Enter the deposit amount, annual interest rate, and the FD period.",
        "Choose the compounding frequency used by the bank or the scenario you want to compare.",
        "Check the maturity amount and total interest earned.",
        "Open the details to see the post-tax estimate if you want a more realistic net-return view.",
      ],
      faqs: [
        {
          question: "Does this calculator include TDS automatically?",
          answer:
            "No. It shows a simple post-tax estimate based on the tax rate you enter, but actual TDS treatment depends on threshold rules and your bank records.",
        },
        {
          question: "Why does compounding frequency matter?",
          answer:
            "More frequent compounding credits interest into the base amount sooner, which can increase the final maturity value slightly.",
        },
        {
          question: "Can I compare FD with PPF using this?",
          answer:
            "Yes. The related tools section links directly to the PPF calculator so you can compare low-risk savings options more easily.",
        },
      ],
    },
  },
  {
    slug: "gratuity-calculator",
    name: "Gratuity Calculator",
    category: "Finance",
    schemaType: "calculator",
    runtime: "pure-client",
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed against standard gratuity formula guidance and current tax-exempt ceiling",
    targetKeyword: "gratuity calculator",
    description:
      "Estimate gratuity using Act-covered and non-Act formulas, eligibility checks, and tax-exemption context.",
    primaryPromise:
      "Enter last drawn salary and years of service to estimate gratuity and check whether you are eligible yet.",
    relatedToolSlugs: ["salary-calculator", "ppf-calculator", "income-tax-calculator"],
    seoContent: {
      title: "Gratuity Calculator",
      metaDescription:
        "Use a gratuity calculator to estimate gratuity for Indian employees under Act-covered and non-Act formulas, with eligibility checks.",
      keywords: ["gratuity calculator", "gratuity calculation", "employee gratuity calculator"],
      h1: "Gratuity Calculator",
      articleHeading: "What this gratuity calculator covers",
      coverage: [
        "Act-covered and non-Act gratuity formulas",
        "Eligibility checks based on years of service",
        "Tax-exemption context for planning",
      ],
      intro: [
        "A gratuity estimate is most useful when it explains which formula is being applied and whether the employee is even eligible yet. Many users know their tenure and salary but are not sure how the 5-year rule and formula differences affect the final number.",
        "This calculator covers both the Payment of Gratuity Act formula and a simpler non-Act estimate. It also makes the eligibility status visible so the output is not misleading.",
        "Use it as a planning tool when evaluating resignation timing, retirement benefits, or long-term compensation value.",
      ],
      howTo: [
        "Enter your last drawn basic salary plus dearness allowance if applicable.",
        "Add completed years of service and extra months if you want the eligibility check to be more precise.",
        "Choose whether you want the Act-covered or non-Act formula.",
        "Check the gratuity estimate, eligibility status, and explanatory notes before relying on it.",
      ],
      faqs: [
        {
          question: "Do I need 5 years of service for gratuity?",
          answer:
            "In many common cases, yes. This calculator highlights whether you have crossed the standard eligibility threshold based on the service length entered.",
        },
        {
          question: "Why are there two gratuity formulas?",
          answer:
            "Act-covered and non-Act gratuity estimates use different divisors. The calculator lets you switch so you can see the difference clearly.",
        },
        {
          question: "Is this enough for final payroll settlement?",
          answer:
            "No. Final gratuity settlement should always be matched with your employer policy and applicable legal rules.",
        },
      ],
    },
  },
  createToolDefinition({
    slug: "hra-calculator",
    name: "HRA Calculator",
    category: "Tax",
    schemaType: "calculator",
    targetKeyword: "hra calculator india",
    description:
      "Estimate HRA exemption under the old regime by comparing actual HRA, rent paid minus 10% of salary, and city-based salary limits.",
    primaryPromise:
      "Enter basic salary, HRA received, and rent paid to see exempt HRA and the binding rule.",
    relatedToolSlugs: ["salary-calculator", "income-tax-calculator", "rent-receipt-generator"],
    keywords: ["hra calculator", "hra exemption calculator", "hra calculation old regime"],
    articleHeading: "How this HRA calculator works",
    coverage: ["Old-regime HRA exemption", "Binding-rule visibility", "Metro and non-metro handling"],
    howTo: ["Enter annual basic salary, HRA received, and rent paid.", "Select metro or non-metro city status.", "Check the exempt HRA and the rule that limits it."],
    faqs: [{ question: "Does HRA exemption work in the new regime?", answer: "In general planning, HRA exemption is mainly relevant in old-regime cases." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed against the standard Income Tax Department HRA exemption rule",
  }),
  createToolDefinition({
    slug: "number-to-words",
    name: "Number to Words Converter",
    category: "Utility",
    schemaType: "converter",
    targetKeyword: "number to words indian rupees",
    description:
      "Convert numbers into Indian rupee wording with lakh, crore, and paise support for invoices, receipts, and cheques.",
    primaryPromise:
      "Enter an amount to convert it into Indian rupee words instantly.",
    relatedToolSlugs: ["gst-invoice-generator", "rent-receipt-generator", "salary-slip-generator"],
    keywords: ["number to words", "amount in words", "rupees in words converter"],
    articleHeading: "When this number-to-words tool helps",
    coverage: ["Indian numbering system", "Rupee and paise wording", "Document-ready phrasing"],
    howTo: ["Enter any numeric amount.", "Copy the rupee phrase or whole-number wording for your document."],
    faqs: [{ question: "Does it support lakh and crore format?", answer: "Yes. The wording follows the Indian numbering pattern." }],
  }),
  createToolDefinition({
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Utility",
    schemaType: "calculator",
    targetKeyword: "age calculator",
    description:
      "Calculate age in years, months, and days with next-birthday countdown and age-on-date support.",
    primaryPromise:
      "Enter date of birth to see exact age and next-birthday countdown.",
    relatedToolSlugs: ["gratuity-calculator", "marriage-biodata-maker", "salary-slip-generator"],
    keywords: ["age calculator", "date of birth calculator", "how old am i"],
    articleHeading: "What this age calculator shows",
    coverage: ["Exact age breakdown", "Next birthday countdown", "Target-date age mode"],
    howTo: ["Enter date of birth.", "Optionally add a target date.", "Read the exact age breakdown and countdown."],
    faqs: [{ question: "Can I calculate age on a future exam date?", answer: "Yes. Use the optional target-date field." }],
  }),
  createToolDefinition({
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Utility",
    schemaType: "calculator",
    targetKeyword: "percentage calculator",
    description:
      "Use one page for percentage of a number, percentage change, marks percentage, and fraction-to-percentage calculations.",
    primaryPromise:
      "Switch modes to calculate percentages, changes, marks, and fractions in one place.",
    relatedToolSlugs: ["simple-interest-calculator", "number-to-words", "salary-calculator"],
    keywords: ["percentage calculator", "percentage increase calculator", "marks percentage calculator"],
    articleHeading: "Six percentage modes in one tool",
    coverage: ["Percentage of a number", "Change and increase", "Marks and fraction conversion"],
    howTo: ["Pick the required mode.", "Enter the two values.", "Read the result in number or percent form."],
    faqs: [{ question: "Does it support marks percentage?", answer: "Yes. One mode is dedicated to marks percentage." }],
  }),
  createToolDefinition({
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "simple interest calculator",
    description:
      "Estimate simple interest, total amount, and compare the same scenario against annual compounding.",
    primaryPromise:
      "Enter principal, rate, and tenure to calculate simple interest and compare it with compounding.",
    relatedToolSlugs: ["fd-calculator", "flat-vs-reducing-rate-converter", "emi-calculator"],
    keywords: ["simple interest calculator", "simple interest formula", "si calculator"],
    articleHeading: "Simple interest versus compounding",
    coverage: ["Simple-interest result", "Total amount", "Compound comparison"],
    howTo: ["Enter principal, annual rate, and years.", "Read simple interest first, then compare the compound amount."],
    faqs: [{ question: "Does the comparison use annual compounding?", answer: "Yes. The comparison uses annual compounding for a simple benchmark." }],
  }),
  createToolDefinition({
    slug: "flat-vs-reducing-rate-converter",
    name: "Flat vs Reducing Rate Converter",
    category: "Finance",
    schemaType: "converter",
    targetKeyword: "flat to reducing rate converter",
    description:
      "Compare flat-rate and reducing-balance loan costs using approximate equivalent rates, EMI, and total interest.",
    primaryPromise:
      "Enter loan amount, rate, and tenure to compare flat and reducing interest cost.",
    relatedToolSlugs: ["emi-calculator", "simple-interest-calculator", "fuel-cost-calculator"],
    keywords: ["flat to reducing rate converter", "flat vs reducing calculator", "loan rate converter"],
    articleHeading: "Why flat-rate loans look cheaper than they are",
    coverage: ["Approx equivalent-rate conversion", "EMI comparison", "Total-interest delta"],
    howTo: ["Pick conversion direction.", "Enter loan amount, rate, and tenure.", "Compare EMI and total interest."],
    faqs: [{ question: "Is the equivalent rate exact?", answer: "No. It is a practical approximation for quick comparison." }],
  }),
  createToolDefinition({
    slug: "land-area-converter",
    name: "Land Area Converter",
    category: "Property",
    schemaType: "converter",
    targetKeyword: "land area converter india",
    description:
      "Convert land area between acre, hectare, bigha, gunta, square feet, and square metres using India-relevant units.",
    primaryPromise:
      "Enter a land value and convert between acre, bigha, gunta, square feet, and more.",
    relatedToolSlugs: ["stamp-duty-calculator", "electricity-bill-calculator", "number-to-words"],
    keywords: ["land area converter", "bigha to acre", "gunta to square feet"],
    articleHeading: "India-specific land conversion support",
    coverage: ["Acre, hectare, bigha, gunta", "Square feet and square metre", "Common equivalent values"],
    howTo: ["Enter a value.", "Choose source and target units.", "Read the converted value and equivalents."],
    faqs: [{ question: "Does bigha mean the same everywhere?", answer: "No. Local usage varies, so always verify the local standard before legal decisions." }],
  }),
  createToolDefinition({
    slug: "epf-calculator",
    name: "EPF Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "epf calculator",
    description:
      "Estimate EPF corpus using monthly basic salary, employee and employer contribution rates, years, and annual return.",
    primaryPromise:
      "Enter monthly basic pay and years to estimate EPF corpus and contribution split.",
    relatedToolSlugs: ["salary-calculator", "nps-calculator", "gratuity-calculator"],
    keywords: ["epf calculator", "provident fund calculator", "epf maturity calculator"],
    articleHeading: "What this EPF calculator covers",
    coverage: ["Employee and employer contribution split", "Long-term corpus estimate", "Yearly balance snapshots"],
    howTo: ["Enter monthly basic pay and contribution rates.", "Choose years and expected annual return.", "Read corpus and yearly balance build-up."],
    faqs: [{ question: "Does this split EPS separately?", answer: "No. This is a planning estimate and does not model EPS allocation separately." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Default rate aligned to the latest official EPF reference used by this tool; return stays editable",
  }),
  createToolDefinition({
    slug: "nps-calculator",
    name: "NPS Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "nps calculator india",
    description:
      "Project NPS corpus, lump-sum withdrawal, annuity allocation, and invested-versus-growth split from a monthly contribution.",
    primaryPromise:
      "Enter monthly NPS contribution to estimate corpus, lump sum, and annuity split.",
    relatedToolSlugs: ["epf-calculator", "ppf-calculator", "swp-calculator"],
    keywords: ["nps calculator", "nps maturity calculator", "nps corpus calculator"],
    articleHeading: "How this NPS projection works",
    coverage: ["Monthly contribution model", "Corpus and annuity split", "Invested amount vs wealth gained"],
    howTo: ["Enter monthly contribution, years, return, and annuity share.", "Check total corpus, lump sum, and annuity corpus."],
    faqs: [{ question: "Does this tool decide the legal withdrawal ratio?", answer: "No. It models the annuity share you choose for planning." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Normal-exit planning reviewed against official NPS withdrawal guidance; market return stays user-input",
  }),
  createToolDefinition({
    slug: "lump-sum-calculator",
    name: "Lump Sum Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "lump sum calculator",
    description:
      "Estimate one-time investment maturity value, wealth gained, and compare the same capital against a SIP-style staggered plan.",
    primaryPromise:
      "Enter a one-time amount, return, and years to estimate maturity and compare with SIP-style investing.",
    relatedToolSlugs: ["sip-calculator", "cagr-calculator", "fd-calculator"],
    keywords: ["lump sum calculator", "one time investment calculator", "lump sum vs sip"],
    articleHeading: "When lump-sum planning is useful",
    coverage: ["One-time maturity estimate", "Wealth-gain split", "SIP-style comparison"],
    howTo: ["Enter amount, annual return, and years.", "Review maturity value and the SIP comparison."],
    faqs: [{ question: "Is the SIP comparison exact?", answer: "No. It is a planning comparison using the same total capital spread over time." }],
  }),
  createToolDefinition({
    slug: "cagr-calculator",
    name: "CAGR Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "cagr calculator",
    description:
      "Calculate CAGR from starting value, ending value, and years, with a reverse target mode for growth planning.",
    primaryPromise:
      "Enter starting value, ending value, and years to calculate CAGR and reverse target values.",
    relatedToolSlugs: ["lump-sum-calculator", "sip-calculator", "fd-calculator"],
    keywords: ["cagr calculator", "compound annual growth rate calculator", "cagr formula"],
    articleHeading: "What CAGR does and does not show",
    coverage: ["Annualized growth rate", "Reverse target mode", "Return smoothing explanation"],
    howTo: ["Enter initial value, final value, and years.", "Use the reverse target field to project future value at a target CAGR."],
    faqs: [{ question: "Does CAGR show volatility?", answer: "No. It compresses the path into a single annualized rate." }],
  }),
  createToolDefinition({
    slug: "swp-calculator",
    name: "SWP Calculator",
    category: "Finance",
    schemaType: "calculator",
    targetKeyword: "swp calculator",
    description:
      "Estimate how long a corpus can support a monthly withdrawal using expected return and optional inflation on withdrawals.",
    primaryPromise:
      "Enter corpus, withdrawal, and return to see how long the money may last.",
    relatedToolSlugs: ["nps-calculator", "lump-sum-calculator", "sip-calculator"],
    keywords: ["swp calculator", "systematic withdrawal plan calculator", "corpus depletion calculator"],
    articleHeading: "How this SWP estimate works",
    coverage: ["Corpus life estimate", "Inflation-adjusted withdrawals", "Depletion trend"],
    howTo: ["Enter corpus, monthly withdrawal, return, and optional inflation.", "Check years lasted and the depletion trend."],
    faqs: [{ question: "Can real returns change the result a lot?", answer: "Yes. Sequence of returns can materially change SWP sustainability." }],
  }),
  createToolDefinition({
    slug: "amazon-seller-fee-calculator",
    name: "Amazon Seller Fee Calculator",
    category: "Commerce",
    schemaType: "calculator",
    runtime: "static-data",
    targetKeyword: "amazon seller fee calculator india",
    description:
      "Estimate Amazon marketplace fees, shipping charges, and seller proceeds using category, fulfilment mode, and shipping band.",
    primaryPromise:
      "Enter selling price and fulfilment details to estimate Amazon fees and net proceeds.",
    relatedToolSlugs: ["flipkart-seller-fee-calculator", "gst-calculator", "number-to-words"],
    keywords: ["amazon seller fee calculator", "amazon fba fee calculator india", "amazon seller charges"],
    articleHeading: "What this Amazon fee estimator covers",
    coverage: ["Category-based referral fee estimate", "Closing fee and shipping cost", "Net proceeds after fees"],
    howTo: ["Enter selling price.", "Choose category, fulfilment mode, and shipping band.", "Check total fees and net proceeds."],
    faqs: [{ question: "Are these live Amazon fees?", answer: "No. This uses a reviewed static planning dataset and should be verified against the latest fee card." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed static marketplace fee estimate dataset",
  }),
  createToolDefinition({
    slug: "flipkart-seller-fee-calculator",
    name: "Flipkart Seller Fee Calculator",
    category: "Commerce",
    schemaType: "calculator",
    runtime: "static-data",
    targetKeyword: "flipkart seller fee calculator india",
    description:
      "Estimate Flipkart seller fees, shipping charges, and net proceeds using category, fulfilment mode, and shipping band.",
    primaryPromise:
      "Enter selling price and fulfilment details to estimate Flipkart fees and seller proceeds.",
    relatedToolSlugs: ["amazon-seller-fee-calculator", "gst-calculator", "number-to-words"],
    keywords: ["flipkart seller fee calculator", "flipkart seller charges", "flipkart fee calculator"],
    articleHeading: "What this Flipkart fee estimator covers",
    coverage: ["Category-based referral fee estimate", "Closing fee and shipping cost", "Net proceeds after fees"],
    howTo: ["Enter selling price.", "Choose category, fulfilment mode, and shipping band.", "Check fee breakdown and net proceeds."],
    faqs: [{ question: "Does this include ads, returns, and GST on fees?", answer: "No. It focuses on a simplified static fee estimate for quick pricing checks." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed static marketplace fee estimate dataset",
  }),
  createToolDefinition({
    slug: "upi-qr-generator",
    name: "UPI QR Generator",
    category: "Payments",
    schemaType: "generator",
    targetKeyword: "upi qr code generator",
    description:
      "Generate a UPI QR code with payee name, UPI ID, amount, note, and PNG download support without login.",
    primaryPromise:
      "Enter payee details to generate a downloadable UPI QR code instantly.",
    relatedToolSlugs: ["number-to-words", "gst-invoice-generator", "rent-receipt-generator"],
    keywords: ["upi qr generator", "upi qr code generator", "upi qr png download"],
    articleHeading: "What this UPI QR generator creates",
    coverage: ["UPI payment URI", "Optional fixed amount and note", "PNG download"],
    howTo: ["Enter payee name and UPI ID.", "Add amount or note if needed.", "Download the QR as a PNG."],
    faqs: [{ question: "Does this store my UPI details?", answer: "No. The QR is generated locally in the browser." }],
  }),
  createToolDefinition({
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Utility",
    schemaType: "calculator",
    targetKeyword: "fuel cost calculator india",
    description:
      "Estimate fuel cost for one-way or round-trip travel using distance, mileage, fuel price, and optional toll costs.",
    primaryPromise:
      "Enter distance, mileage, and fuel price to estimate trip cost.",
    relatedToolSlugs: ["emi-calculator", "electricity-bill-calculator", "number-to-words"],
    keywords: ["fuel cost calculator", "trip fuel calculator", "petrol cost calculator"],
    articleHeading: "How this trip-cost estimate works",
    coverage: ["Fuel-only estimate", "Toll and parking support", "Round-trip toggle"],
    howTo: ["Enter distance, mileage, and fuel price.", "Add tolls or switch on round trip if needed.", "Read total trip cost."],
    faqs: [{ question: "Does this fetch live fuel prices?", answer: "No. Enter the current price you want to model." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Fuel price is fully user-input; no live-rate feed is used",
  }),
  createToolDefinition({
    slug: "stamp-duty-calculator",
    name: "Stamp Duty Calculator",
    category: "Property",
    schemaType: "calculator",
    runtime: "static-data",
    targetKeyword: "stamp duty calculator india",
    description:
      "Estimate stamp duty, registration fees, and total upfront property charges for supported Indian states and buyer profiles.",
    primaryPromise:
      "Enter property value and buyer profile to estimate stamp duty and registration charges.",
    relatedToolSlugs: ["land-area-converter", "electricity-bill-calculator", "gst-calculator"],
    keywords: ["stamp duty calculator", "property registration charges calculator", "stamp duty india"],
    articleHeading: "What this stamp-duty estimator covers",
    coverage: ["State-wise simplified rates", "Buyer-profile handling", "Total upfront charge estimate"],
    howTo: ["Choose a supported state and buyer profile.", "Enter the property value.", "Read stamp duty, registration, and total upfront cost."],
    faqs: [{ question: "Are cess and concession rules included?", answer: "No. This uses a simplified reviewed rate table and excludes many state-specific extras." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed static property-charge dataset",
  }),
  createToolDefinition({
    slug: "electricity-bill-calculator",
    name: "Electricity Bill Calculator",
    category: "Utility",
    schemaType: "calculator",
    runtime: "static-data",
    targetKeyword: "electricity bill calculator india",
    description:
      "Estimate slab-based electricity charges for supported Indian states and consumer types using a reviewed static rate table.",
    primaryPromise:
      "Enter state, consumer type, and units to estimate the electricity bill.",
    relatedToolSlugs: ["fuel-cost-calculator", "land-area-converter", "number-to-words"],
    keywords: ["electricity bill calculator", "power bill calculator india", "units to bill calculator"],
    articleHeading: "What this electricity estimate includes",
    coverage: ["Supported-state slab model", "Domestic and commercial support", "Slab-wise breakdown"],
    howTo: ["Choose state and consumer type.", "Enter units consumed.", "Read bill estimate and slab breakdown."],
    faqs: [{ question: "Does this include subsidies and fixed charges?", answer: "No. This is an energy-charge estimate only." }],
    reviewedAt: "2026-03-08",
    sourceLabel: "Reviewed static electricity-rate dataset",
  }),
  createToolDefinition({
    slug: "rent-receipt-generator",
    name: "Rent Receipt Generator",
    category: "Generator",
    schemaType: "generator",
    targetKeyword: "rent receipt generator",
    description:
      "Generate one or multiple monthly rent receipts for HRA documentation with landlord, tenant, address, payment mode, and PDF download.",
    primaryPromise:
      "Enter rent details to generate a printable rent-receipt set instantly.",
    relatedToolSlugs: ["hra-calculator", "salary-calculator", "number-to-words"],
    keywords: ["rent receipt generator", "rent receipt for hra", "rent receipt pdf"],
    articleHeading: "What this rent-receipt generator creates",
    coverage: ["Multi-month receipt set", "Landlord PAN support", "Printable PDF export"],
    howTo: ["Enter names, address, monthly rent, and month range.", "Preview the full receipt set.", "Download the PDF."],
    faqs: [{ question: "Can I generate receipts for multiple months?", answer: "Yes. The generator creates a receipt set for the full selected month range." }],
  }),
  createToolDefinition({
    slug: "marriage-biodata-maker",
    name: "Marriage Biodata Maker",
    category: "Generator",
    schemaType: "generator",
    targetKeyword: "marriage biodata maker",
    description:
      "Create a simple one-page marriage biodata with photo, profile details, family summary, and PDF download.",
    primaryPromise:
      "Fill the profile and download a clean marriage biodata PDF without signup.",
    relatedToolSlugs: ["age-calculator", "number-to-words", "salary-slip-generator"],
    keywords: ["marriage biodata maker", "biodata for marriage pdf", "marriage profile generator"],
    articleHeading: "What this biodata maker includes",
    coverage: ["One-page biodata layout", "Photo support", "PDF export"],
    howTo: ["Fill name, age, education, profession, and summary sections.", "Add an optional photo.", "Preview and download the biodata PDF."],
    faqs: [{ question: "Does this store the biodata online?", answer: "No. The biodata is created locally in your browser." }],
  }),
  createToolDefinition({
    slug: "salary-slip-generator",
    name: "Salary Slip Generator",
    category: "Generator",
    schemaType: "generator",
    targetKeyword: "salary slip generator india",
    description:
      "Generate a printable salary slip with company details, employee details, earnings, deductions, net pay, and PDF download.",
    primaryPromise:
      "Enter company, employee, earnings, and deductions to create a salary slip PDF.",
    relatedToolSlugs: ["salary-calculator", "hra-calculator", "income-tax-calculator"],
    keywords: ["salary slip generator", "payslip generator", "salary slip pdf india"],
    articleHeading: "What this salary-slip generator covers",
    coverage: ["Earnings and deductions", "Logo upload", "Printable net-pay summary"],
    howTo: ["Enter company and employee details.", "Add earnings and deductions.", "Preview the salary slip and download the PDF."],
    faqs: [{ question: "Can I upload a logo?", answer: "Yes. The generator supports an optional company-logo upload." }],
  }),
  createToolDefinition({
    slug: "gst-invoice-generator",
    name: "GST Invoice Generator",
    category: "Generator",
    schemaType: "generator",
    targetKeyword: "gst invoice generator",
    description:
      "Generate a printable GST invoice with seller and buyer details, item rows, GST rates, state-based tax split, and PDF download.",
    primaryPromise:
      "Enter seller, buyer, and item details to create a GST invoice without login.",
    relatedToolSlugs: ["gst-calculator", "number-to-words", "upi-qr-generator"],
    keywords: ["gst invoice generator", "gst bill maker", "gst invoice pdf"],
    articleHeading: "What this GST invoice generator creates",
    coverage: ["Seller and buyer details", "Item rows with GST", "CGST/SGST vs IGST split"],
    howTo: ["Enter seller and buyer details.", "Fill item rows and GST rates.", "Preview the invoice and download the PDF."],
    faqs: [{ question: "Does it choose CGST/SGST vs IGST automatically?", answer: "Yes. The preview switches based on seller and buyer state comparison." }],
  }),
];

export const toolDefinitionsBySlug = Object.fromEntries(
  toolDefinitions.map((tool) => [tool.slug, tool]),
) as Record<string, ToolDefinition>;

export function getToolDefinition(slug: string) {
  return toolDefinitionsBySlug[slug];
}

export function getRelatedTools(slugs: string[]) {
  return slugs.map((slug) => toolDefinitionsBySlug[slug]).filter(Boolean);
}

const categoryOrder: ToolDefinition["category"][] = [
  "Finance",
  "Tax",
  "Commerce",
  "Payments",
  "Property",
  "Generator",
  "Utility",
];

export const toolDefinitionsByCategory = categoryOrder
  .map((category) => [category, toolDefinitions.filter((tool) => tool.category === category)] as [ToolDefinition["category"], ToolDefinition[]])
  .filter(([, tools]) => tools.length > 0);

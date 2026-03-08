import { ToolDefinition } from "@/lib/types";

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: "salary-calculator",
    name: "Take-Home Salary Calculator",
    category: "Finance",
    schemaType: "calculator",
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

const categoryOrder = ["Finance", "Tax"] as const;

export const toolDefinitionsByCategory = categoryOrder.map((category) => [
  category,
  toolDefinitions.filter((tool) => tool.category === category),
]) as Array<[ToolDefinition["category"], ToolDefinition[]]>;

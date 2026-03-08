export type GSTInput = {
  amount: number;
  rate: 0 | 5 | 12 | 18 | 28;
  mode: "add" | "remove";
  supplyType: "intra-state" | "inter-state";
};

export type GSTResult = {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  supplyType: GSTInput["supplyType"];
  assumptions: string[];
  notes: string[];
};

export function calculateGST(input: GSTInput): GSTResult {
  const amount = clampCurrency(input.amount);
  const rateMultiplier = input.rate / 100;
  const exactBaseAmount =
    input.mode === "add" ? amount : amount / (1 + rateMultiplier || 1);
  const exactTotalAmount =
    input.mode === "add" ? amount * (1 + rateMultiplier) : amount;
  const baseAmount = roundCurrency(exactBaseAmount);
  const totalAmount = roundCurrency(exactTotalAmount);
  const gstAmount = Math.max(0, totalAmount - baseAmount);
  const intraState = input.supplyType === "intra-state";
  const cgst = intraState ? Math.floor(gstAmount / 2) : 0;
  const sgst = intraState ? gstAmount - cgst : 0;
  const igst = intraState ? 0 : gstAmount;

  return {
    baseAmount,
    gstAmount,
    totalAmount,
    cgst,
    sgst,
    igst,
    supplyType: input.supplyType,
    assumptions: [
      "The chosen slab is treated as the full applicable GST rate.",
      "The result excludes cess, discounts, and reverse-charge handling.",
    ],
    notes: [
      "Always confirm the correct GST slab and place of supply before billing.",
    ],
  };
}

export type EMIInput = {
  principal: number;
  annualRate: number;
  tenureValue: number;
  tenureUnit: "months" | "years";
};

export type AmortizationRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
};

export type EMIResult = {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  tenureMonths: number;
  schedule: AmortizationRow[];
  assumptions: string[];
  notes: string[];
};

export function calculateEMI(input: EMIInput): EMIResult {
  const principal = clampCurrency(input.principal);
  const annualRate = Math.max(input.annualRate, 0);
  const tenureMonths = Math.max(
    1,
    Math.round(input.tenureUnit === "years" ? input.tenureValue * 12 : input.tenureValue),
  );
  const monthlyRate = annualRate / 12 / 100;
  const monthlyEmi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * (1 + monthlyRate) ** tenureMonths) /
        ((1 + monthlyRate) ** tenureMonths - 1);

  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPart = Math.min(monthlyEmi - interest, balance);
    balance = Math.max(0, balance - principalPart);

    const exactEmi = interest + principalPart;

    schedule.push({
      month,
      emi: roundCurrency(exactEmi),
      principal: roundCurrency(principalPart),
      interest: roundCurrency(interest),
      closingBalance: roundCurrency(balance),
    });
  }

  const roundedMonthlyEmi = roundCurrency(monthlyEmi);
  const totalPayment = schedule.reduce((sum, row) => sum + row.emi, 0);

  return {
    monthlyEmi: roundedMonthlyEmi,
    totalInterest: Math.max(0, roundCurrency(totalPayment - principal)),
    totalPayment,
    tenureMonths,
    schedule,
    assumptions: [
      "EMI uses a reducing-balance loan formula with equal monthly instalments.",
      "Processing fees, insurance, and prepayments are excluded.",
    ],
    notes: [
      "Lenders can round EMI differently and may adjust the final instalment.",
    ],
  };
}

export type SIPInput = {
  monthlyInvestment: number;
  annualReturnRate: number;
  years: number;
};

export type SIPResult = {
  futureValue: number;
  totalInvested: number;
  wealthGained: number;
  monthlyRate: number;
  milestones: {
    tenYears: number;
  };
  assumptions: string[];
  notes: string[];
};

export function calculateSIP(input: SIPInput): SIPResult {
  const monthlyInvestment = clampCurrency(input.monthlyInvestment);
  const annualReturnRate = Math.max(input.annualReturnRate, 0);
  const months = Math.max(1, Math.round(input.years * 12));
  const monthlyRate = annualReturnRate / 12 / 100;
  const futureValue =
    monthlyRate === 0
      ? monthlyInvestment * months
      : monthlyInvestment *
        ((((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate));
  const totalInvested = monthlyInvestment * months;
  const tenYearsMonths = Math.min(months, 120);
  const tenYearsValue =
    monthlyRate === 0
      ? monthlyInvestment * tenYearsMonths
      : monthlyInvestment *
        ((((1 + monthlyRate) ** tenYearsMonths - 1) / monthlyRate) * (1 + monthlyRate));

  return {
    futureValue: roundCurrency(futureValue),
    totalInvested: roundCurrency(totalInvested),
    wealthGained: roundCurrency(futureValue - totalInvested),
    monthlyRate: monthlyRate * 100,
    milestones: {
      tenYears: roundCurrency(tenYearsValue),
    },
    assumptions: [
      "Returns are compounded monthly using a fixed expected annual rate.",
      "This estimate excludes taxes, fund expenses, and step-up contributions.",
    ],
    notes: [
      "Actual mutual fund returns are volatile and can differ materially from projections.",
    ],
  };
}

export type PPFInput = {
  contributionAmount: number;
  contributionFrequency: "monthly" | "yearly";
  annualRate: number;
  years: number;
};

export type PPFResult = {
  maturityValue: number;
  totalInvested: number;
  interestEarned: number;
  monthlyEquivalent: number;
  scenarios: Array<{ years: number; maturityValue: number }>;
  assumptions: string[];
  notes: string[];
};

export function calculatePPF(input: PPFInput): PPFResult {
  const contributionAmount = clampCurrency(input.contributionAmount);
  const annualRate = Math.max(input.annualRate, 0);
  const years = Math.max(1, Math.round(input.years));
  const monthlyEquivalent =
    input.contributionFrequency === "monthly" ? contributionAmount : contributionAmount / 12;
  const { balance, totalInvested } = simulatePpf({
    contributionAmount,
    contributionFrequency: input.contributionFrequency,
    annualRate,
    years,
  });

  return {
    maturityValue: balance,
    totalInvested,
    interestEarned: Math.max(0, roundCurrency(balance - totalInvested)),
    monthlyEquivalent: roundCurrency(monthlyEquivalent),
    scenarios: [15, 20, 25].map((scenarioYears) => ({
      years: scenarioYears,
      maturityValue: simulatePpf({
        contributionAmount,
        contributionFrequency: input.contributionFrequency,
        annualRate,
        years: scenarioYears,
      }).balance,
    })),
    assumptions: [
      "PPF growth is estimated using a fixed annual rate spread across monthly accrual.",
      "Yearly deposits are treated as contributions at the start of each year for planning purposes.",
    ],
    notes: [
      "Actual PPF rates are reviewed periodically by the government.",
      "Use the result as a planning estimate, not as an official account statement.",
    ],
  };
}

function simulatePpf(input: PPFInput) {
  const monthlyRate = input.annualRate / 12 / 100;
  const months = input.years * 12;
  let balance = 0;
  let totalInvested = 0;

  for (let month = 1; month <= months; month += 1) {
    if (input.contributionFrequency === "monthly") {
      balance += input.contributionAmount;
      totalInvested += input.contributionAmount;
    } else if ((month - 1) % 12 === 0) {
      balance += input.contributionAmount;
      totalInvested += input.contributionAmount;
    }

    balance *= 1 + monthlyRate;
  }

  return {
    balance: roundCurrency(balance),
    totalInvested: roundCurrency(totalInvested),
  };
}

export type FDInput = {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: 1 | 2 | 4 | 12;
  taxRate: number;
};

export type FDResult = {
  maturityValue: number;
  interestEarned: number;
  postTaxValue: number;
  postTaxInterest: number;
  assumptions: string[];
  notes: string[];
};

export function calculateFD(input: FDInput): FDResult {
  const principal = clampCurrency(input.principal);
  const annualRate = Math.max(input.annualRate, 0);
  const years = Math.max(0.25, input.years);
  const compoundingFrequency = input.compoundingFrequency;
  const taxRate = Math.min(Math.max(input.taxRate, 0), 100);

  const maturityValue =
    principal * (1 + annualRate / 100 / compoundingFrequency) ** (compoundingFrequency * years);
  const interestEarned = Math.max(0, maturityValue - principal);
  const postTaxInterest = interestEarned * (1 - taxRate / 100);

  return {
    maturityValue: roundCurrency(maturityValue),
    interestEarned: roundCurrency(interestEarned),
    postTaxValue: roundCurrency(principal + postTaxInterest),
    postTaxInterest: roundCurrency(postTaxInterest),
    assumptions: [
      "The estimate uses a standard compound-interest formula.",
      "Post-tax value is a simplified slab-based estimate and does not model TDS thresholds or exemptions.",
    ],
    notes: [
      "Banks may quote different effective yields depending on payout and compounding structure.",
    ],
  };
}

export type GratuityInput = {
  lastDrawnSalary: number;
  yearsOfService: number;
  extraMonths: number;
  formula: "act-covered" | "not-covered";
};

export type GratuityResult = {
  gratuity: number;
  eligible: boolean;
  serviceYearsUsed: number;
  monthsUntilEligible: number;
  taxExemptLimit: number;
  taxablePortion: number;
  assumptions: string[];
  notes: string[];
};

export function calculateGratuity(input: GratuityInput): GratuityResult {
  const lastDrawnSalary = clampCurrency(input.lastDrawnSalary);
  const yearsOfService = Math.max(0, Math.floor(input.yearsOfService));
  const extraMonths = Math.min(11, Math.max(0, Math.floor(input.extraMonths)));
  const totalMonths = yearsOfService * 12 + extraMonths;
  const eligible = totalMonths >= 60;
  const serviceYearsUsed =
    input.formula === "act-covered"
      ? yearsOfService + (extraMonths >= 6 ? 1 : 0)
      : yearsOfService + extraMonths / 12;
  const divisor = input.formula === "act-covered" ? 26 : 30;
  const gratuity = (lastDrawnSalary * 15 * serviceYearsUsed) / divisor;
  const taxExemptLimit = 2_000_000;

  return {
    gratuity: roundCurrency(gratuity),
    eligible,
    serviceYearsUsed:
      input.formula === "act-covered"
        ? Math.round(serviceYearsUsed)
        : Number(serviceYearsUsed.toFixed(2)),
    monthsUntilEligible: Math.max(0, 60 - totalMonths),
    taxExemptLimit,
    taxablePortion: Math.max(0, roundCurrency(gratuity - taxExemptLimit)),
    assumptions: [
      "The estimate uses last drawn salary and the selected gratuity formula.",
      "Act-covered estimates round service above six months up to the next year.",
    ],
    notes: [
      "Final employer settlement should always be checked against applicable gratuity rules and company policy.",
    ],
  };
}

function clampCurrency(value: number) {
  return Math.max(0, Number.isFinite(value) ? value : 0);
}

function roundCurrency(value: number) {
  return Math.round(value);
}

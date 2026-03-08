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

function clampCurrency(value: number) {
  return Math.max(0, Number.isFinite(value) ? value : 0);
}

function roundCurrency(value: number) {
  return Math.round(value);
}

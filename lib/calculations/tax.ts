export type TaxYear = "FY2024_25" | "FY2025_26";
export type TaxRegime = "old" | "new";
export type ResidentialStatus = "resident" | "non-resident";
export type AgeCategory = "under60" | "senior" | "super-senior";

type TaxSlab = {
  upTo: number;
  rate: number;
};

type TaxYearRules = {
  label: string;
  oldRegimeBasicExemption: Record<AgeCategory, number>;
  oldRegimeStandardDeduction: number;
  newRegimeStandardDeduction: number;
  oldRegimeRebateThreshold: number;
  oldRegimeRebateAmount: number;
  newRegimeRebateThreshold: number;
  newRegimeRebateAmount: number;
  oldRegimeSlabs: TaxSlab[];
  newRegimeSlabs: TaxSlab[];
};

const taxRulesByYear: Record<TaxYear, TaxYearRules> = {
  FY2024_25: {
    label: "FY 2024-25",
    oldRegimeBasicExemption: {
      under60: 250_000,
      senior: 300_000,
      "super-senior": 500_000,
    },
    oldRegimeStandardDeduction: 50_000,
    newRegimeStandardDeduction: 50_000,
    oldRegimeRebateThreshold: 500_000,
    oldRegimeRebateAmount: 12_500,
    newRegimeRebateThreshold: 700_000,
    newRegimeRebateAmount: 25_000,
    oldRegimeSlabs: [
      { upTo: 250_000, rate: 0 },
      { upTo: 500_000, rate: 0.05 },
      { upTo: 1_000_000, rate: 0.2 },
      { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
    ],
    newRegimeSlabs: [
      { upTo: 300_000, rate: 0 },
      { upTo: 600_000, rate: 0.05 },
      { upTo: 900_000, rate: 0.1 },
      { upTo: 1_200_000, rate: 0.15 },
      { upTo: 1_500_000, rate: 0.2 },
      { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
    ],
  },
  FY2025_26: {
    label: "FY 2025-26",
    oldRegimeBasicExemption: {
      under60: 250_000,
      senior: 300_000,
      "super-senior": 500_000,
    },
    oldRegimeStandardDeduction: 50_000,
    newRegimeStandardDeduction: 75_000,
    oldRegimeRebateThreshold: 500_000,
    oldRegimeRebateAmount: 12_500,
    newRegimeRebateThreshold: 1_200_000,
    newRegimeRebateAmount: 60_000,
    oldRegimeSlabs: [
      { upTo: 250_000, rate: 0 },
      { upTo: 500_000, rate: 0.05 },
      { upTo: 1_000_000, rate: 0.2 },
      { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
    ],
    newRegimeSlabs: [
      { upTo: 400_000, rate: 0 },
      { upTo: 800_000, rate: 0.05 },
      { upTo: 1_200_000, rate: 0.1 },
      { upTo: 1_600_000, rate: 0.15 },
      { upTo: 2_000_000, rate: 0.2 },
      { upTo: 2_400_000, rate: 0.25 },
      { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
    ],
  },
};

export type IncomeTaxInput = {
  annualIncome: number;
  taxYear: TaxYear;
  residentialStatus: ResidentialStatus;
  ageCategory: AgeCategory;
  isSalaried: boolean;
  deduction80C: number;
  deduction80D: number;
  hraExemption: number;
  npsContribution: number;
  otherDeductions: number;
};

export const defaultIncomeTaxInput: IncomeTaxInput = {
  annualIncome: 1_200_000,
  taxYear: "FY2025_26",
  residentialStatus: "resident",
  ageCategory: "under60",
  isSalaried: true,
  deduction80C: 0,
  deduction80D: 0,
  hraExemption: 0,
  npsContribution: 0,
  otherDeductions: 0,
};

export type TaxBreakdown = {
  regime: TaxRegime;
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  cess: number;
  totalTax: number;
  netIncome: number;
};

export type IncomeTaxComparisonResult = {
  oldRegime: TaxBreakdown;
  newRegime: TaxBreakdown;
  recommendedRegime: TaxRegime;
  taxSaving: number;
  assumptions: string[];
  notes: string[];
};

export function calculateIncomeTaxComparison(
  input: IncomeTaxInput,
): IncomeTaxComparisonResult {
  const oldRegime = calculateIncomeTaxForRegime(input, "old");
  const newRegime = calculateIncomeTaxForRegime(input, "new");
  const recommendedRegime =
    oldRegime.totalTax <= newRegime.totalTax ? "old" : "new";

  return {
    oldRegime,
    newRegime,
    recommendedRegime,
    taxSaving: Math.abs(oldRegime.totalTax - newRegime.totalTax),
    assumptions: [
      `Rules are versioned for ${taxRulesByYear[input.taxYear].label}.`,
      `${input.residentialStatus === "resident" ? "Resident" : "Non-resident"} ${formatAgeLabel(input.ageCategory)} slab treatment is used for this estimate.`,
      "This v1 excludes surcharge and special-income cases.",
    ],
    notes: ["Use this for planning, not as a final filing computation."],
  };
}

export function calculateIncomeTaxForRegime(
  input: IncomeTaxInput,
  regime: TaxRegime,
): TaxBreakdown {
  const rules = taxRulesByYear[input.taxYear];
  const grossIncome = clampMoney(input.annualIncome);
  const standardDeduction =
    input.isSalaried
      ? regime === "old"
        ? rules.oldRegimeStandardDeduction
        : rules.newRegimeStandardDeduction
      : 0;
  const oldRegimeDeductions =
    standardDeduction +
    Math.min(clampMoney(input.deduction80C), 150_000) +
    clampMoney(input.deduction80D) +
    clampMoney(input.hraExemption) +
    Math.min(clampMoney(input.npsContribution), 50_000) +
    clampMoney(input.otherDeductions);
  const totalDeductions =
    regime === "old" ? oldRegimeDeductions : standardDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  const slabTax = calculateSlabTax(
    taxableIncome,
    regime === "old"
      ? getOldRegimeSlabs(rules, input.residentialStatus, input.ageCategory)
      : rules.newRegimeSlabs,
  );
  const rebate = calculateRebate(
    taxableIncome,
    slabTax,
    rules,
    regime,
    input.residentialStatus,
  );
  const taxAfterRebate = Math.max(0, slabTax - rebate);
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    regime,
    grossIncome: roundMoney(grossIncome),
    standardDeduction: roundMoney(standardDeduction),
    totalDeductions: roundMoney(totalDeductions),
    taxableIncome: roundMoney(taxableIncome),
    slabTax: roundMoney(slabTax),
    rebate: roundMoney(rebate),
    cess: roundMoney(cess),
    totalTax: roundMoney(totalTax),
    netIncome: roundMoney(grossIncome - totalTax),
  };
}

export type SalaryInput = {
  ctc: number;
  taxYear: TaxYear;
  regime: TaxRegime;
  residentialStatus: ResidentialStatus;
  ageCategory: AgeCategory;
  hraReceived: number;
  rentPaid: number;
  cityTier: "metro" | "non-metro";
  investments80c: number;
  npsContribution: number;
  professionalTax: number;
};

export const defaultSalaryInput: SalaryInput = {
  ctc: 1_200_000,
  taxYear: "FY2025_26",
  regime: "new",
  residentialStatus: "resident",
  ageCategory: "under60",
  hraReceived: 0,
  rentPaid: 0,
  cityTier: "metro",
  investments80c: 0,
  npsContribution: 0,
  professionalTax: 0,
};

export type SalaryBreakdown = {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  employeePf: number;
  employerPf: number;
  professionalTax: number;
  hraExemption: number;
  taxableIncome: number;
  incomeTax: number;
  cess: number;
  totalTax: number;
  netTakeHome: number;
  monthlyTakeHome: number;
};

export type SalaryResult = {
  selected: SalaryBreakdown;
  comparison: Record<TaxRegime, SalaryBreakdown>;
  recommendedRegime: TaxRegime;
  assumptions: string[];
  notes: string[];
};

export function calculateSalary(input: SalaryInput): SalaryResult {
  const oldBreakdown = calculateSalaryForRegime({ ...input, regime: "old" });
  const newBreakdown = calculateSalaryForRegime({ ...input, regime: "new" });
  const selected = input.regime === "old" ? oldBreakdown : newBreakdown;
  const recommendedRegime =
    oldBreakdown.netTakeHome >= newBreakdown.netTakeHome ? "old" : "new";

  return {
    selected,
    comparison: {
      old: oldBreakdown,
      new: newBreakdown,
    },
    recommendedRegime,
    assumptions: [
      "Basic salary is estimated at 40% of CTC for the payroll model.",
      "Employee PF and employer PF use a 12% basic-pay estimate capped at ₹21,600 a year in this simplified model.",
      `${input.residentialStatus === "resident" ? "Resident" : "Non-resident"} ${formatAgeLabel(input.ageCategory)} slab treatment is used for income-tax comparison.`,
      "Income tax uses the selected financial-year rules and excludes surcharge and special-income cases.",
    ],
    notes: [
      "Actual salary structures can vary materially by employer.",
      "Bonus, variable pay, meal cards, and reimbursements are not modeled separately.",
    ],
  };
}

function calculateSalaryForRegime(input: SalaryInput): SalaryBreakdown {
  const ctc = clampMoney(input.ctc);
  const basicSalary = ctc * 0.4;
  const hra = clampMoney(input.hraReceived);
  const employerPf = Math.min(basicSalary * 0.12, 21_600);
  const employeePf = Math.min(basicSalary * 0.12, 21_600);
  const grossSalary = Math.max(0, ctc - employerPf);
  const specialAllowance = Math.max(0, grossSalary - basicSalary - hra);
  const professionalTax = clampMoney(input.professionalTax);
  let hraExemption = 0;

  if (input.regime === "old" && input.rentPaid > 0 && hra > 0) {
    hraExemption = Math.max(
      0,
      Math.min(
        hra,
        clampMoney(input.rentPaid) - basicSalary * 0.1,
        basicSalary * (input.cityTier === "metro" ? 0.5 : 0.4),
      ),
    );
  }

  const taxResult = calculateIncomeTaxForRegime(
    {
      annualIncome: grossSalary - employeePf - professionalTax,
      taxYear: input.taxYear,
      residentialStatus: input.residentialStatus,
      ageCategory: input.ageCategory,
      isSalaried: true,
      deduction80C: input.regime === "old" ? input.investments80c : 0,
      deduction80D: 0,
      hraExemption,
      npsContribution: input.regime === "old" ? input.npsContribution : 0,
      otherDeductions: 0,
    },
    input.regime,
  );

  const netTakeHome = Math.max(
    0,
    grossSalary - employeePf - professionalTax - taxResult.totalTax,
  );

  return {
    grossSalary: roundMoney(grossSalary),
    basicSalary: roundMoney(basicSalary),
    hra: roundMoney(hra),
    specialAllowance: roundMoney(specialAllowance),
    employeePf: roundMoney(employeePf),
    employerPf: roundMoney(employerPf),
    professionalTax: roundMoney(professionalTax),
    hraExemption: roundMoney(hraExemption),
    taxableIncome: taxResult.taxableIncome,
    incomeTax: taxResult.slabTax - taxResult.rebate,
    cess: taxResult.cess,
    totalTax: taxResult.totalTax,
    netTakeHome: roundMoney(netTakeHome),
    monthlyTakeHome: roundMoney(netTakeHome / 12),
  };
}

function calculateSlabTax(income: number, slabs: TaxSlab[]) {
  let previousThreshold = 0;
  let tax = 0;

  for (const slab of slabs) {
    const taxableSlice = Math.max(
      0,
      Math.min(income, slab.upTo) - previousThreshold,
    );
    tax += taxableSlice * slab.rate;
    previousThreshold = slab.upTo;

    if (income <= slab.upTo) {
      break;
    }
  }

  return tax;
}

function getOldRegimeSlabs(
  rules: TaxYearRules,
  residentialStatus: ResidentialStatus,
  ageCategory: AgeCategory,
) {
  const basicExemption =
    residentialStatus === "resident"
      ? rules.oldRegimeBasicExemption[ageCategory]
      : rules.oldRegimeBasicExemption.under60;

  return [
    { upTo: basicExemption, rate: 0 },
    { upTo: 500_000, rate: 0.05 },
    { upTo: 1_000_000, rate: 0.2 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
  ];
}

function calculateRebate(
  taxableIncome: number,
  slabTax: number,
  rules: TaxYearRules,
  regime: TaxRegime,
  residentialStatus: ResidentialStatus,
) {
  if (residentialStatus !== "resident") {
    return 0;
  }

  if (regime === "old") {
    return taxableIncome <= rules.oldRegimeRebateThreshold
      ? Math.min(slabTax, rules.oldRegimeRebateAmount)
      : 0;
  }

  if (taxableIncome <= rules.newRegimeRebateThreshold) {
    return Math.min(slabTax, rules.newRegimeRebateAmount);
  }

  const excessIncome = taxableIncome - rules.newRegimeRebateThreshold;
  const marginalRelief = Math.max(0, slabTax - excessIncome);

  return Math.min(slabTax, marginalRelief);
}

function clampMoney(value: number) {
  return Math.max(0, Number.isFinite(value) ? value : 0);
}

function roundMoney(value: number) {
  return Math.round(value);
}

function formatAgeLabel(ageCategory: AgeCategory) {
  switch (ageCategory) {
    case "senior":
      return "senior citizen";
    case "super-senior":
      return "super senior citizen";
    default:
      return "individual below 60";
  }
}

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
      "This tool uses the standard five-year eligibility check and does not model court-driven edge cases such as 4 years and 240 days.",
    ],
  };
}

export type HRAInput = {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  cityTier: "metro" | "non-metro";
  dearnessAllowance: number;
};

export type HRAResult = {
  exemptHra: number;
  taxableHra: number;
  limits: Array<{ label: string; value: number }>;
  bindingRule: string;
  assumptions: string[];
  notes: string[];
};

export function calculateHRA(input: HRAInput): HRAResult {
  const basicSalary = clampCurrency(input.basicSalary);
  const hraReceived = clampCurrency(input.hraReceived);
  const rentPaid = clampCurrency(input.rentPaid);
  const dearnessAllowance = clampCurrency(input.dearnessAllowance);
  const salaryBasis = basicSalary + dearnessAllowance;
  const rentMinusTenPercent = Math.max(0, rentPaid - salaryBasis * 0.1);
  const salaryLimit = salaryBasis * (input.cityTier === "metro" ? 0.5 : 0.4);
  const limits = [
    { label: "Actual HRA received", value: hraReceived },
    { label: "Rent paid minus 10% of salary", value: rentMinusTenPercent },
    { label: input.cityTier === "metro" ? "50% of salary" : "40% of salary", value: salaryLimit },
  ];
  const exemptHra = roundCurrency(Math.min(...limits.map((item) => item.value)));
  const bindingRule = limits.reduce((lowest, current) =>
    current.value < lowest.value ? current : lowest,
  ).label;

  return {
    exemptHra,
    taxableHra: Math.max(0, roundCurrency(hraReceived - exemptHra)),
    limits: limits.map((item) => ({ ...item, value: roundCurrency(item.value) })),
    bindingRule,
    assumptions: [
      "This estimate follows the common old-regime HRA exemption comparison of three limits.",
      "Dearness allowance is included only if it forms part of retirement benefits in your salary structure.",
    ],
    notes: [
      "HRA exemption generally matters only for old-regime tax planning.",
    ],
  };
}

export type EPFInput = {
  monthlyBasic: number;
  employeeRate: number;
  employerRate: number;
  years: number;
  annualReturn: number;
};

export type EPFResult = {
  corpus: number;
  employeeContribution: number;
  employerContribution: number;
  interestEarned: number;
  yearlySnapshots: Array<{ year: number; balance: number }>;
  assumptions: string[];
  notes: string[];
};

export function calculateEPF(input: EPFInput): EPFResult {
  const monthlyBasic = clampCurrency(input.monthlyBasic);
  const employeeRate = Math.max(0, input.employeeRate) / 100;
  const employerRate = Math.max(0, input.employerRate) / 100;
  const years = Math.max(1, Math.round(input.years));
  const monthlyReturn = Math.max(0, input.annualReturn) / 12 / 100;
  const months = years * 12;
  const employeeMonthly = monthlyBasic * employeeRate;
  const employerMonthly = monthlyBasic * employerRate;
  let balance = 0;
  const yearlySnapshots: Array<{ year: number; balance: number }> = [];

  for (let month = 1; month <= months; month += 1) {
    balance += employeeMonthly + employerMonthly;
    balance *= 1 + monthlyReturn;

    if (month % 12 === 0) {
      yearlySnapshots.push({
        year: month / 12,
        balance: roundCurrency(balance),
      });
    }
  }

  const employeeContribution = employeeMonthly * months;
  const employerContribution = employerMonthly * months;

  return {
    corpus: roundCurrency(balance),
    employeeContribution: roundCurrency(employeeContribution),
    employerContribution: roundCurrency(employerContribution),
    interestEarned: Math.max(
      0,
      roundCurrency(balance - employeeContribution - employerContribution),
    ),
    yearlySnapshots,
    assumptions: [
      "This is a fixed-contribution, fixed-return estimate for long-term EPF planning.",
      "Actual EPF crediting and EPS allocation can differ from a simplified monthly compounding model.",
    ],
    notes: [
      "Employer contribution shown here is a planning estimate and does not split EPS separately.",
    ],
  };
}

export type NPSInput = {
  monthlyContribution: number;
  annualReturn: number;
  years: number;
  annuityAllocation: number;
};

export type NPSResult = {
  corpus: number;
  totalInvested: number;
  wealthGained: number;
  lumpSum: number;
  annuityCorpus: number;
  assumptions: string[];
  notes: string[];
};

export function calculateNPS(input: NPSInput): NPSResult {
  const corpusResult = calculateSIP({
    monthlyInvestment: input.monthlyContribution,
    annualReturnRate: input.annualReturn,
    years: input.years,
  });
  const annuityAllocation = Math.min(Math.max(input.annuityAllocation, 40), 100);
  const annuityCorpus = corpusResult.futureValue * (annuityAllocation / 100);

  return {
    corpus: corpusResult.futureValue,
    totalInvested: corpusResult.totalInvested,
    wealthGained: corpusResult.wealthGained,
    lumpSum: roundCurrency(corpusResult.futureValue - annuityCorpus),
    annuityCorpus: roundCurrency(annuityCorpus),
    assumptions: [
      "The estimate uses a SIP-style monthly contribution model with a fixed expected annual return.",
      "For normal NPS exit planning, annuity allocation is clamped to a minimum of 40% of corpus.",
    ],
    notes: [
      "Real NPS outcomes depend on asset allocation, fund performance, corpus thresholds, and prevailing withdrawal rules.",
    ],
  };
}

export type LumpSumInput = {
  amount: number;
  annualReturn: number;
  years: number;
};

export type LumpSumResult = {
  maturityValue: number;
  wealthGained: number;
  sipEquivalentValue: number;
  yearlySnapshots: Array<{ year: number; value: number }>;
  assumptions: string[];
  notes: string[];
};

export function calculateLumpSum(input: LumpSumInput): LumpSumResult {
  const amount = clampCurrency(input.amount);
  const annualReturn = Math.max(0, input.annualReturn);
  const years = Math.max(1, Math.round(input.years));
  const maturityValue = amount * (1 + annualReturn / 100) ** years;
  const yearlySnapshots = Array.from({ length: years }, (_, index) => ({
    year: index + 1,
    value: roundCurrency(amount * (1 + annualReturn / 100) ** (index + 1)),
  }));
  const sipEquivalentValue = calculateSIP({
    monthlyInvestment: amount / Math.max(1, years * 12),
    annualReturnRate: annualReturn,
    years,
  }).futureValue;

  return {
    maturityValue: roundCurrency(maturityValue),
    wealthGained: Math.max(0, roundCurrency(maturityValue - amount)),
    sipEquivalentValue,
    yearlySnapshots,
    assumptions: [
      "Returns are compounded annually using a constant expected rate.",
      "The SIP comparison assumes the same total capital spread evenly across the full period.",
    ],
    notes: [
      "Real market returns vary over time. Use this as a comparison estimate, not a guarantee.",
    ],
  };
}

export type CAGRInput = {
  initialValue: number;
  finalValue: number;
  years: number;
  targetRate?: number;
};

export type CAGRResult = {
  cagr: number;
  targetFinalValue: number;
  assumptions: string[];
  notes: string[];
};

export function calculateCAGR(input: CAGRInput): CAGRResult {
  const initialValue = Math.max(1, clampCurrency(input.initialValue));
  const finalValue = Math.max(0, clampCurrency(input.finalValue));
  const years = Math.max(1, input.years);
  const cagr = finalValue === 0 ? -1 : (finalValue / initialValue) ** (1 / years) - 1;
  const targetFinalValue =
    input.targetRate === undefined
      ? 0
      : initialValue * (1 + Math.max(0, input.targetRate) / 100) ** years;

  return {
    cagr: Number((cagr * 100).toFixed(2)),
    targetFinalValue: roundCurrency(targetFinalValue),
    assumptions: [
      "CAGR smooths growth into a constant annualized rate over the chosen time period.",
    ],
    notes: [
      "CAGR is a summary measure and does not show volatility or intermediate drawdowns.",
    ],
  };
}

export type SWPInput = {
  corpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  annualInflation: number;
};

export type SWPResult = {
  monthsLasted: number;
  yearsLasted: number;
  totalWithdrawn: number;
  finalCorpus: number;
  timeline: Array<{ month: number; corpus: number }>;
  assumptions: string[];
  notes: string[];
};

export function calculateSWP(input: SWPInput): SWPResult {
  const corpus = clampCurrency(input.corpus);
  const monthlyReturn = Math.max(0, input.annualReturn) / 12 / 100;
  const monthlyInflation = Math.max(0, input.annualInflation) / 12 / 100;
  const monthlyWithdrawal = clampCurrency(input.monthlyWithdrawal);
  const timeline: Array<{ month: number; corpus: number }> = [];
  let currentCorpus = corpus;
  let withdrawal = monthlyWithdrawal;
  let month = 0;

  while (currentCorpus > 0 && month < 600) {
    currentCorpus *= 1 + monthlyReturn;
    currentCorpus -= withdrawal;
    month += 1;

    if (month % 12 === 0 || month === 1) {
      timeline.push({
        month,
        corpus: roundCurrency(Math.max(0, currentCorpus)),
      });
    }

    withdrawal *= 1 + monthlyInflation;
  }

  return {
    monthsLasted: month,
    yearsLasted: Number((month / 12).toFixed(1)),
    totalWithdrawn: roundCurrency(corpus - Math.max(0, currentCorpus) + Math.max(0, month === 600 ? currentCorpus : 0)),
    finalCorpus: roundCurrency(Math.max(0, currentCorpus)),
    timeline,
    assumptions: [
      "This model assumes a constant monthly return and a constant monthly withdrawal pattern.",
      "If inflation is enabled, withdrawals are stepped up every month using the chosen annual inflation assumption.",
    ],
    notes: [
      "Actual portfolio performance and sequence of returns can materially change how long the corpus lasts.",
    ],
  };
}

export type SimpleInterestInput = {
  principal: number;
  rate: number;
  years: number;
};

export type SimpleInterestResult = {
  simpleInterest: number;
  totalAmount: number;
  compoundAmount: number;
  extraWithCompounding: number;
  assumptions: string[];
  notes: string[];
};

export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const principal = clampCurrency(input.principal);
  const rate = Math.max(0, input.rate);
  const years = Math.max(0, input.years);
  const simpleInterest = principal * rate * years / 100;
  const compoundAmount = principal * (1 + rate / 100) ** years;

  return {
    simpleInterest: roundCurrency(simpleInterest),
    totalAmount: roundCurrency(principal + simpleInterest),
    compoundAmount: roundCurrency(compoundAmount),
    extraWithCompounding: Math.max(0, roundCurrency(compoundAmount - principal - simpleInterest)),
    assumptions: [
      "Simple interest assumes the principal stays constant for the full period.",
      "Compound comparison uses annual compounding with the same rate and tenure.",
    ],
    notes: [
      "Banks and lenders may compound more frequently than once a year.",
    ],
  };
}

export type FlatVsReducingInput = {
  principal: number;
  rate: number;
  years: number;
  mode: "flat-to-reducing" | "reducing-to-flat";
};

export type FlatVsReducingResult = {
  flatEmi: number;
  reducingEmi: number;
  flatTotalInterest: number;
  reducingTotalInterest: number;
  equivalentRate: number;
  assumptions: string[];
  notes: string[];
};

export function calculateFlatVsReducing(
  input: FlatVsReducingInput,
): FlatVsReducingResult {
  const principal = clampCurrency(input.principal);
  const years = Math.max(1, input.years);
  const months = Math.max(1, Math.round(years * 12));
  const flatRate = input.mode === "flat-to-reducing" ? Math.max(0, input.rate) : Math.max(0, input.rate / 1.8);
  const reducingRate =
    input.mode === "flat-to-reducing"
      ? Math.max(0, input.rate * 1.8)
      : Math.max(0, input.rate);
  const flatTotalInterest = principal * flatRate * years / 100;
  const flatEmi = (principal + flatTotalInterest) / months;
  const reducingResult = calculateEMI({
    principal,
    annualRate: reducingRate,
    tenureValue: years,
    tenureUnit: "years",
  });

  return {
    flatEmi: roundCurrency(flatEmi),
    reducingEmi: reducingResult.monthlyEmi,
    flatTotalInterest: roundCurrency(flatTotalInterest),
    reducingTotalInterest: reducingResult.totalInterest,
    equivalentRate: Number((input.mode === "flat-to-reducing" ? reducingRate : flatRate).toFixed(2)),
    assumptions: [
      "The equivalent-rate conversion uses a common approximation for quick comparison, not a lender-specific APR model.",
      "Reducing-balance EMI is calculated with equal monthly instalments.",
    ],
    notes: [
      "Always check the lender's actual reducing-balance APR, fees, and insurance before deciding.",
    ],
  };
}

function clampCurrency(value: number) {
  return Math.max(0, Number.isFinite(value) ? value : 0);
}

function roundCurrency(value: number) {
  return Math.round(value);
}

import { describe, expect, it } from "vitest";
import {
  calculateCAGR,
  calculateEMI,
  calculateEPF,
  calculateFD,
  calculateGST,
  calculateGratuity,
  calculateNPS,
  calculatePPF,
  calculateSIP,
} from "@/lib/calculations/finance";

describe("calculateGST", () => {
  it("adds GST on a base amount", () => {
    const result = calculateGST({
      amount: 1000,
      rate: 18,
      mode: "add",
      supplyType: "intra-state",
    });

    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(180);
    expect(result.totalAmount).toBe(1180);
    expect(result.cgst).toBe(90);
    expect(result.sgst).toBe(90);
  });

  it("removes GST from an inclusive amount", () => {
    const result = calculateGST({
      amount: 1180,
      rate: 18,
      mode: "remove",
      supplyType: "inter-state",
    });

    expect(result.baseAmount).toBe(1000);
    expect(result.igst).toBe(180);
  });

  it("keeps CGST and SGST consistent with the rounded GST amount", () => {
    const result = calculateGST({
      amount: 105,
      rate: 5,
      mode: "remove",
      supplyType: "intra-state",
    });

    expect(result.gstAmount).toBe(5);
    expect(result.cgst + result.sgst).toBe(result.gstAmount);
  });
});

describe("calculateEMI", () => {
  it("calculates EMI and keeps totals internally consistent", () => {
    const result = calculateEMI({
      principal: 1_000_000,
      annualRate: 10,
      tenureValue: 10,
      tenureUnit: "years",
    });

    expect(result.tenureMonths).toBe(120);
    expect(result.monthlyEmi).toBeGreaterThan(13_000);
    expect(result.totalPayment).toBe(result.schedule.reduce((sum, row) => sum + row.emi, 0));
    expect(result.totalInterest).toBeGreaterThanOrEqual(0);
  });

  it("handles zero-rate loans", () => {
    const result = calculateEMI({
      principal: 120_000,
      annualRate: 0,
      tenureValue: 12,
      tenureUnit: "months",
    });

    expect(result.monthlyEmi).toBe(10_000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(120_000);
  });
});

describe("calculateSIP", () => {
  it("separates invested amount from wealth gained", () => {
    const result = calculateSIP({
      monthlyInvestment: 10_000,
      annualReturnRate: 12,
      years: 10,
    });

    expect(result.totalInvested).toBe(1_200_000);
    expect(result.futureValue).toBeGreaterThan(result.totalInvested);
    expect(result.wealthGained).toBe(result.futureValue - result.totalInvested);
  });

  it("falls back to simple accumulation for zero-return SIPs", () => {
    const result = calculateSIP({
      monthlyInvestment: 5_000,
      annualReturnRate: 0,
      years: 2,
    });

    expect(result.futureValue).toBe(120_000);
    expect(result.wealthGained).toBe(0);
  });
});

describe("calculatePPF", () => {
  it("separates contributions from interest and returns extension scenarios", () => {
    const result = calculatePPF({
      contributionAmount: 12_000,
      contributionFrequency: "monthly",
      annualRate: 7.1,
      years: 15,
    });

    expect(result.totalInvested).toBe(2_160_000);
    expect(result.maturityValue).toBeGreaterThan(result.totalInvested);
    expect(result.scenarios).toHaveLength(3);
    expect(result.scenarios[2].maturityValue).toBeGreaterThan(result.scenarios[0].maturityValue);
  });
});

describe("calculateFD", () => {
  it("calculates maturity and post-tax values", () => {
    const result = calculateFD({
      principal: 500_000,
      annualRate: 7.5,
      years: 5,
      compoundingFrequency: 4,
      taxRate: 30,
    });

    expect(result.maturityValue).toBeGreaterThan(500_000);
    expect(result.postTaxValue).toBeLessThan(result.maturityValue);
    expect(result.postTaxInterest).toBeLessThan(result.interestEarned);
  });
});

describe("calculateEPF", () => {
  it("builds EPF corpus from employee and employer contributions", () => {
    const result = calculateEPF({
      monthlyBasic: 20_000,
      employeeRate: 12,
      employerRate: 12,
      years: 5,
      annualReturn: 8.25,
    });

    expect(result.corpus).toBeGreaterThan(0);
    expect(result.employeeContribution).toBe(144_000);
    expect(result.employerContribution).toBe(144_000);
    expect(result.yearlySnapshots).toHaveLength(5);
  });
});

describe("calculateNPS", () => {
  it("keeps annuity allocation at a normal-exit floor of 40%", () => {
    const result = calculateNPS({
      monthlyContribution: 5_000,
      annualReturn: 10,
      years: 20,
      annuityAllocation: 10,
    });

    expect(result.annuityCorpus).toBe(Math.round(result.corpus * 0.4));
    expect(result.lumpSum).toBe(result.corpus - result.annuityCorpus);
  });
});

describe("calculateCAGR", () => {
  it("supports negative CAGR when the final value is lower than the initial value", () => {
    const result = calculateCAGR({
      initialValue: 100_000,
      finalValue: 50_000,
      years: 3,
    });

    expect(result.cagr).toBeLessThan(0);
  });
});

describe("calculateGratuity", () => {
  it("checks eligibility and applies the act-covered rounding rule", () => {
    const result = calculateGratuity({
      lastDrawnSalary: 60_000,
      yearsOfService: 4,
      extraMonths: 7,
      formula: "act-covered",
    });

    expect(result.eligible).toBe(false);
    expect(result.monthsUntilEligible).toBe(5);
    expect(result.serviceYearsUsed).toBe(5);
    expect(result.gratuity).toBeGreaterThan(0);
  });
});

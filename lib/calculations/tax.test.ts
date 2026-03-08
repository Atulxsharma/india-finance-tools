import { describe, expect, it } from "vitest";
import {
  calculateIncomeTaxComparison,
  calculateSalary,
  defaultIncomeTaxInput,
  defaultSalaryInput,
} from "@/lib/calculations/tax";

describe("calculateIncomeTaxComparison", () => {
  it("respects old-regime deduction caps and compares both regimes", () => {
    const result = calculateIncomeTaxComparison({
      ...defaultIncomeTaxInput,
      annualIncome: 1_600_000,
      deduction80C: 180_000,
      npsContribution: 60_000,
    });

    expect(result.oldRegime.totalDeductions).toBe(250_000);
    expect(result.newRegime.totalDeductions).toBe(75_000);
    expect(["old", "new"]).toContain(result.recommendedRegime);
  });

  it("applies rebate at new-regime threshold bands", () => {
    const result = calculateIncomeTaxComparison({
      ...defaultIncomeTaxInput,
      annualIncome: 1_275_000,
      deduction80C: 0,
      deduction80D: 0,
      hraExemption: 0,
      npsContribution: 0,
      otherDeductions: 0,
    });

    expect(result.newRegime.totalTax).toBe(0);
  });

  it("applies new-regime marginal relief just above the threshold", () => {
    const result = calculateIncomeTaxComparison({
      ...defaultIncomeTaxInput,
      annualIncome: 1_285_000,
      deduction80C: 0,
      deduction80D: 0,
      hraExemption: 0,
      npsContribution: 0,
      otherDeductions: 0,
    });

    expect(result.newRegime.totalTax).toBe(10_400);
  });

  it("changes old-regime treatment for non-resident and senior-resident cases", () => {
    const residentSenior = calculateIncomeTaxComparison({
      ...defaultIncomeTaxInput,
      annualIncome: 500_000,
      isSalaried: false,
      residentialStatus: "resident",
      ageCategory: "senior",
    });
    const nonResident = calculateIncomeTaxComparison({
      ...defaultIncomeTaxInput,
      annualIncome: 500_000,
      isSalaried: false,
      residentialStatus: "non-resident",
      ageCategory: "under60",
    });

    expect(residentSenior.oldRegime.totalTax).toBe(0);
    expect(nonResident.oldRegime.totalTax).toBe(13_000);
  });
});

describe("calculateSalary", () => {
  it("shows zero HRA exemption when rent is not paid", () => {
    const result = calculateSalary({
      ...defaultSalaryInput,
      regime: "old",
      rentPaid: 0,
    });

    expect(result.selected.hraExemption).toBe(0);
  });

  it("compares regimes and returns monthly take-home", () => {
    const result = calculateSalary(defaultSalaryInput);

    expect(result.selected.monthlyTakeHome).toBeGreaterThan(0);
    expect(result.comparison.new.monthlyTakeHome).toBeGreaterThan(0);
    expect(result.comparison.old.totalTax).toBeGreaterThanOrEqual(0);
  });
});

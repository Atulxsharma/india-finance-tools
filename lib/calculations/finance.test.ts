import { describe, expect, it } from "vitest";
import { calculateEMI, calculateGST, calculateSIP } from "@/lib/calculations/finance";

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

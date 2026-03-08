import { describe, expect, it } from "vitest";
import {
  calculateElectricityBill,
  calculateSellerFees,
  calculateStampDuty,
} from "@/lib/calculations/static-tools";

describe("calculateSellerFees", () => {
  it("returns a static marketplace fee breakdown", () => {
    const result = calculateSellerFees({
      marketplace: "amazon",
      category: "fashion",
      fulfilmentMode: "fba",
      shippingBand: "regional",
      sellingPrice: 999,
    });

    expect(result.totalFees).toBeGreaterThan(0);
    expect(result.netProceeds).toBeLessThan(999);
    expect(result.assumptions[0]).toContain("static rate table");
  });
});

describe("calculateStampDuty", () => {
  it("calculates state-level stamp duty and registration fee", () => {
    const result = calculateStampDuty({
      state: "delhi",
      buyerProfile: "female",
      propertyValue: 10_000_000,
    });

    expect(result.stampDuty).toBe(400_000);
    expect(result.registrationFee).toBe(100_000);
    expect(result.totalUpfrontCost).toBe(500_000);
  });
});

describe("calculateElectricityBill", () => {
  it("builds a slab-wise bill breakdown", () => {
    const result = calculateElectricityBill({
      state: "delhi",
      consumerType: "domestic",
      units: 350,
    });

    expect(result.total).toBeGreaterThan(0);
    expect(result.breakdown.length).toBeGreaterThan(1);
    expect(result.assumptions[0]).toContain("simplified");
  });
});

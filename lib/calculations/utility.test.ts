import { describe, expect, it } from "vitest";
import {
  calculateAge,
  calculatePercentageMode,
  convertLandArea,
  convertNumberToIndianWords,
} from "@/lib/calculations/utility";

describe("calculateAge", () => {
  it("calculates age without timezone drift for ISO date strings", () => {
    const result = calculateAge("2000-03-08", "2026-03-08");

    expect(result).not.toBeNull();
    expect(result?.years).toBe(26);
    expect(result?.months).toBe(0);
    expect(result?.days).toBe(0);
  });

  it("returns null when the target date is earlier than date of birth", () => {
    expect(calculateAge("2026-03-09", "2026-03-08")).toBeNull();
  });
});

describe("convertNumberToIndianWords", () => {
  it("handles paise rounding without producing 100 paise", () => {
    const result = convertNumberToIndianWords(1.999);

    expect(result.rupeePhrase).toBe("two rupees only");
  });
});

describe("convertLandArea", () => {
  it("converts acres to square feet", () => {
    const result = convertLandArea(1, "acre", "sq-ft");

    expect(result.convertedValue).toBe(43_560);
  });
});

describe("calculatePercentageMode", () => {
  it("calculates percentage change correctly", () => {
    expect(calculatePercentageMode("percentage-change", 100, 120)).toBe(20);
  });
});

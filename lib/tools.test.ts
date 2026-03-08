import { describe, expect, it } from "vitest";
import { toolDefinitions, toolDefinitionsByCategory } from "@/lib/tools";

describe("toolDefinitions", () => {
  it("includes the expanded tool library", () => {
    expect(toolDefinitions.length).toBe(30);
    expect(toolDefinitions.some((tool) => tool.slug === "hra-calculator")).toBe(true);
    expect(toolDefinitions.some((tool) => tool.slug === "gst-invoice-generator")).toBe(true);
  });

  it("keeps category grouping non-empty", () => {
    expect(toolDefinitionsByCategory.some(([category]) => category === "Generator")).toBe(true);
    expect(toolDefinitionsByCategory.some(([category]) => category === "Commerce")).toBe(true);
  });
});

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

  it("keeps related tool slugs valid", () => {
    const validSlugs = new Set(toolDefinitions.map((tool) => tool.slug));

    for (const tool of toolDefinitions) {
      for (const relatedSlug of tool.relatedToolSlugs) {
        expect(validSlugs.has(relatedSlug)).toBe(true);
      }
    }
  });

  it("adds review metadata to static-data tools", () => {
    const staticTools = toolDefinitions.filter((tool) => tool.runtime === "static-data");

    for (const tool of staticTools) {
      expect(tool.reviewedAt).toBeTruthy();
      expect(tool.sourceLabel).toBeTruthy();
    }
  });
});

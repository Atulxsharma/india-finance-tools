import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("prioritizes tool selection over launch messaging", () => {
    render(<Home />);

    expect(
      screen.getByText("Free online calculators, generators, and utility tools for India."),
    ).toBeInTheDocument();
    expect(screen.getByText("Open salary calculator")).toBeInTheDocument();
    expect(screen.getAllByText("PPF Calculator").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Search tools")).toBeInTheDocument();
    expect(screen.queryByText("Phase 1 launch scope")).not.toBeInTheDocument();
  });
});

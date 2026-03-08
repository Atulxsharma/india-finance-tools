import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("prioritizes tool selection over launch messaging", () => {
    render(<Home />);

    expect(
      screen.getByText("Free online tax and finance calculators for India."),
    ).toBeInTheDocument();
    expect(screen.getByText("Calculate salary")).toBeInTheDocument();
    expect(screen.queryByText("Phase 1 launch scope")).not.toBeInTheDocument();
  });
});

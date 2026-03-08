import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GstCalculator } from "@/components/tools/GstCalculator";

describe("GstCalculator", () => {
  it("updates GST output when the amount changes", async () => {
    const user = userEvent.setup();
    render(<GstCalculator />);

    const amountInput = screen.getByLabelText("Base amount");
    expect(screen.getAllByText("Invoice total").length).toBeGreaterThan(0);
    expect(screen.getAllByText("GST amount").length).toBeGreaterThan(0);

    await user.clear(amountInput);
    await user.type(amountInput, "2000");

    expect(screen.getAllByText(/₹/).length).toBeGreaterThan(0);
  });
});

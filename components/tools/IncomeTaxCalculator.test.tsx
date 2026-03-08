import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";

describe("IncomeTaxCalculator", () => {
  it("keeps deductions collapsed until needed and still shows a recommendation", async () => {
    const user = userEvent.setup();
    const { container } = render(<IncomeTaxCalculator />);

    const incomeInput = screen.getByLabelText("Annual income");
    expect(screen.getByText("Recommended regime")).toBeInTheDocument();
    expect(container.querySelector("details")?.open).toBe(false);

    await user.clear(incomeInput);
    await user.type(incomeInput, "1800000");

    expect(screen.getByText(/Estimated saving/)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";

describe("SalaryCalculator", () => {
  it("renders the first field, keeps advanced inputs collapsed, and updates the result", async () => {
    const user = userEvent.setup();
    const { container } = render(<SalaryCalculator />);

    const ctcInput = screen.getByLabelText("Annual CTC");
    expect(screen.getByText("Monthly take-home")).toBeInTheDocument();
    expect(container.querySelector("details")?.open).toBe(false);

    await user.clear(ctcInput);
    await user.type(ctcInput, "1200000");

    expect(screen.getByText(/Annual take-home/)).toBeInTheDocument();
  });
});

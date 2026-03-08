"use client";

import { useState } from "react";
import {
  AgeCategory,
  calculateSalary,
  defaultSalaryInput,
  ResidentialStatus,
  SalaryInput,
  TaxYear,
} from "@/lib/calculations/tax";
import { formatRupees } from "@/lib/format";
import {
  AssumptionPanel,
  BreakdownTable,
  CompareCard,
  DistributionBar,
  NumberField,
  PrimaryResultCard,
  QuickPicks,
  SegmentControl,
  SelectField,
  StatCard,
} from "@/components/tools/shared";

export function SalaryCalculator() {
  const [input, setInput] = useState<SalaryInput>(defaultSalaryInput);
  const result = calculateSalary(input);
  const regimeDelta = Math.abs(
    result.comparison.old.netTakeHome - result.comparison.new.netTakeHome,
  );
  const update = <K extends keyof SalaryInput>(key: K, value: SalaryInput[K]) =>
    setInput((current) => ({ ...current, [key]: value }));

  return (
    <div className="tool-panel card">
      <div className="field-row">
        <SegmentControl
          options={[
            { value: "FY2024_25", label: "FY 2024-25" },
            { value: "FY2025_26", label: "FY 2025-26" },
          ]}
          value={input.taxYear}
          onChange={(value) => update("taxYear", value as TaxYear)}
        />
        <SegmentControl
          options={[
            { value: "new", label: "New regime" },
            { value: "old", label: "Old regime" },
          ]}
          value={input.regime}
          onChange={(value) => update("regime", value as SalaryInput["regime"])}
        />
      </div>

      <div className="field-grid">
        <NumberField
          id="salary-ctc"
          label="Annual CTC"
          value={input.ctc}
          step={10000}
          onChange={(value) => update("ctc", value)}
          hint="Start here. Example: 12,00,000 for 12 lakh."
        />
      </div>

      <QuickPicks
        label="Common salary amounts"
        options={[
          { label: "₹5L", value: 500000 },
          { label: "₹10L", value: 1000000 },
          { label: "₹15L", value: 1500000 },
          { label: "₹25L", value: 2500000 },
        ]}
        onSelect={(value) => update("ctc", Number(value))}
      />

      <details>
        <summary>Tax profile</summary>
        <div className="field-grid">
          <SelectField
            id="salary-residential-status"
            label="Residential status"
            value={input.residentialStatus}
            onChange={(value) => update("residentialStatus", value as ResidentialStatus)}
            options={[
              { value: "resident", label: "Resident" },
              { value: "non-resident", label: "Non-resident" },
            ]}
          />
          <SelectField
            id="salary-age-category"
            label="Age"
            value={input.ageCategory}
            onChange={(value) => update("ageCategory", value as AgeCategory)}
            options={[
              { value: "under60", label: "Below 60" },
              { value: "senior", label: "60 to 79" },
              { value: "super-senior", label: "80 and above" },
            ]}
          />
          <NumberField
            id="salary-pt"
            label="Professional tax"
            value={input.professionalTax}
            step={100}
            onChange={(value) => update("professionalTax", value)}
            hint="Keep 0 if not applicable in your state."
          />
        </div>
      </details>

      <details>
        <summary>Add rent and HRA details (old regime only)</summary>
        <div className="field-grid">
          <NumberField
            id="salary-hra"
            label="Annual HRA received"
            value={input.hraReceived}
            step={1000}
            onChange={(value) => update("hraReceived", value)}
          />
          <NumberField
            id="salary-rent"
            label="Annual rent paid"
            value={input.rentPaid}
            step={1000}
            onChange={(value) => update("rentPaid", value)}
          />
          <SelectField
            id="salary-city"
            label="City tier"
            value={input.cityTier}
            onChange={(value) => update("cityTier", value)}
            options={[
              { value: "metro", label: "Metro" },
              { value: "non-metro", label: "Non-metro" },
            ]}
          />
        </div>
      </details>

      <details>
        <summary>Add tax-saving deductions</summary>
        <div className="field-grid">
          <NumberField
            id="salary-80c"
            label="80C investments"
            value={input.investments80c}
            step={1000}
            onChange={(value) => update("investments80c", value)}
          />
          <NumberField
            id="salary-nps"
            label="NPS contribution"
            value={input.npsContribution}
            step={1000}
            onChange={(value) => update("npsContribution", value)}
          />
        </div>
      </details>

      <PrimaryResultCard
        label="Monthly take-home"
        value={formatRupees(result.selected.monthlyTakeHome)}
        caption={`Using the ${input.regime === "new" ? "new" : "old"} regime for ${input.taxYear.replace("_", "-").replace("FY", "FY ")}`}
        highlights={[
          {
            label: "Annual take-home",
            value: formatRupees(result.selected.netTakeHome),
          },
          {
            label: "Better regime delta",
            value: formatRupees(regimeDelta),
          },
        ]}
      />

      <p className="inline-notice">
        Quick estimate only. This starts with {input.residentialStatus === "resident" ? "resident" : "non-resident"} {input.ageCategory === "under60" ? "below-60" : input.ageCategory === "senior" ? "60-79" : "80+"} tax treatment and ₹{input.professionalTax} professional tax.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Total annual tax"
          value={formatRupees(result.selected.totalTax)}
          caption={`Taxable income ${formatRupees(result.selected.taxableIncome)}`}
        />
        <StatCard
          label="Employee PF"
          value={formatRupees(result.selected.employeePf)}
          caption={`Gross salary ${formatRupees(result.selected.grossSalary)}`}
        />
      </div>

      <div className="detail-grid">
        <BreakdownTable
          title="Annual salary breakdown"
          rows={[
            { label: "Gross salary", value: result.selected.grossSalary },
            { label: "Basic salary", value: result.selected.basicSalary },
            { label: "HRA considered", value: result.selected.hra },
            { label: "Special allowance", value: result.selected.specialAllowance },
            { label: "Employee PF", value: result.selected.employeePf },
            { label: "Professional tax", value: result.selected.professionalTax },
            { label: "Income tax + cess", value: result.selected.totalTax },
            { label: "Net take-home", value: result.selected.netTakeHome, highlight: true },
          ]}
        />
        <DistributionBar
          title="Where the CTC goes"
          segments={[
            { label: "Take-home", value: result.selected.netTakeHome, color: "#0f5cc0" },
            { label: "Tax", value: result.selected.totalTax, color: "#cf3f33" },
            { label: "Employee PF", value: result.selected.employeePf, color: "#0d9f6e" },
            { label: "Employer PF", value: result.selected.employerPf, color: "#9ca3af" },
          ]}
        />
      </div>

      <section className="detail-card card">
        <h3>Compare both regimes</h3>
        <div className="compare-grid">
          <CompareCard
            label="New regime"
            primaryValue={result.comparison.new.netTakeHome}
            secondaryLabel="Annual tax"
            secondaryValue={formatRupees(result.comparison.new.totalTax)}
            recommended={result.recommendedRegime === "new"}
          />
          <CompareCard
            label="Old regime"
            primaryValue={result.comparison.old.netTakeHome}
            secondaryLabel="Annual tax"
            secondaryValue={formatRupees(result.comparison.old.totalTax)}
            recommended={result.recommendedRegime === "old"}
          />
        </div>
      </section>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

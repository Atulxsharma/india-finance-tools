"use client";

import { useMemo, useState } from "react";
import {
  AgeCategory,
  calculateIncomeTaxComparison,
  defaultIncomeTaxInput,
  IncomeTaxInput,
  ResidentialStatus,
  TaxYear,
} from "@/lib/calculations/tax";
import { formatRupees } from "@/lib/format";
import {
  AssumptionPanel,
  BreakdownTable,
  CompareCard,
  NumberField,
  PrimaryResultCard,
  QuickPicks,
  SegmentControl,
  SelectField,
  StatCard,
} from "@/components/tools/shared";

export function IncomeTaxCalculator() {
  const [input, setInput] = useState<IncomeTaxInput>(defaultIncomeTaxInput);
  const result = useMemo(() => calculateIncomeTaxComparison(input), [input]);
  const update = <K extends keyof IncomeTaxInput>(key: K, value: IncomeTaxInput[K]) =>
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
            { value: "yes", label: "Salaried" },
            { value: "no", label: "Non-salaried" },
          ]}
          value={input.isSalaried ? "yes" : "no"}
          onChange={(value) => update("isSalaried", value === "yes")}
        />
      </div>

      <div className="field-grid">
        <NumberField
          id="tax-income"
          label="Annual income"
          value={input.annualIncome}
          step={10000}
          onChange={(value) => update("annualIncome", value)}
          hint="Start here. Add deductions only if you want to test old-regime benefit."
        />
      </div>

      <QuickPicks
        label="Common income amounts"
        options={[
          { label: "₹8L", value: 800000 },
          { label: "₹12L", value: 1200000 },
          { label: "₹20L", value: 2000000 },
          { label: "₹30L", value: 3000000 },
        ]}
        onSelect={(value) => update("annualIncome", Number(value))}
      />

      <details>
        <summary>Tax profile and old-regime deductions</summary>
        <div className="field-grid">
          <SelectField
            id="tax-residential-status"
            label="Residential status"
            value={input.residentialStatus}
            onChange={(value) => update("residentialStatus", value as ResidentialStatus)}
            options={[
              { value: "resident", label: "Resident" },
              { value: "non-resident", label: "Non-resident" },
            ]}
          />
          <SelectField
            id="tax-age-category"
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
            id="tax-80c"
            label="80C deductions"
            value={input.deduction80C}
            step={1000}
            onChange={(value) => update("deduction80C", value)}
          />
          <NumberField
            id="tax-80d"
            label="80D deductions"
            value={input.deduction80D}
            step={1000}
            onChange={(value) => update("deduction80D", value)}
          />
          <NumberField
            id="tax-hra"
            label="HRA exemption"
            value={input.hraExemption}
            step={1000}
            onChange={(value) => update("hraExemption", value)}
          />
          <NumberField
            id="tax-nps"
            label="NPS (80CCD(1B))"
            value={input.npsContribution}
            step={1000}
            onChange={(value) => update("npsContribution", value)}
          />
          <NumberField
            id="tax-other"
            label="Other deductions"
            value={input.otherDeductions}
            step={1000}
            onChange={(value) => update("otherDeductions", value)}
          />
        </div>
      </details>

      <PrimaryResultCard
        label="Recommended regime"
        value={result.recommendedRegime === "new" ? "New regime" : "Old regime"}
        caption={`Estimated saving ${formatRupees(result.taxSaving)} for ${input.taxYear.replace("_", "-").replace("FY", "FY ")}`}
        highlights={[
          { label: "Old regime tax", value: formatRupees(result.oldRegime.totalTax) },
          { label: "New regime tax", value: formatRupees(result.newRegime.totalTax) },
        ]}
      />

      <p className="inline-notice">
        Start with income only. This assumes {input.residentialStatus === "resident" ? "resident" : "non-resident"} {input.ageCategory === "under60" ? "below-60" : input.ageCategory === "senior" ? "60-79" : "80+"} tax treatment unless you change the profile.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Tax under old regime"
          value={formatRupees(result.oldRegime.totalTax)}
          caption={`Net income ${formatRupees(result.oldRegime.netIncome)}`}
        />
        <StatCard
          label="Tax under new regime"
          value={formatRupees(result.newRegime.totalTax)}
          caption={`Net income ${formatRupees(result.newRegime.netIncome)}`}
        />
      </div>

      <section className="detail-card card">
        <h3>Side-by-side comparison</h3>
        <div className="compare-grid">
          <CompareCard
            label="Old regime"
            primaryValue={result.oldRegime.totalTax}
            secondaryLabel="Taxable income"
            secondaryValue={formatRupees(result.oldRegime.taxableIncome)}
            recommended={result.recommendedRegime === "old"}
          />
          <CompareCard
            label="New regime"
            primaryValue={result.newRegime.totalTax}
            secondaryLabel="Taxable income"
            secondaryValue={formatRupees(result.newRegime.taxableIncome)}
            recommended={result.recommendedRegime === "new"}
          />
        </div>
      </section>

      <div className="detail-grid">
        <BreakdownTable
          title="Old regime details"
          rows={[
            { label: "Gross income", value: result.oldRegime.grossIncome },
            { label: "Total deductions", value: result.oldRegime.totalDeductions },
            { label: "Taxable income", value: result.oldRegime.taxableIncome },
            { label: "Rebate", value: result.oldRegime.rebate * -1 },
            { label: "Tax + cess", value: result.oldRegime.totalTax, highlight: true },
          ]}
        />
        <BreakdownTable
          title="New regime details"
          rows={[
            { label: "Gross income", value: result.newRegime.grossIncome },
            { label: "Total deductions", value: result.newRegime.totalDeductions },
            { label: "Taxable income", value: result.newRegime.taxableIncome },
            { label: "Rebate", value: result.newRegime.rebate * -1 },
            { label: "Tax + cess", value: result.newRegime.totalTax, highlight: true },
          ]}
        />
      </div>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

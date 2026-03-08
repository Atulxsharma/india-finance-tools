"use client";

import { useMemo, useState } from "react";
import { calculateFD, FDInput } from "@/lib/calculations/finance";
import { formatRupees } from "@/lib/format";
import {
  AssumptionPanel,
  BreakdownTable,
  CollapsibleSection,
  DistributionBar,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  QuickPicks,
  SegmentControl,
  StatCard,
} from "@/components/tools/shared";

const compoundingOptions = [
  { value: 1, label: "Yearly" },
  { value: 2, label: "Half-yearly" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
] as const;

export function FdCalculator() {
  const [input, setInput] = useState<FDInput>({
    principal: 500000,
    annualRate: 7.5,
    years: 5,
    compoundingFrequency: 4,
    taxRate: 30,
  });
  const result = useMemo(() => calculateFD(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick FD estimate"
        text="Enter your deposit amount, rate, and period to see the maturity value first. Open the tax view only if you want a net-return estimate."
      />

      <div className="field-grid">
        <NumberField
          id="fd-principal"
          label="Deposit amount"
          value={input.principal}
          step={10000}
          onChange={(value) => setInput((current) => ({ ...current, principal: value }))}
          hint="The one-time fixed deposit amount."
        />
        <NumberField
          id="fd-rate"
          label="Annual interest rate"
          value={input.annualRate}
          step={0.1}
          onChange={(value) => setInput((current) => ({ ...current, annualRate: value }))}
        />
        <NumberField
          id="fd-years"
          label="FD period (years)"
          value={input.years}
          step={0.5}
          onChange={(value) => setInput((current) => ({ ...current, years: value }))}
        />
      </div>

      <QuickPicks
        label="Common FD amounts"
        options={[
          { label: "₹1L", value: 100000 },
          { label: "₹5L", value: 500000 },
          { label: "₹10L", value: 1000000 },
        ]}
        onSelect={(value) => setInput((current) => ({ ...current, principal: Number(value) }))}
      />

      <div className="field-row">
        <SegmentControl
          options={compoundingOptions.map((option) => ({
            value: String(option.value),
            label: option.label,
          }))}
          value={String(input.compoundingFrequency)}
          onChange={(value) =>
            setInput((current) => ({
              ...current,
              compoundingFrequency: Number(value) as FDInput["compoundingFrequency"],
            }))
          }
        />
      </div>

      <PrimaryResultCard
        label="Estimated maturity value"
        value={formatRupees(result.maturityValue)}
        caption={`${input.years} years at ${input.annualRate}% with ${compoundingOptions.find((option) => option.value === input.compoundingFrequency)?.label.toLowerCase()} compounding`}
        highlights={[
          { label: "Interest earned", value: formatRupees(result.interestEarned) },
          { label: "Post-tax value", value: formatRupees(result.postTaxValue) },
        ]}
      />

      <p className="inline-notice">
        The post-tax view is a simplified estimate. Actual TDS and slab treatment can vary.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Interest earned"
          value={formatRupees(result.interestEarned)}
          caption="Pre-tax return"
        />
        <StatCard
          label="Post-tax interest"
          value={formatRupees(result.postTaxInterest)}
          caption={`Assuming a ${input.taxRate}% tax rate`}
        />
      </div>

      <CollapsibleSection
        title="Adjust tax estimate"
        subtitle="Change the tax slab used in the post-tax view"
      >
        <div className="field-grid">
          <NumberField
            id="fd-tax-rate"
            label="Estimated tax rate"
            value={input.taxRate}
            step={5}
            min={0}
            max={100}
            onChange={(value) => setInput((current) => ({ ...current, taxRate: value }))}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="See FD breakdown"
        subtitle="Pre-tax and post-tax view"
      >
        <div className="detail-grid">
          <BreakdownTable
            title="FD summary"
            rows={[
              { label: "Deposit amount", value: input.principal },
              { label: "Interest earned", value: result.interestEarned },
              { label: "Maturity value", value: result.maturityValue, highlight: true },
              { label: "Post-tax interest", value: result.postTaxInterest },
              { label: "Post-tax value", value: result.postTaxValue },
            ]}
          />
          <DistributionBar
            title="Deposit vs interest"
            segments={[
              { label: "Deposit", value: input.principal, color: "#0f5cc0" },
              { label: "Interest", value: result.interestEarned, color: "#0d9f6e" },
            ]}
          />
        </div>
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

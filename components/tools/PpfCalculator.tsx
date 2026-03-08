"use client";

import { useMemo, useState } from "react";
import { calculatePPF, PPFInput } from "@/lib/calculations/finance";
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

export function PpfCalculator() {
  const [input, setInput] = useState<PPFInput>({
    contributionAmount: 12_500,
    contributionFrequency: "monthly",
    annualRate: 7.1,
    years: 15,
  });
  const result = useMemo(() => calculatePPF(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick PPF estimate"
        text="Start with the amount you want to contribute. Check the maturity value first, then compare the longer extension scenarios."
      />

      <div className="field-row">
        <SegmentControl
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
          value={input.contributionFrequency}
          onChange={(value) =>
            setInput((current) => ({
              ...current,
              contributionFrequency: value as PPFInput["contributionFrequency"],
            }))
          }
        />
      </div>

      <div className="field-grid">
        <NumberField
          id="ppf-contribution"
          label={input.contributionFrequency === "monthly" ? "Monthly contribution" : "Yearly contribution"}
          value={input.contributionAmount}
          step={500}
          onChange={(value) =>
            setInput((current) => ({ ...current, contributionAmount: value }))
          }
          hint="Use the amount you expect to contribute regularly."
        />
        <NumberField
          id="ppf-rate"
          label="Annual PPF rate"
          value={input.annualRate}
          step={0.1}
          onChange={(value) => setInput((current) => ({ ...current, annualRate: value }))}
        />
        <NumberField
          id="ppf-years"
          label="Investment period (years)"
          value={input.years}
          step={1}
          onChange={(value) => setInput((current) => ({ ...current, years: value }))}
        />
      </div>

      <QuickPicks
        label="Common PPF contributions"
        options={
          input.contributionFrequency === "monthly"
            ? [
                { label: "₹5k", value: 5000 },
                { label: "₹10k", value: 10000 },
                { label: "₹12.5k", value: 12500 },
              ]
            : [
                { label: "₹60k", value: 60000 },
                { label: "₹1L", value: 100000 },
                { label: "₹1.5L", value: 150000 },
              ]
        }
        onSelect={(value) =>
          setInput((current) => ({ ...current, contributionAmount: Number(value) }))
        }
      />

      <PrimaryResultCard
        label="Estimated maturity value"
        value={formatRupees(result.maturityValue)}
        caption={`${input.years} years at an assumed ${input.annualRate}% annual rate`}
        highlights={[
          { label: "Total invested", value: formatRupees(result.totalInvested) },
          { label: "Interest earned", value: formatRupees(result.interestEarned) },
        ]}
      />

      <p className="inline-notice">
        This is a planning estimate. Actual PPF rates are revised periodically by the government.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="15-year value"
          value={formatRupees(result.scenarios[0]?.maturityValue ?? 0)}
          caption="Standard PPF account term"
        />
        <StatCard
          label="Monthly equivalent"
          value={formatRupees(result.monthlyEquivalent)}
          caption="Useful when comparing PPF with monthly savings habits"
        />
      </div>

      <CollapsibleSection
        title="Compare extension scenarios"
        subtitle="See 15-year, 20-year, and 25-year outcomes"
      >
        <BreakdownTable
          title="PPF comparison"
          rows={result.scenarios.map((scenario) => ({
            label: `${scenario.years}-year value`,
            value: scenario.maturityValue,
            highlight: scenario.years === input.years,
          }))}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="See contribution split"
        subtitle="Contribution versus interest growth"
      >
        <div className="detail-grid">
          <BreakdownTable
            title="PPF summary"
            rows={[
              { label: "Total invested", value: result.totalInvested },
              { label: "Interest earned", value: result.interestEarned },
              { label: "Maturity value", value: result.maturityValue, highlight: true },
            ]}
          />
          <DistributionBar
            title="Contribution vs growth"
            segments={[
              { label: "Invested", value: result.totalInvested, color: "#0f5cc0" },
              { label: "Interest", value: result.interestEarned, color: "#0d9f6e" },
            ]}
          />
        </div>
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

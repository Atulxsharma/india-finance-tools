"use client";

import { useMemo, useState } from "react";
import { calculateEMI, EMIInput } from "@/lib/calculations/finance";
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

export function EmiCalculator() {
  const [input, setInput] = useState<EMIInput>({
    principal: 2500000,
    annualRate: 8.5,
    tenureValue: 20,
    tenureUnit: "years",
  });
  const result = useMemo(() => calculateEMI(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick EMI check"
        text="Enter loan amount, rate, and tenure to get the monthly EMI first. Open the breakdown only if you want total cost details."
      />

      <div className="field-grid">
        <NumberField
          id="emi-principal"
          label="Loan amount"
          value={input.principal}
          step={10000}
          onChange={(value) => setInput((current) => ({ ...current, principal: value }))}
          hint="Total amount you will borrow."
        />
        <NumberField
          id="emi-rate"
          label="Annual interest rate"
          value={input.annualRate}
          step={0.1}
          onChange={(value) => setInput((current) => ({ ...current, annualRate: value }))}
          hint="Enter the nominal annual rate."
        />
        <NumberField
          id="emi-tenure"
          label="Tenure"
          value={input.tenureValue}
          step={1}
          onChange={(value) => setInput((current) => ({ ...current, tenureValue: value }))}
        />
      </div>

      <QuickPicks
        label="Common loan amounts"
        options={[
          { label: "₹5L", value: 500000 },
          { label: "₹25L", value: 2500000 },
          { label: "₹50L", value: 5000000 },
          { label: "₹1Cr", value: 10000000 },
        ]}
        onSelect={(value) => setInput((current) => ({ ...current, principal: Number(value) }))}
      />

      <div className="field-row">
        <SegmentControl
          options={[
            { value: "years", label: "Years" },
            { value: "months", label: "Months" },
          ]}
          value={input.tenureUnit}
          onChange={(value) =>
            setInput((current) => ({ ...current, tenureUnit: value as EMIInput["tenureUnit"] }))
          }
        />
        <QuickPicks
          label="Common tenures"
          options={
            input.tenureUnit === "years"
              ? [
                  { label: "5y", value: 5 },
                  { label: "10y", value: 10 },
                  { label: "20y", value: 20 },
                  { label: "30y", value: 30 },
                ]
              : [
                  { label: "12m", value: 12 },
                  { label: "24m", value: 24 },
                  { label: "60m", value: 60 },
                  { label: "120m", value: 120 },
                ]
          }
          onSelect={(value) => setInput((current) => ({ ...current, tenureValue: Number(value) }))}
        />
      </div>

      <PrimaryResultCard
        label="Monthly EMI"
        value={formatRupees(result.monthlyEmi)}
        caption={`${result.tenureMonths} monthly instalments at ${input.annualRate}% annual interest`}
        highlights={[
          { label: "Total interest", value: formatRupees(result.totalInterest) },
          { label: "Total payout", value: formatRupees(result.totalPayment) },
        ]}
      />

      <p className="inline-notice">
        Use this for affordability first. Processing fees, insurance, and prepayments are not included.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Total interest"
          value={formatRupees(result.totalInterest)}
          caption={`Total payout ${formatRupees(result.totalPayment)}`}
        />
        <StatCard
          label="First month interest"
          value={formatRupees(result.schedule[0]?.interest ?? 0)}
          caption={`Closing balance ${formatRupees(result.schedule[0]?.closingBalance ?? 0)}`}
        />
      </div>

      <CollapsibleSection
        title="See payment breakdown"
        subtitle="Interest, balance, and total payout"
      >
        <div className="detail-grid">
          <BreakdownTable
            title="Amortization snapshot"
            rows={[
              { label: "Month 1 principal", value: result.schedule[0]?.principal ?? 0 },
              { label: "Month 1 interest", value: result.schedule[0]?.interest ?? 0 },
              {
                label: "Mid-loan balance",
                value:
                  result.schedule[Math.floor(result.schedule.length / 2)]?.closingBalance ?? 0,
              },
              {
                label: "Final month interest",
                value: result.schedule[result.schedule.length - 1]?.interest ?? 0,
              },
              { label: "Total payment", value: result.totalPayment, highlight: true },
            ]}
          />
          <DistributionBar
            title="Principal vs interest"
            segments={[
              { label: "Principal", value: input.principal, color: "#0f5cc0" },
              { label: "Interest", value: result.totalInterest, color: "#cf3f33" },
            ]}
          />
        </div>
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

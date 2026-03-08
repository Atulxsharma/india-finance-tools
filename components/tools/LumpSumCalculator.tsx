"use client";

import { useMemo, useState } from "react";
import { calculateLumpSum } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  BreakdownTable,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function LumpSumCalculator() {
  const [input, setInput] = useState({
    amount: 500_000,
    annualReturn: 12,
    years: 10,
  });
  const result = useMemo(() => calculateLumpSum(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="One-time investment projection"
          text="Estimate maturity value and compare the same capital against a SIP-style staggered plan."
        />
        <div className="field-grid">
          <NumberField id="ls-amount" label="Investment amount" value={input.amount} onChange={(value) => setInput((current) => ({ ...current, amount: value }))} />
          <NumberField id="ls-return" label="Annual return" step={0.1} value={input.annualReturn} onChange={(value) => setInput((current) => ({ ...current, annualReturn: value }))} />
          <NumberField id="ls-years" label="Years" value={input.years} onChange={(value) => setInput((current) => ({ ...current, years: value }))} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Wealth gained: ${formatRupees(result.wealthGained)}`}
        highlights={[
          { label: "SIP-style spread value", value: formatRupees(result.sipEquivalentValue) },
          { label: "One-time invested", value: formatRupees(input.amount) },
        ]}
        label="Projected maturity value"
        value={formatRupees(result.maturityValue)}
      />

      <div className="result-grid">
        <StatCard label="SIP comparison" value={formatRupees(result.sipEquivalentValue)} />
        <StatCard label="Years modelled" value={String(input.years)} />
      </div>

      <BreakdownTable
        title="Year-by-year growth"
        rows={result.yearlySnapshots.map((snapshot) => ({
          label: `Year ${snapshot.year}`,
          value: snapshot.value,
          highlight: snapshot.year === result.yearlySnapshots[result.yearlySnapshots.length - 1]?.year,
        }))}
      />

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

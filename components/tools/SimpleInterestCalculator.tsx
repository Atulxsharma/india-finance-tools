"use client";

import { useMemo, useState } from "react";
import { calculateSimpleInterest } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  BreakdownTable,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function SimpleInterestCalculator() {
  const [input, setInput] = useState({
    principal: 100_000,
    rate: 8,
    years: 5,
  });
  const result = useMemo(() => calculateSimpleInterest(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Simple interest vs compounding"
          text="Enter principal, rate, and tenure to compare simple-interest output with an annual compounding view."
        />
        <div className="field-grid">
          <NumberField
            id="si-principal"
            label="Principal"
            value={input.principal}
            onChange={(value) => setInput((current) => ({ ...current, principal: value }))}
          />
          <NumberField
            id="si-rate"
            label="Annual rate"
            step={0.1}
            value={input.rate}
            onChange={(value) => setInput((current) => ({ ...current, rate: value }))}
          />
          <NumberField
            id="si-years"
            label="Years"
            step={0.5}
            value={input.years}
            onChange={(value) => setInput((current) => ({ ...current, years: value }))}
          />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Total amount: ${formatRupees(result.totalAmount)}`}
        highlights={[
          { label: "Compound amount", value: formatRupees(result.compoundAmount) },
          { label: "CI advantage", value: formatRupees(result.extraWithCompounding) },
        ]}
        label="Simple interest"
        value={formatRupees(result.simpleInterest)}
      />

      <div className="result-grid">
        <StatCard label="Simple-interest total" value={formatRupees(result.totalAmount)} />
        <StatCard label="Compound amount" value={formatRupees(result.compoundAmount)} />
      </div>

      <BreakdownTable
        title="Simple vs compound comparison"
        rows={[
          { label: "Principal", value: input.principal },
          { label: "Simple interest", value: result.simpleInterest },
          { label: "Simple-interest total", value: result.totalAmount, highlight: true },
          { label: "Compound amount", value: result.compoundAmount, highlight: true },
        ]}
      />

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

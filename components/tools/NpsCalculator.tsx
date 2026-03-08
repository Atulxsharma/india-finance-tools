"use client";

import { useMemo, useState } from "react";
import { calculateNPS } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  DistributionBar,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function NpsCalculator() {
  const [input, setInput] = useState({
    monthlyContribution: 5000,
    annualReturn: 10,
    years: 25,
    annuityAllocation: 40,
  });
  const result = useMemo(() => calculateNPS(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="NPS corpus and retirement split"
          text="Estimate corpus, lump sum, and annuity allocation from a fixed monthly contribution."
        />
        <div className="field-grid">
          <NumberField id="nps-monthly" label="Monthly contribution" value={input.monthlyContribution} onChange={(value) => setInput((current) => ({ ...current, monthlyContribution: value }))} />
          <NumberField id="nps-return" label="Annual return" step={0.1} value={input.annualReturn} onChange={(value) => setInput((current) => ({ ...current, annualReturn: value }))} />
          <NumberField id="nps-years" label="Years" value={input.years} onChange={(value) => setInput((current) => ({ ...current, years: value }))} />
          <NumberField id="nps-annuity" label="Annuity allocation %" value={input.annuityAllocation} onChange={(value) => setInput((current) => ({ ...current, annuityAllocation: value }))} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Lump sum: ${formatRupees(result.lumpSum)}`}
        highlights={[
          { label: "Annuity corpus", value: formatRupees(result.annuityCorpus) },
          { label: "Total invested", value: formatRupees(result.totalInvested) },
        ]}
        label="Projected NPS corpus"
        value={formatRupees(result.corpus)}
      />

      <DistributionBar
        title="Retirement split"
        segments={[
          { label: "Lump sum", value: result.lumpSum, color: "#0f5cc0" },
          { label: "Annuity corpus", value: result.annuityCorpus, color: "#13795b" },
        ]}
      />

      <div className="result-grid">
        <StatCard label="Wealth gained" value={formatRupees(result.wealthGained)} />
        <StatCard label="Annuity share" value={`${input.annuityAllocation}%`} />
      </div>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

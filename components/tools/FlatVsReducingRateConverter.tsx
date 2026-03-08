"use client";

import { useMemo, useState } from "react";
import { calculateFlatVsReducing, FlatVsReducingInput } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  SegmentControl,
  StatCard,
} from "@/components/tools/shared";
import { formatPercent, formatRupees } from "@/lib/format";

export function FlatVsReducingRateConverter() {
  const [input, setInput] = useState<FlatVsReducingInput>({
    principal: 500_000,
    rate: 8,
    years: 3,
    mode: "flat-to-reducing" as const,
  });
  const result = useMemo(() => calculateFlatVsReducing(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Compare flat and reducing cost"
          text="Switch modes to estimate what a flat rate means in reducing-balance terms, or vice versa."
        />
        <SegmentControl
          options={[
            { value: "flat-to-reducing", label: "Flat to reducing" },
            { value: "reducing-to-flat", label: "Reducing to flat" },
          ]}
          value={input.mode}
          onChange={(value) => setInput((current) => ({ ...current, mode: value }))}
        />
        <div className="field-grid">
          <NumberField
            id="fr-principal"
            label="Loan amount"
            value={input.principal}
            onChange={(value) => setInput((current) => ({ ...current, principal: value }))}
          />
          <NumberField
            id="fr-rate"
            label={input.mode === "flat-to-reducing" ? "Flat annual rate" : "Reducing annual rate"}
            step={0.1}
            value={input.rate}
            onChange={(value) => setInput((current) => ({ ...current, rate: value }))}
          />
          <NumberField
            id="fr-years"
            label="Tenure (years)"
            step={0.5}
            value={input.years}
            onChange={(value) => setInput((current) => ({ ...current, years: value }))}
          />
        </div>
      </section>

      <PrimaryResultCard
        caption={input.mode === "flat-to-reducing" ? "Approx reducing equivalent" : "Approx flat equivalent"}
        highlights={[
          { label: "Flat EMI", value: formatRupees(result.flatEmi) },
          { label: "Reducing EMI", value: formatRupees(result.reducingEmi) },
        ]}
        label="Equivalent rate"
        value={formatPercent(result.equivalentRate)}
      />

      <div className="result-grid">
        <StatCard label="Flat total interest" value={formatRupees(result.flatTotalInterest)} />
        <StatCard label="Reducing total interest" value={formatRupees(result.reducingTotalInterest)} />
      </div>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

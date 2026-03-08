"use client";

import { useMemo, useState } from "react";
import { calculateCAGR } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/tools/shared";
import { formatPercent, formatRupees } from "@/lib/format";

export function CagrCalculator() {
  const [input, setInput] = useState({
    initialValue: 100_000,
    finalValue: 250_000,
    years: 5,
    targetRate: 15,
  });
  const result = useMemo(() => calculateCAGR(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="CAGR and reverse target"
          text="Enter starting value, ending value, and years to get CAGR, then use the target-rate field for reverse planning."
        />
        <div className="field-grid">
          <NumberField id="cagr-initial" label="Initial value" value={input.initialValue} onChange={(value) => setInput((current) => ({ ...current, initialValue: value }))} />
          <NumberField id="cagr-final" label="Final value" value={input.finalValue} onChange={(value) => setInput((current) => ({ ...current, finalValue: value }))} />
          <NumberField id="cagr-years" label="Years" step={0.5} value={input.years} onChange={(value) => setInput((current) => ({ ...current, years: value }))} />
          <NumberField id="cagr-target" label="Reverse target CAGR %" step={0.1} value={input.targetRate} onChange={(value) => setInput((current) => ({ ...current, targetRate: value }))} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`At ${formatPercent(input.targetRate)}, the target value becomes ${formatRupees(result.targetFinalValue)}`}
        highlights={[
          { label: "Initial value", value: formatRupees(input.initialValue) },
          { label: "Final value", value: formatRupees(input.finalValue) },
        ]}
        label="CAGR"
        value={formatPercent(result.cagr)}
      />

      <div className="result-grid">
        <StatCard label="Reverse target value" value={formatRupees(result.targetFinalValue)} />
      </div>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

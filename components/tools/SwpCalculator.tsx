"use client";

import { useMemo, useState } from "react";
import { calculateSWP } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ResultNotice,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

function sparklinePath(points: Array<{ month: number; corpus: number }>) {
  if (points.length === 0) {
    return "";
  }

  const maxX = points[points.length - 1]?.month || 1;
  const maxY = Math.max(...points.map((point) => point.corpus), 1);

  return points
    .map((point, index) => {
      const x = (point.month / maxX) * 280;
      const y = 90 - (point.corpus / maxY) * 80;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function SwpCalculator() {
  const [input, setInput] = useState({
    corpus: 5_000_000,
    monthlyWithdrawal: 50_000,
    annualReturn: 10,
    annualInflation: 0,
  });
  const result = useMemo(() => calculateSWP(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="How long will the corpus last?"
          text="Estimate SWP duration with optional inflation on withdrawals."
        />
        <div className="field-grid">
          <NumberField id="swp-corpus" label="Starting corpus" value={input.corpus} onChange={(value) => setInput((current) => ({ ...current, corpus: value }))} />
          <NumberField id="swp-withdrawal" label="Monthly withdrawal" value={input.monthlyWithdrawal} onChange={(value) => setInput((current) => ({ ...current, monthlyWithdrawal: value }))} />
          <NumberField id="swp-return" label="Annual return" step={0.1} value={input.annualReturn} onChange={(value) => setInput((current) => ({ ...current, annualReturn: value }))} />
          <NumberField id="swp-inflation" label="Annual inflation" step={0.1} value={input.annualInflation} onChange={(value) => setInput((current) => ({ ...current, annualInflation: value }))} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Corpus lasts about ${result.yearsLasted} years`}
        highlights={[
          { label: "Final corpus", value: formatRupees(result.finalCorpus) },
          { label: "Months lasted", value: String(result.monthsLasted) },
        ]}
        label="Total withdrawn before depletion"
        value={formatRupees(result.totalWithdrawn)}
      />

      <div className="result-grid">
        <StatCard label="Years lasted" value={String(result.yearsLasted)} />
        <StatCard label="Final corpus" value={formatRupees(result.finalCorpus)} />
      </div>

      {result.timeline.length > 1 ? (
        <section className="detail-card card">
          <h3>Corpus depletion trend</h3>
          <svg aria-hidden="true" height="100" viewBox="0 0 300 100" width="100%">
            <path d={sparklinePath(result.timeline)} fill="none" stroke="#0f5cc0" strokeWidth="3" />
          </svg>
        </section>
      ) : (
        <ResultNotice>Increase the corpus or reduce withdrawals to generate a useful depletion trend.</ResultNotice>
      )}

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

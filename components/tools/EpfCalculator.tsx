"use client";

import { useMemo, useState } from "react";
import { calculateEPF } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  BreakdownTable,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ResultNotice,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function EpfCalculator() {
  const [input, setInput] = useState({
    monthlyBasic: 40_000,
    employeeRate: 12,
    employerRate: 12,
    years: 15,
    annualReturn: 8.25,
  });
  const result = useMemo(() => calculateEPF(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="EPF growth estimate"
          text="Enter monthly basic pay, contribution rates, and years to estimate EPF corpus growth."
        />
        <div className="field-grid">
          <NumberField id="epf-basic" label="Monthly basic pay" value={input.monthlyBasic} onChange={(value) => setInput((current) => ({ ...current, monthlyBasic: value }))} />
          <NumberField id="epf-employee" label="Employee rate" step={0.1} value={input.employeeRate} onChange={(value) => setInput((current) => ({ ...current, employeeRate: value }))} />
          <NumberField id="epf-employer" label="Employer rate" step={0.1} value={input.employerRate} onChange={(value) => setInput((current) => ({ ...current, employerRate: value }))} />
          <NumberField id="epf-years" label="Years" value={input.years} onChange={(value) => setInput((current) => ({ ...current, years: value }))} />
          <NumberField id="epf-return" label="Annual return" step={0.1} value={input.annualReturn} onChange={(value) => setInput((current) => ({ ...current, annualReturn: value }))} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Interest earned: ${formatRupees(result.interestEarned)}`}
        highlights={[
          { label: "Employee contribution", value: formatRupees(result.employeeContribution) },
          { label: "Employer contribution", value: formatRupees(result.employerContribution) },
        ]}
        label="EPF corpus"
        value={formatRupees(result.corpus)}
      />

      <div className="result-grid">
        <StatCard label="Interest earned" value={formatRupees(result.interestEarned)} />
        <StatCard label="Years modelled" value={String(input.years)} />
      </div>

      <ResultNotice tone="info">
        The default rate is set to 8.25% as the latest official EPF reference built into this tool. Keep it editable because future EPF rates can change.
      </ResultNotice>

      <BreakdownTable
        title="Yearly EPF balance"
        rows={result.yearlySnapshots.map((snapshot) => ({
          label: `Year ${snapshot.year}`,
          value: snapshot.balance,
          highlight: snapshot.year === result.yearlySnapshots[result.yearlySnapshots.length - 1]?.year,
        }))}
      />

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

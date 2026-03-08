"use client";

import { useMemo, useState } from "react";
import { calculateHRA, HRAInput } from "@/lib/calculations/finance";
import {
  AssumptionPanel,
  BreakdownTable,
  CollapsibleSection,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  SelectField,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function HraCalculator() {
  const [input, setInput] = useState<HRAInput>({
    basicSalary: 600_000,
    hraReceived: 240_000,
    rentPaid: 300_000,
    cityTier: "metro" as const,
    dearnessAllowance: 0,
  });
  const result = useMemo(() => calculateHRA(input), [input]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Quick HRA estimate"
          text="Enter basic salary, HRA received, and rent paid to see the old-regime HRA exemption."
        />
        <div className="field-grid">
          <NumberField
            id="hra-basic"
            label="Annual basic salary"
            value={input.basicSalary}
            onChange={(value) => setInput((current) => ({ ...current, basicSalary: value }))}
          />
          <NumberField
            id="hra-received"
            label="Annual HRA received"
            value={input.hraReceived}
            onChange={(value) => setInput((current) => ({ ...current, hraReceived: value }))}
          />
          <NumberField
            id="rent-paid"
            label="Annual rent paid"
            value={input.rentPaid}
            onChange={(value) => setInput((current) => ({ ...current, rentPaid: value }))}
          />
          <SelectField
            id="city-tier"
            label="City type"
            options={[
              { value: "metro", label: "Metro" },
              { value: "non-metro", label: "Non-metro" },
            ]}
            value={input.cityTier}
            onChange={(value) => setInput((current) => ({ ...current, cityTier: value }))}
          />
        </div>

        <CollapsibleSection
          title="Improve accuracy"
          subtitle="Add dearness allowance if it forms part of salary for retirement benefits."
        >
          <div className="field-grid">
            <NumberField
              id="da"
              label="Dearness allowance"
              value={input.dearnessAllowance}
              onChange={(value) =>
                setInput((current) => ({ ...current, dearnessAllowance: value }))
              }
            />
          </div>
        </CollapsibleSection>
      </section>

      <PrimaryResultCard
        caption={`Binding rule: ${result.bindingRule}`}
        highlights={[
          { label: "Taxable HRA", value: formatRupees(result.taxableHra) },
          { label: "Old-regime only", value: "Yes" },
        ]}
        label="Exempt HRA"
        value={formatRupees(result.exemptHra)}
      />

      <div className="result-grid">
        {result.limits.map((limit) => (
          <StatCard key={limit.label} label={limit.label} value={formatRupees(limit.value)} />
        ))}
      </div>

      <BreakdownTable
        title="HRA exemption rule check"
        rows={result.limits.map((limit) => ({
          label: limit.label,
          value: limit.value,
          highlight: limit.label === result.bindingRule,
        }))}
      />

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateGratuity, GratuityInput } from "@/lib/calculations/finance";
import { formatRupees } from "@/lib/format";
import {
  AssumptionPanel,
  BreakdownTable,
  CollapsibleSection,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  SegmentControl,
  StatCard,
} from "@/components/tools/shared";

export function GratuityCalculator() {
  const [input, setInput] = useState<GratuityInput>({
    lastDrawnSalary: 60000,
    yearsOfService: 7,
    extraMonths: 0,
    formula: "act-covered",
  });
  const result = useMemo(() => calculateGratuity(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick gratuity estimate"
        text="Enter last drawn salary and years of service to estimate gratuity. Add extra months only if you want a more precise eligibility check."
      />

      <div className="field-row">
        <SegmentControl
          options={[
            { value: "act-covered", label: "Act-covered" },
            { value: "not-covered", label: "Not covered" },
          ]}
          value={input.formula}
          onChange={(value) =>
            setInput((current) => ({ ...current, formula: value as GratuityInput["formula"] }))
          }
        />
      </div>

      <div className="field-grid">
        <NumberField
          id="gratuity-salary"
          label="Last drawn salary"
          value={input.lastDrawnSalary}
          step={1000}
          onChange={(value) => setInput((current) => ({ ...current, lastDrawnSalary: value }))}
          hint="Use last drawn basic plus dearness allowance where applicable."
        />
        <NumberField
          id="gratuity-years"
          label="Completed years of service"
          value={input.yearsOfService}
          step={1}
          onChange={(value) => setInput((current) => ({ ...current, yearsOfService: value }))}
        />
      </div>

      <PrimaryResultCard
        label="Estimated gratuity"
        value={formatRupees(result.gratuity)}
        caption={
          result.eligible
            ? `${result.serviceYearsUsed} service years used in the estimate`
            : `You are not yet at the standard 5-year eligibility mark`
        }
        highlights={[
          {
            label: result.eligible ? "Eligibility" : "Months to eligibility",
            value: result.eligible ? "Eligible" : String(result.monthsUntilEligible),
          },
          { label: "Tax-exempt limit", value: formatRupees(result.taxExemptLimit) },
        ]}
      />

      <p className="inline-notice">
        This is a planning estimate only. Final gratuity depends on your employment setup and the
        applicable legal rule.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Service years used"
          value={String(result.serviceYearsUsed)}
          caption={`Formula: ${input.formula === "act-covered" ? "Act-covered" : "Not covered"}`}
        />
        <StatCard
          label="Taxable portion"
          value={formatRupees(result.taxablePortion)}
          caption="Amount above the current exemption limit"
        />
      </div>

      <CollapsibleSection
        title="Add extra months"
        subtitle="Use this if you want a more precise service check"
      >
        <div className="field-grid">
          <NumberField
            id="gratuity-months"
            label="Extra months of service"
            value={input.extraMonths}
            step={1}
            min={0}
            max={11}
            onChange={(value) => setInput((current) => ({ ...current, extraMonths: value }))}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="See gratuity breakdown"
        subtitle="Eligibility, service years, and tax context"
      >
        <BreakdownTable
          title="Gratuity summary"
          rows={[
            { label: "Last drawn salary", value: input.lastDrawnSalary },
            { label: "Service years used", value: result.serviceYearsUsed },
            { label: "Estimated gratuity", value: result.gratuity, highlight: true },
            { label: "Tax-exempt limit", value: result.taxExemptLimit },
            { label: "Taxable portion", value: result.taxablePortion },
          ]}
        />
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

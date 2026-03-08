"use client";

import { useMemo, useState } from "react";
import { calculatePercentageMode, PercentageMode } from "@/lib/calculations/utility";
import {
  FieldHint,
  NumberField,
  PrimaryResultCard,
  SegmentControl,
} from "@/components/tools/shared";

const modeLabels: Record<
  PercentageMode,
  { label: string; first: string; second: string; resultLabel: string }
> = {
  "percent-of-number": {
    label: "What is X% of Y?",
    first: "Percentage",
    second: "Number",
    resultLabel: "Result",
  },
  "number-is-what-percent": {
    label: "X is what % of Y?",
    first: "X",
    second: "Y",
    resultLabel: "Percentage",
  },
  "percentage-change": {
    label: "Percentage change",
    first: "Old value",
    second: "New value",
    resultLabel: "Change",
  },
  "percentage-increase": {
    label: "Increase / decrease",
    first: "Start value",
    second: "End value",
    resultLabel: "Change",
  },
  "marks-percentage": {
    label: "Marks percentage",
    first: "Marks obtained",
    second: "Total marks",
    resultLabel: "Percentage",
  },
  "fraction-to-percentage": {
    label: "Fraction to percentage",
    first: "Numerator",
    second: "Denominator",
    resultLabel: "Percentage",
  },
};

export function PercentageCalculator() {
  const [mode, setMode] = useState<PercentageMode>("percent-of-number");
  const [first, setFirst] = useState(18);
  const [second, setSecond] = useState(5000);
  const result = useMemo(() => calculatePercentageMode(mode, first, second), [mode, first, second]);
  const labels = modeLabels[mode];

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Six percentage tools in one page"
          text="Switch modes to calculate percentage of a number, percentage change, marks percentage, and more."
        />
        <SegmentControl
          options={Object.entries(modeLabels).map(([value, config]) => ({
            value: value as PercentageMode,
            label: config.label,
          }))}
          value={mode}
          onChange={setMode}
        />
        <div className="field-grid">
          <NumberField id="first-value" label={labels.first} step={0.01} value={first} onChange={setFirst} />
          <NumberField id="second-value" label={labels.second} step={0.01} value={second} onChange={setSecond} />
        </div>
      </section>

      <PrimaryResultCard
        caption={labels.label}
        highlights={[
          { label: "First input", value: String(first) },
          { label: "Second input", value: String(second) },
        ]}
        label={labels.resultLabel}
        value={
          mode === "percent-of-number"
            ? result.toFixed(2)
            : `${result.toFixed(2)}%`
        }
      />
    </div>
  );
}

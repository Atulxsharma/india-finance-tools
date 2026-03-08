"use client";

import { useMemo, useState } from "react";
import { convertLandArea } from "@/lib/calculations/utility";
import {
  FieldHint,
  NumberField,
  PrimaryResultCard,
  SelectField,
  StatCard,
} from "@/components/tools/shared";

const unitOptions = [
  { value: "sq-ft", label: "Square feet" },
  { value: "sq-m", label: "Square metre" },
  { value: "acre", label: "Acre" },
  { value: "hectare", label: "Hectare" },
  { value: "bigha", label: "Bigha" },
  { value: "gunta", label: "Gunta" },
  { value: "sq-yard", label: "Square yard" },
] as const;

export function LandAreaConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState<(typeof unitOptions)[number]["value"]>("acre");
  const [toUnit, setToUnit] = useState<(typeof unitOptions)[number]["value"]>("sq-ft");
  const result = useMemo(() => convertLandArea(value, fromUnit, toUnit), [value, fromUnit, toUnit]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Convert India-relevant land units"
          text="Switch between acre, hectare, bigha, gunta, square feet, and more."
        />
        <div className="field-grid">
          <NumberField id="land-value" label="Value" step={0.01} value={value} onChange={setValue} />
          <SelectField id="land-from" label="From unit" options={[...unitOptions]} value={fromUnit} onChange={setFromUnit} />
          <SelectField id="land-to" label="To unit" options={[...unitOptions]} value={toUnit} onChange={setToUnit} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Converted from ${fromUnit} to ${toUnit}`}
        highlights={[
          { label: "Acre", value: result.equivalents.acre.toFixed(4) },
          { label: "Bigha", value: result.equivalents.bigha.toFixed(4) },
        ]}
        label="Converted value"
        value={result.convertedValue.toFixed(4)}
      />

      <div className="result-grid">
        <StatCard label="Square feet" value={result.equivalents["sq-ft"].toFixed(2)} />
        <StatCard label="Hectare" value={result.equivalents.hectare.toFixed(4)} />
        <StatCard label="Gunta" value={result.equivalents.gunta.toFixed(4)} />
      </div>
    </div>
  );
}

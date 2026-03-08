"use client";

import { useMemo, useState } from "react";
import { calculateElectricityBill } from "@/lib/calculations/static-tools";
import {
  BreakdownTable,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ResultNotice,
  SelectField,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function ElectricityBillCalculator() {
  const [state, setState] = useState<"delhi" | "maharashtra" | "karnataka" | "tamil-nadu">("delhi");
  const [consumerType, setConsumerType] = useState<"domestic" | "commercial">("domestic");
  const [units, setUnits] = useState(350);
  const result = useMemo(() => calculateElectricityBill({ state, consumerType, units }), [consumerType, state, units]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="State-wise electricity estimate"
          text="Estimate slab-based energy charges for a supported state and consumer type."
        />
        <div className="field-grid">
          <SelectField
            id="eb-state"
            label="State"
            options={[
              { value: "delhi", label: "Delhi" },
              { value: "maharashtra", label: "Maharashtra" },
              { value: "karnataka", label: "Karnataka" },
              { value: "tamil-nadu", label: "Tamil Nadu" },
            ]}
            value={state}
            onChange={setState}
          />
          <SelectField
            id="eb-type"
            label="Consumer type"
            options={[
              { value: "domestic", label: "Domestic" },
              { value: "commercial", label: "Commercial" },
            ]}
            value={consumerType}
            onChange={setConsumerType}
          />
          <NumberField id="eb-units" label="Units consumed" value={units} onChange={setUnits} />
        </div>
      </section>

      <PrimaryResultCard
        caption="Energy-charge estimate only"
        highlights={[
          { label: "State", value: state.replace("-", " ") },
          { label: "Consumer type", value: consumerType },
        ]}
        label="Estimated bill"
        value={formatRupees(result.total)}
      />

      <BreakdownTable
        title="Slab-wise charge estimate"
        rows={result.breakdown.map((item) => ({
          label: `${item.label} (${item.units} units)`,
          value: item.amount,
        }))}
      />

      <ResultNotice>
        Static estimate. Fixed charges, subsidies, fuel adjustments, and taxes are excluded.
      </ResultNotice>
    </div>
  );
}

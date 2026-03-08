"use client";

import { useMemo, useState } from "react";
import { calculateStampDuty } from "@/lib/calculations/static-tools";
import {
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ResultNotice,
  SelectField,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function StampDutyCalculator() {
  const [state, setState] = useState<"delhi" | "maharashtra" | "karnataka" | "tamil-nadu">("delhi");
  const [buyerProfile, setBuyerProfile] = useState<"male" | "female" | "joint">("male");
  const [propertyValue, setPropertyValue] = useState(10_000_000);
  const result = useMemo(() => calculateStampDuty({ state, buyerProfile, propertyValue }), [buyerProfile, propertyValue, state]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="State-wise stamp duty estimate"
          text="Choose a supported state and buyer profile to estimate stamp duty and registration charges."
        />
        <div className="field-grid">
          <SelectField
            id="stamp-state"
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
            id="stamp-profile"
            label="Buyer profile"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "joint", label: "Joint" },
            ]}
            value={buyerProfile}
            onChange={setBuyerProfile}
          />
          <NumberField id="stamp-value" label="Property value" value={propertyValue} onChange={setPropertyValue} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Registration fee: ${formatRupees(result.registrationFee)}`}
        highlights={[
          { label: "Stamp duty", value: formatRupees(result.stampDuty) },
          { label: "Registration", value: formatRupees(result.registrationFee) },
        ]}
        label="Total upfront charges"
        value={formatRupees(result.totalUpfrontCost)}
      />

      <div className="result-grid">
        <StatCard label="Stamp duty" value={formatRupees(result.stampDuty)} />
        <StatCard label="Registration fee" value={formatRupees(result.registrationFee)} />
      </div>

      <ResultNotice>
        Static estimate. Verify the latest state rules, concessions, and circle-rate treatment before registration.
      </ResultNotice>
    </div>
  );
}

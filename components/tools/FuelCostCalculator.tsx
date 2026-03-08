"use client";

import { useMemo, useState } from "react";
import {
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ToggleField,
  StatCard,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function FuelCostCalculator() {
  const [distance, setDistance] = useState(240);
  const [mileage, setMileage] = useState(18);
  const [fuelPrice, setFuelPrice] = useState(102);
  const [tollCost, setTollCost] = useState(0);
  const [roundTrip, setRoundTrip] = useState(true);
  const result = useMemo(() => {
    const tripDistance = distance * (roundTrip ? 2 : 1);
    const litres = tripDistance / Math.max(1, mileage);
    const fuelCost = litres * fuelPrice;
    const totalCost = fuelCost + tollCost;
    return {
      tripDistance,
      litres,
      fuelCost,
      totalCost,
    };
  }, [distance, fuelPrice, mileage, roundTrip, tollCost]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Trip fuel estimate"
          text="Enter distance, mileage, and current fuel price to estimate the trip cost."
        />
        <div className="field-grid">
          <NumberField id="fuel-distance" label="Distance (km)" value={distance} onChange={setDistance} />
          <NumberField id="fuel-mileage" label="Mileage (km/l)" step={0.1} value={mileage} onChange={setMileage} />
          <NumberField id="fuel-price" label="Fuel price per litre" step={0.1} value={fuelPrice} onChange={setFuelPrice} />
          <NumberField id="fuel-toll" label="Toll / parking" value={tollCost} onChange={setTollCost} />
        </div>
        <ToggleField checked={roundTrip} hint="Double the distance for the return leg." id="round-trip" label="Round trip" onChange={setRoundTrip} />
      </section>

      <PrimaryResultCard
        caption={`Fuel-only cost: ${formatRupees(result.fuelCost)}`}
        highlights={[
          { label: "Trip distance", value: `${result.tripDistance.toFixed(0)} km` },
          { label: "Fuel needed", value: `${result.litres.toFixed(2)} L` },
        ]}
        label="Estimated total trip cost"
        value={formatRupees(result.totalCost)}
      />

      <div className="result-grid">
        <StatCard label="Fuel only" value={formatRupees(result.fuelCost)} />
        <StatCard label="Toll / parking" value={formatRupees(tollCost)} />
      </div>
    </div>
  );
}

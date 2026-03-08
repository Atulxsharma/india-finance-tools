"use client";

import { useMemo, useState } from "react";
import { calculateSellerFees, FulfilmentMode, SellerCategory, SellerMarketplace, ShippingBand } from "@/lib/calculations/static-tools";
import {
  DistributionBar,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  ResultNotice,
  SelectField,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function SellerFeeCalculator({ marketplace }: { marketplace: SellerMarketplace }) {
  const [input, setInput] = useState<{
    sellingPrice: number;
    category: SellerCategory;
    fulfilmentMode: FulfilmentMode;
    shippingBand: ShippingBand;
  }>({
    sellingPrice: 999,
    category: "fashion" as SellerCategory,
    fulfilmentMode: marketplace === "flipkart" ? "easy-ship" : "fba" as FulfilmentMode,
    shippingBand: "regional" as ShippingBand,
  });
  const result = useMemo(
    () =>
      calculateSellerFees({
        marketplace,
        ...input,
      }),
    [input, marketplace],
  );

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title={`${marketplace === "amazon" ? "Amazon" : "Flipkart"} fee estimate`}
          text="Select category, fulfilment mode, and shipping band to estimate marketplace fees and seller proceeds."
        />
        <div className="field-grid">
          <NumberField id={`${marketplace}-price`} label="Selling price" value={input.sellingPrice} onChange={(value) => setInput((current) => ({ ...current, sellingPrice: value }))} />
          <SelectField
            id={`${marketplace}-category`}
            label="Category"
            options={[
              { value: "fashion", label: "Fashion" },
              { value: "beauty", label: "Beauty" },
              { value: "electronics", label: "Electronics" },
              { value: "home", label: "Home" },
            ]}
            value={input.category}
            onChange={(value) => setInput((current) => ({ ...current, category: value }))}
          />
          <SelectField
            id={`${marketplace}-fulfilment`}
            label="Fulfilment mode"
            options={[
              { value: "seller-fulfilled", label: "Seller fulfilled" },
              { value: "easy-ship", label: marketplace === "amazon" ? "Easy Ship" : "Smart fulfilment" },
              { value: "fba", label: marketplace === "amazon" ? "FBA" : "Warehousing" },
            ]}
            value={input.fulfilmentMode}
            onChange={(value) => setInput((current) => ({ ...current, fulfilmentMode: value }))}
          />
          <SelectField
            id={`${marketplace}-shipping`}
            label="Shipping band"
            options={[
              { value: "local", label: "Local" },
              { value: "regional", label: "Regional" },
              { value: "national", label: "National" },
            ]}
            value={input.shippingBand}
            onChange={(value) => setInput((current) => ({ ...current, shippingBand: value }))}
          />
        </div>
      </section>

      <PrimaryResultCard
        caption={`Net proceeds after fees: ${formatRupees(result.netProceeds)}`}
        highlights={[
          { label: "Referral fee", value: formatRupees(result.referralFee) },
          { label: "Shipping fee", value: formatRupees(result.shippingFee) },
        ]}
        label="Total marketplace fees"
        value={formatRupees(result.totalFees)}
      />

      <DistributionBar
        title="Fee split"
        segments={[
          { label: "Referral", value: result.referralFee, color: "#0f5cc0" },
          { label: "Closing", value: result.closingFee, color: "#8a5a00" },
          { label: "Shipping", value: result.shippingFee, color: "#13795b" },
        ]}
      />

      <ResultNotice>
        Static fee table estimate. Verify the latest marketplace fee card before pricing a live listing.
      </ResultNotice>
    </div>
  );
}

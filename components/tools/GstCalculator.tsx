"use client";

import { useMemo, useState } from "react";
import { calculateGST, GSTInput } from "@/lib/calculations/finance";
import { formatRupees } from "@/lib/format";
import {
  AssumptionPanel,
  BreakdownTable,
  CollapsibleSection,
  DistributionBar,
  FieldHint,
  NumberField,
  PrimaryResultCard,
  QuickPicks,
  SegmentControl,
  SelectField,
  StatCard,
} from "@/components/tools/shared";

export function GstCalculator() {
  const [input, setInput] = useState<GSTInput>({
    amount: 10000,
    rate: 18,
    mode: "add",
    supplyType: "intra-state",
  });
  const result = useMemo(() => calculateGST(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick GST check"
        text="Enter the amount and GST rate first. Change the tax split only if you need to see CGST, SGST, or IGST separately."
      />

      <div className="field-row">
        <SegmentControl
          options={[
            { value: "add", label: "Add GST" },
            { value: "remove", label: "Remove GST" },
          ]}
          value={input.mode}
          onChange={(value) => setInput((current) => ({ ...current, mode: value as GSTInput["mode"] }))}
        />
      </div>

      <div className="field-grid">
        <NumberField
          id="gst-amount"
          label={input.mode === "add" ? "Base amount" : "Gross amount"}
          value={input.amount}
          step={100}
          onChange={(value) => setInput((current) => ({ ...current, amount: value }))}
          hint={input.mode === "add" ? "Amount before GST." : "Amount including GST."}
        />
        <SelectField
          id="gst-rate"
          label="GST rate"
          value={String(input.rate)}
          onChange={(value) =>
            setInput((current) => ({ ...current, rate: Number(value) as GSTInput["rate"] }))
          }
          options={[0, 5, 12, 18, 28].map((rate) => ({
            value: String(rate),
            label: `${rate}%`,
          }))}
        />
      </div>

      <QuickPicks
        label="Common GST rates"
        options={[
          { label: "5%", value: 5 },
          { label: "12%", value: 12 },
          { label: "18%", value: 18 },
          { label: "28%", value: 28 },
        ]}
        onSelect={(value) =>
          setInput((current) => ({ ...current, rate: Number(value) as GSTInput["rate"] }))
        }
      />

      <PrimaryResultCard
        label={input.mode === "add" ? "Invoice total" : "Taxable value"}
        value={formatRupees(input.mode === "add" ? result.totalAmount : result.baseAmount)}
        caption={input.mode === "add" ? "Base amount plus GST" : "Tax-exclusive value extracted from the amount entered"}
        highlights={[
          { label: "GST amount", value: formatRupees(result.gstAmount) },
          {
            label: result.supplyType === "inter-state" ? "IGST" : "CGST + SGST",
            value:
              result.supplyType === "inter-state"
                ? formatRupees(result.igst)
                : `${formatRupees(result.cgst)} + ${formatRupees(result.sgst)}`,
          },
        ]}
      />

      <p className="inline-notice">
        Good for quick invoice math. You still need the correct GST slab and place of supply.
      </p>

      <CollapsibleSection
        title="Change tax split"
        subtitle="Choose CGST + SGST or IGST"
      >
        <div className="field-row">
          <SegmentControl
            options={[
              { value: "intra-state", label: "CGST + SGST" },
              { value: "inter-state", label: "IGST" },
            ]}
            value={input.supplyType}
            onChange={(value) =>
              setInput((current) => ({ ...current, supplyType: value as GSTInput["supplyType"] }))
            }
          />
        </div>
      </CollapsibleSection>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="GST amount"
          value={formatRupees(result.gstAmount)}
          caption={`${input.rate}% on the taxable value`}
        />
        <StatCard
          label={result.supplyType === "inter-state" ? "IGST" : "CGST + SGST"}
          value={
            result.supplyType === "inter-state"
              ? formatRupees(result.igst)
              : `${formatRupees(result.cgst)} + ${formatRupees(result.sgst)}`
          }
        />
      </div>

      <CollapsibleSection
        title="See GST breakdown"
        subtitle="Taxable value, GST, and final total"
      >
        <div className="detail-grid">
          <BreakdownTable
            title="GST split"
            rows={[
              { label: "Taxable value", value: result.baseAmount },
              { label: "GST amount", value: result.gstAmount },
              { label: "CGST", value: result.cgst },
              { label: "SGST", value: result.sgst },
              { label: "IGST", value: result.igst },
              { label: "Invoice total", value: result.totalAmount, highlight: true },
            ]}
          />
          <DistributionBar
            title="Invoice composition"
            segments={[
              { label: "Taxable value", value: result.baseAmount, color: "#0f5cc0" },
              { label: "GST", value: result.gstAmount, color: "#cf3f33" },
            ]}
          />
        </div>
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

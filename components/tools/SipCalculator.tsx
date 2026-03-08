"use client";

import { useMemo, useState } from "react";
import { calculateSIP, SIPInput } from "@/lib/calculations/finance";
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
  StatCard,
} from "@/components/tools/shared";

export function SipCalculator() {
  const [input, setInput] = useState<SIPInput>({
    monthlyInvestment: 10000,
    annualReturnRate: 12,
    years: 15,
  });
  const result = useMemo(() => calculateSIP(input), [input]);

  return (
    <div className="tool-panel card">
      <FieldHint
        title="Quick SIP estimate"
        text="Enter monthly SIP, return, and years to see the projected corpus. Use the breakdown only if you want milestone detail."
      />

      <div className="field-grid">
        <NumberField
          id="sip-investment"
          label="Monthly investment"
          value={input.monthlyInvestment}
          step={500}
          onChange={(value) => setInput((current) => ({ ...current, monthlyInvestment: value }))}
          hint="How much you can invest every month."
        />
        <NumberField
          id="sip-return"
          label="Expected annual return"
          value={input.annualReturnRate}
          step={0.1}
          onChange={(value) => setInput((current) => ({ ...current, annualReturnRate: value }))}
          hint="Use 12% if you just want a rough equity SIP estimate."
        />
        <NumberField
          id="sip-years"
          label="Investment period (years)"
          value={input.years}
          step={1}
          onChange={(value) => setInput((current) => ({ ...current, years: value }))}
        />
      </div>

      <QuickPicks
        label="Common SIP amounts"
        options={[
          { label: "₹2k", value: 2000 },
          { label: "₹5k", value: 5000 },
          { label: "₹10k", value: 10000 },
          { label: "₹25k", value: 25000 },
        ]}
        onSelect={(value) =>
          setInput((current) => ({ ...current, monthlyInvestment: Number(value) }))
        }
      />

      <div className="field-row">
        <QuickPicks
          label="Common SIP return assumptions"
          options={[
            { label: "10%", value: 10 },
            { label: "12%", value: 12 },
            { label: "15%", value: 15 },
          ]}
          onSelect={(value) =>
            setInput((current) => ({ ...current, annualReturnRate: Number(value) }))
          }
        />
        <QuickPicks
          label="Common SIP durations"
          options={[
            { label: "10y", value: 10 },
            { label: "15y", value: 15 },
            { label: "20y", value: 20 },
          ]}
          onSelect={(value) => setInput((current) => ({ ...current, years: Number(value) }))}
        />
      </div>

      <PrimaryResultCard
        label="Estimated corpus"
        value={formatRupees(result.futureValue)}
        caption={`${input.years} years at an expected ${input.annualReturnRate}% annual return`}
        highlights={[
          { label: "Total invested", value: formatRupees(result.totalInvested) },
          { label: "Wealth gained", value: formatRupees(result.wealthGained) },
        ]}
      />

      <p className="inline-notice">
        This is a planning estimate. Real market returns and tax outcomes will vary.
      </p>

      <div className="result-grid result-grid-secondary">
        <StatCard
          label="Wealth gained"
          value={formatRupees(result.wealthGained)}
          caption={`Monthly rate ${result.monthlyRate.toFixed(3)}%`}
        />
        <StatCard
          label="Corpus after 10 years"
          value={formatRupees(result.milestones.tenYears)}
          caption="Illustrative intermediate milestone"
        />
      </div>

      <CollapsibleSection
        title="See corpus breakdown"
        subtitle="Invested amount, gains, and milestone view"
      >
        <div className="detail-grid">
          <BreakdownTable
            title="SIP summary"
            rows={[
              { label: "Monthly investment", value: input.monthlyInvestment },
              { label: "Total invested", value: result.totalInvested },
              { label: "Estimated value", value: result.futureValue, highlight: true },
              { label: "Wealth gained", value: result.wealthGained },
            ]}
          />
          <DistributionBar
            title="Invested vs growth"
            segments={[
              { label: "Invested", value: result.totalInvested, color: "#0f5cc0" },
              { label: "Growth", value: result.wealthGained, color: "#0d9f6e" },
            ]}
          />
        </div>
      </CollapsibleSection>

      <AssumptionPanel assumptions={result.assumptions} notes={result.notes} />
    </div>
  );
}

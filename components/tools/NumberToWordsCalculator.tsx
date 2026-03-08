"use client";

import { useMemo, useState } from "react";
import { convertNumberToIndianWords } from "@/lib/calculations/utility";
import {
  FieldHint,
  NumberField,
  PrimaryResultCard,
  StatCard,
} from "@/components/tools/shared";

export function NumberToWordsCalculator() {
  const [amount, setAmount] = useState(125430.75);
  const result = useMemo(() => convertNumberToIndianWords(amount), [amount]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Number to words"
          text="Enter any amount to convert it into Indian rupee wording with paise support."
        />
        <NumberField id="amount" label="Amount" step={0.01} value={amount} onChange={setAmount} />
      </section>

      <PrimaryResultCard
        caption={result.rupeePhrase}
        highlights={[
          { label: "Rupee wording", value: result.words },
          { label: "Document-ready", value: "Yes" },
        ]}
        label="Amount in words"
        value={result.rupeePhrase}
      />

      <div className="result-grid">
        <StatCard label="Whole number wording" value={result.words} />
        <StatCard label="Use case" value="Invoices, cheques, receipts" />
      </div>
    </div>
  );
}

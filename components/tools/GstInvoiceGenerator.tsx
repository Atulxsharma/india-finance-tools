"use client";

import { useMemo, useRef, useState } from "react";
import {
  DownloadButton,
  exportNodeAsPdf,
  FieldHint,
  InlinePreviewCard,
  NumberField,
  PrimaryResultCard,
  TextField,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number;
  gstRate: number;
};

export function GstInvoiceGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [sellerName, setSellerName] = useState("India Tools Traders");
  const [sellerState, setSellerState] = useState("Maharashtra");
  const [buyerName, setBuyerName] = useState("ABC Retail");
  const [buyerState, setBuyerState] = useState("Karnataka");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "Product A", quantity: 2, rate: 2500, gstRate: 18 },
  ]);

  const totals = useMemo(() => {
    const sameState = sellerState.trim().toLowerCase() === buyerState.trim().toLowerCase();
    const taxableValue = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const gstAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.rate * (item.gstRate / 100),
      0,
    );
    return {
      sameState,
      taxableValue,
      gstAmount,
      cgst: sameState ? gstAmount / 2 : 0,
      sgst: sameState ? gstAmount / 2 : 0,
      igst: sameState ? 0 : gstAmount,
      total: taxableValue + gstAmount,
    };
  }, [buyerState, items, sellerState]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Generate a simple GST invoice"
          text="Enter seller, buyer, and item details. The tax split switches automatically based on state comparison."
        />
        <div className="field-grid">
          <TextField id="gst-seller" label="Seller name" value={sellerName} onChange={setSellerName} />
          <TextField id="gst-seller-state" label="Seller state" value={sellerState} onChange={setSellerState} />
          <TextField id="gst-buyer" label="Buyer name" value={buyerName} onChange={setBuyerName} />
          <TextField id="gst-buyer-state" label="Buyer state" value={buyerState} onChange={setBuyerState} />
        </div>
        {items.map((item, index) => (
          <div className="field-grid" key={`gst-item-${index}`}>
            <TextField
              id={`gst-desc-${index}`}
              label="Item description"
              value={item.description}
              onChange={(value) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, description: value } : entry,
                  ),
                )
              }
            />
            <NumberField
              id={`gst-qty-${index}`}
              label="Quantity"
              value={item.quantity}
              onChange={(value) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, quantity: value } : entry,
                  ),
                )
              }
            />
            <NumberField
              id={`gst-rate-${index}`}
              label="Rate"
              value={item.rate}
              onChange={(value) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, rate: value } : entry,
                  ),
                )
              }
            />
            <NumberField
              id={`gst-rate-pct-${index}`}
              label="GST rate"
              value={item.gstRate}
              onChange={(value) =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, gstRate: value } : entry,
                  ),
                )
              }
            />
          </div>
        ))}
      </section>

      <PrimaryResultCard
        caption={totals.sameState ? "CGST + SGST applied" : "IGST applied"}
        highlights={[
          { label: "Taxable value", value: formatRupees(totals.taxableValue) },
          { label: "GST amount", value: formatRupees(totals.gstAmount) },
        ]}
        label="Invoice total"
        value={formatRupees(totals.total)}
      />

      <InlinePreviewCard subtitle="Preview of the generated GST invoice." title="Invoice preview">
        <div className="preview-sheet" ref={previewRef}>
          <div className="preview-sheet-grid">
            <div>
              <strong>Seller</strong>
              <p>{sellerName}</p>
              <p>{sellerState}</p>
            </div>
            <div>
              <strong>Buyer</strong>
              <p>{buyerName}</p>
              <p>{buyerState}</p>
            </div>
          </div>
          {items.map((item, index) => (
            <div className="preview-sheet-grid" key={`preview-item-${index}`}>
              <span>{item.description}</span>
              <span>{item.quantity}</span>
              <span>{formatRupees(item.rate)}</span>
              <span>{item.gstRate}%</span>
            </div>
          ))}
          <div className="preview-sheet-grid">
            <span>Taxable value: {formatRupees(totals.taxableValue)}</span>
            <span>{totals.sameState ? `CGST: ${formatRupees(totals.cgst)} | SGST: ${formatRupees(totals.sgst)}` : `IGST: ${formatRupees(totals.igst)}`}</span>
            <strong>Total: {formatRupees(totals.total)}</strong>
          </div>
        </div>
        <DownloadButton
          label="Download GST invoice PDF"
          onDownload={() => previewRef.current && exportNodeAsPdf({ node: previewRef.current, filename: "gst-invoice.pdf" })}
        />
      </InlinePreviewCard>
    </div>
  );
}

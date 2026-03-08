"use client";
/* eslint-disable @next/next/no-img-element */

import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";
import {
  DownloadButton,
  FieldHint,
  InlinePreviewCard,
  NumberField,
  PrimaryResultCard,
  StatCard,
  TextAreaField,
  TextField,
} from "@/components/tools/shared";

function buildUpiUri({
  payeeName,
  upiId,
  amount,
  note,
}: {
  payeeName: string;
  upiId: string;
  amount: number;
  note: string;
}) {
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
  });

  if (amount > 0) {
    params.set("am", amount.toFixed(2));
  }

  if (note.trim()) {
    params.set("tn", note.trim());
  }

  params.set("cu", "INR");

  return `upi://pay?${params.toString()}`;
}

export function UpiQrGenerator() {
  const [payeeName, setPayeeName] = useState("India Tools");
  const [upiId, setUpiId] = useState("indiatools@upi");
  const [amount, setAmount] = useState(499);
  const [note, setNote] = useState("Payment");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const paymentUri = useMemo(
    () => buildUpiUri({ payeeName, upiId, amount, note }),
    [amount, note, payeeName, upiId],
  );

  useEffect(() => {
    void QRCode.toDataURL(paymentUri, {
      margin: 1,
      width: 512,
    }).then(setQrDataUrl);
  }, [paymentUri]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Generate a UPI QR instantly"
          text="Enter payee details, optional amount, and note to create a downloadable QR."
        />
        <div className="field-grid">
          <TextField id="upi-name" label="Payee name" value={payeeName} onChange={setPayeeName} />
          <TextField id="upi-id" label="UPI ID" value={upiId} onChange={setUpiId} />
          <NumberField id="upi-amount" label="Amount (optional)" step={0.01} value={amount} onChange={setAmount} />
        </div>
        <TextAreaField id="upi-note" label="Note (optional)" rows={2} value={note} onChange={setNote} />
      </section>

      <PrimaryResultCard
        caption={amount > 0 ? `Fixed amount: ₹${amount.toFixed(2)}` : "Open amount QR"}
        highlights={[
          { label: "Payee", value: payeeName },
          { label: "UPI ID", value: upiId },
        ]}
        label="UPI QR ready"
        value={amount > 0 ? `₹${amount.toFixed(2)}` : "Scan to pay"}
      />

      <InlinePreviewCard subtitle="Preview and download the QR code as a PNG image." title="QR preview">
        {qrDataUrl ? <img alt="UPI QR code" src={qrDataUrl} style={{ maxWidth: 260, width: "100%" }} /> : null}
        <div className="result-grid">
          <StatCard label="Payee" value={payeeName} />
          <StatCard label="UPI ID" value={upiId} />
          <StatCard label="Note" value={note || "None"} />
        </div>
        <div className="uri-box">
          <div className="section-heading">
            <h3>UPI payment link</h3>
            <p className="muted uri-text">{paymentUri}</p>
          </div>
          <div className="hero-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(paymentUri);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>
        <DownloadButton
          disabled={!qrDataUrl}
          label="Download QR PNG"
          onDownload={() => {
            const anchor = document.createElement("a");
            anchor.href = qrDataUrl;
            anchor.download = "upi-qr.png";
            anchor.click();
          }}
        />
      </InlinePreviewCard>
    </div>
  );
}

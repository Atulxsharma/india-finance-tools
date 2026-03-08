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
        caption={paymentUri}
        highlights={[
          { label: "Payee", value: payeeName },
          { label: "UPI ID", value: upiId },
        ]}
        label="UPI payment URI"
        value={paymentUri}
      />

      <InlinePreviewCard subtitle="Preview and download the QR code as a PNG image." title="QR preview">
        {qrDataUrl ? <img alt="UPI QR code" src={qrDataUrl} style={{ maxWidth: 260, width: "100%" }} /> : null}
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

"use client";

import { useMemo, useRef, useState } from "react";
import {
  DownloadButton,
  exportNodeAsPdf,
  FieldHint,
  InlinePreviewCard,
  MonthField,
  NumberField,
  PrimaryResultCard,
  TextField,
  ToggleField,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

function monthRange(startMonth: string, endMonth: string) {
  if (!startMonth || !endMonth) {
    return [];
  }

  const start = parseMonthValue(startMonth);
  const end = parseMonthValue(endMonth);

  if (!start || !end || start > end) {
    return [];
  }

  const result: string[] = [];
  const current = new Date(start);

  while (current <= end && result.length < 24) {
    result.push(
      current.toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    );
    current.setMonth(current.getMonth() + 1);
  }

  return result;
}

function parseMonthValue(value: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month] = match;
  const date = new Date(Number(year), Number(month) - 1, 1);

  if (date.getFullYear() !== Number(year) || date.getMonth() !== Number(month) - 1) {
    return null;
  }

  return date;
}

export function RentReceiptGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [tenantName, setTenantName] = useState("Rahul Sharma");
  const [landlordName, setLandlordName] = useState("Amit Verma");
  const [address, setAddress] = useState("Flat 302, Andheri East, Mumbai");
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [startMonth, setStartMonth] = useState("2026-04");
  const [endMonth, setEndMonth] = useState("2027-03");
  const [landlordPan, setLandlordPan] = useState("");
  const [revenueStamp, setRevenueStamp] = useState(false);
  const months = useMemo(() => monthRange(startMonth, endMonth), [endMonth, startMonth]);
  const annualRent = months.length * monthlyRent;
  const canDownload =
    months.length > 0 &&
    tenantName.trim().length > 0 &&
    landlordName.trim().length > 0 &&
    address.trim().length > 0;

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Generate multiple monthly receipts"
          text="Enter names, address, rent, and the month range to create a printable rent-receipt set for HRA records."
        />
        <div className="field-grid">
          <TextField id="tenant-name" label="Tenant name" value={tenantName} onChange={setTenantName} />
          <TextField id="landlord-name" label="Landlord name" value={landlordName} onChange={setLandlordName} />
          <NumberField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} />
          <TextField id="payment-mode" label="Payment mode" value={paymentMode} onChange={setPaymentMode} />
          <MonthField id="rent-start" label="Start month" value={startMonth} onChange={setStartMonth} />
          <MonthField id="rent-end" label="End month" value={endMonth} onChange={setEndMonth} />
        </div>
        <TextField id="rent-address" label="Rental address" value={address} onChange={setAddress} />
        <div className="field-grid">
          <TextField id="landlord-pan" label="Landlord PAN (optional)" value={landlordPan} onChange={setLandlordPan} />
          <ToggleField checked={revenueStamp} id="revenue-stamp" label="Include revenue stamp note" onChange={setRevenueStamp} />
        </div>
      </section>

      <PrimaryResultCard
        caption={`${months.length} receipt${months.length === 1 ? "" : "s"} in this set`}
        highlights={[
          { label: "Annual rent", value: formatRupees(annualRent) },
          { label: "PAN needed", value: annualRent > 100000 ? "Yes" : "No" },
        ]}
        label="Monthly rent"
        value={formatRupees(monthlyRent)}
      />

      <InlinePreviewCard subtitle="Preview of the generated receipt set before downloading." title="Receipt preview">
        <div className="preview-sheet" ref={previewRef}>
          {months.map((month) => (
            <div className="preview-sheet" key={month}>
              <div className="preview-sheet-header">
                <strong>Rent Receipt</strong>
                <span>{month}</span>
              </div>
              <p>Received a sum of {formatRupees(monthlyRent)} from {tenantName} towards rent for:</p>
              <p>{address}</p>
              <div className="preview-sheet-grid">
                <span>Landlord: {landlordName}</span>
                <span>Payment mode: {paymentMode}</span>
                {landlordPan ? <span>PAN: {landlordPan}</span> : null}
              </div>
              {revenueStamp ? <p>Revenue stamp to be affixed where applicable.</p> : null}
            </div>
          ))}
        </div>
        <DownloadButton
          disabled={!canDownload}
          label="Download receipt PDF"
          onDownload={() => previewRef.current && exportNodeAsPdf({ node: previewRef.current, filename: "rent-receipts.pdf" })}
        />
      </InlinePreviewCard>
    </div>
  );
}

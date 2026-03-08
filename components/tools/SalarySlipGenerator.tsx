"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useRef, useState } from "react";
import {
  DownloadButton,
  exportNodeAsPdf,
  FieldHint,
  FileField,
  InlinePreviewCard,
  NumberField,
  TextField,
} from "@/components/tools/shared";
import { formatRupees } from "@/lib/format";

export function SalarySlipGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [companyName, setCompanyName] = useState("India Tools Pvt Ltd");
  const [employeeName, setEmployeeName] = useState("Rohan Gupta");
  const [designation, setDesignation] = useState("Senior Analyst");
  const [logoUrl, setLogoUrl] = useState("");
  const [basic, setBasic] = useState(40000);
  const [hra, setHra] = useState(20000);
  const [da, setDa] = useState(5000);
  const [specialAllowance, setSpecialAllowance] = useState(15000);
  const [pf, setPf] = useState(4800);
  const [esi, setEsi] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(200);
  const [tds, setTds] = useState(3000);

  const totals = useMemo(() => {
    const gross = basic + hra + da + specialAllowance;
    const deductions = pf + esi + professionalTax + tds;
    return {
      gross,
      deductions,
      net: gross - deductions,
    };
  }, [basic, da, esi, hra, pf, professionalTax, specialAllowance, tds]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Build a printable payslip"
          text="Enter company, employee, and payroll components to generate a clean salary slip PDF."
        />
        <div className="field-grid">
          <TextField id="slip-company" label="Company" value={companyName} onChange={setCompanyName} />
          <TextField id="slip-employee" label="Employee" value={employeeName} onChange={setEmployeeName} />
          <TextField id="slip-designation" label="Designation" value={designation} onChange={setDesignation} />
          <FileField
            accept="image/*"
            id="slip-logo"
            label="Company logo (optional)"
            onChange={(file) => {
              if (!file) {
                setLogoUrl("");
                return;
              }

              const reader = new FileReader();
              reader.onload = () => setLogoUrl(String(reader.result || ""));
              reader.readAsDataURL(file);
            }}
          />
        </div>
        <div className="field-grid">
          <NumberField id="slip-basic" label="Basic" value={basic} onChange={setBasic} />
          <NumberField id="slip-hra" label="HRA" value={hra} onChange={setHra} />
          <NumberField id="slip-da" label="DA" value={da} onChange={setDa} />
          <NumberField id="slip-special" label="Special allowance" value={specialAllowance} onChange={setSpecialAllowance} />
          <NumberField id="slip-pf" label="PF" value={pf} onChange={setPf} />
          <NumberField id="slip-esi" label="ESI" value={esi} onChange={setEsi} />
          <NumberField id="slip-pt" label="Professional tax" value={professionalTax} onChange={setProfessionalTax} />
          <NumberField id="slip-tds" label="TDS" value={tds} onChange={setTds} />
        </div>
      </section>

      <InlinePreviewCard subtitle="Preview of the generated salary slip." title="Salary slip preview">
        <div className="preview-sheet" ref={previewRef}>
          <div className="preview-sheet-grid">
            <div>
              <strong>{companyName}</strong>
              <p>{employeeName}</p>
              <p>{designation}</p>
            </div>
            {logoUrl ? <img alt={companyName} src={logoUrl} style={{ maxWidth: 140, width: "100%" }} /> : null}
          </div>
          <div className="preview-sheet-grid">
            <div>
              <strong>Earnings</strong>
              <p>Basic: {formatRupees(basic)}</p>
              <p>HRA: {formatRupees(hra)}</p>
              <p>DA: {formatRupees(da)}</p>
              <p>Special allowance: {formatRupees(specialAllowance)}</p>
              <p>Gross pay: {formatRupees(totals.gross)}</p>
            </div>
            <div>
              <strong>Deductions</strong>
              <p>PF: {formatRupees(pf)}</p>
              <p>ESI: {formatRupees(esi)}</p>
              <p>Professional tax: {formatRupees(professionalTax)}</p>
              <p>TDS: {formatRupees(tds)}</p>
              <p>Total deductions: {formatRupees(totals.deductions)}</p>
            </div>
          </div>
          <strong>Net pay: {formatRupees(totals.net)}</strong>
        </div>
        <DownloadButton
          label="Download salary slip PDF"
          onDownload={() => previewRef.current && exportNodeAsPdf({ node: previewRef.current, filename: "salary-slip.pdf" })}
        />
      </InlinePreviewCard>
    </div>
  );
}

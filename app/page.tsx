import type { Metadata } from "next";
import Link from "next/link";
import { ToolDirectory } from "@/components/ToolDirectory";
import { toolDefinitions, toolDefinitionsByCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online India Tools, Calculators, and Generators",
  description:
    "Use free online India calculators, generators, and converters for salary, tax, EMI, SIP, PPF, seller fees, UPI QR, GST invoices, rent receipts, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online India Tools, Calculators, and Generators | India Tools",
    description:
      "Use free online India calculators, generators, and converters for salary, tax, EMI, SIP, PPF, seller fees, UPI QR, GST invoices, rent receipts, and more.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const leadTools = toolDefinitions.filter((tool) => tool.featured).slice(0, 8);

  return (
    <div className="page-stack">
      <section className="directory-header">
        <p className="eyebrow">India finance calculators</p>
        <h1>Free online tax and finance calculators for India.</h1>
        <p className="hero-text">
          Check salary, tax, EMI, SIP, PPF, seller fees, QR payments, and document generators
          without fighting cluttered pages.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/tools/salary-calculator">
            Calculate salary
          </Link>
          <Link className="button button-secondary" href="/tools/ppf-calculator">
            Open PPF
          </Link>
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>Most used tools</h2>
          <p className="muted">Pick a tool, enter your numbers, and move on.</p>
        </div>

        <div className="tool-list">
          {leadTools.map((tool) => (
            <Link className="tool-row" href={`/tools/${tool.slug}`} key={tool.slug}>
              <span className="tool-row-category">{tool.category}</span>
              <div className="tool-row-copy">
                <h3>{tool.name}</h3>
                <p>{tool.primaryPromise}</p>
              </div>
              <span className="tool-row-action">Open</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>What you can do here</h2>
          <p className="muted">
            Use the site for salary, tax, investing, seller, payment, property, and document tasks.
          </p>
        </div>

        <div className="content-card">
          <div className="info-section">
            <p>
              India Tools is designed for people who want a fast answer first and a deeper
              breakdown only when needed. Each calculator is browser-based, mobile-friendly,
              and built to show the assumptions behind the result instead of hiding them.
            </p>
            <p>
              Start with a simple number, document, or payment detail. Then expand the details
              if you want to compare tax regimes, inspect borrowing cost, estimate seller fees,
              create a QR code, or generate printable records.
            </p>
          </div>
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>Popular tasks</h2>
          <p className="muted">Jump straight to common India-specific calculations and generators.</p>
        </div>

        <div className="related-links">
          <Link className="text-link related-link" href="/tools/salary-calculator">
            CTC to in-hand salary calculator
          </Link>
          <Link className="text-link related-link" href="/tools/income-tax-calculator">
            Old vs new tax regime calculator
          </Link>
          <Link className="text-link related-link" href="/tools/emi-calculator">
            Home and personal loan EMI calculator
          </Link>
          <Link className="text-link related-link" href="/tools/sip-calculator">
            Monthly SIP growth calculator
          </Link>
          <Link className="text-link related-link" href="/tools/gst-calculator">
            Add or remove GST calculator
          </Link>
          <Link className="text-link related-link" href="/tools/ppf-calculator">
            PPF maturity calculator
          </Link>
          <Link className="text-link related-link" href="/tools/fd-calculator">
            Fixed deposit calculator
          </Link>
          <Link className="text-link related-link" href="/tools/gratuity-calculator">
            Gratuity amount calculator
          </Link>
          <Link className="text-link related-link" href="/tools/amazon-seller-fee-calculator">
            Amazon seller fee calculator
          </Link>
          <Link className="text-link related-link" href="/tools/upi-qr-generator">
            UPI QR generator
          </Link>
          <Link className="text-link related-link" href="/tools/gst-invoice-generator">
            GST invoice generator
          </Link>
          <Link className="text-link related-link" href="/tools/rent-receipt-generator">
            Rent receipt generator
          </Link>
        </div>
      </section>

      <ToolDirectory categories={toolDefinitionsByCategory} tools={toolDefinitions} />
    </div>
  );
}

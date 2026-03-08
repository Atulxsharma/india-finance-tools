import type { Metadata } from "next";
import Link from "next/link";
import { toolDefinitions, toolDefinitionsByCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online Tax and Finance Calculators for India",
  description:
    "Use free online India finance calculators for salary, income tax, EMI, SIP, GST, PPF, FD, and gratuity. Fast on mobile, transparent about assumptions, and built for quick checks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online Tax and Finance Calculators for India | India Tools",
    description:
      "Use free online India finance calculators for salary, income tax, EMI, SIP, GST, PPF, FD, and gratuity. Fast on mobile, transparent about assumptions, and built for quick checks.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const leadTools = [
    "salary-calculator",
    "income-tax-calculator",
    "emi-calculator",
    "sip-calculator",
    "gst-calculator",
    "ppf-calculator",
    "fd-calculator",
    "gratuity-calculator",
  ]
    .map((slug) => toolDefinitions.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);

  return (
    <div className="page-stack">
      <section className="directory-header">
        <p className="eyebrow">India finance calculators</p>
        <h1>Free online tax and finance calculators for India.</h1>
        <p className="hero-text">
          Check take-home salary, compare tax regimes, estimate EMI, project SIP growth,
          calculate GST, and plan PPF, FD, or gratuity without fighting cluttered pages.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/tools/salary-calculator">
            Calculate salary
          </Link>
          <Link className="button button-secondary" href="/tools/income-tax-calculator">
            Compare tax regimes
          </Link>
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>Most used calculators</h2>
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
            Use the site for quick salary, tax, borrowing, investing, and invoice checks.
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
              Start with a simple number like annual CTC, annual income, loan amount, or
              monthly SIP. Then expand the details if you want to compare tax regimes, test
              deductions, inspect EMI cost, or verify GST splits.
            </p>
          </div>
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>Popular checks</h2>
          <p className="muted">Jump straight to the most common finance questions.</p>
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
        </div>
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>All calculators</h2>
          <p className="muted">Browse the full tool library by category.</p>
        </div>

        {toolDefinitionsByCategory.map(([category, tools]) => (
          <div className="content-card" key={category}>
            <div className="section-heading">
              <h3>{category}</h3>
            </div>
            <div className="related-links">
              {tools.map((tool) => (
                <Link className="text-link related-link" href={`/tools/${tool.slug}`} key={tool.slug}>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

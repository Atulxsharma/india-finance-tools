import type { Metadata } from "next";
import Link from "next/link";
import { toolDefinitions } from "@/lib/tools";

export const metadata: Metadata = {
  title: "India Finance Tools",
  description:
    "Use five fast, browser-based India finance calculators for salary, GST, EMI, SIP, and income tax. Mobile-first, transparent, and free.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const leadTools = [
    "salary-calculator",
    "income-tax-calculator",
    "emi-calculator",
    "sip-calculator",
    "gst-calculator",
  ]
    .map((slug) => toolDefinitions.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);

  return (
    <div className="page-stack">
      <section className="directory-header">
        <p className="eyebrow">India finance calculators</p>
        <h1>Open a calculator and get the number.</h1>
        <p className="hero-text">
          Salary, tax, EMI, SIP, and GST tools built for quick checks on your phone.
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
    </div>
  );
}

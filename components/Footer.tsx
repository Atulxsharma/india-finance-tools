import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <strong>India Tools</strong>
          <p>Salary, tax, EMI, SIP, and GST calculators for quick checks.</p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/tools/salary-calculator">Salary</Link>
          <Link href="/tools/income-tax-calculator">Income tax</Link>
        </div>
      </div>
    </footer>
  );
}

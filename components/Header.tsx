import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">India Tools</span>
        <span className="brand-name">Salary, tax, EMI, SIP, GST</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <Link href="/tools/salary-calculator">Salary</Link>
        <Link href="/tools/gst-calculator">GST</Link>
        <Link href="/tools/emi-calculator">EMI</Link>
        <Link href="/tools/sip-calculator">SIP</Link>
        <Link href="/tools/income-tax-calculator">Income tax</Link>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { toolDefinitions } from "@/lib/tools";

export function Header() {
  const featuredTools = [
    "salary-calculator",
    "income-tax-calculator",
    "gst-calculator",
    "emi-calculator",
    "sip-calculator",
    "ppf-calculator",
    "fd-calculator",
  ]
    .map((slug) => toolDefinitions.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">India Tools</span>
        <span className="brand-name">Salary, tax, EMI, SIP, PPF, FD</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {featuredTools.map((tool) => (
          <Link href={`/tools/${tool.slug}`} key={tool.slug}>
            {tool.name
              .replace(" Calculator", "")
              .replace("Take-Home ", "")
              .replace("Income Tax", "Tax")}
          </Link>
        ))}
      </nav>
    </header>
  );
}

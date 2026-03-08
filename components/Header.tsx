import Link from "next/link";
import { toolDefinitions } from "@/lib/tools";

export function Header() {
  const featuredTools = toolDefinitions.filter((tool) => tool.featured).slice(0, 7);

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">India Tools</span>
        <span className="brand-name">Calculators, generators, and utility tools for India</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {featuredTools.map((tool) => (
          <Link href={`/tools/${tool.slug}`} key={tool.slug}>
            {tool.navLabel ?? tool.name.replace(" Calculator", "")}
          </Link>
        ))}
      </nav>
    </header>
  );
}

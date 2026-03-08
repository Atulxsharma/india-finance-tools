import Link from "next/link";
import { toolDefinitions } from "@/lib/tools";

export function Footer() {
  const footerTools = toolDefinitions.filter((tool) => tool.featured).slice(0, 4);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <strong>India Tools</strong>
          <p>India-first calculators, generators, and utility tools for quick decisions.</p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          {footerTools.map((tool) => (
            <Link href={`/tools/${tool.slug}`} key={tool.slug}>
              {tool.navLabel ?? tool.name.replace(" Calculator", "")}
            </Link>
          ))}
          <Link href="/about">About</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

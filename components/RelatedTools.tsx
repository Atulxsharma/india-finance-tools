import Link from "next/link";
import { getRelatedTools } from "@/lib/tools";

export function RelatedTools({ relatedSlugs }: { relatedSlugs: string[] }) {
  const relatedTools = getRelatedTools(relatedSlugs);

  return (
    <section className="related-card">
      <h2>Related tools</h2>
      <p className="muted">
        Jump to the next check without starting over.
      </p>
      <div className="related-links">
        {relatedTools.map((tool) => (
          <Link className="text-link related-link" href={`/tools/${tool.slug}`} key={tool.slug}>
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

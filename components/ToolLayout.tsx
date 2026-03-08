import { FAQSchema } from "@/components/FAQSchema";
import { RelatedTools } from "@/components/RelatedTools";
import { SEOArticle } from "@/components/SEOArticle";
import { ToolSchema } from "@/components/ToolSchema";
import { ToolDefinition } from "@/lib/types";

export function ToolLayout({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  return (
    <div className="tool-layout">
      <section className="tool-header">
        <p className="eyebrow">{tool.category}</p>
        <h1>{tool.seoContent.h1}</h1>
        <p className="tool-promise">{tool.primaryPromise}</p>
        {tool.reviewedAt || tool.sourceLabel ? (
          <p className="tool-metadata">
            {tool.reviewedAt ? `Last reviewed: ${tool.reviewedAt}` : null}
            {tool.reviewedAt && tool.sourceLabel ? " · " : null}
            {tool.sourceLabel ? tool.sourceLabel : null}
          </p>
        ) : null}
      </section>

      <div className="tool-body">
        {children}
        <SEOArticle tool={tool} />
        <RelatedTools relatedSlugs={tool.relatedToolSlugs} />
        <ToolSchema tool={tool} />
        <FAQSchema faqs={tool.seoContent.faqs} />
      </div>
    </div>
  );
}

import { FAQSchema } from "@/components/FAQSchema";
import { RelatedTools } from "@/components/RelatedTools";
import { SEOArticle } from "@/components/SEOArticle";
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
      </section>

      <div className="tool-body">
        {children}
        <SEOArticle tool={tool} />
        <RelatedTools relatedSlugs={tool.relatedToolSlugs} />
        <FAQSchema faqs={tool.seoContent.faqs} />
      </div>
    </div>
  );
}

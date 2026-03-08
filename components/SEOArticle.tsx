import { ToolDefinition } from "@/lib/types";

export function SEOArticle({ tool }: { tool: ToolDefinition }) {
  return (
    <article className="seo-article">
      <h2>{tool.seoContent.articleHeading}</h2>
      {tool.seoContent.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h2>How to use this {tool.name}</h2>
      <ol>
        {tool.seoContent.howTo.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2>Frequently asked questions</h2>
      <dl className="faq-list">
        {tool.seoContent.faqs.map((faq) => (
          <div key={faq.question}>
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

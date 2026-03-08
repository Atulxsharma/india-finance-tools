import { siteConfig } from "@/lib/site";
import { ToolDefinition } from "@/lib/types";

function getApplicationCategory(tool: ToolDefinition) {
  switch (tool.schemaType) {
    case "converter":
      return "UtilitiesApplication";
    case "generator":
      return "BusinessApplication";
    case "calculator":
    default:
      return tool.category === "Tax" ? "FinanceApplication" : "FinanceApplication";
  }
}

export function ToolSchema({ tool }: { tool: ToolDefinition }) {
  const url = `${siteConfig.url}/tools/${tool.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        applicationCategory: getApplicationCategory(tool),
        operatingSystem: "Any",
        url,
        description: tool.seoContent.metaDescription,
        inLanguage: "en-IN",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "HowTo",
        name: `How to use ${tool.name}`,
        description: tool.primaryPromise,
        step: tool.seoContent.howTo.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          text: step,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

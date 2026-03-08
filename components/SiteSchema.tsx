import { siteConfig } from "@/lib/site";

export function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en-IN",
        description: siteConfig.description,
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
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

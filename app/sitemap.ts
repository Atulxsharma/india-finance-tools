import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { toolDefinitions } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolDefinitions.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

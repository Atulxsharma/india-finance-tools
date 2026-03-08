import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { toolDefinitions } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/privacy-policy",
    "/terms-and-conditions",
    "/contact",
  ];

  return [
    ...staticPages.map((path, index) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.5,
    })),
    ...toolDefinitions.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

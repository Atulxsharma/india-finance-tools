import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdUnit } from "@/components/AdUnit";
import { ToolLayout } from "@/components/ToolLayout";
import { toolComponentRegistry } from "@/components/tools/registry";
import { siteConfig } from "@/lib/site";
import { getToolDefinition, toolDefinitions } from "@/lib/tools";

type ToolPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toolDefinitions.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: ToolPageParams): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolDefinition(slug);

  if (!tool) {
    return {};
  }

  const url = `${siteConfig.url}/tools/${tool.slug}`;

  return {
    title: tool.seoContent.title,
    description: tool.seoContent.metaDescription,
    keywords: tool.seoContent.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.seoContent.title} | ${siteConfig.name}`,
      description: tool.seoContent.metaDescription,
      url,
      type: "article",
    },
  };
}

export default async function ToolPage({ params }: ToolPageParams) {
  const { slug } = await params;
  const tool = getToolDefinition(slug);

  if (!tool) {
    notFound();
  }

  const Calculator = toolComponentRegistry[slug as keyof typeof toolComponentRegistry];

  if (!Calculator) {
    notFound();
  }

  return (
    <div className="tool-page">
      <ToolLayout tool={tool}>
        <Calculator />
        <AdUnit />
      </ToolLayout>
    </div>
  );
}

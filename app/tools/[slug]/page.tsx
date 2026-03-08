import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdUnit } from "@/components/AdUnit";
import { ToolLayout } from "@/components/ToolLayout";
import { EmiCalculator } from "@/components/tools/EmiCalculator";
import { GstCalculator } from "@/components/tools/GstCalculator";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { SipCalculator } from "@/components/tools/SipCalculator";
import { siteConfig } from "@/lib/site";
import { getToolDefinition, toolDefinitions } from "@/lib/tools";

const toolComponents = {
  "salary-calculator": SalaryCalculator,
  "gst-calculator": GstCalculator,
  "emi-calculator": EmiCalculator,
  "sip-calculator": SipCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
} as const;

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

  const Calculator = toolComponents[slug as keyof typeof toolComponents];

  return (
    <div className="tool-page">
      <ToolLayout tool={tool}>
        <Calculator />
        <AdUnit />
      </ToolLayout>
    </div>
  );
}

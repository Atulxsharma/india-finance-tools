export type ToolCategory = "Finance" | "Tax";
export type ToolSchemaType = "calculator" | "generator" | "converter";

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoContent = {
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  articleHeading: string;
  intro: string[];
  howTo: string[];
  faqs: FaqItem[];
  coverage: string[];
};

export type ToolDefinition = {
  slug: string;
  name: string;
  category: ToolCategory;
  schemaType: ToolSchemaType;
  targetKeyword: string;
  description: string;
  primaryPromise: string;
  relatedToolSlugs: string[];
  seoContent: SeoContent;
};

export type CalculationResult = {
  summary: Array<{ label: string; value: string }>;
  breakdown: Array<{ label: string; value: string }>;
  comparison?: Array<{ label: string; value: string }>;
  notes: string[];
  assumptions: string[];
};

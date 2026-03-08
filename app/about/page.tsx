import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what India Tools is building for Indian users who need calculators, generators, converters, and utility tools.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="About India Tools"
      intro="India Tools is building a focused set of browser-based calculators, generators, and utility tools for Indian users who want quick answers without fighting slow, cluttered pages."
      sections={[
        {
          heading: "What this site is for",
          paragraphs: [
            "The goal is simple: help users get to the answer quickly on salary, tax, investment, seller, property, payment, and document tasks, especially on mobile.",
            "The site prioritizes transparent assumptions, visible breakdowns, and tools that work well before and after deeper detail is needed.",
          ],
        },
        {
          heading: "Who this helps",
          items: [
            "Salaried employees checking in-hand pay or tax-regime choices",
            "Borrowers comparing loan affordability",
            "Investors estimating SIP outcomes",
            "Small businesses checking seller fees, GST invoice math, or QR payment setup",
            "Users generating rent receipts, salary slips, and other practical documents",
          ],
        },
        {
          heading: "How the site is being built",
          paragraphs: [
            "The site is built as a growing library of India-specific tools instead of a single-purpose calculator site. New tools are added when they make the site more useful, not just bigger.",
            "Where applicable, tax and benefits logic is versioned by financial year and designed to show assumptions instead of hiding them.",
          ],
        },
      ]}
    />
  );
}

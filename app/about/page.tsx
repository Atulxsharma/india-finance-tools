import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what India Tools is building for Indian salary, tax, EMI, SIP, and GST users.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="About India Tools"
      intro="India Tools is building a focused set of browser-based finance utilities for Indian users who want quick answers without fighting slow, cluttered calculator pages."
      sections={[
        {
          heading: "What this site is for",
          paragraphs: [
            "The goal is simple: help users get to the answer quickly on salary, tax, EMI, SIP, and GST questions, especially on mobile.",
            "The site prioritizes transparent assumptions, visible breakdowns, and calculators that work well before and after deeper detail is needed.",
          ],
        },
        {
          heading: "Who this helps",
          items: [
            "Salaried employees checking in-hand pay or tax-regime choices",
            "Borrowers comparing loan affordability",
            "Investors estimating SIP outcomes",
            "Freelancers and small businesses checking GST invoice math",
          ],
        },
        {
          heading: "How the site is being built",
          paragraphs: [
            "The current version is the first phase of a larger finance-tools library. More calculators and support pages are planned so the site becomes more useful over time, not just more decorative.",
            "Where applicable, tax logic is versioned by financial year and designed to show assumptions instead of hiding them.",
          ],
        },
      ]}
    />
  );
}

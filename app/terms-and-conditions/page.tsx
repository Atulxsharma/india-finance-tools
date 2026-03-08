import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the terms and conditions for using India Tools and its finance calculators.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Terms and Conditions"
      intro="These terms govern the use of India Tools and all finance calculators published on the site."
      sections={[
        {
          heading: "Use of the site",
          paragraphs: [
            "India Tools provides general-purpose finance calculators and explanatory content for informational and planning use. By using the site, you agree to use it lawfully and responsibly.",
            "The site may be updated, expanded, corrected, or temporarily unavailable at any time without notice.",
          ],
        },
        {
          heading: "No professional advice",
          paragraphs: [
            "Calculator outputs are estimates. They do not replace tax filing advice, legal advice, investment advice, payroll advice, or any official government or employer record.",
            "You are responsible for validating important results against current laws, official circulars, lender terms, employer salary structures, and your own documentation.",
          ],
        },
        {
          heading: "Accuracy and limitations",
          paragraphs: [
            "The site aims to keep its formulas and assumptions current, but no calculator can cover every individual edge case, employer-specific policy, or future regulatory change.",
            "India Tools is not liable for losses, costs, or decisions made solely on the basis of calculator outputs or explanatory content.",
          ],
        },
        {
          heading: "Content and intellectual property",
          items: [
            "The site design, written content, and calculator implementations are protected content.",
            "You may use the site for personal or business planning purposes.",
            "You may not copy, republish, or resell the site content in bulk without permission.",
          ],
        },
      ]}
    />
  );
}

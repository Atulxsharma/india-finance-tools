import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact India Tools for product feedback, correction requests, and business inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Contact"
      intro="Use this page for product feedback, correction requests, and business inquiries related to India Tools."
      sections={[
        {
          heading: "Current contact route",
          paragraphs: [
            "A dedicated support inbox is not published yet. Until that is added, product feedback and issue reports can be sent through the public project repository.",
          ],
        },
        {
          heading: "What to include",
          items: [
            "Which calculator or page you were using",
            "What result looked wrong or confusing",
            "The numbers or scenario you entered",
            "Whether the issue was on mobile or desktop",
          ],
        },
        {
          heading: "Response expectations",
          paragraphs: [
            "Because the site is still in an early growth phase, response times may vary. High-impact corrections and logic issues should be prioritized first.",
          ],
        },
      ]}
      footerNote={
        <p>
          Repository:{" "}
          <Link
            className="text-link"
            href="https://github.com/Atulxsharma/india-finance-tools"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Atulxsharma/india-finance-tools
          </Link>
        </p>
      }
    />
  );
}

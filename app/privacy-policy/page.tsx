import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for India Tools, including how calculator inputs, analytics, and future advertising services are handled.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains what India Tools collects, what stays on your device, and how future analytics and advertising may be handled."
      sections={[
        {
          heading: "What the calculators do",
          paragraphs: [
            "The calculators, generators, and utility tools on this site run in your browser. The values you enter are used to generate estimates, formatted documents, QR codes, or conversions on the page you are using.",
            "Core calculator inputs are not currently tied to a user account because the site does not offer login, saved cloud profiles, or account-based syncing.",
          ],
        },
        {
          heading: "What may be stored locally",
          paragraphs: [
            "Some basic site preferences or recent usage signals may be stored in your browser to improve the experience on return visits. This can include install-prompt state, recently used tools, or similar local settings.",
            "Local browser storage remains on your device unless you clear it.",
          ],
        },
        {
          heading: "Analytics and advertising",
          paragraphs: [
            "Analytics and advertising tools may be added as the site grows. If that happens, this policy will be updated to describe what data is collected, which services are used, and how they support site performance, traffic analysis, and ads.",
            "If advertising is enabled in the future, third-party vendors may use cookies or similar technologies to serve ads based on visits to this site or other websites, subject to their own policies and applicable law.",
          ],
        },
        {
          heading: "How to use the site responsibly",
          items: [
            "Use the calculators as planning tools, not as legal, tax-filing, or investment advice.",
            "Do not rely on browser-saved values as a permanent record.",
            "Cross-check important financial decisions with official documents and professional advice where needed.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pioneer Public School collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    heading: "Information We Collect",
    body: "When you submit an enquiry, contact, campus-visit, or newsletter form on this website, we collect the details you provide — such as your name, phone number, email address, and your child's name and grade. We do not collect payment information through this website.",
  },
  {
    heading: "How We Use Your Information",
    body: "Your information is used only to respond to your enquiry, process admissions, schedule campus visits, and share school updates you have opted into. We never sell or rent your personal information to third parties.",
  },
  {
    heading: "Data Storage & Security",
    body: "Form submissions are stored securely and access is restricted to authorised school staff. We take reasonable technical and organisational measures to protect your data against unauthorised access, alteration, or loss.",
  },
  {
    heading: "Cookies & Analytics",
    body: "This website may use privacy-respecting analytics to understand visitor trends (pages visited, device type). No personally identifying information is captured by analytics.",
  },
  {
    heading: "Children's Privacy",
    body: "We collect children's information (name and grade) only from parents or guardians as part of the admission process, and use it solely for that purpose.",
  },
  {
    heading: "Your Rights",
    body: `You may request a copy, correction, or deletion of your personal information at any time by writing to ${site.email} or contacting the school office.`,
  },
  {
    heading: "Updates to This Policy",
    body: "We may update this policy from time to time. The latest version will always be available on this page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description={`How ${site.name} handles and protects your information.`}
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
              </div>
            ))}
            <p className="border-t border-primary-100 pt-8 text-sm text-muted">
              Last updated: July 2026 · {site.name}, {site.address.line1},{" "}
              {site.address.line2}, {site.address.state} – {site.address.pincode}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

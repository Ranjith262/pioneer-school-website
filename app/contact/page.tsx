import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { T } from "@/components/i18n/T";
import { SiteIcon } from "@/components/ui/SiteIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Pioneer Public School, Pragati Nagar, Ojanahalli Road, Bhagyanagar, Koppal, Karnataka 583238 — phone, email, map, working hours, and contact form.",
  alternates: { canonical: "/contact" },
};

const cardKeys = ["address", "phone", "email", "hours"] as const;
const cardIcons = ["pin", "phone", "envelope", "clock"];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.contact.title" />}
        description={<T k="pages.contact.description" />}
        crumbs={[{ label: <T k="pages.contact.crumb" /> }]}
      />

      {/* Contact cards */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cardKeys.map((cardKey, i) => (
            <FadeIn key={cardKey} delay={i * 0.06}>
              <div className="h-full rounded-card bg-white p-7 shadow-soft">
                <SiteIcon name={cardIcons[i]} className="h-8 w-8 text-primary" />
                <h2 className="mt-3 font-heading font-semibold text-ink">
                  <T k={`pages.contact.cards.${cardKey}`} />
                </h2>
                <div className="mt-2 space-y-1 text-sm text-muted">
                  {cardKey === "address" && (
                    <>
                      <p>{site.address.line1}</p>
                      <p>{site.address.line2}</p>
                      <p>{site.address.state} – {site.address.pincode}, {site.address.country}</p>
                    </>
                  )}
                  {cardKey === "phone" && (
                    <>
                      <p>Office: {site.phone}</p>
                      <p>Admissions: {site.admissionsPhone}</p>
                    </>
                  )}
                  {cardKey === "email" && (
                    <>
                      <p>{site.email}</p>
                      <p>{site.admissionsEmail}</p>
                    </>
                  )}
                  {cardKey === "hours" && (
                    <>
                      <p>{site.hours}</p>
                      <p><T k="pages.contact.cards.sunday" /></p>
                    </>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Form + map */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.contact.form.title" />
              </h2>
              <p className="mt-2 text-muted">
                <T k="pages.contact.form.description" />
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-lift">
              <iframe
                title="Pioneer Public School on Google Maps"
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="min-h-96 w-full flex-1 border-0"
              />
              <div className="p-6">
                <p className="font-heading font-semibold text-ink">{site.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {site.address.line1}, {site.address.line2},{" "}
                  {site.address.state} – {site.address.pincode}
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

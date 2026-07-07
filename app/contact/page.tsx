import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Pioneer Public School, Pragati Nagar, Ojanahalli Road, Bhagyanagar, Koppal, Karnataka 583238 — phone, email, map, working hours, and contact form.",
  alternates: { canonical: "/contact" },
};

const contactCards = [
  {
    title: "Address",
    emoji: "📍",
    lines: [
      site.address.line1,
      site.address.line2,
      `${site.address.state} – ${site.address.pincode}, ${site.address.country}`,
    ],
  },
  {
    title: "Phone",
    emoji: "📞",
    lines: [`Office: ${site.phone}`, `Admissions: ${site.admissionsPhone}`],
  },
  {
    title: "Email",
    emoji: "✉️",
    lines: [site.email, site.admissionsEmail],
  },
  {
    title: "Working Hours",
    emoji: "🕘",
    lines: [site.hours, "Sunday: Closed"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Questions about admissions, transport, or anything else? We would love to hear from you."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact cards */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.06}>
              <div className="h-full rounded-card bg-white p-7 shadow-soft">
                <span aria-hidden="true" className="text-3xl">{card.emoji}</span>
                <h2 className="mt-3 font-heading font-semibold text-ink">{card.title}</h2>
                <div className="mt-2 space-y-1 text-sm text-muted">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </Container>
      </section>

      {/* Form + map */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Send Us a Message</h2>
              <p className="mt-2 text-muted">
                We reply to every message within one working day.
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

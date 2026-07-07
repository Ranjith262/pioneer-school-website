import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const quickLinks = [
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Parents", href: "/parents" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: "f" },
  { label: "Instagram", href: site.social.instagram, icon: "◉" },
  { label: "YouTube", href: site.social.youtube, icon: "▶" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* School identity */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
            />
            <p className="font-heading text-lg font-bold">{site.name}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Nurturing young minds from Nursery to Class 10 since {site.established} —
            academic excellence, strong values, and holistic development in the heart
            of Koppal.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm transition-colors hover:bg-accent hover:text-ink"
              >
                <span aria-hidden="true">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-white/70">
            <p>
              {site.address.line1},<br />
              {site.address.line2},<br />
              {site.address.state} – {site.address.pincode}
            </p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
            <p>{site.hours}</p>
          </address>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
            Newsletter
          </h2>
          <p className="mt-4 text-sm text-white/70">
            School news, circulars, and event updates in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}

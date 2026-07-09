import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { ScrollTop } from "@/components/ui/ScrollTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Editorial serif for display moments — the "world-class school" voice
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.subTagline,
  keywords: [
    "Pioneer Public School",
    "school in Bhagyanagar, Koppal",
    "best school Bhagyanagar",
    "Nursery admission Bhagyanagar, Koppal",
    "CBSE school Karnataka",
    "English medium school Bhagyanagar, Koppal",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.subTagline,
    locale: "en_IN",
    url: site.url,
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: `${site.name} emblem`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.tagline}`,
    description: site.subTagline,
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0057B8",
  width: "device-width",
  initialScale: 1,
};

/** Schema.org structured data for local SEO. */
const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.established),
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Bhagyanagar, Koppal",
    addressRegion: site.address.state,
    postalCode: site.address.pincode,
    addressCountry: "IN",
  },
  sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-white"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content" className="flex-1 pb-20 sm:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCta />
        <ScrollTop />
        <ScrollProgress />
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
      </body>
    </html>
  );
}

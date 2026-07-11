import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of Pioneer Public School — sports, annual day, science fairs, classrooms, and educational trips. Filter by category and year.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.gallery.title" />}
        description={<T k="pages.gallery.description" />}
        crumbs={[{ label: <T k="pages.gallery.crumb" /> }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <GalleryExplorer />
        </Container>
      </section>
    </>
  );
}

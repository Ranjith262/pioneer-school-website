import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";

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
        title="Gallery"
        description="Browse moments from school life. Filter by category or year, and click any photo to view it larger."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <GalleryExplorer />
        </Container>
      </section>
    </>
  );
}

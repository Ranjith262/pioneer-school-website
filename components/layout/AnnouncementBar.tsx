import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function AnnouncementBar() {
  return (
    <div className="bg-primary-800 text-white">
      <Container className="flex items-center justify-center gap-3 py-2 text-center text-sm">
        <span aria-hidden="true">📢</span>
        <p>
          {site.announcement.text}{" "}
          <Link
            href={site.announcement.href}
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            {site.announcement.cta} →
          </Link>
        </p>
      </Container>
    </div>
  );
}

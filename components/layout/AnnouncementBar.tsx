import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { T } from "@/components/i18n/T";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function AnnouncementBar() {
  return (
    <div className="bg-primary-800 text-white">
      <Container className="flex items-center justify-between gap-3 py-2 text-sm">
        <p className="flex-1 text-center">
          <span aria-hidden="true">📢 </span>
          <T k="chrome.announcement.text" />{" "}
          <Link
            href={site.announcement.href}
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            <T k="chrome.announcement.cta" /> →
          </Link>
        </p>
        {/* Lives here (not in the navbar) so the sticky header band keeps
            an identical layout in every language */}
        <LanguageSwitcher tone="dark" />
      </Container>
    </div>
  );
}

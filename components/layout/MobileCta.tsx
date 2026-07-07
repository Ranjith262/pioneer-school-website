import Link from "next/link";
import { site } from "@/content/site";

/** Sticky bottom call-to-action bar, visible on small screens only. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-100 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${site.admissionsPhone.replace(/\s/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary py-3 text-sm font-semibold text-primary"
        >
          <span aria-hidden="true">📞</span> Call Us
        </a>
        <Link
          href="/admissions#apply"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-ink shadow-soft"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/** "/campus-life" → t("nav.campusLife") etc. */
function navKey(href: string) {
  return `nav.${href.slice(1).replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}`;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-soft"
      )}
    >
      <nav aria-label="Main navigation">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex min-w-0 shrink items-center gap-3" aria-label={`${site.name} — Home`}>
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
              priority
            />
            {/* nowrap keeps the sticky band the same height in every
                language — wrapping here made the header jump on switch */}
            <span className="leading-tight">
              <span className="block whitespace-nowrap font-heading text-base font-bold text-ink">
                Pioneer Public School
              </span>
              <span className="hidden whitespace-nowrap text-xs text-muted sm:block">
                {t("chrome.subtitle")}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden shrink-0 items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-colors 2xl:px-3",
                      active
                        ? "bg-primary-50 text-primary"
                        : "text-ink hover:bg-surface hover:text-primary"
                    )}
                  >
                    {t(navKey(link.href))}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* min-width reserved for the longest translation so the
                button (and the band) never resizes on language switch */}
            <Link
              href="/admissions#apply"
              className="hidden min-w-44 justify-center whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lift sm:inline-flex"
            >
              {t("chrome.applyNow")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("chrome.closeMenu") : t("chrome.openMenu")}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface xl:hidden"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-primary-100 bg-white xl:hidden"
        >
          <Container className="py-4">
            <div className="mb-3 flex justify-center">
              <LanguageSwitcher />
            </div>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 font-medium text-ink hover:bg-primary-50 hover:text-primary"
                  >
                    {t(navKey(link.href))}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/admissions#apply"
                  onClick={closeMenu}
                  className="block rounded-full bg-accent px-5 py-3 text-center font-semibold text-ink"
                >
                  {t("chrome.applyNow")}
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}

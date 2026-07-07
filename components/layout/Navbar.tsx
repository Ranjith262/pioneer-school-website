"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-soft"
      )}
    >
      <nav aria-label="Main navigation">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — Home`}>
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
              priority
            />
            <span className="leading-tight">
              <span className="block font-heading text-base font-bold text-ink sm:text-lg">
                Pioneer Public School
              </span>
              <span className="hidden text-xs text-muted sm:block">
                Koppal, Karnataka · Est. {site.established}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary-50 text-primary"
                        : "text-ink hover:bg-surface hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/admissions#apply"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lift sm:inline-flex"
            >
              Apply Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-primary-100 bg-white xl:hidden"
          >
            <Container className="py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 font-medium text-ink hover:bg-primary-50 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link
                    href="/admissions#apply"
                    onClick={closeMenu}
                    className="block rounded-full bg-accent px-5 py-3 text-center font-semibold text-ink"
                  >
                    Apply Now
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

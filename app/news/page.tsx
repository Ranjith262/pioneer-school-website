import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, news } from "@/content/news";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Latest news from Pioneer Public School — announcements, events, achievements, and circulars.",
  alternates: { canonical: "/news" },
};

const categories = ["All", "Announcement", "Event", "Achievement", "Circular"] as const;

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q = "", category = "All" } = await searchParams;
  const query = q.trim().toLowerCase();

  const filtered = news
    .filter((item) => category === "All" || item.category === category)
    .filter(
      (item) =>
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        title="News & Announcements"
        description="Stay up to date with everything happening at Pioneer Public School."
        crumbs={[{ label: "News" }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          {/* Search + categories */}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <nav aria-label="News categories" className="flex flex-wrap gap-2">
              {categories.map((option) => {
                const href =
                  option === "All"
                    ? q
                      ? `/news?q=${encodeURIComponent(q)}`
                      : "/news"
                    : `/news?category=${encodeURIComponent(option)}${
                        q ? `&q=${encodeURIComponent(q)}` : ""
                      }`;
                return (
                  <Link
                    key={option}
                    href={href}
                    aria-current={category === option ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      category === option
                        ? "bg-primary text-white shadow-soft"
                        : "bg-white text-ink shadow-soft hover:bg-primary-50"
                    )}
                  >
                    {option}
                  </Link>
                );
              })}
            </nav>

            <form action="/news" method="get" role="search" className="flex gap-2">
              {category !== "All" && (
                <input type="hidden" name="category" value={category} />
              )}
              <label htmlFor="news-search" className="sr-only">
                Search news
              </label>
              <input
                id="news-search"
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search news…"
                className="w-full rounded-full border border-primary-100 bg-white px-5 py-2.5 text-sm shadow-soft focus:border-primary focus:outline-none md:w-64"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted">
              No news found{query ? ` for “${q}”` : ""}. Try a different search or category.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {filtered.map((item, i) => (
                <FadeIn key={item.slug} delay={Math.min(i, 4) * 0.06}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group block h-full rounded-card bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary">
                        {item.category}
                      </span>
                      <time dateTime={item.date} className="text-muted">
                        {formatDate(item.date)}
                      </time>
                    </div>
                    <h2 className="mt-3 font-heading text-xl font-semibold text-ink group-hover:text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {item.excerpt}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-primary">Read More →</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
